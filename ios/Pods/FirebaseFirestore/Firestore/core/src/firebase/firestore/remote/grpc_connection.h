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

#ifndef FIRESTORE_CORE_SRC_FIREBASE_FIRESTORE_REMOTE_GRPC_CONNECTION_H_
#define FIRESTORE_CORE_SRC_FIREBASE_FIRESTORE_REMOTE_GRPC_CONNECTION_H_

#include <memory>
#include <string>
#include <vector>

#include "Firestore/core/src/firebase/firestore/auth/token.h"
#include "Firestore/core/src/firebase/firestore/core/database_info.h"
#include "Firestore/core/src/firebase/firestore/remote/connectivity_monitor.h"
#include "Firestore/core/src/firebase/firestore/remote/grpc_call.h"
#include "Firestore/core/src/firebase/firestore/remote/grpc_stream.h"
#include "Firestore/core/src/firebase/firestore/remote/grpc_stream_observer.h"
#include "Firestore/core/src/firebase/firestore/remote/grpc_streaming_reader.h"
#include "Firestore/core/src/firebase/firestore/remote/grpc_unary_call.h"
#include "absl/strings/string_view.h"
#include "grpcpp/channel.h"
#include "grpcpp/client_context.h"
#include "grpcpp/completion_queue.h"
#include "grpcpp/generic/generic_stub.h"

namespace firebase {
namespace firestore {
namespace remote {

// PORTING NOTE: this class has limited resemblance to `GrpcConnection` in Web
// client. However, unlike Web client, it's not meant to hide different
// implementations of a `Connection` under a single interface.

/**
 * Creates and owns gRPC objects (channel and stub) necessary to produce a
 * `GrpcStream`.
 */
class GrpcConnection {
 public:
  GrpcConnection(const core::DatabaseInfo& database_info,
                 util::AsyncQueue* worker_queue,
                 grpc::CompletionQueue* grpc_queue,
                 ConnectivityMonitor* connectivity_monitor);

  void Shutdown();

  /**
   * Creates a stream to the given stream RPC endpoint. The resulting stream
   * needs to be `Start`ed before it can be used.
   */
  // PORTING NOTE: unlike Web client, the created stream is not open and has to
  // be started manually.
  std::unique_ptr<GrpcStream> CreateStream(absl::string_view rpc_name,
                                           const auth::Token& token,
                                           GrpcStreamObserver* observer);

  std::unique_ptr<GrpcUnaryCall> CreateUnaryCall(
      absl::string_view rpc_name,
      const auth::Token& token,
      const grpc::ByteBuffer& message);

  std::unique_ptr<GrpcStreamingReader> CreateStreamingReader(
      absl::string_view rpc_name,
      const auth::Token& token,
      const grpc::ByteBuffer& message);

  void Register(GrpcCall* call);
  void Unregister(GrpcCall* call);

  /**
   * For tests only: use a custom root certificate file and the given SSL
   * target name for all connections. Call before creating any streams or calls.
   */
  static void UseTestCertificate(absl::string_view certificate_path,
                                 absl::string_view target_name);

  /**
   * For tests only: don't use SSL, send all traffic unencrypted. Call before
   * creating any streams or calls. Overrides a test certificate.
   */
  static void UseInsecureChannel();

 private:
  struct TestCredentials {
    std::string certificate_path;
    std::string target_name;
    bool use_insecure_channel = false;
  };
  static TestCredentials* test_credentials_;

  std::unique_ptr<grpc::ClientContext> CreateContext(
      const auth::Token& credential) const;
  std::shared_ptr<grpc::Channel> CreateChannel() const;
  void EnsureActiveStub();

  void RegisterConnectivityMonitor();

  const core::DatabaseInfo* database_info_ = nullptr;
  util::AsyncQueue* worker_queue_ = nullptr;
  grpc::CompletionQueue* grpc_queue_ = nullptr;

  std::shared_ptr<grpc::Channel> grpc_channel_;
  std::unique_ptr<grpc::GenericStub> grpc_stub_;

  ConnectivityMonitor* connectivity_monitor_ = nullptr;
  std::vector<GrpcCall*> active_calls_;
};

}  // namespace remote
}  // namespace firestore
}  // namespace firebase

#endif  // FIRESTORE_CORE_SRC_FIREBASE_FIRESTORE_REMOTE_GRPC_CONNECTION_H_
