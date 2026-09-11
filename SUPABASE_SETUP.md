# Supabase 設置指南

本指南將幫助您設置 Supabase 後台管理系統，用於管理課程、學習資源和好康分享。

## 第一步：建立 Supabase 帳戶

1. 前往 [https://supabase.com](https://supabase.com)
2. 點擊「Start your project」
3. 用 Google 或 GitHub 帳號登入
4. 建立新的組織和項目

## 第二步：建立資料庫表

登入後台後，打開 SQL 編輯器，執行以下 SQL 指令建立三個表：

### 建立 courses 表

```sql
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  day TEXT NOT NULL,
  level TEXT NOT NULL,
  time TEXT NOT NULL,
  available_spots INTEGER DEFAULT 0,
  description TEXT,
  registration_link TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Create policy for public read
CREATE POLICY "Allow public read" ON courses
  FOR SELECT USING (true);
```

### 建立 resources 表

```sql
CREATE TABLE resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  link TEXT,
  image TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Create policy for public read
CREATE POLICY "Allow public read" ON resources
  FOR SELECT USING (true);
```

### 建立 deals 表

```sql
CREATE TABLE deals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  link TEXT,
  image TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable RLS
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Create policy for public read
CREATE POLICY "Allow public read" ON deals
  FOR SELECT USING (true);
```

## 第三步：取得 API 密鑰

1. 在 Supabase 後台，進入「Settings」→「API」
2. 複製以下資訊：
   - **Project URL** - 作為 `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** - 作為 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** - 作為 `SUPABASE_SERVICE_ROLE_KEY`（保持私密！）

## 第四步：設定環境變數

1. 複製 `.env.local.example` 為 `.env.local`
   ```bash
   cp .env.local.example .env.local
   ```

2. 編輯 `.env.local` 並填入：
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
   ADMIN_PASSWORD=your-secure-password
   ```

3. **重要**：`.env.local` 已列在 `.gitignore`，不會上傳到 GitHub

## 第五步：安裝依賴

```bash
npm install @supabase/supabase-js
```

## 第六步：測試連接

1. 啟動開發伺服器
   ```bash
   npm run dev
   ```

2. 前往 [http://localhost:3000/admin](http://localhost:3000/admin)

3. 用你設定的密碼登入

4. 測試新增、編輯和刪除課程

## 在 Vercel 部署時設定環境變數

1. 前往 Vercel 項目設定
2. 在「Environment Variables」中新增：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_ADMIN_PASSWORD`
   - `ADMIN_PASSWORD`

3. 重新部署項目

## 使用 Supabase 管理員界面

### 直接編輯資料

除了使用網站的後台管理頁面，您也可以直接在 Supabase 後台編輯資料：

1. 進入 Supabase [https://app.supabase.com](https://app.supabase.com)
2. 選擇您的項目
3. 在左側選單選擇「Table Editor」
4. 選擇 `courses`、`resources` 或 `deals` 表
5. 直接編輯資料

### 查看資料

在「SQL Editor」中執行：

```sql
-- 查看所有課程
SELECT * FROM courses ORDER BY created_at DESC;

-- 查看所有資源
SELECT * FROM resources ORDER BY created_at DESC;

-- 查看所有好康
SELECT * FROM deals ORDER BY created_at DESC;
```

## 常見問題

### Q: 我忘記了管理員密碼怎麼辦？
A: 編輯 `.env.local` 文件，更改 `NEXT_PUBLIC_ADMIN_PASSWORD` 的值。

### Q: 如何備份資料？
A: Supabase 會自動備份資料。您也可以在 Supabase 後台進行手動備份。

### Q: 資源和好康分享的圖片應該上傳到哪裡？
A: 您可以使用：
- Supabase 的 Storage（推薦）
- Cloudinary、Imgur 等免費圖片託管服務
- 直接使用 URL

### Q: 可以限制誰能編輯內容嗎？
A: 目前使用簡單密碼。如需更複雜的權限控制，可以：
1. 添加 Supabase Auth
2. 使用基於角色的存取控制（RBAC）

## 更多資源

- [Supabase 文件](https://supabase.com/docs)
- [Next.js 與 Supabase 集成指南](https://supabase.com/docs/guides/with-nextjs)
- [Supabase 行級安全性（RLS）](https://supabase.com/docs/guides/auth/row-level-security)

## 後續改進

目前後台管理頁面使用本地 JSON 檔案。如果要完全使用 Supabase：

1. 修改 `/app/admin/page.tsx` 以使用 Supabase 客戶端
2. 修改 `/app/api/content/route.ts` 以查詢 Supabase 資料庫
3. 添加認證機制（Supabase Auth）

詳見代碼中的 `lib/supabase.ts` 文件。
