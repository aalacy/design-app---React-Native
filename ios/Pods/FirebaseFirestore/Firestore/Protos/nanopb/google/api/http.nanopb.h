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

/* Automatically generated nanopb header */
/* Generated by nanopb-0.3.9.1 */

#ifndef PB_GOOGLE_API_HTTP_NANOPB_H_INCLUDED
#define PB_GOOGLE_API_HTTP_NANOPB_H_INCLUDED
#include <pb.h>

/* @@protoc_insertion_point(includes) */
#if PB_PROTO_HEADER_VERSION != 30
#error Regenerate this file with the current version of nanopb generator.
#endif

#ifdef __cplusplus
extern "C" {
#endif

/* Struct definitions */
typedef struct _google_api_CustomHttpPattern {
    pb_bytes_array_t *kind;
    pb_bytes_array_t *path;
/* @@protoc_insertion_point(struct:google_api_CustomHttpPattern) */
} google_api_CustomHttpPattern;

typedef struct _google_api_Http {
    pb_size_t rules_count;
    struct _google_api_HttpRule *rules;
    bool fully_decode_reserved_expansion;
/* @@protoc_insertion_point(struct:google_api_Http) */
} google_api_Http;

typedef struct _google_api_HttpRule {
    pb_bytes_array_t *selector;
    pb_size_t which_pattern;
    union {
        pb_bytes_array_t *get;
        pb_bytes_array_t *put;
        pb_bytes_array_t *post;
        pb_bytes_array_t *delete_;
        pb_bytes_array_t *patch;
        google_api_CustomHttpPattern custom;
    };
    pb_bytes_array_t *body;
    pb_size_t additional_bindings_count;
    struct _google_api_HttpRule *additional_bindings;
/* @@protoc_insertion_point(struct:google_api_HttpRule) */
} google_api_HttpRule;

/* Default values for struct fields */

/* Initializer values for message structs */
#define google_api_Http_init_default             {0, NULL, 0}
#define google_api_HttpRule_init_default         {NULL, 0, {NULL}, NULL, 0, NULL}
#define google_api_CustomHttpPattern_init_default {NULL, NULL}
#define google_api_Http_init_zero                {0, NULL, 0}
#define google_api_HttpRule_init_zero            {NULL, 0, {NULL}, NULL, 0, NULL}
#define google_api_CustomHttpPattern_init_zero   {NULL, NULL}

/* Field tags (for use in manual encoding/decoding) */
#define google_api_CustomHttpPattern_kind_tag    1
#define google_api_CustomHttpPattern_path_tag    2
#define google_api_Http_rules_tag                1
#define google_api_Http_fully_decode_reserved_expansion_tag 2
#define google_api_HttpRule_get_tag              2
#define google_api_HttpRule_put_tag              3
#define google_api_HttpRule_post_tag             4
#define google_api_HttpRule_delete_tag           5
#define google_api_HttpRule_patch_tag            6
#define google_api_HttpRule_custom_tag           8
#define google_api_HttpRule_selector_tag         1
#define google_api_HttpRule_body_tag             7
#define google_api_HttpRule_additional_bindings_tag 11

/* Struct field encoding specification for nanopb */
extern const pb_field_t google_api_Http_fields[3];
extern const pb_field_t google_api_HttpRule_fields[10];
extern const pb_field_t google_api_CustomHttpPattern_fields[3];

/* Maximum encoded size of messages (where known) */
/* google_api_Http_size depends on runtime parameters */
/* google_api_HttpRule_size depends on runtime parameters */
/* google_api_CustomHttpPattern_size depends on runtime parameters */

/* Message IDs (where set with "msgid" option) */
#ifdef PB_MSGID

#define HTTP_MESSAGES \


#endif

#ifdef __cplusplus
} /* extern "C" */
#endif
/* @@protoc_insertion_point(eof) */

#endif
