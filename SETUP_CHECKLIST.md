# 設置檢查清單

使用此清單確保所有設置都正確完成。

## 第一次設置

### 1. 項目初始化
- [ ] 克隆或下載項目
- [ ] 進入項目目錄
- [ ] 執行 `npm install` 安裝依賴

### 2. 編輯個人信息

#### 必須編輯
- [ ] `data/content.json` - 添加你的課程、資源、好康分享
- [ ] `public/images/avatar.jpg` - 上傳你的頭像照片

#### 可選編輯
- [ ] `app/layout.tsx` - 修改元數據（標題、描述）
- [ ] `app/globals.css` - 自定義顏色和字體

### 3. 本地測試

```bash
npm run dev
```

- [ ] 訪問 http://localhost:3000 檢查主頁
- [ ] 確認內容正確顯示
- [ ] 測試響應式設計（手機、平板、桌面）
- [ ] 測試 LINE 按鈕可以點擊

---

## 簡單版部署（JSON 編輯）

### 1. GitHub 設置
- [ ] 建立 GitHub 帳號（如還沒有）
- [ ] 建立新倉庫：`ednakrdiary-linkinbio`
- [ ] 複製倉庫 HTTPS 連結

### 2. 推送代碼
```bash
git remote add origin https://github.com/YOUR_USERNAME/ednakrdiary-linkinbio.git
git branch -M main
git push -u origin main
```

- [ ] 所有文件推送到 GitHub

### 3. Vercel 部署
- [ ] 訪問 https://vercel.com
- [ ] 用 Google 帳號登入
- [ ] 匯入 GitHub 倉庫
- [ ] 選擇 `ednakrdiary-linkinbio`
- [ ] 點擊 Deploy
- [ ] 等待部署完成（1-2 分鐘）
- [ ] 記錄分配的 URL

### 4. 驗證部署
- [ ] 訪問 Vercel 提供的 URL
- [ ] 確認内容正確顯示
- [ ] 測試所有連結可以點擊

---

## 進階版部署（Supabase + 後台管理）

### 1. Supabase 設置

#### 建立帳戶
- [ ] 訪問 https://supabase.com
- [ ] 用 Google 帳號註冊
- [ ] 建立新組織

#### 建立項目
- [ ] 點擊「New Project」
- [ ] 填寫項目名稱和資料庫密碼
- [ ] 選擇離你最近的地區
- [ ] 等待項目建立（2-5 分鐘）

#### 建立資料庫表
- [ ] 進入 SQL Editor
- [ ] 複製並執行 SUPABASE_SETUP.md 中的 SQL 指令
- [ ] 確認三個表都已建立：courses、resources、deals

### 2. 複製 API 密鑰
- [ ] 進入「Settings」→「API」
- [ ] 複製「Project URL」
- [ ] 複製「anon public」（anon key）
- [ ] 複製「service_role secret」（service role key）

### 3. 本地環境變數
- [ ] 複製 `.env.local.example` → `.env.local`
- [ ] 填入 Supabase URL
- [ ] 填入 anon key
- [ ] 填入 service role key
- [ ] 設定管理員密碼
- [ ] **重要**：`.env.local` 不要推送到 GitHub！

### 4. 本地測試
```bash
npm install  # 重新安裝（如需要）
npm run dev
```

- [ ] 訪問 http://localhost:3000 - 主頁應該正常顯示
- [ ] 訪問 http://localhost:3000/admin - 登入頁面應該顯示
- [ ] 用設定的密碼登入
- [ ] 測試添加、編輯、刪除課程
- [ ] 測試保存功能

### 5. GitHub 推送（不含 .env.local）
```bash
git add .
git commit -m "Add Supabase integration"
git push
```

- [ ] 代碼已推送到 GitHub
- [ ] 確認 `.env.local` 未被推送

### 6. Vercel 環境變數設置
- [ ] 進入 Vercel 項目設定
- [ ] 點擊「Environment Variables」
- [ ] 添加以下變數：
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `NEXT_PUBLIC_ADMIN_PASSWORD`
  - [ ] `ADMIN_PASSWORD`

### 7. Vercel 重新部署
- [ ] 進入「Deployments」標籤
- [ ] 點擊「Redeploy」或推送新代碼以觸發部署
- [ ] 等待部署完成

### 8. 驗證部署
- [ ] 訪問 https://your-domain.com - 主頁正常
- [ ] 訪問 https://your-domain.com/admin - 後台管理可訪問
- [ ] 用密碼登入
- [ ] 測試線上編輯功能

---

## 常見設置問題

### 環境變數相關
- [ ] 確認 `.env.local` 在 `.gitignore` 中
- [ ] 確認所有必需的環境變數都已設定
- [ ] 確認 Vercel 環境變數與本地相同

### Supabase 相關
- [ ] 確認 SQL 執行沒有錯誤
- [ ] 確認 RLS（Row Level Security）已啟用
- [ ] 確認 public 讀取策略已設定

### 部署相關
- [ ] 確認 GitHub 連結正確
- [ ] 確認 Vercel 項目已連結正確的 GitHub 倉庫
- [ ] 檢查 Vercel Deployment Log 查看是否有錯誤

---

## 後續維護

### 定期檢查
- [ ] 課程資訊是否最新
- [ ] 資源連結是否有效
- [ ] 圖片是否能正常顯示
- [ ] 密碼是否安全

### 定期更新
- [ ] 新增新課程時更新內容
- [ ] 定期添加學習資源
- [ ] 分享好康推薦

### 備份
- [ ] 定期備份 `data/content.json`
- [ ] 如使用 Supabase，進行資料庫備份

---

## 獲取幫助

- **部署問題**：查看 [DEPLOYMENT.md](./DEPLOYMENT.md)
- **後台管理**：查看 [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)
- **Supabase 設置**：查看 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **快速開始**：查看 [QUICKSTART.md](./QUICKSTART.md)

---

完成所有檢查項目後，你的網站就準備好了！🎉🍯
