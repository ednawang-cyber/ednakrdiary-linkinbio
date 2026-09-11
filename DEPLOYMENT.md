# 部署到 Vercel - 超簡單指南

這是用 Notion 資料庫驅動的 Link in Bio 網站部署指南。

## 📋 前置要求

- GitHub 帳號
- Vercel 帳號（用 Google 登入）
- Notion 帳戶（免費版本即可）

## 🚀 部署步驟

### 步驟 1️⃣ : 設定 Notion

完整指南請見 [NOTION_SETUP.md](./NOTION_SETUP.md)

簡要步驟：
1. 建立 Notion 集成 (Integration)
2. 複製 API 金鑰
3. 建立三個資料庫：課程、資源、好康
4. 分享資料庫給你的集成
5. 複製每個資料庫的 ID

### 步驟 2️⃣ : 上傳到 GitHub

1. 打開終端，進入項目目錄

2. 在 GitHub 建立新倉庫：https://github.com/new
   - 名稱：`ednakrdiary-linkinbio`
   - 創建倉庫

3. 複製倉庫連結，執行：
```bash
git remote add origin https://github.com/YOUR_USERNAME/ednakrdiary-linkinbio.git
git branch -M main
git push -u origin main
```

### 步驟 3️⃣ : 部署到 Vercel

1. 進入 https://vercel.com
2. 用 Google 帳號登入
3. 點擊「Add New」→「Project」
4. 選擇「Import Git Repository」
5. 選擇 `ednakrdiary-linkinbio`

#### 設定環境變數

點擊「Environment Variables」，添加以下變數：

```
NOTION_API_KEY=your-integration-token
NOTION_DATABASE_ID_COURSES=your-courses-db-id
NOTION_DATABASE_ID_RESOURCES=your-resources-db-id
NOTION_DATABASE_ID_DEALS=your-deals-db-id
NEXT_PUBLIC_ADMIN_PASSWORD=your-password
ADMIN_PASSWORD=your-password
```

6. 點擊「Deploy」

**完成！** ✅ 1-2 分鐘後會有部署成功的網址

## 🔄 編輯內容

編輯內容非常簡單 - 直接在 Notion 中編輯！

1. 打開你的 Notion 課程資料庫
2. 添加、編輯或刪除課程
3. 確保 `Published` 複選框是勾選的
4. 5 分鐘內網站會自動更新

**不需要重新部署！** 所有更新都是自動的。

## 📸 快速部署檢查清單

- [ ] Notion 集成已建立
- [ ] 三個資料庫已建立並配置
- [ ] 環境變數已複製
- [ ] GitHub 倉庫已建立
- [ ] Vercel 環境變數已設定
- [ ] Vercel 部署完成
- [ ] 訪問網址檢查內容是否正確

## 🔄 自動重新驗證

網站會在以下情況自動更新 Notion 內容：

1. **定期重新驗證**：每 5 分鐘檢查一次 Notion
2. **部署時**：每次推送到 GitHub 都會重新驗證
3. **手動重新驗證**：在 Vercel Dashboard 點擊「Redeploy」

在 Vercel 中修改重新驗證時間：
- 編輯 `app/page.tsx` 中的 `revalidate: 300`
- 更改為秒數（例如 60 = 1 分鐘）

## 🌍 自訂域名（可選）

1. 在 Vercel 中，進入你的項目設定
2. 點擊「Domains」
3. 添加你的自訂域名
4. 按照 DNS 設定說明操作

## 🔐 保護環境變數

重要提示：
- **不要** 提交 `.env.local` 到 GitHub（已自動加入 `.gitignore`）
- 所有 Notion API 金鑰都應該通過 Vercel 環境變數設定
- 金鑰永遠不會暴露到客戶端

## ❌ 常見問題

### Q: Notion 資料沒有顯示？

A: 檢查以下幾點：
1. 環境變數是否正確設定
2. `Published` 複選框是否勾選
3. Notion 集成是否有存取資料庫的權限
4. 資料庫屬性名稱是否與預期一致

### Q: 需要多久才能看到 Notion 更新？

A: 通常 5 分鐘內。如需立即更新：
1. 進入 Vercel Dashboard
2. 進入你的項目
3. 點擊「Deployments」
4. 點擊最新部署的「...」菜單
5. 選擇「Redeploy」

### Q: 可以在 Vercel 上編輯密碼嗎？

A: 可以。在 Vercel 項目設定中編輯環境變數：
1. Project Settings → Environment Variables
2. 編輯或添加 `NEXT_PUBLIC_ADMIN_PASSWORD` 和 `ADMIN_PASSWORD`
3. 點擊「Save」
4. Vercel 會自動重新部署

### Q: 圖片無法加載？

A: 確認圖片 URL 是可公開訪問的。你可以：
1. 使用直接的圖片 URL（例如來自 Unsplash、Pexels）
2. 使用 Notion 中的圖片 URL（Notion 會自動生成）
3. 將圖片託管在第三方服務（Cloudinary、Imgix 等）

### Q: 如何回退到之前的部署版本？

A: 在 Vercel Dashboard：
1. 進入 Deployments 標籤
2. 找到你想回退的部署
3. 點擊「...」菜單
4. 選擇「Promote to Production」

## 📚 相關文件

- [NOTION_SETUP.md](./NOTION_SETUP.md) - Notion 詳細設置指南
- [README.md](./README.md) - 項目介紹
- [QUICKSTART.md](./QUICKSTART.md) - 快速開始指南

---

就這麼簡單！Happy coding! 🍯
