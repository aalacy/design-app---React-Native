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

// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: google/firestore/v1beta1/query.proto

// This CPP symbol can be defined to use imports that match up to the framework
// imports needed when using CocoaPods.
#if !defined(GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS)
 #define GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS 0
#endif

#if GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS
 #import <Protobuf/GPBProtocolBuffers_RuntimeSupport.h>
#else
 #import "GPBProtocolBuffers_RuntimeSupport.h"
#endif

#if GPB_USE_PROTOBUF_FRAMEWORK_IMPORTS
 #import <Protobuf/Wrappers.pbobjc.h>
#else
 #import "Wrappers.pbobjc.h"
#endif

 #import "Query.pbobjc.h"
 #import "Annotations.pbobjc.h"
 #import "Document.pbobjc.h"
// @@protoc_insertion_point(imports)

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
#pragma clang diagnostic ignored "-Wdirect-ivar-access"

#pragma mark - GCFSQueryRoot

@implementation GCFSQueryRoot


@end

#pragma mark - GCFSQueryRoot_FileDescriptor

static GPBFileDescriptor *GCFSQueryRoot_FileDescriptor(void) {
  // This is called by +initialize so there is no need to worry
  // about thread safety of the singleton.
  static GPBFileDescriptor *descriptor = NULL;
  if (!descriptor) {
    GPB_DEBUG_CHECK_RUNTIME_VERSIONS();
    descriptor = [[GPBFileDescriptor alloc] initWithPackage:@"google.firestore.v1beta1"
                                                 objcPrefix:@"GCFS"
                                                     syntax:GPBFileSyntaxProto3];
  }
  return descriptor;
}

#pragma mark - GCFSStructuredQuery

@implementation GCFSStructuredQuery

@dynamic hasSelect, select;
@dynamic fromArray, fromArray_Count;
@dynamic hasWhere, where;
@dynamic orderByArray, orderByArray_Count;
@dynamic hasStartAt, startAt;
@dynamic hasEndAt, endAt;
@dynamic offset;
@dynamic hasLimit, limit;

