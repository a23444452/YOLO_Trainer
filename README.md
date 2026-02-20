# YOLO Trainer

YOLO (You Only Look Once) 物件偵測模型訓練平台 — 一站式 AI 視覺辨識解決方案。

## 功能特色

### Landing Page
- **Hero 動畫** — Canvas 粒子特效搭配 3D 滑鼠追蹤互動
- **品牌輪播** — GSAP 驅動的無限滾動 Logo 展示
- **功能展示** — 自動標註、即時訓練、多模型支援等核心功能介紹
- **工作流程** — SVG 路徑動畫呈現從資料準備到模型部署的完整流程
- **模型選擇器** — 互動式比較 YOLOv8n / v8s / v8m / v8l / v8x 各模型規格
- **Demo 展示區** — 實際偵測效果範例圖庫
- **方案定價** — Free / Pro ($29/月) / Enterprise ($99/月) 三種方案
- **聯絡表單** — 即時表單送出，資料存入 Supabase 資料庫

### 使用者認證
- **Google OAuth** — 一鍵使用 Google 帳號登入
- **GitHub OAuth** — 一鍵使用 GitHub 帳號登入
- **Email/Password** — 傳統帳號密碼註冊與登入
- **JWT Session** — 安全的 Token 驗證機制
- **路由保護** — Middleware 自動攔截未授權存取

### 訂閱付款
- **Stripe Checkout** — 安全託管的結帳頁面
- **Webhook 整合** — 即時同步訂閱狀態
- **Billing Portal** — 自助管理訂閱、取消、更換方案
- **14 天免費試用** — Pro 和 Enterprise 方案皆含試用期

### Dashboard
- **訂閱狀態** — 即時顯示目前方案與到期日
- **使用統計** — 訓練次數、模型數量、儲存空間概覽
- **帳單管理** — 查看方案詳情、管理付款方式

## 應用技術

