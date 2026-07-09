# OIDC 統登白名單設定（`cm-warrentlb-web`）

給統登（`auth.cmoney.tw` / `development-auth.cmoney.tw`）管理員設定此 client 的白名單。

---

## 正式環境（authority = `https://auth.cmoney.tw`）

```
RedirectUris:
  - https://warrantlb8888.cmoney.tw/login
  - https://warrantlb8888.cmoney.tw/refresh

PostLogoutRedirectUris:
  - https://warrantlb8888.cmoney.tw/logout

CorsOrigins:
  - https://warrantlb8888.cmoney.tw
```

---

## 測試環境（authority = `https://development-auth.cmoney.tw`）

```
RedirectUris:
  - https://localhost:3003/login
  - https://localhost:3003/refresh
  - https://warrantlb-landingpage-dev-t5gjnmk2qq-de.a.run.app/login
  - https://warrantlb-landingpage-dev-t5gjnmk2qq-de.a.run.app/refresh

PostLogoutRedirectUris:
  - https://localhost:3003/logout
  - https://warrantlb-landingpage-dev-t5gjnmk2qq-de.a.run.app/logout

CorsOrigins:
  - https://localhost:3003
  - https://warrantlb-landingpage-dev-t5gjnmk2qq-de.a.run.app
```

---

## Client 基本資訊

- Client ID：`cm-warrentlb-web`
- Response Type：`code`（Authorization Code + PKCE）
- Scope：`openid nickname`
- Grant Types：Authorization Code、Refresh Token（silent renew）

---

## 環境判斷邏輯（`auth/oidcConfig.ts`）

根據 `window.location.hostname` 自動切換 authority：

| hostname | authority |
|----------|-----------|
| `warrantlb8888.cmoney.tw` | `https://auth.cmoney.tw`（正式） |
| 其他（localhost、`*.run.app`） | `https://development-auth.cmoney.tw`（測試） |

---

## Cloud Run 服務對照

| 用途 | Service | URL |
|------|---------|-----|
| 正式 | `warrantlb-landingpage` | `https://warrantlb8888.cmoney.tw/`（經 LB） |
| 測試 | `warrantlb-landingpage-dev` | `https://warrantlb-landingpage-dev-t5gjnmk2qq-de.a.run.app/` |

---

## 部署流程

```bash
# 先推 dev
npm run build
gcloud run deploy warrantlb-landingpage-dev --source . --region=asia-east1 --project=author-gemini --quiet

# QA 過了再推 prod
gcloud run deploy warrantlb-landingpage --source . --region=asia-east1 --project=author-gemini --quiet
```
