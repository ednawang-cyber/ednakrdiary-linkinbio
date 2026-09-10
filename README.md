# 蔚樺 웨이화 | 韓語蜂蜜罐 - Link in Bio 網頁

一個結合 Next.js 和 Notion 的 Instagram Link in Bio 網頁，讓你可以隨時在 Notion 編輯內容，網站自動更新。

## 🎯 功能特性

- ✅ 自動從 Notion 讀取課程資訊、學習資源、好康分享
- ✅ 無需編程知識，直接在 Notion 編輯內容
- ✅ 響應式設計，手機和桌面都完美顯示
- ✅ 一鍵部署到 Vercel
- ✅ 高效的頁面載入

## 📝 內容區塊

1. **個人介紹** - 頭像、名稱、個人標語
2. **快速操作** - LINE 官方帳號按鈕、課程查看
3. **目前開課班級** - 課程資訊、報名連結
4. **韓文學習資源** - Notion 連結集合
5. **好康分享** - 推薦商品、優惠、好文

## 🚀 快速開始

### 前置要求
- GitHub 帳號
- Notion 帳號

### 設置步驟

1. **建立 Notion 資料庫** - 參考 [NOTION_SETUP.md](./NOTION_SETUP.md)
2. **部署到 Vercel** - 參考 [DEPLOYMENT.md](./DEPLOYMENT.md)
3. **在 Notion 編輯內容** - 網站自動更新

## 💻 本地開發

```bash
# 安裝依賴
npm install

# 設置環境變數
# 複製 .env.local 中的環境變數並填入你的 Notion API Key 和資料庫 ID

# 開發伺服器
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

## 📚 文件

- [NOTION_SETUP.md](./NOTION_SETUP.md) - Notion 資料庫設置指南
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Vercel 部署指南

## 🛠️ 技術棧

- [Next.js](https://nextjs.org) - React 框架
- [TypeScript](https://www.typescriptlang.org) - 類型安全
- [Tailwind CSS](https://tailwindcss.com) - 樣式設計
- [Notion API](https://developers.notion.com) - 內容管理

## 📄 授權

MIT License

---

Made with 🍯 by 蔚樺 웨이화
