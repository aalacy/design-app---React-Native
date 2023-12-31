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

#import <Foundation/Foundation.h>

#import "Firestore/Source/Local/FSTQueryCache.h"

NS_ASSUME_NONNULL_BEGIN

@class FSTLocalSerializer;
@class FSTMemoryPersistence;

/**
 * An implementation of the FSTQueryCache protocol that merely keeps queries in memory, suitable
 * for online only clients with persistence disabled.
 */
@interface FSTMemoryQueryCache : NSObject <FSTQueryCache>

- (instancetype)initWithPersistence:(FSTMemoryPersistence *)persistence NS_DESIGNATED_INITIALIZER;

- (instancetype)init NS_UNAVAILABLE;

- (size_t)byteSizeWithSerializer:(FSTLocalSerializer *)serializer;

@end

NS_ASSUME_NONNULL_END
