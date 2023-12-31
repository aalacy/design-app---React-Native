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

#include "Firestore/core/src/firebase/firestore/auth/empty_credentials_provider.h"

namespace firebase {
namespace firestore {
namespace auth {

void EmptyCredentialsProvider::GetToken(TokenListener completion) {
  if (completion) {
    // Unauthenticated token will force the GRPC fallback to use default
    // settings.
    completion(Token::Unauthenticated());
  }
}

void EmptyCredentialsProvider::SetCredentialChangeListener(
    CredentialChangeListener changeListener) {
  if (changeListener) {
    changeListener(User::Unauthenticated());
  }
}

void EmptyCredentialsProvider::InvalidateToken() {
}

}  // namespace auth
}  // namespace firestore
}  // namespace firebase
