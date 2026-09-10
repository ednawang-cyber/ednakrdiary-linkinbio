# 部署到 Vercel 指南

## 📋 前置要求
- GitHub 帳號（用 Google 登入的也可以）
- Notion API 密鑰和資料庫 ID（參考 `NOTION_SETUP.md`）

## 🚀 部署步驟

### 第一步：上傳代碼到 GitHub

1. 前往 GitHub：https://github.com/new
2. 建立新倉庫，名稱：`ednakrdiary-linkinbio`
3. **不要勾選** "Add a README file" 或其他選項（因為本地已有代碼）
4. 點擊「Create repository」
5. 複製 HTTPS 倉庫連結

在本地終端執行：
```bash
cd /Users/wang-weihwa/ednakrdiary-linkinbio

# 添加遠程倉庫
git remote add origin https://github.com/YOUR_USERNAME/ednakrdiary-linkinbio.git

# 推送代碼到 GitHub
git branch -M main
git push -u origin main
```

### 第二步：連接到 Vercel

1. 前往 Vercel：https://vercel.com
2. 用 Google 帳號登入（或你的 GitHub 帳號）
3. 點擊「Add New」→「Project」
4. 選擇「Import Git Repository」
5. 搜尋並選擇 `ednakrdiary-linkinbio` 倉庫
6. 點擊「Import」

### 第三步：設置環境變數

在 Vercel 的 Project Settings 中：

1. 點擊「Settings」→「Environment Variables」
2. 添加以下環境變數：

```
NOTION_API_KEY = 你的 API Key（來自 NOTION_SETUP.md）
NOTION_DATABASE_ID_COURSES = 課程資料庫 ID
NOTION_DATABASE_ID_RESOURCES = 學習資源資料庫 ID
NOTION_DATABASE_ID_DEALS = 好康分享資料庫 ID
```

3. 保存環境變數

### 第四步：部署

1. 所有環境變數設置完成後，Vercel 會自動部署
2. 等待部署完成（通常 1-2 分鐘）
3. 你會看到一個部署成功的訊息和網址

## 📝 自訂網域（可選）

如果想用自己的網域：

1. 在 Vercel Project Settings 中點擊「Domains」
2. 輸入你的網域
3. 按照 Vercel 的指示配置 DNS

## 🔄 更新內容

- **編輯 Notion**：直接在 Notion 中編輯內容，網站會自動更新（刷新後）
- **編輯程式碼**：將更改推送到 GitHub，Vercel 會自動重新部署

```bash
# 本地編輯後
git add .
git commit -m "Update content"
git push
```

## 🐛 測試部署

部署完成後，訪問 Vercel 提供的 URL，檢查：
- [ ] 頭像正常顯示
- [ ] 個人介紹顯示正確
- [ ] LINE 按鈕可以點擊
- [ ] （可選）課程、資源、好康內容從 Notion 正確加載

## ❌ 常見問題

**Q: 部署時出現錯誤「Cannot find module」**
A: 確保所有環境變數都正確設置，重新部署

**Q: 網站載入後看不到課程/資源**
A: 
1. 檢查 Notion 資料庫是否已授權給 Integration
2. 檢查環境變數中的資料庫 ID 是否正確
3. 檢查瀏覽器控制台（F12）是否有錯誤訊息

**Q: 如何查看部署日誌？**
A: 在 Vercel Dashboard 中，點擊「Deployments」，選擇最新的部署，點擊「View Build Logs」

---

完成以上步驟後，你的韓文教學 Link in Bio 就會上線了！🎉
