# 快速開始指南 - 10 分鐘上手

使用 Notion 資料庫來管理你的 Link in Bio 網站內容。

## ⚡ 5 個超簡單步驟

### 步驟 1️⃣ : 建立 Notion 集成（2 分鐘）

1. 前往 [Notion Integrations](https://www.notion.so/my-integrations)
2. 點擊「New Integration」
3. 命名為「Link in Bio」
4. 複製「Internal Integration Token」- 這就是你的 API 金鑰

**複製的內容看起來像：** `secret_abc123xyz...`

### 步驟 2️⃣ : 建立 Notion 資料庫（3 分鐘）

在你的 Notion 工作區建立三個資料庫：

#### 資料庫 1: 課程 (Courses)

1. 點擊「+ Add a page」
2. 選擇「Database」→「Table」
3. 命名為「Courses」
4. 建立這些欄位：
   - `Name` (Title)
   - `Day` (Text)
   - `Level` (Text)
   - `Time` (Text)
   - `Available Spots` (Number)
   - `Description` (Text)
   - `Registration Link` (URL)
   - `Published` (Checkbox)
   - `Order` (Number)

5. 添加一個範例課程

#### 資料庫 2: 資源 (Resources)

類似步驟，欄位為：
- `Title` (Title)
- `Description` (Text)
- `Category` (Text)
- `Link` (URL)
- `Image` (Text - 圖片 URL)
- `Published` (Checkbox)
- `Order` (Number)

#### 資料庫 3: 好康 (Deals)

欄位為：
- `Title` (Title)
- `Description` (Text)
- `Link` (URL)
- `Image` (Text - 圖片 URL)
- `Published` (Checkbox)
- `Order` (Number)

### 步驟 3️⃣ : 分享資料庫給集成（1 分鐘）

對每個資料庫：
1. 點擊「Share」按鈕
2. 搜尋你的集成名稱（「Link in Bio」）
3. 給予「Editor」權限

### 步驟 4️⃣ : 複製資料庫 ID（2 分鐘）

對每個資料庫：
1. 在 Notion 中打開資料庫
2. 查看瀏覽器網址列
3. 複製這部分：`https://www.notion.so/workspace/DATABASE_ID?v=...`
   - DATABASE_ID 是 `/` 之後、`?v=` 之前的部分

**例子：**
```
https://www.notion.so/myworkspace/a1b2c3d4e5f6g7h8i9j0k1l2?v=123
                        ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
                        這是你的 DATABASE_ID
```

### 步驟 5️⃣ : 配置環境變數（2 分鐘）

1. 在項目根目錄建立 `.env.local` 文件
2. 填入以下內容：

```bash
# Notion Configuration
NOTION_API_KEY=你複製的 API 金鑰
NOTION_DATABASE_ID_COURSES=課程資料庫 ID
NOTION_DATABASE_ID_RESOURCES=資源資料庫 ID
NOTION_DATABASE_ID_DEALS=好康資料庫 ID

# Admin Configuration
NEXT_PUBLIC_ADMIN_PASSWORD=any-password
ADMIN_PASSWORD=any-password
```

**完成！** ✅ 立即開始使用

## 🧪 本地測試

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 訪問 http://localhost:3000
```

你應該看到你在 Notion 中建立的課程、資源和好康內容！

## 🚀 部署到 Vercel

1. 推送到 GitHub
2. 在 Vercel 中連接倉庫
3. 添加環境變數（同上面的 `.env.local`）
4. 部署完成！

詳見 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📝 編輯內容

最簡單的部分 - 直接在 Notion 中編輯！

1. 打開你的 Notion 課程資料庫
2. 添加新課程、編輯現有課程或刪除
3. **重要：** 確保 `Published` 複選框是勾選的
4. 5 分鐘內網站自動更新（無需重新部署！）

## ✅ 檢查清單

- [ ] 建立 Notion 集成並複製 API 金鑰
- [ ] 建立三個 Notion 資料庫
- [ ] 分享資料庫給集成
- [ ] 複製三個資料庫 ID
- [ ] 建立 `.env.local` 並填入環境變數
- [ ] `npm install` 安裝依賴
- [ ] `npm run dev` 在本地測試
- [ ] 推送到 GitHub
- [ ] 在 Vercel 中配置環境變數
- [ ] 部署完成！

## 🎯 常見問題

### Q: 我的資料沒有出現？

檢查清單：
- [ ] Notion API 金鑰正確嗎？
- [ ] 資料庫 ID 複製正確了嗎？
- [ ] 已分享資料庫給集成嗎？
- [ ] 確認了 `Published` 複選框嗎？
- [ ] 重啟開發伺服器了嗎？

### Q: 編輯 Notion 後多久才能看到？

- 本地開發：5 分鐘內
- Vercel 部署：5 分鐘內

在 Vercel 中手動重新驗證：
1. 進入 Deployments 標籤
2. 點擊最新部署的「...」菜單
3. 選擇「Redeploy」

### Q: 如何重新排序我的課程？

在 Notion 中編輯 `Order` 欄位：
- 1, 2, 3 等等（升序）
- 數字越小越先顯示

### Q: 我的圖片鏈接不工作？

確保圖片 URL 是公開可訪問的。你可以：
- 使用 Notion 中的圖片（Notion 會自動生成公開 URL）
- 使用免費圖片服務（Unsplash、Pexels 等）
- 使用自己的圖片託管服務

### Q: 可以隱藏課程而不刪除嗎？

可以！只需取消 `Published` 複選框。內容會從網站上隱藏。

## 📚 更詳細的指南

- [NOTION_SETUP.md](./NOTION_SETUP.md) - 完整 Notion 設置說明
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 部署到 Vercel
- [README.md](./README.md) - 項目概述

---

就是這麼簡單！🍯 有問題？檢查詳細指南就行！
