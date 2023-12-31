/*
 * Copyright 2018 Google
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "Firestore/core/src/firebase/firestore/remote/grpc_stream.h"

#include <chrono>  // NOLINT(build/c++11)
#include <future>  // NOLINT(build/c++11)

#include "Firestore/core/src/firebase/firestore/remote/grpc_connection.h"
#include "Firestore/core/src/firebase/firestore/remote/grpc_util.h"

namespace firebase {
namespace firestore {
namespace remote {

using util::AsyncQueue;
using util::Status;
using Type = GrpcCompletion::Type;

// When invoking an async gRPC method, `GrpcStream` will create a new
// `GrpcCompletion` and use it as a tag to put on the gRPC completion queue.
// `GrpcStream` does not have a reference to the gRPC completion queue (this
// allows using the same completion queue for all streams); it expects that some
// different class (in practice, `RemoteStore`) will poll the gRPC completion
// queue and `Complete` all `GrpcCompletion`s that come out of the queue.
// `GrpcCompletion::Complete` will invoke the callback given to it by this
// `GrpcStream`. In turn, `GrpcStream` will decide whether to notify its
// observer.
//
// `GrpcStream` owns the gRPC objects (such as `grpc::ClientContext`) that must
// be valid until all `GrpcCompletion`s issued by this stream come back from the
// gRPC completion queue. `GrpcCompletion`s contain an `std::promise` that is
// fulfilled once the completion is taken off the gRPC completion queue, and
// `GrpcCompletion::WaitUntilOffQueue` allows blocking on this. `GrpcStream`
// holds non-owning pointers to all the completions that it issued (and removes
// pointers to completions once they ran). `GrpcStream::Finish` and
// `GrpcStream::WriteAndFinish` block on `GrpcCompletion::WaitUntilOffQueue` for
// all the currently-pending completions, thus ensuring that the stream can be
// safely released (along with the gRPC objects the stream owns) after `Finish`
// or `WriteAndFinish` have completed.

namespace internal {

absl::optional<BufferedWrite> BufferedWriter::EnqueueWrite(
    grpc::ByteBuffer&& message, const grpc::WriteOptions& options) {
  queue_.push({std::move(message), options});
  return TryStartWrite();
}

absl::optional<BufferedWrite> BufferedWriter::TryStartWrite() {
  if (queue_.empty() || has_active_write_) {
    return absl::nullopt;
  }

  has_active_write_ = true;
  BufferedWrite message = std::move(queue_.front());
  queue_.pop();
  return std::move(message);
}

absl::optional<BufferedWrite> BufferedWriter::DequeueNextWrite() {
  has_active_write_ = false;
  return TryStartWrite();
}

}  // namespace internal

using internal::BufferedWrite;
using internal::BufferedWriter;

GrpcStream::GrpcStream(
    std::unique_ptr<grpc::ClientContext> context,
    std::unique_ptr<grpc::GenericClientAsyncReaderWriter> call,
    AsyncQueue* worker_queue,
    GrpcConnection* grpc_connection,
    GrpcStreamObserver* observer)
    : context_{std::move(NOT_NULL(context))},
      call_{std::move(NOT_NULL(call))},
      worker_queue_{NOT_NULL(worker_queue)},
      grpc_connection_{NOT_NULL(grpc_connection)},
      observer_{NOT_NULL(observer)} {
  grpc_connection_->Register(this);
}

GrpcStream::~GrpcStream() {
  HARD_ASSERT(completions_.empty(),
              "GrpcStream is being destroyed without proper shutdown");
  MaybeUnregister();
}

void GrpcStream::Start() {
  // Make starting a quick operation that avoids a roundtrip to the server by
  // skipping the wait for initial server metadata (instead, it will be
  // automatically coalesced with the first write operation).
  context_->set_initial_metadata_corked(true);
  // It's generally okay to pass a null pointer as a tag; in this case in
  // particular, the tag will never come back from the completion queue (by
  // design).
  call_->StartCall(nullptr);

  if (observer_) {
    // Start listening for new messages.
    // Order is important here -- any call to observer can potentially end this
    // stream's lifetime, so call `Read` before notifying.
    Read();
    observer_->OnStreamStart();
  }
}

void GrpcStream::Read() {
  if (!observer_) {
    return;
  }

  GrpcCompletion* completion =
      NewCompletion(Type::Read, [this](const GrpcCompletion* completion) {
        OnRead(*completion->message());
      });
  call_->Read(completion->message(), completion);
}

void GrpcStream::Write(grpc::ByteBuffer&& message) {
  MaybeWrite(buffered_writer_.EnqueueWrite(std::move(message)));
}

void GrpcStream::WriteLast(grpc::ByteBuffer&& message) {
  grpc::WriteOptions options;
  options.set_last_message();
  MaybeWrite(buffered_writer_.EnqueueWrite(std::move(message), options));
}

void GrpcStream::MaybeWrite(absl::optional<BufferedWrite> maybe_write) {
  if (!maybe_write) {
    return;
  }

  BufferedWrite write = std::move(maybe_write).value();
  GrpcCompletion* completion =
      NewCompletion(Type::Write, [this](const GrpcCompletion*) { OnWrite(); });
  *completion->message() = write.message;

  call_->Write(*completion->message(), write.options, completion);
}

void GrpcStream::FinishImmediately() {
  Shutdown();
  UnsetObserver();
}

void GrpcStream::FinishAndNotify(const Status& status) {
  Shutdown();

  if (observer_) {
    // The call to observer could end this `GrpcStream`'s lifetime, so make
    // a protective copy.
    GrpcStreamObserver* observer = observer_;
    UnsetObserver();
    observer->OnStreamFinish(status);
  }
}

void GrpcStream::Shutdown() {
  MaybeUnregister();
  if (completions_.empty()) {
    // Nothing to cancel.
    return;
  }

  // Important: since the stream always has a pending read operation,
  // cancellation has to be called, or else the read would hang forever, and
  // finish operation will never get completed.
  //
  // (on the other hand, when an operation fails, cancellation should not be
  // called, otherwise the real failure cause will be overwritten by status
  // "canceled".)
  context_->TryCancel();

  // The observer is not interested in this event -- since it initiated the
  // finish operation, the observer must know the reason.
  GrpcCompletion* completion = NewCompletion(Type::Finish, {});
  // TODO(varconst): is issuing a finish operation necessary in this case? We
  // don't care about the status, but perhaps it will make the server notice
  // client disconnecting sooner?
  call_->Finish(completion->status(), completion);

  FastFinishCompletionsBlocking();
}

void GrpcStream::MaybeUnregister() {
  if (grpc_connection_) {
    grpc_connection_->Unregister(this);
    grpc_connection_ = nullptr;
  }
}

void GrpcStream::FastFinishCompletionsBlocking() {
  // TODO(varconst): reset buffered_writer_? Should not be necessary, because it
  // should never be called again after a call to Finish.

  for (auto completion : completions_) {
    // `GrpcStream` cannot actually remove any of the completions that already
    // have been enqueued on the worker queue, so instead turn them into no-ops.
    completion->Cancel();
  }

  for (auto completion : completions_) {
    // This is blocking.
    completion->WaitUntilOffQueue();
  }
  completions_.clear();
}

bool GrpcStream::WriteAndFinish(grpc::ByteBuffer&& message) {
  bool did_last_write = false;

  absl::optional<BufferedWrite> maybe_write =
      buffered_writer_.EnqueueWrite(std::move(message));
  // Only bother with the last write if there is no active write at the moment.
  if (maybe_write) {
    BufferedWrite last_write = std::move(maybe_write).value();
    GrpcCompletion* completion = NewCompletion(Type::Write, {});
    *completion->message() = last_write.message;
    call_->WriteLast(*completion->message(), grpc::WriteOptions{}, completion);

    // Empirically, the write normally takes less than a millisecond to finish
    // (both with and without network connection), and never more than several
    // dozen milliseconds. Nevertheless, ensure `WriteAndFinish` doesn't hang if
    // there happen to be circumstances under which the write may block
    // indefinitely (in that case, rely on the fact that canceling a gRPC call
    // makes all pending operations come back from the queue quickly).
    auto status = completion->WaitUntilOffQueue(std::chrono::milliseconds(500));
    if (status == std::future_status::ready) {
      did_last_write = true;
    }
  }

  FinishImmediately();
  return did_last_write;
}

GrpcStream::Metadata GrpcStream::GetResponseHeaders() const {
  return context_->GetServerInitialMetadata();
}

// Callbacks

void GrpcStream::OnRead(const grpc::ByteBuffer& message) {
  if (observer_) {
    // Continue waiting for new messages indefinitely as long as there is an
    // interested observer.
    // Order is important here -- any call to observer can potentially end this
    // stream's lifetime, so call `Read` before notifying.
    Read();
    observer_->OnStreamRead(message);
  }
}

void GrpcStream::OnWrite() {
  if (observer_) {
    MaybeWrite(buffered_writer_.DequeueNextWrite());
    // Observer is not interested in this event.
  }
}

void GrpcStream::OnOperationFailed() {
  if (is_finishing_) {
    // `Finish` itself cannot fail. If another failed operation already
    // triggered `Finish`, there's nothing to do.
    return;
  }

  is_finishing_ = true;

  if (observer_) {
    GrpcCompletion* completion =
        NewCompletion(Type::Finish, [this](const GrpcCompletion* completion) {
          OnFinishedByServer(*completion->status());
        });
    call_->Finish(completion->status(), completion);
  } else {
    // The only reason to finish would be to get the status; if the observer is
    // no longer interested, there is no need to do that.
    Shutdown();
  }
}

void GrpcStream::OnFinishedByServer(const grpc::Status& status) {
  FinishAndNotify(ConvertStatus(status));
}

void GrpcStream::RemoveCompletion(const GrpcCompletion* to_remove) {
  auto found = std::find(completions_.begin(), completions_.end(), to_remove);
  HARD_ASSERT(found != completions_.end(), "Missing GrpcCompletion");
  completions_.erase(found);
}

GrpcCompletion* GrpcStream::NewCompletion(Type tag,
                                          const OnSuccess& on_success) {
  // Can't move into lambda until C++14.
  GrpcCompletion::Callback decorated =
      [this, on_success](bool ok, const GrpcCompletion* completion) {
        RemoveCompletion(completion);

        if (ok) {
          on_success(completion);
        } else {
          // Use the same error-handling for all operations; all errors are
          // unrecoverable.
          OnOperationFailed();
        }
      };

  // For lifetime details, see `GrpcCompletion` class comment.
  auto* completion =
      new GrpcCompletion{tag, worker_queue_, std::move(decorated)};
  completions_.push_back(completion);
  return completion;
}

}  // namespace remote
}  // namespace firestore
}  // namespace firebase
