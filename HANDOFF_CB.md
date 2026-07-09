# `warrantlb8888.cmoney.tw/cb` 部署交接文件

這份文件給負責 `/cb` 子路徑的同事，說明如何把你的專案部署到 Cloud Run，並共用既有的 Global HTTPS Load Balancer（跟主站同一顆 LB、同一個 IP、同一張憑證）。

---

## 現況

`warrantlb8888.cmoney.tw` 的 Global HTTPS LB 已經建立完成：

| 資源 | 值 |
|------|----|
| GCP Project | `author-gemini` |
| Region | `asia-east1` |
| LB 靜態 IP | `34.8.34.41` |
| URL Map | `invest-cmoney-urlmap`（同一顆 LB 也掛 `invest.cmoney.tw`） |
| HTTPS Proxy | `invest-cmoney-https-proxy` |
| Managed SSL 憑證 | `warrantlb8888-cert` |
| Host Rule | `warrantlb8888.cmoney.tw` → pathMatcher `warrantlb-paths` |
| 目前路由 | `/*`（全部路徑）→ `bs-warrantlb-landingpage`（主站，defaultService） |
| 你要加的路由 | `/cb`、`/cb/*` → `bs-warrantlb-cb`（你的 service，照以下步驟建立） |
| 路由邏輯 | LB 先比對 `/cb/*`，不符合的全部 fallback 到主站 |

DNS A record 由 CMoney DNS 管理員設定：`warrantlb8888.cmoney.tw A 34.8.34.41`（我請他們設好後，你就不用動 DNS）。

---

## 先決條件

1. 有 `author-gemini` 專案的 Cloud Run Developer 權限。若沒有，請我（或任何已授權者）跑：

   ```bash
   gcloud run services add-iam-policy-binding warrantlb-cb \
       --region=asia-east1 --project=author-gemini \
       --member="user:<你的 email>" --role="roles/run.developer"

   gcloud projects add-iam-policy-binding author-gemini \
       --member="user:<你的 email>" --role="roles/iam.serviceAccountUser"
   ```

2. 本機裝好 `gcloud` CLI，登入後 `gcloud config set project author-gemini`。

3. 你的專案需要以 `/cb` 為 base path（Vite/Next/Nuxt 都要設）。Cloud Run 不會自動幫你去掉 `/cb` 前綴，LB 會把完整路徑轉給 backend。

---

## Step 1 — 部署 Cloud Run 服務

**建議同時開 prod + dev 兩個 service**，QA 時推 dev，驗過再推 prod（跟 `/course` 的做法一致）：

| 用途 | Service 名稱 | 掛到 LB？ |
|------|--------------|----------|
| 正式 | `warrantlb-cb` | 是，掛 `/cb`、`/cb/*` |
| 測試 | `warrantlb-cb-dev` | 否，直接用 Cloud Run 預設網址做 QA |

```bash
# Dev（先推這個做 QA）
gcloud run deploy warrantlb-cb-dev \
    --source . \
    --region=asia-east1 --project=author-gemini \
    --allow-unauthenticated \
    --port 8080 --cpu=1 --memory=512Mi \
    --min-instances=0 --max-instances=5 --quiet

# Prod（dev QA 通過後再推）
gcloud run deploy warrantlb-cb \
    --source . \
    --region=asia-east1 --project=author-gemini \
    --allow-unauthenticated \
    --port 8080 --cpu=1 --memory=512Mi \
    --min-instances=0 --max-instances=10 --quiet
```

成功後會拿到 Cloud Run URL（格式 `https://warrantlb-cb-<hash>-de.a.run.app` 和 `https://warrantlb-cb-701831537766.asia-east1.run.app`），先打開 `/cb/` 確認服務 OK。

> **踩坑提醒**：
> - Dockerfile `FROM` 一定要加 `--platform=linux/amd64`，否則會 `Container import failed`。
> - Vite 專案若用中文檔名，會造成 image layer 解壓失敗。解法：`vite.config.ts` 內 `build.rollupOptions.output.assetFileNames: 'assets/[hash][extname]'`（參考本專案 `vite.config.ts`）。
> - SPA 專案要讓 nginx / server 處理 `/cb/*` 的 SPA fallback（fallback 到 `/cb/index.html`）。
> - 首次部署前若遇到 Artifact Registry 權限錯誤，執行一次：
>   ```bash
>   gcloud artifacts repositories add-iam-policy-binding cloud-run-source-deploy \
>       --location=asia-east1 --project=author-gemini \
>       --member="serviceAccount:701831537766-compute@developer.gserviceaccount.com" \
>       --role="roles/artifactregistry.reader"
>   ```

---

## Step 2 — 建立 Serverless NEG

把 Cloud Run 服務包成 LB 可以識別的 backend 端點。

```bash
gcloud compute network-endpoint-groups create neg-warrantlb-cb \
    --region=asia-east1 \
    --network-endpoint-type=serverless \
    --cloud-run-service=warrantlb-cb \
    --project=author-gemini
```

---

## Step 3 — 建立 Backend Service

