#
# Copyright 2017 The Abseil Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#


list(APPEND STRINGS_PUBLIC_HEADERS
  "ascii.h"
  "escaping.h"
  "match.h"
  "numbers.h"
  "str_cat.h"
  "string_view.h"
  "strip.h"
  "str_join.h"
  "str_replace.h"
  "str_split.h"
  "substitute.h"
)


list(APPEND STRINGS_INTERNAL_HEADERS
  "internal/char_map.h"
  "internal/memutil.h"
  "internal/ostringstream.h"
  "internal/resize_uninitialized.h"
  "internal/stl_type_traits.h"
  "internal/str_join_internal.h"
  "internal/str_split_internal.h"
  "internal/utf8.h"
)



# add string library
list(APPEND STRINGS_SRC
  "ascii.cc"
  "escaping.cc"
  "internal/memutil.cc"
  "internal/utf8.cc"
  "internal/ostringstream.cc"
  "match.cc"
  "numbers.cc"
  "str_cat.cc"
  "str_replace.cc"
  "str_split.cc"
  "string_view.cc"
  "substitute.cc"
  ${STRINGS_PUBLIC_HEADERS}
  ${STRINGS_INTERNAL_HEADERS}
)
set(STRINGS_PUBLIC_LIBRARIES absl::base absl_throw_delegate)

absl_library(
  TARGET
    absl_strings
  SOURCES
    ${STRINGS_SRC}
  PUBLIC_LIBRARIES
    ${STRINGS_PUBLIC_LIBRARIES}
  EXPORT_NAME
    strings
)


#
## TESTS
#

# test match_test
set(MATCH_TEST_SRC "match_test.cc")
set(MATCH_TEST_PUBLIC_LIBRARIES absl::strings)

absl_test(
  TARGET
    match_test
  SOURCES
    ${MATCH_TEST_SRC}
  PUBLIC_LIBRARIES
    ${MATCH_TEST_PUBLIC_LIBRARIES}
)


# test escaping_test
set(ESCAPING_TEST_SRC "escaping_test.cc")
set(ESCAPING_TEST_PUBLIC_LIBRARIES absl::strings absl::base)

absl_test(
  TARGET
    escaping_test
  SOURCES
    ${ESCAPING_TEST_SRC}
  PUBLIC_LIBRARIES
    ${ESCAPING_TEST_PUBLIC_LIBRARIES}
)


# test ascii_test
set(ASCII_TEST_SRC "ascii_test.cc")
set(ASCII_TEST_PUBLIC_LIBRARIES absl::strings)

absl_test(
  TARGET
    ascii_test
  SOURCES
    ${ASCII_TEST_SRC}
  PUBLIC_LIBRARIES
    ${ASCII_TEST_PUBLIC_LIBRARIES}
)


# test memutil_test
set(MEMUTIL_TEST_SRC "internal/memutil_test.cc")
set(MEMUTIL_TEST_PUBLIC_LIBRARIES absl::strings)

absl_test(
  TARGET
    memutil_test
  SOURCES
    ${MEMUTIL_TEST_SRC}
  PUBLIC_LIBRARIES
    ${MEMUTIL_TEST_PUBLIC_LIBRARIES}
)


# test utf8_test
set(UTF8_TEST_SRC "internal/utf8_test.cc")
set(UTF8_TEST_PUBLIC_LIBRARIES absl::strings absl::base)

absl_test(
  TARGET
    utf8_test
  SOURCES
    ${UTF8_TEST_SRC}
  PUBLIC_LIBRARIES
    ${UTF8_TEST_PUBLIC_LIBRARIES}
)


# test string_view_test
set(STRING_VIEW_TEST_SRC "string_view_test.cc")
set(STRING_VIEW_TEST_PUBLIC_LIBRARIES absl::strings absl_throw_delegate absl::base)

absl_test(
  TARGET
    string_view_test
  SOURCES
    ${STRING_VIEW_TEST_SRC}
  PUBLIC_LIBRARIES
    ${STRING_VIEW_TEST_PUBLIC_LIBRARIES}
)


