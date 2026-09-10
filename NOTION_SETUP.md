# Notion 後台設置指南

## 📋 概述
本指南幫助你在 Notion 中建立資料庫，用於管理課程、學習資源和好康分享內容。

## 🔑 第一步：建立 Notion Integration（API 密鑰）

1. 進入 Notion 設定：https://www.notion.so/profile/integrations
2. 點擊「Create new integration」
3. 填寫名稱：「蔚樺韓文教室」
4. 選擇 Workspace：你的 Notion Workspace
5. 點擊「Submit」
6. 複製 **Internal Integration Token**（這是你的 API 密鑰）
7. 將這個 Token 保存到 `.env.local` 文件中的 `NOTION_API_KEY`

## 📚 第二步：建立資料庫

### 2.1 課程資料庫（Courses）

1. 在 Notion 中建立新的資料庫
2. 取名：`課程資訊`（Courses）
3. 建立以下欄位：

| 欄位名稱 | 欄位類型 | 說明 |
|---------|--------|------|
| 名稱 | Title | 課程名稱（必需） |
| 曜日 | Select | 星期幾（例：週二、週三、週四） |
| 程度 | Select | 課程程度（例：零基礎、三級） |
| 時間 | Rich Text | 上課時間（例：20:00-21:30） |
| 可插班人數 | Number | 可插班人數 |
| 說明 | Rich Text | 課程說明（例如：目前進度及報名請私訊老師詢問） |
| 報名連結 | URL | Google Form 或報名表單的連結 |

### 2.2 學習資源資料庫（Resources）

1. 在 Notion 中建立新資料庫
2. 取名：`韓文學習資源`（Resources）
3. 建立以下欄位：

| 欄位名稱 | 欄位類型 | 說明 |
|---------|--------|------|
| 標題 | Title | 資源標題（必需） |
| 分類 | Select | 分類（例：文法、詞彙、發音、綜藝推薦） |
| 描述 | Rich Text | 資源說明 |
| 連結 | URL | Notion 連結或外部連結 |
| 圖片 | Files | 資源代表圖片 |

### 2.3 好康分享資料庫（Deals）

1. 在 Notion 中建立新資料庫
2. 取名：`好康分享`（Deals）
3. 建立以下欄位：

| 欄位名稱 | 欄位類型 | 說明 |
|---------|--------|------|
| 標題 | Title | 好康標題（必需） |
| 描述 | Rich Text | 好康描述 |
| 連結 | URL | 好康連結 |
| 圖片 | Files | 代表圖片 |

## 🔗 第三步：授權 Integration

1. 打開剛才建立的每個資料庫
2. 點擊右上角的「...」
3. 選擇「Connection」或「Connections」
4. 找到你建立的 Integration（「蔚樺韓文教室」）
5. 點擊「Connect」授權

## 📝 第四步：取得資料庫 ID

1. 打開課程資訊資料庫
2. 複製 URL：`https://www.notion.so/[WORKSPACE_ID]/[DATABASE_ID]?v=[VIEW_ID]`
3. `DATABASE_ID` 是那串長的字母數字
4. 將它保存到 `.env.local` 文件中的 `NOTION_DATABASE_ID_COURSES`
5. 對其他兩個資料庫重複此步驟：
   - `NOTION_DATABASE_ID_RESOURCES`
   - `NOTION_DATABASE_ID_DEALS`

## 📄 範例資料

### 課程範例：
- 名稱：零基礎班
- 曜日：週二
- 程度：零基礎
- 時間：20:00-21:30
- 可插班人數：1
- 說明：目前進度及報名請私訊老師詢問
- 報名連結：https://forms.gle/mQM7UX812GQXvXhA7

### 學習資源範例：
- 標題：韓文文法總整理
- 分類：文法
- 描述：初級常用文法講解
- 連結：[你的 Notion 連結]
- 圖片：[上傳圖片]

## ✅ 完成檢查清單

- [ ] 建立 Notion Integration
- [ ] 複製 API Key 到 `.env.local`
- [ ] 建立「課程資訊」資料庫
- [ ] 建立「韓文學習資源」資料庫
- [ ] 建立「好康分享」資料庫
- [ ] 授權所有資料庫給 Integration
- [ ] 複製所有資料庫 ID 到 `.env.local`
- [ ] 測試網站能否正常載入資料

## 🐛 常見問題

**Q: 如何取得資料庫 ID？**
A: 打開資料庫，URL 中 `?` 前面那串長的字母數字就是 ID

**Q: 新增資料到 Notion 後，網站多久會更新？**
A: 網站會每次重新載入時更新（無快取）

**Q: 可以刪除資料庫的某些欄位嗎？**
A: 可以，但要確保至少保留「標題」和「連結」欄位

---

完成以上設置後，你就可以隨時在 Notion 編輯內容，網站會自動讀取並顯示！
