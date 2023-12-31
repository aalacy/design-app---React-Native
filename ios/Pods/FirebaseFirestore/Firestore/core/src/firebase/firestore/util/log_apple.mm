/*
 * Copyright 2017 Google
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

#include "Firestore/core/src/firebase/firestore/util/log.h"

#if defined(__APPLE__)

#import <FirebaseCore/FIRLogger.h>
#import <Foundation/Foundation.h>

#include <cstdarg>
#include <string>

#include "Firestore/core/src/firebase/firestore/util/string_apple.h"

namespace firebase {
namespace firestore {
namespace util {

namespace {

// Translates a C++ LogLevel to the equivalent Objective-C FIRLoggerLevel
FIRLoggerLevel ToFIRLoggerLevel(LogLevel level) {
  switch (level) {
    case kLogLevelDebug:
      return FIRLoggerLevelDebug;
    case kLogLevelWarning:
      return FIRLoggerLevelWarning;
    default:
      // Unsupported log level. FIRSetLoggerLevel will deal with it.
      return static_cast<FIRLoggerLevel>(-1);
  }
}

// Actually logs a message via FIRLogger. This must be a C varargs function
// so that we can call FIRLogBasic which takes a `va_list`.
void LogMessageV(LogLevel level, NSString* format, ...) {
  va_list list;
  va_start(list, format);

  FIRLogBasic(ToFIRLoggerLevel(level), kFIRLoggerFirestore, @"I-FST000001",
              format, list);

  va_end(list);
}

}  // namespace

void LogSetLevel(LogLevel level) {
  FIRSetLoggerLevel(ToFIRLoggerLevel(level));
}

bool LogIsLoggable(LogLevel level) {
  return FIRIsLoggableLevel(ToFIRLoggerLevel(level), NO);
}

void LogMessage(LogLevel level, const std::string& message) {
  LogMessageV(level, @"%s", message.c_str());
}

}  // namespace util
}  // namespace firestore
}  // namespace firebase

#endif  // defined(__APPLE__)
