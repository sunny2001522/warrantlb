import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

let manager: UserManager | null = null

const PRODUCTION_HOST = 'warrantlb8888.cmoney.tw'

export function getOidcManager(): UserManager {
  if (manager) {
    return manager
  }

  const BASE_DOMAIN = window.location.origin
  const isProduction = window.location.hostname === PRODUCTION_HOST
  const OIDC_DOMAIN = isProduction
    ? 'https://auth.cmoney.tw'
    : 'https://development-auth.cmoney.tw'

  manager = new UserManager({
    authority: OIDC_DOMAIN,
    client_id: 'cm-warrentlb-web',
    redirect_uri: `${BASE_DOMAIN}/login`,
    response_type: 'code',
    scope: 'openid nickname',
    post_logout_redirect_uri: `${BASE_DOMAIN}/logout`,
    silent_redirect_uri: `${BASE_DOMAIN}/refresh`,
    accessTokenExpiringNotificationTimeInSeconds: 10,
    automaticSilentRenew: true,
    filterProtocolClaims: false,
    monitorSession: false,
    metadata: {
      issuer: OIDC_DOMAIN,
      authorization_endpoint: `${OIDC_DOMAIN}/identity/authorize`,
      token_endpoint: `${OIDC_DOMAIN}/identity/token`,
      end_session_endpoint: `${OIDC_DOMAIN}/identity/endsession`,
      jwks_uri: `${OIDC_DOMAIN}/identity/keys/jwks`,
      check_session_iframe: `${OIDC_DOMAIN}/identity/checksession`,
    },
    userStore: new WebStorageStateStore({ store: window.localStorage }),
  })

  return manager
}