# test substitute_test
set(SUBSTITUTE_TEST_SRC "substitute_test.cc")
set(SUBSTITUTE_TEST_PUBLIC_LIBRARIES absl::strings absl::base)

absl_test(
  TARGET
    substitute_test
  SOURCES
    ${SUBSTITUTE_TEST_SRC}
  PUBLIC_LIBRARIES
    ${SUBSTITUTE_TEST_PUBLIC_LIBRARIES}
)


# test str_replace_test
set(STR_REPLACE_TEST_SRC "str_replace_test.cc")
set(STR_REPLACE_TEST_PUBLIC_LIBRARIES absl::strings absl::base absl_throw_delegate)

absl_test(
  TARGET
    str_replace_test
  SOURCES
    ${STR_REPLACE_TEST_SRC}
  PUBLIC_LIBRARIES
    ${STR_REPLACE_TEST_PUBLIC_LIBRARIES}
)


# test str_split_test
set(STR_SPLIT_TEST_SRC "str_split_test.cc")
set(STR_SPLIT_TEST_PUBLIC_LIBRARIES absl::strings absl::base absl_throw_delegate)

absl_test(
  TARGET
    str_split_test
  SOURCES
    ${STR_SPLIT_TEST_SRC}
  PUBLIC_LIBRARIES
    ${STR_SPLIT_TEST_PUBLIC_LIBRARIES}
)


# test ostringstream_test
set(OSTRINGSTREAM_TEST_SRC "internal/ostringstream_test.cc")
set(OSTRINGSTREAM_TEST_PUBLIC_LIBRARIES absl::strings)

absl_test(
  TARGET
    ostringstream_test
  SOURCES
    ${OSTRINGSTREAM_TEST_SRC}
  PUBLIC_LIBRARIES
    ${OSTRINGSTREAM_TEST_PUBLIC_LIBRARIES}
)


# test resize_uninitialized_test
set(RESIZE_UNINITIALIZED_TEST_SRC "internal/resize_uninitialized_test.cc")

absl_test(
  TARGET
    resize_uninitialized_test
  SOURCES
    ${RESIZE_UNINITIALIZED_TEST_SRC}
)


# test str_join_test
set(STR_JOIN_TEST_SRC "str_join_test.cc")
set(STR_JOIN_TEST_PUBLIC_LIBRARIES absl::strings)

absl_test(
  TARGET
    str_join_test
  SOURCES
    ${STR_JOIN_TEST_SRC}
  PUBLIC_LIBRARIES
    ${STR_JOIN_TEST_PUBLIC_LIBRARIES}
)


# test str_cat_test
set(STR_CAT_TEST_SRC "str_cat_test.cc")
set(STR_CAT_TEST_PUBLIC_LIBRARIES absl::strings)

absl_test(
  TARGET
    str_cat_test
  SOURCES
    ${STR_CAT_TEST_SRC}
  PUBLIC_LIBRARIES
    ${STR_CAT_TEST_PUBLIC_LIBRARIES}
)


# test numbers_test
set(NUMBERS_TEST_SRC "numbers_test.cc")
set(NUMBERS_TEST_PUBLIC_LIBRARIES absl::strings)

absl_test(
  TARGET
    numbers_test
  SOURCES
    ${NUMBERS_TEST_SRC}
  PUBLIC_LIBRARIES
    ${NUMBERS_TEST_PUBLIC_LIBRARIES}
)


# test strip_test
set(STRIP_TEST_SRC "strip_test.cc")
set(STRIP_TEST_PUBLIC_LIBRARIES absl::strings)

absl_test(
  TARGET
    strip_test
  SOURCES
    ${STRIP_TEST_SRC}
  PUBLIC_LIBRARIES
    ${STRIP_TEST_PUBLIC_LIBRARIES}
)


# test char_map_test
set(CHAR_MAP_TEST_SRC "internal/char_map_test.cc")
set(CHAR_MAP_TEST_PUBLIC_LIBRARIES absl::strings)

absl_test(
  TARGET
    char_map_test
  SOURCES
    ${CHAR_MAP_TEST_SRC}
  PUBLIC_LIBRARIES
    ${CHAR_MAP_TEST_PUBLIC_LIBRARIES}
)




