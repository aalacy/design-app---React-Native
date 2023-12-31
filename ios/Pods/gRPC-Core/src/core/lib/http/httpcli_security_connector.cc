/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

#include <grpc/support/port_platform.h>

#include "src/core/lib/http/httpcli.h"

#include <string.h>

#include <grpc/support/alloc.h>
#include <grpc/support/log.h>
#include <grpc/support/string_util.h>

#include "src/core/lib/channel/channel_args.h"
#include "src/core/lib/channel/handshaker_registry.h"
#include "src/core/lib/gpr/string.h"
#include "src/core/lib/security/transport/security_handshaker.h"
#include "src/core/lib/slice/slice_internal.h"
#include "src/core/tsi/ssl_transport_security.h"

typedef struct {
  grpc_channel_security_connector base;
  tsi_ssl_client_handshaker_factory* handshaker_factory;
  char* secure_peer_name;
} grpc_httpcli_ssl_channel_security_connector;

static void httpcli_ssl_destroy(grpc_security_connector* sc) {
  grpc_httpcli_ssl_channel_security_connector* c =
      reinterpret_cast<grpc_httpcli_ssl_channel_security_connector*>(sc);
  if (c->handshaker_factory != nullptr) {
    tsi_ssl_client_handshaker_factory_unref(c->handshaker_factory);
    c->handshaker_factory = nullptr;
  }
  if (c->secure_peer_name != nullptr) gpr_free(c->secure_peer_name);
  gpr_free(sc);
}

static void httpcli_ssl_add_handshakers(grpc_channel_security_connector* sc,
                                        grpc_handshake_manager* handshake_mgr) {
  grpc_httpcli_ssl_channel_security_connector* c =
      reinterpret_cast<grpc_httpcli_ssl_channel_security_connector*>(sc);
  tsi_handshaker* handshaker = nullptr;
  if (c->handshaker_factory != nullptr) {
    tsi_result result = tsi_ssl_client_handshaker_factory_create_handshaker(
        c->handshaker_factory, c->secure_peer_name, &handshaker);
    if (result != TSI_OK) {
      gpr_log(GPR_ERROR, "Handshaker creation failed with error %s.",
              tsi_result_to_string(result));
    }
  }
  grpc_handshake_manager_add(
      handshake_mgr, grpc_security_handshaker_create(handshaker, &sc->base));
}

static void httpcli_ssl_check_peer(grpc_security_connector* sc, tsi_peer peer,
                                   grpc_auth_context** auth_context,
                                   grpc_closure* on_peer_checked) {
  grpc_httpcli_ssl_channel_security_connector* c =
      reinterpret_cast<grpc_httpcli_ssl_channel_security_connector*>(sc);
  grpc_error* error = GRPC_ERROR_NONE;

  /* Check the peer name. */
  if (c->secure_peer_name != nullptr &&
      !tsi_ssl_peer_matches_name(&peer, c->secure_peer_name)) {
    char* msg;
    gpr_asprintf(&msg, "Peer name %s is not in peer certificate",
                 c->secure_peer_name);
    error = GRPC_ERROR_CREATE_FROM_COPIED_STRING(msg);
    gpr_free(msg);
  }
  GRPC_CLOSURE_SCHED(on_peer_checked, error);
  tsi_peer_destruct(&peer);
}

static int httpcli_ssl_cmp(grpc_security_connector* sc1,
                           grpc_security_connector* sc2) {
  grpc_httpcli_ssl_channel_security_connector* c1 =
      reinterpret_cast<grpc_httpcli_ssl_channel_security_connector*>(sc1);
  grpc_httpcli_ssl_channel_security_connector* c2 =
      reinterpret_cast<grpc_httpcli_ssl_channel_security_connector*>(sc2);
  return strcmp(c1->secure_peer_name, c2->secure_peer_name);
}

static grpc_security_connector_vtable httpcli_ssl_vtable = {
    httpcli_ssl_destroy, httpcli_ssl_check_peer, httpcli_ssl_cmp};