```bash
gcloud compute backend-services create bs-warrantlb-cb \
    --global \
    --load-balancing-scheme=EXTERNAL_MANAGED \
    --project=author-gemini

gcloud compute backend-services add-backend bs-warrantlb-cb \
    --global \
    --network-endpoint-group=neg-warrantlb-cb \
    --network-endpoint-group-region=asia-east1 \
    --project=author-gemini
```

---

## Step 4 — 在既有 URL Map 中加 `/cb` 路徑

**不要新開 URL Map**，直接在 `invest-cmoney-urlmap` 的 `warrantlb-paths` pathMatcher 新增規則。

```bash
# 1. 匯出現有 URL Map
gcloud compute url-maps export invest-cmoney-urlmap \
    --global --project=author-gemini \
    --destination=urlmap.yaml

# 2. 編輯 urlmap.yaml，在 pathMatchers 裡 name: warrantlb-paths 區塊
#    新增 pathRules（目前該區塊沒有 pathRules，只有 defaultService）：
```

新增的 YAML 片段：

```yaml
  - paths:
    - /cb
    - /cb/*
    service: https://www.googleapis.com/compute/v1/projects/author-gemini/global/backendServices/bs-warrantlb-cb
```

改完後匯入：

```bash
gcloud compute url-maps import invest-cmoney-urlmap \
    --global --project=author-gemini \
    --source=urlmap.yaml --quiet
```

> **注意**：URL Map 變更需要約 1–3 分鐘才會在全球 Google Front End 生效，匯入完先等一下再測。

### 完成後的 URL Map 應長這樣（摘要）

```yaml
hostRules:
- hosts: [invest.cmoney.tw]
  pathMatcher: invest-paths
- hosts: [warrantlb8888.cmoney.tw]
  pathMatcher: warrantlb-paths
pathMatchers:
- name: invest-paths
  defaultService: .../bs-imoney-future
  pathRules:
  - paths: [/imoney/future, /imoney/future/*]
    service: .../bs-imoney-future
- name: warrantlb-paths
  defaultService: .../bs-warrantlb-landingpage   # ← 主站（fallback）
  pathRules:
  - paths: [/cb, /cb/*]          # ← 你新增的
    service: .../bs-warrantlb-cb
```

---

## Step 5 — 驗證

DNS 生效後（A record 指到 `34.8.34.41`），直接打：

```bash
curl -I https://warrantlb8888.cmoney.tw/cb/
# 預期 HTTP/2 200
```

DNS 還沒生效時，可用 IP + Host header 測：

```bash
curl -sk -H "Host: warrantlb8888.cmoney.tw" -o /dev/null -w "%{http_code}\n" https://34.8.34.41/cb/
```

---

## 後續更新部署

之後要更新版本只需要重跑 Step 1：

```bash
# 先推 dev 做 QA
gcloud run deploy warrantlb-cb-dev --source . --region=asia-east1 --project=author-gemini --quiet

# 驗過再推 prod
gcloud run deploy warrantlb-cb --source . --region=asia-east1 --project=author-gemini --quiet
```

NEG / Backend Service / URL Map 不用動，因為 Cloud Run 內部 revision 切換會自動被 NEG 追蹤。

---

## OIDC 統登白名單（若你的 app 有登入功能才需要）

若你的 `/cb` app 走 CMoney 統一登入（`cm-warrentlb-web` 或其他 client），需要請統登管理員把以下 URL 加到白名單。redirect_uri 要包含 `/cb` 前綴（因為 app 部署在此子路徑下）。

### 正式（`https://auth.cmoney.tw`）

```
RedirectUris:
  - https://warrantlb8888.cmoney.tw/cb/login
  - https://warrantlb8888.cmoney.tw/cb/refresh
PostLogoutRedirectUris:
  - https://warrantlb8888.cmoney.tw/cb/logout
CorsOrigins:
  - https://warrantlb8888.cmoney.tw
```

### 測試（`https://development-auth.cmoney.tw`）

```
RedirectUris:
  - https://localhost:3003/cb/login
  - https://localhost:3003/cb/refresh
  - https://warrantlb-cb-dev-701831537766.asia-east1.run.app/cb/login
  - https://warrantlb-cb-dev-701831537766.asia-east1.run.app/cb/refresh
PostLogoutRedirectUris:
  - https://localhost:3003/cb/logout
  - https://warrantlb-cb-dev-701831537766.asia-east1.run.app/cb/logout
CorsOrigins:
  - https://localhost:3003
  - https://warrantlb-cb-dev-701831537766.asia-east1.run.app
```

> Cloud Run dev URL 兩種等效格式（`*-t5gjnmk2qq-de.a.run.app` 與 `*-701831537766.asia-east1.run.app`）都可以用，上面用 project-number 格式。實際 hash 部署後會知道。

程式碼內要用 hostname 判斷 authority：
- hostname = `warrantlb8888.cmoney.tw` → 正式 authority
- 其他 → 測試 authority

可參考 `/course` 專案的 `auth/oidcConfig.ts`。

---

## 有問題找誰

- LB / IAM / URL Map：Sonia（sonia_chen@cmoney.com.tw）
- DNS A record：CMoney IT / DNS 管理員
- Cloud Run 部署流程：參考 `~/.claude/skill/deploy/cloud-run-deploy-service/SKILL.md`
