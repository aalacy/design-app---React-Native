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

#import <Foundation/Foundation.h>

#import "Firestore/Source/Local/FSTQueryData.h"
#include "Firestore/core/src/firebase/firestore/model/document_key.h"
#include "Firestore/core/src/firebase/firestore/model/types.h"

@protocol FSTQueryCache;

@class FSTLRUGarbageCollector;

extern const firebase::firestore::model::ListenSequenceNumber kFSTListenSequenceNumberInvalid;

/**
 * Persistence layers intending to use LRU Garbage collection should implement this protocol. This
 * protocol defines the operations that the LRU garbage collector needs from the persistence layer.
 */
@protocol FSTLRUDelegate

/**
 * Enumerates all the targets that the delegate is aware of. This is typically all of the targets in
 * an FSTQueryCache.
 */
- (void)enumerateTargetsUsingBlock:(void (^)(FSTQueryData *queryData, BOOL *stop))block;

/**
 * Enumerates all of the outstanding mutations.
 */
- (void)enumerateMutationsUsingBlock:
    (void (^)(const firebase::firestore::model::DocumentKey &key,
              firebase::firestore::model::ListenSequenceNumber sequenceNumber,
              BOOL *stop))block;

/**
 * Removes all unreferenced documents from the cache that have a sequence number less than or equal
 * to the given sequence number. Returns the number of documents removed.
 */
- (int)removeOrphanedDocumentsThroughSequenceNumber:
    (firebase::firestore::model::ListenSequenceNumber)sequenceNumber;

/**
 * Removes all targets that are not currently being listened to and have a sequence number less than
 * or equal to the given sequence number. Returns the number of targets removed.
 */
- (int)removeTargetsThroughSequenceNumber:
           (firebase::firestore::model::ListenSequenceNumber)sequenceNumber
                              liveQueries:(NSDictionary<NSNumber *, FSTQueryData *> *)liveQueries;

- (size_t)byteSize;

/** Access to the underlying LRU Garbage collector instance. */
@property(strong, nonatomic, readonly) FSTLRUGarbageCollector *gc;

@end

/**
 * FSTLRUGarbageCollector defines the LRU algorithm used to clean up old documents and targets. It
 * is persistence-agnostic, as long as proper delegate is provided.
 */
@interface FSTLRUGarbageCollector : NSObject

- (instancetype)initWithQueryCache:(id<FSTQueryCache>)queryCache
                          delegate:(id<FSTLRUDelegate>)delegate;

/**
 * Given a target percentile, return the number of queries that make up that percentage of the
 * queries that are cached. For instance, if 20 queries are cached, and the percentile is 40, the
 * result will be 8.
 */
- (int)queryCountForPercentile:(NSUInteger)percentile;

/**
 * Given a number of queries n, return the nth sequence number in the cache.
 */
- (firebase::firestore::model::ListenSequenceNumber)sequenceNumberForQueryCount:
    (NSUInteger)queryCount;

/**
 * Removes queries that are not currently live (as indicated by presence in the liveQueries map) and
 * have a sequence number less than or equal to the given sequence number.
 */
- (int)removeQueriesUpThroughSequenceNumber:
           (firebase::firestore::model::ListenSequenceNumber)sequenceNumber
                                liveQueries:(NSDictionary<NSNumber *, FSTQueryData *> *)liveQueries;

/**
 * Removes all unreferenced documents from the cache that have a sequence number less than or equal
 * to the given sequence number. Returns the number of documents removed.
 */
- (int)removeOrphanedDocumentsThroughSequenceNumber:
    (firebase::firestore::model::ListenSequenceNumber)sequenceNumber;

- (size_t)byteSize;

@end