static grpc_security_status httpcli_ssl_channel_security_connector_create(
    const char* pem_root_certs, const tsi_ssl_root_certs_store* root_store,
    const char* secure_peer_name, grpc_channel_security_connector** sc) {
  tsi_result result = TSI_OK;
  grpc_httpcli_ssl_channel_security_connector* c;

  if (secure_peer_name != nullptr && pem_root_certs == nullptr) {
    gpr_log(GPR_ERROR,
            "Cannot assert a secure peer name without a trust root.");
    return GRPC_SECURITY_ERROR;
  }

  c = static_cast<grpc_httpcli_ssl_channel_security_connector*>(
      gpr_zalloc(sizeof(grpc_httpcli_ssl_channel_security_connector)));

  gpr_ref_init(&c->base.base.refcount, 1);
  c->base.base.vtable = &httpcli_ssl_vtable;
  if (secure_peer_name != nullptr) {
    c->secure_peer_name = gpr_strdup(secure_peer_name);
  }
  tsi_ssl_client_handshaker_options options;
  memset(&options, 0, sizeof(options));
  options.pem_root_certs = pem_root_certs;
  options.root_store = root_store;
  result = tsi_create_ssl_client_handshaker_factory_with_options(
      &options, &c->handshaker_factory);
  if (result != TSI_OK) {
    gpr_log(GPR_ERROR, "Handshaker factory creation failed with %s.",
            tsi_result_to_string(result));
    httpcli_ssl_destroy(&c->base.base);
    *sc = nullptr;
    return GRPC_SECURITY_ERROR;
  }
  // We don't actually need a channel credentials object in this case,
  // but we set it to a non-nullptr address so that we don't trigger
  // assertions in grpc_channel_security_connector_cmp().
  c->base.channel_creds = (grpc_channel_credentials*)1;
  c->base.add_handshakers = httpcli_ssl_add_handshakers;
  *sc = &c->base;
  return GRPC_SECURITY_OK;
}

/* handshaker */

typedef struct {
  void (*func)(void* arg, grpc_endpoint* endpoint);
  void* arg;
  grpc_handshake_manager* handshake_mgr;
} on_done_closure;

static void on_handshake_done(void* arg, grpc_error* error) {
  grpc_handshaker_args* args = static_cast<grpc_handshaker_args*>(arg);
  on_done_closure* c = static_cast<on_done_closure*>(args->user_data);
  if (error != GRPC_ERROR_NONE) {
    const char* msg = grpc_error_string(error);
    gpr_log(GPR_ERROR, "Secure transport setup failed: %s", msg);

    c->func(c->arg, nullptr);
  } else {
    grpc_channel_args_destroy(args->args);
    grpc_slice_buffer_destroy_internal(args->read_buffer);
    gpr_free(args->read_buffer);
    c->func(c->arg, args->endpoint);
  }
  grpc_handshake_manager_destroy(c->handshake_mgr);
  gpr_free(c);
}

static void ssl_handshake(void* arg, grpc_endpoint* tcp, const char* host,
                          grpc_millis deadline,
                          void (*on_done)(void* arg, grpc_endpoint* endpoint)) {
  on_done_closure* c = static_cast<on_done_closure*>(gpr_malloc(sizeof(*c)));
  const char* pem_root_certs =
      grpc_core::DefaultSslRootStore::GetPemRootCerts();
  const tsi_ssl_root_certs_store* root_store =
      grpc_core::DefaultSslRootStore::GetRootStore();
  if (root_store == nullptr) {
    gpr_log(GPR_ERROR, "Could not get default pem root certs.");
    on_done(arg, nullptr);
    gpr_free(c);
    return;
  }
  c->func = on_done;
  c->arg = arg;
  grpc_channel_security_connector* sc = nullptr;
  GPR_ASSERT(httpcli_ssl_channel_security_connector_create(
                 pem_root_certs, root_store, host, &sc) == GRPC_SECURITY_OK);
  grpc_arg channel_arg = grpc_security_connector_to_arg(&sc->base);
  grpc_channel_args args = {1, &channel_arg};
  c->handshake_mgr = grpc_handshake_manager_create();
  grpc_handshakers_add(HANDSHAKER_CLIENT, &args, c->handshake_mgr);
  grpc_handshake_manager_do_handshake(
      c->handshake_mgr, nullptr /* interested_parties */, tcp,
      nullptr /* channel_args */, deadline, nullptr /* acceptor */,
      on_handshake_done, c /* user_data */);
  GRPC_SECURITY_CONNECTOR_UNREF(&sc->base, "httpcli");
}

const grpc_httpcli_handshaker grpc_httpcli_ssl = {"https", ssl_handshake};