typedef struct GCFSStructuredQuery__storage_ {
  uint32_t _has_storage_[1];
  int32_t offset;
  GCFSStructuredQuery_Projection *select;
  NSMutableArray *fromArray;
  GCFSStructuredQuery_Filter *where;
  NSMutableArray *orderByArray;
  GPBInt32Value *limit;
  GCFSCursor *startAt;
  GCFSCursor *endAt;
} GCFSStructuredQuery__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "select",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSStructuredQuery_Projection),
        .number = GCFSStructuredQuery_FieldNumber_Select,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery__storage_, select),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "fromArray",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSStructuredQuery_CollectionSelector),
        .number = GCFSStructuredQuery_FieldNumber_FromArray,
        .hasIndex = GPBNoHasBit,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery__storage_, fromArray),
        .flags = GPBFieldRepeated,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "where",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSStructuredQuery_Filter),
        .number = GCFSStructuredQuery_FieldNumber_Where,
        .hasIndex = 1,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery__storage_, where),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "orderByArray",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSStructuredQuery_Order),
        .number = GCFSStructuredQuery_FieldNumber_OrderByArray,
        .hasIndex = GPBNoHasBit,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery__storage_, orderByArray),
        .flags = GPBFieldRepeated,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "limit",
        .dataTypeSpecific.className = GPBStringifySymbol(GPBInt32Value),
        .number = GCFSStructuredQuery_FieldNumber_Limit,
        .hasIndex = 5,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery__storage_, limit),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "offset",
        .dataTypeSpecific.className = NULL,
        .number = GCFSStructuredQuery_FieldNumber_Offset,
        .hasIndex = 4,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery__storage_, offset),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeInt32,
      },
      {
        .name = "startAt",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSCursor),
        .number = GCFSStructuredQuery_FieldNumber_StartAt,
        .hasIndex = 2,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery__storage_, startAt),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "endAt",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSCursor),
        .number = GCFSStructuredQuery_FieldNumber_EndAt,
        .hasIndex = 3,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery__storage_, endAt),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[GCFSStructuredQuery class]
                                     rootClass:[GCFSQueryRoot class]
                                          file:GCFSQueryRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(GCFSStructuredQuery__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    NSAssert(descriptor == nil, @"Startup recursed!");
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma mark - Enum GCFSStructuredQuery_Direction

GPBEnumDescriptor *GCFSStructuredQuery_Direction_EnumDescriptor(void) {
  static GPBEnumDescriptor *descriptor = NULL;
  if (!descriptor) {
    static const char *valueNames =
        "DirectionUnspecified\000Ascending\000Descendin"
        "g\000";
    static const int32_t values[] = {
        GCFSStructuredQuery_Direction_DirectionUnspecified,
        GCFSStructuredQuery_Direction_Ascending,
        GCFSStructuredQuery_Direction_Descending,
    };
    GPBEnumDescriptor *worker =
        [GPBEnumDescriptor allocDescriptorForName:GPBNSStringifySymbol(GCFSStructuredQuery_Direction)
                                       valueNames:valueNames
                                           values:values
                                            count:(uint32_t)(sizeof(values) / sizeof(int32_t))
                                     enumVerifier:GCFSStructuredQuery_Direction_IsValidValue];
    if (!OSAtomicCompareAndSwapPtrBarrier(nil, worker, (void * volatile *)&descriptor)) {
      [worker release];
    }
  }
  return descriptor;
}

BOOL GCFSStructuredQuery_Direction_IsValidValue(int32_t value__) {
  switch (value__) {
    case GCFSStructuredQuery_Direction_DirectionUnspecified:
    case GCFSStructuredQuery_Direction_Ascending:
    case GCFSStructuredQuery_Direction_Descending:
      return YES;
    default:
      return NO;
  }
}

#pragma mark - GCFSStructuredQuery_CollectionSelector

@implementation GCFSStructuredQuery_CollectionSelector

@dynamic collectionId;
@dynamic allDescendants;

typedef struct GCFSStructuredQuery_CollectionSelector__storage_ {
  uint32_t _has_storage_[1];
  NSString *collectionId;
} GCFSStructuredQuery_CollectionSelector__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "collectionId",
        .dataTypeSpecific.className = NULL,
        .number = GCFSStructuredQuery_CollectionSelector_FieldNumber_CollectionId,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery_CollectionSelector__storage_, collectionId),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
      {
        .name = "allDescendants",
        .dataTypeSpecific.className = NULL,
        .number = GCFSStructuredQuery_CollectionSelector_FieldNumber_AllDescendants,
        .hasIndex = 1,
        .offset = 2,  // Stored in _has_storage_ to save space.
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeBool,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[GCFSStructuredQuery_CollectionSelector class]
                                     rootClass:[GCFSQueryRoot class]
                                          file:GCFSQueryRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(GCFSStructuredQuery_CollectionSelector__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    [localDescriptor setupContainingMessageClassName:GPBStringifySymbol(GCFSStructuredQuery)];
    NSAssert(descriptor == nil, @"Startup recursed!");
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma mark - GCFSStructuredQuery_Filter

@implementation GCFSStructuredQuery_Filter

@dynamic filterTypeOneOfCase;
@dynamic compositeFilter;
@dynamic fieldFilter;
@dynamic unaryFilter;

typedef struct GCFSStructuredQuery_Filter__storage_ {
  uint32_t _has_storage_[2];
  GCFSStructuredQuery_CompositeFilter *compositeFilter;
  GCFSStructuredQuery_FieldFilter *fieldFilter;
  GCFSStructuredQuery_UnaryFilter *unaryFilter;
} GCFSStructuredQuery_Filter__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "compositeFilter",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSStructuredQuery_CompositeFilter),
        .number = GCFSStructuredQuery_Filter_FieldNumber_CompositeFilter,
        .hasIndex = -1,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery_Filter__storage_, compositeFilter),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "fieldFilter",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSStructuredQuery_FieldFilter),
        .number = GCFSStructuredQuery_Filter_FieldNumber_FieldFilter,
        .hasIndex = -1,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery_Filter__storage_, fieldFilter),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "unaryFilter",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSStructuredQuery_UnaryFilter),
        .number = GCFSStructuredQuery_Filter_FieldNumber_UnaryFilter,
        .hasIndex = -1,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery_Filter__storage_, unaryFilter),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[GCFSStructuredQuery_Filter class]
                                     rootClass:[GCFSQueryRoot class]
                                          file:GCFSQueryRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(GCFSStructuredQuery_Filter__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    static const char *oneofs[] = {
      "filterType",
    };
    [localDescriptor setupOneofs:oneofs
                           count:(uint32_t)(sizeof(oneofs) / sizeof(char*))
                   firstHasIndex:-1];
    [localDescriptor setupContainingMessageClassName:GPBStringifySymbol(GCFSStructuredQuery)];
    NSAssert(descriptor == nil, @"Startup recursed!");
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

void GCFSStructuredQuery_Filter_ClearFilterTypeOneOfCase(GCFSStructuredQuery_Filter *message) {
  GPBDescriptor *descriptor = [message descriptor];
  GPBOneofDescriptor *oneof = [descriptor.oneofs objectAtIndex:0];
  GPBMaybeClearOneof(message, oneof, -1, 0);
}
#pragma mark - GCFSStructuredQuery_CompositeFilter

@implementation GCFSStructuredQuery_CompositeFilter

@dynamic op;
@dynamic filtersArray, filtersArray_Count;

typedef struct GCFSStructuredQuery_CompositeFilter__storage_ {
  uint32_t _has_storage_[1];
  GCFSStructuredQuery_CompositeFilter_Operator op;
  NSMutableArray *filtersArray;
} GCFSStructuredQuery_CompositeFilter__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "op",
        .dataTypeSpecific.enumDescFunc = GCFSStructuredQuery_CompositeFilter_Operator_EnumDescriptor,
        .number = GCFSStructuredQuery_CompositeFilter_FieldNumber_Op,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery_CompositeFilter__storage_, op),
        .flags = (GPBFieldFlags)(GPBFieldOptional | GPBFieldHasEnumDescriptor),
        .dataType = GPBDataTypeEnum,
      },
      {
        .name = "filtersArray",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSStructuredQuery_Filter),
        .number = GCFSStructuredQuery_CompositeFilter_FieldNumber_FiltersArray,
        .hasIndex = GPBNoHasBit,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery_CompositeFilter__storage_, filtersArray),
        .flags = GPBFieldRepeated,
        .dataType = GPBDataTypeMessage,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[GCFSStructuredQuery_CompositeFilter class]
                                     rootClass:[GCFSQueryRoot class]
                                          file:GCFSQueryRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(GCFSStructuredQuery_CompositeFilter__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    [localDescriptor setupContainingMessageClassName:GPBStringifySymbol(GCFSStructuredQuery)];
    NSAssert(descriptor == nil, @"Startup recursed!");
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

int32_t GCFSStructuredQuery_CompositeFilter_Op_RawValue(GCFSStructuredQuery_CompositeFilter *message) {
  GPBDescriptor *descriptor = [GCFSStructuredQuery_CompositeFilter descriptor];
  GPBFieldDescriptor *field = [descriptor fieldWithNumber:GCFSStructuredQuery_CompositeFilter_FieldNumber_Op];
  return GPBGetMessageInt32Field(message, field);
}

void SetGCFSStructuredQuery_CompositeFilter_Op_RawValue(GCFSStructuredQuery_CompositeFilter *message, int32_t value) {
  GPBDescriptor *descriptor = [GCFSStructuredQuery_CompositeFilter descriptor];
  GPBFieldDescriptor *field = [descriptor fieldWithNumber:GCFSStructuredQuery_CompositeFilter_FieldNumber_Op];
  GPBSetInt32IvarWithFieldInternal(message, field, value, descriptor.file.syntax);
}

#pragma mark - Enum GCFSStructuredQuery_CompositeFilter_Operator

GPBEnumDescriptor *GCFSStructuredQuery_CompositeFilter_Operator_EnumDescriptor(void) {
  static GPBEnumDescriptor *descriptor = NULL;
  if (!descriptor) {
    static const char *valueNames =
        "OperatorUnspecified\000And\000";
    static const int32_t values[] = {
        GCFSStructuredQuery_CompositeFilter_Operator_OperatorUnspecified,
        GCFSStructuredQuery_CompositeFilter_Operator_And,
    };
    GPBEnumDescriptor *worker =
        [GPBEnumDescriptor allocDescriptorForName:GPBNSStringifySymbol(GCFSStructuredQuery_CompositeFilter_Operator)
                                       valueNames:valueNames
                                           values:values
                                            count:(uint32_t)(sizeof(values) / sizeof(int32_t))
                                     enumVerifier:GCFSStructuredQuery_CompositeFilter_Operator_IsValidValue];
    if (!OSAtomicCompareAndSwapPtrBarrier(nil, worker, (void * volatile *)&descriptor)) {
      [worker release];
    }
  }
  return descriptor;
}

BOOL GCFSStructuredQuery_CompositeFilter_Operator_IsValidValue(int32_t value__) {
  switch (value__) {
    case GCFSStructuredQuery_CompositeFilter_Operator_OperatorUnspecified:
    case GCFSStructuredQuery_CompositeFilter_Operator_And:
      return YES;
    default:
      return NO;
  }
}

#pragma mark - GCFSStructuredQuery_FieldFilter

@implementation GCFSStructuredQuery_FieldFilter

@dynamic hasField, field;
@dynamic op;
@dynamic hasValue, value;

typedef struct GCFSStructuredQuery_FieldFilter__storage_ {
  uint32_t _has_storage_[1];
  GCFSStructuredQuery_FieldFilter_Operator op;
  GCFSStructuredQuery_FieldReference *field;
  GCFSValue *value;
} GCFSStructuredQuery_FieldFilter__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "field",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSStructuredQuery_FieldReference),
        .number = GCFSStructuredQuery_FieldFilter_FieldNumber_Field,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery_FieldFilter__storage_, field),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "op",
        .dataTypeSpecific.enumDescFunc = GCFSStructuredQuery_FieldFilter_Operator_EnumDescriptor,
        .number = GCFSStructuredQuery_FieldFilter_FieldNumber_Op,
        .hasIndex = 1,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery_FieldFilter__storage_, op),
        .flags = (GPBFieldFlags)(GPBFieldOptional | GPBFieldHasEnumDescriptor),
        .dataType = GPBDataTypeEnum,
      },
      {
        .name = "value",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSValue),
        .number = GCFSStructuredQuery_FieldFilter_FieldNumber_Value,
        .hasIndex = 2,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery_FieldFilter__storage_, value),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[GCFSStructuredQuery_FieldFilter class]
                                     rootClass:[GCFSQueryRoot class]
                                          file:GCFSQueryRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(GCFSStructuredQuery_FieldFilter__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    [localDescriptor setupContainingMessageClassName:GPBStringifySymbol(GCFSStructuredQuery)];
    NSAssert(descriptor == nil, @"Startup recursed!");
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

int32_t GCFSStructuredQuery_FieldFilter_Op_RawValue(GCFSStructuredQuery_FieldFilter *message) {
  GPBDescriptor *descriptor = [GCFSStructuredQuery_FieldFilter descriptor];
  GPBFieldDescriptor *field = [descriptor fieldWithNumber:GCFSStructuredQuery_FieldFilter_FieldNumber_Op];
  return GPBGetMessageInt32Field(message, field);
}

void SetGCFSStructuredQuery_FieldFilter_Op_RawValue(GCFSStructuredQuery_FieldFilter *message, int32_t value) {
  GPBDescriptor *descriptor = [GCFSStructuredQuery_FieldFilter descriptor];
  GPBFieldDescriptor *field = [descriptor fieldWithNumber:GCFSStructuredQuery_FieldFilter_FieldNumber_Op];
  GPBSetInt32IvarWithFieldInternal(message, field, value, descriptor.file.syntax);
}

#pragma mark - Enum GCFSStructuredQuery_FieldFilter_Operator

GPBEnumDescriptor *GCFSStructuredQuery_FieldFilter_Operator_EnumDescriptor(void) {
  static GPBEnumDescriptor *descriptor = NULL;
  if (!descriptor) {
    static const char *valueNames =
        "OperatorUnspecified\000LessThan\000LessThanOrE"
        "qual\000GreaterThan\000GreaterThanOrEqual\000Equa"
        "l\000ArrayContains\000";
    static const int32_t values[] = {
        GCFSStructuredQuery_FieldFilter_Operator_OperatorUnspecified,
        GCFSStructuredQuery_FieldFilter_Operator_LessThan,
        GCFSStructuredQuery_FieldFilter_Operator_LessThanOrEqual,
        GCFSStructuredQuery_FieldFilter_Operator_GreaterThan,
        GCFSStructuredQuery_FieldFilter_Operator_GreaterThanOrEqual,
        GCFSStructuredQuery_FieldFilter_Operator_Equal,
        GCFSStructuredQuery_FieldFilter_Operator_ArrayContains,
    };
    GPBEnumDescriptor *worker =
        [GPBEnumDescriptor allocDescriptorForName:GPBNSStringifySymbol(GCFSStructuredQuery_FieldFilter_Operator)
                                       valueNames:valueNames
                                           values:values
                                            count:(uint32_t)(sizeof(values) / sizeof(int32_t))
                                     enumVerifier:GCFSStructuredQuery_FieldFilter_Operator_IsValidValue];
    if (!OSAtomicCompareAndSwapPtrBarrier(nil, worker, (void * volatile *)&descriptor)) {
      [worker release];
    }
  }
  return descriptor;
}

BOOL GCFSStructuredQuery_FieldFilter_Operator_IsValidValue(int32_t value__) {
  switch (value__) {
    case GCFSStructuredQuery_FieldFilter_Operator_OperatorUnspecified:
    case GCFSStructuredQuery_FieldFilter_Operator_LessThan:
    case GCFSStructuredQuery_FieldFilter_Operator_LessThanOrEqual:
    case GCFSStructuredQuery_FieldFilter_Operator_GreaterThan:
    case GCFSStructuredQuery_FieldFilter_Operator_GreaterThanOrEqual:
    case GCFSStructuredQuery_FieldFilter_Operator_Equal:
    case GCFSStructuredQuery_FieldFilter_Operator_ArrayContains:
      return YES;
    default:
      return NO;
  }
}

#pragma mark - GCFSStructuredQuery_UnaryFilter

@implementation GCFSStructuredQuery_UnaryFilter

@dynamic operandTypeOneOfCase;
@dynamic op;
@dynamic field;

typedef struct GCFSStructuredQuery_UnaryFilter__storage_ {
  uint32_t _has_storage_[2];
  GCFSStructuredQuery_UnaryFilter_Operator op;
  GCFSStructuredQuery_FieldReference *field;
} GCFSStructuredQuery_UnaryFilter__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "op",
        .dataTypeSpecific.enumDescFunc = GCFSStructuredQuery_UnaryFilter_Operator_EnumDescriptor,
        .number = GCFSStructuredQuery_UnaryFilter_FieldNumber_Op,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery_UnaryFilter__storage_, op),
        .flags = (GPBFieldFlags)(GPBFieldOptional | GPBFieldHasEnumDescriptor),
        .dataType = GPBDataTypeEnum,
      },
      {
        .name = "field",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSStructuredQuery_FieldReference),
        .number = GCFSStructuredQuery_UnaryFilter_FieldNumber_Field,
        .hasIndex = -1,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery_UnaryFilter__storage_, field),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[GCFSStructuredQuery_UnaryFilter class]
                                     rootClass:[GCFSQueryRoot class]
                                          file:GCFSQueryRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(GCFSStructuredQuery_UnaryFilter__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    static const char *oneofs[] = {
      "operandType",
    };
    [localDescriptor setupOneofs:oneofs
                           count:(uint32_t)(sizeof(oneofs) / sizeof(char*))
                   firstHasIndex:-1];
    [localDescriptor setupContainingMessageClassName:GPBStringifySymbol(GCFSStructuredQuery)];
    NSAssert(descriptor == nil, @"Startup recursed!");
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

int32_t GCFSStructuredQuery_UnaryFilter_Op_RawValue(GCFSStructuredQuery_UnaryFilter *message) {
  GPBDescriptor *descriptor = [GCFSStructuredQuery_UnaryFilter descriptor];
  GPBFieldDescriptor *field = [descriptor fieldWithNumber:GCFSStructuredQuery_UnaryFilter_FieldNumber_Op];
  return GPBGetMessageInt32Field(message, field);
}

void SetGCFSStructuredQuery_UnaryFilter_Op_RawValue(GCFSStructuredQuery_UnaryFilter *message, int32_t value) {
  GPBDescriptor *descriptor = [GCFSStructuredQuery_UnaryFilter descriptor];
  GPBFieldDescriptor *field = [descriptor fieldWithNumber:GCFSStructuredQuery_UnaryFilter_FieldNumber_Op];
  GPBSetInt32IvarWithFieldInternal(message, field, value, descriptor.file.syntax);
}

void GCFSStructuredQuery_UnaryFilter_ClearOperandTypeOneOfCase(GCFSStructuredQuery_UnaryFilter *message) {
  GPBDescriptor *descriptor = [message descriptor];
  GPBOneofDescriptor *oneof = [descriptor.oneofs objectAtIndex:0];
  GPBMaybeClearOneof(message, oneof, -1, 0);
}
#pragma mark - Enum GCFSStructuredQuery_UnaryFilter_Operator

GPBEnumDescriptor *GCFSStructuredQuery_UnaryFilter_Operator_EnumDescriptor(void) {
  static GPBEnumDescriptor *descriptor = NULL;
  if (!descriptor) {
    static const char *valueNames =
        "OperatorUnspecified\000IsNan\000IsNull\000";
    static const int32_t values[] = {
        GCFSStructuredQuery_UnaryFilter_Operator_OperatorUnspecified,
        GCFSStructuredQuery_UnaryFilter_Operator_IsNan,
        GCFSStructuredQuery_UnaryFilter_Operator_IsNull,
    };
    GPBEnumDescriptor *worker =
        [GPBEnumDescriptor allocDescriptorForName:GPBNSStringifySymbol(GCFSStructuredQuery_UnaryFilter_Operator)
                                       valueNames:valueNames
                                           values:values
                                            count:(uint32_t)(sizeof(values) / sizeof(int32_t))
                                     enumVerifier:GCFSStructuredQuery_UnaryFilter_Operator_IsValidValue];
    if (!OSAtomicCompareAndSwapPtrBarrier(nil, worker, (void * volatile *)&descriptor)) {
      [worker release];
    }
  }
  return descriptor;
}

BOOL GCFSStructuredQuery_UnaryFilter_Operator_IsValidValue(int32_t value__) {
  switch (value__) {
    case GCFSStructuredQuery_UnaryFilter_Operator_OperatorUnspecified:
    case GCFSStructuredQuery_UnaryFilter_Operator_IsNan:
    case GCFSStructuredQuery_UnaryFilter_Operator_IsNull:
      return YES;
    default:
      return NO;
  }
}

#pragma mark - GCFSStructuredQuery_Order

@implementation GCFSStructuredQuery_Order

@dynamic hasField, field;
@dynamic direction;

typedef struct GCFSStructuredQuery_Order__storage_ {
  uint32_t _has_storage_[1];
  GCFSStructuredQuery_Direction direction;
  GCFSStructuredQuery_FieldReference *field;
} GCFSStructuredQuery_Order__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "field",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSStructuredQuery_FieldReference),
        .number = GCFSStructuredQuery_Order_FieldNumber_Field,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery_Order__storage_, field),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "direction",
        .dataTypeSpecific.enumDescFunc = GCFSStructuredQuery_Direction_EnumDescriptor,
        .number = GCFSStructuredQuery_Order_FieldNumber_Direction,
        .hasIndex = 1,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery_Order__storage_, direction),
        .flags = (GPBFieldFlags)(GPBFieldOptional | GPBFieldHasEnumDescriptor),
        .dataType = GPBDataTypeEnum,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[GCFSStructuredQuery_Order class]
                                     rootClass:[GCFSQueryRoot class]
                                          file:GCFSQueryRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(GCFSStructuredQuery_Order__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    [localDescriptor setupContainingMessageClassName:GPBStringifySymbol(GCFSStructuredQuery)];
    NSAssert(descriptor == nil, @"Startup recursed!");
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

int32_t GCFSStructuredQuery_Order_Direction_RawValue(GCFSStructuredQuery_Order *message) {
  GPBDescriptor *descriptor = [GCFSStructuredQuery_Order descriptor];
  GPBFieldDescriptor *field = [descriptor fieldWithNumber:GCFSStructuredQuery_Order_FieldNumber_Direction];
  return GPBGetMessageInt32Field(message, field);
}

void SetGCFSStructuredQuery_Order_Direction_RawValue(GCFSStructuredQuery_Order *message, int32_t value) {
  GPBDescriptor *descriptor = [GCFSStructuredQuery_Order descriptor];
  GPBFieldDescriptor *field = [descriptor fieldWithNumber:GCFSStructuredQuery_Order_FieldNumber_Direction];
  GPBSetInt32IvarWithFieldInternal(message, field, value, descriptor.file.syntax);
}

#pragma mark - GCFSStructuredQuery_FieldReference

@implementation GCFSStructuredQuery_FieldReference

@dynamic fieldPath;

typedef struct GCFSStructuredQuery_FieldReference__storage_ {
  uint32_t _has_storage_[1];
  NSString *fieldPath;
} GCFSStructuredQuery_FieldReference__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "fieldPath",
        .dataTypeSpecific.className = NULL,
        .number = GCFSStructuredQuery_FieldReference_FieldNumber_FieldPath,
        .hasIndex = 0,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery_FieldReference__storage_, fieldPath),
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeString,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[GCFSStructuredQuery_FieldReference class]
                                     rootClass:[GCFSQueryRoot class]
                                          file:GCFSQueryRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(GCFSStructuredQuery_FieldReference__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    [localDescriptor setupContainingMessageClassName:GPBStringifySymbol(GCFSStructuredQuery)];
    NSAssert(descriptor == nil, @"Startup recursed!");
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma mark - GCFSStructuredQuery_Projection

@implementation GCFSStructuredQuery_Projection

@dynamic fieldsArray, fieldsArray_Count;

typedef struct GCFSStructuredQuery_Projection__storage_ {
  uint32_t _has_storage_[1];
  NSMutableArray *fieldsArray;
} GCFSStructuredQuery_Projection__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "fieldsArray",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSStructuredQuery_FieldReference),
        .number = GCFSStructuredQuery_Projection_FieldNumber_FieldsArray,
        .hasIndex = GPBNoHasBit,
        .offset = (uint32_t)offsetof(GCFSStructuredQuery_Projection__storage_, fieldsArray),
        .flags = GPBFieldRepeated,
        .dataType = GPBDataTypeMessage,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[GCFSStructuredQuery_Projection class]
                                     rootClass:[GCFSQueryRoot class]
                                          file:GCFSQueryRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(GCFSStructuredQuery_Projection__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    [localDescriptor setupContainingMessageClassName:GPBStringifySymbol(GCFSStructuredQuery)];
    NSAssert(descriptor == nil, @"Startup recursed!");
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end

#pragma mark - GCFSCursor

@implementation GCFSCursor

@dynamic valuesArray, valuesArray_Count;
@dynamic before;

typedef struct GCFSCursor__storage_ {
  uint32_t _has_storage_[1];
  NSMutableArray *valuesArray;
} GCFSCursor__storage_;

// This method is threadsafe because it is initially called
// in +initialize for each subclass.
+ (GPBDescriptor *)descriptor {
  static GPBDescriptor *descriptor = nil;
  if (!descriptor) {
    static GPBMessageFieldDescription fields[] = {
      {
        .name = "valuesArray",
        .dataTypeSpecific.className = GPBStringifySymbol(GCFSValue),
        .number = GCFSCursor_FieldNumber_ValuesArray,
        .hasIndex = GPBNoHasBit,
        .offset = (uint32_t)offsetof(GCFSCursor__storage_, valuesArray),
        .flags = GPBFieldRepeated,
        .dataType = GPBDataTypeMessage,
      },
      {
        .name = "before",
        .dataTypeSpecific.className = NULL,
        .number = GCFSCursor_FieldNumber_Before,
        .hasIndex = 0,
        .offset = 1,  // Stored in _has_storage_ to save space.
        .flags = GPBFieldOptional,
        .dataType = GPBDataTypeBool,
      },
    };
    GPBDescriptor *localDescriptor =
        [GPBDescriptor allocDescriptorForClass:[GCFSCursor class]
                                     rootClass:[GCFSQueryRoot class]
                                          file:GCFSQueryRoot_FileDescriptor()
                                        fields:fields
                                    fieldCount:(uint32_t)(sizeof(fields) / sizeof(GPBMessageFieldDescription))
                                   storageSize:sizeof(GCFSCursor__storage_)
                                         flags:GPBDescriptorInitializationFlag_None];
    NSAssert(descriptor == nil, @"Startup recursed!");
    descriptor = localDescriptor;
  }
  return descriptor;
}

@end


#pragma clang diagnostic pop

// @@protoc_insertion_point(global_scope)