| 類別 | 技術 |
|------|------|
| **框架** | [Next.js 15](https://nextjs.org/) (App Router) + [React 19](https://react.dev/) |
| **語言** | [TypeScript 5.9](https://www.typescriptlang.org/) |
| **樣式** | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| **UI 元件** | [shadcn/ui](https://ui.shadcn.com/) (New York 風格) + [Radix UI](https://www.radix-ui.com/) |
| **動畫** | [GSAP 3](https://gsap.com/) + ScrollTrigger |
| **認證** | [NextAuth.js v5](https://authjs.dev/) (Google / GitHub / Credentials) |
| **資料庫** | [Supabase](https://supabase.com/) (PostgreSQL) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) |
| **付款** | [Stripe](https://stripe.com/) Subscriptions + Checkout + Webhooks |
| **表單驗證** | [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/) |
| **測試** | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |
| **CI/CD** | [GitHub Actions](https://github.com/features/actions) |
| **部署** | [Vercel](https://vercel.com/) |

## 專案結構

```
V2/
├── app/                          # 原始 Vite 專案（參考用）
└── app-next/                     # Next.js 主專案
    ├── app/
    │   ├── layout.tsx            # Root Layout (字型、Providers)
    │   ├── page.tsx              # Landing Page (所有 Sections)
    │   ├── globals.css           # 全域樣式與 CSS 變數
    │   ├── (auth)/
    │   │   ├── login/            # 登入頁面
    │   │   └── register/         # 註冊頁面
    │   ├── (dashboard)/
    │   │   ├── dashboard/        # 使用者儀表板
    │   │   └── billing/          # 帳單管理
    │   └── api/
    │       ├── auth/             # NextAuth API 路由
    │       ├── stripe/           # Stripe Checkout & Webhook
    │       └── contact/          # 聯絡表單 API
    ├── components/
    │   ├── ui/                   # shadcn/ui 元件庫
    │   ├── sections/             # Landing Page 區塊元件
    │   └── providers/            # GSAP & Session Providers
    ├── lib/
    │   ├── auth.ts               # NextAuth 設定
    │   ├── stripe.ts             # Stripe SDK
    │   ├── db/                   # Drizzle ORM Schema & 連線
    │   └── validations/          # Zod 驗證 Schema
    ├── hooks/                    # 自訂 React Hooks
    ├── middleware.ts              # 路由保護 Middleware
    └── tests/                    # 測試檔案
        ├── unit/                 # 單元測試
        └── integration/          # 整合測試
```

## 使用步驟

### 前置需求

- [Node.js](https://nodejs.org/) 18.17 以上
- [npm](https://www.npmjs.com/) 或 [pnpm](https://pnpm.io/)
- [Supabase](https://supabase.com/) 帳號（免費方案即可）
- [Stripe](https://stripe.com/) 帳號（測試模式即可）
- Google / GitHub OAuth App（擇一或兩者皆設定）

### 1. Clone 專案

```bash
git clone https://github.com/a23444452/YOLO_Trainer.git
cd YOLO_Trainer
```

### 2. 安裝依賴

```bash
cd app-next
npm install
```

### 3. 設定環境變數

複製範本檔案並填入你的 credentials：

```bash
cp .env.example .env.local
```

編輯 `.env.local`，填入以下內容：

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3333
NEXTAUTH_SECRET=<用 openssl rand -base64 32 產生>

# OAuth Providers (至少設定一組)
GITHUB_CLIENT_ID=<你的 GitHub OAuth App Client ID>
GITHUB_CLIENT_SECRET=<你的 GitHub OAuth App Client Secret>
GOOGLE_CLIENT_ID=<你的 Google OAuth Client ID>
GOOGLE_CLIENT_SECRET=<你的 Google OAuth Client Secret>

# Supabase
DATABASE_URL=<Supabase 連線字串 (Transaction mode)>
NEXT_PUBLIC_SUPABASE_URL=https://<your-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<你的 Supabase Anon Key>
SUPABASE_SERVICE_ROLE_KEY=<你的 Supabase Service Role Key>

# Stripe
STRIPE_SECRET_KEY=<你的 Stripe Secret Key>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<你的 Stripe Publishable Key>
STRIPE_WEBHOOK_SECRET=<你的 Stripe Webhook Secret>
STRIPE_PRO_PRICE_ID=<Pro 方案 Price ID>
STRIPE_ENTERPRISE_PRICE_ID=<Enterprise 方案 Price ID>
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=<Pro 方案 Price ID>
NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID=<Enterprise 方案 Price ID>
```

### 4. 建立資料庫 Schema

```bash
npm run db:push
```

此指令會在 Supabase 自動建立以下資料表：
- `users` — 使用者資料（email、名稱、Stripe 客戶 ID）
- `subscriptions` — 訂閱紀錄（方案、狀態、計費週期）
- `contact_submissions` — 聯絡表單送出紀錄

### 5. 啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器前往 [http://localhost:3333](http://localhost:3333)

### 6. 設定 Stripe Webhook（本地測試）

```bash
# 安裝 Stripe CLI
brew install stripe/stripe-cli/stripe

# 登入 Stripe
stripe login

# 轉發 Webhook 到本地伺服器
stripe listen --forward-to localhost:3333/api/stripe/webhook
```

將終端機顯示的 Webhook Signing Secret 填入 `.env.local` 的 `STRIPE_WEBHOOK_SECRET`。

## 指令參考

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器 (port 3333) |
| `npm run build` | 建置生產版本 |
| `npm run start` | 啟動生產伺服器 |
| `npm run lint` | ESLint 程式碼檢查 |
| `npm run typecheck` | TypeScript 型別檢查 |
| `npm run test` | 執行測試 |
| `npm run test:watch` | 測試監聽模式 |
| `npm run test:coverage` | 測試覆蓋率報告 |
| `npm run db:push` | 同步 Schema 到資料庫 |
| `npm run db:generate` | 產生 Migration 檔案 |
| `npm run db:studio` | 開啟 Drizzle Studio (資料庫 GUI) |

## 部署

本專案已設定 Vercel 部署配置：

1. 在 [Vercel](https://vercel.com/) 匯入 GitHub 專案
2. Root Directory 設定為 `app-next`
3. 在 Vercel Dashboard 設定所有環境變數
4. 在 Stripe Dashboard 新增生產環境 Webhook endpoint：`https://your-domain.com/api/stripe/webhook`
5. 部署完成

## 授權

MIT License
