# 蔚樺 웨이화 | 韓語蜂蜜罐

優雅簡約的 Instagram Link in Bio 網頁，由 Notion 資料庫支援的動態內容管理系統。

## 🎯 功能特性

- ✨ **極簡優雅設計** - 米白背景、Serif 字體、細線分隔
- 🔗 **Notion 整合** - 在 Notion 編輯內容，自動同步到網站
- 🚀 **5 分鐘快速部署** 到 Vercel
- 📱 **完全響應式** - 手機和桌面都完美顯示
- 🎨 **大氣排版** - 大間距、圓形頭像、分級式排版
- 🔄 **自動更新** - 編輯 Notion 後 5 分鐘內自動同步

## 📝 主要內容區塊

1. **個人介紹** - 圓形頭像、名稱、背景故事
2. **快速操作** - LINE 官方帳號、課程查看
3. **目前開課班級** - 課程詳情與報名連結
4. **韓文學習資源** - 精選資源集合
5. **好康分享** - 推薦商品和優惠

## 🚀 快速開始

### 1. 設定 Notion 資料庫

1. 查看 [NOTION_SETUP.md](./NOTION_SETUP.md) 完整指南
2. 建立 Notion 集成
3. 建立三個資料庫：課程、資源、好康
4. 複製資料庫 ID 和 API 金鑰

### 2. 配置環境變數

1. 複製環境變數範例
   ```bash
   cp .env.local.example .env.local
   ```

2. 編輯 `.env.local` 填入 Notion 信息
   ```
   NOTION_API_KEY=your-api-key
   NOTION_DATABASE_ID_COURSES=your-courses-db-id
   NOTION_DATABASE_ID_RESOURCES=your-resources-db-id
   NOTION_DATABASE_ID_DEALS=your-deals-db-id
   ```

詳見 [NOTION_SETUP.md](./NOTION_SETUP.md)

## 💻 本地開發

### 安裝依賴
```bash
npm install
```

### 設定環境變數

複製範例並配置：
```bash
cp .env.local.example .env.local
# 編輯 .env.local 並填入 Notion 信息
```

### 啟動開發伺服器
```bash
npm run dev
```

訪問 [http://localhost:3000](http://localhost:3000) 查看結果。

您在 Notion 中的修改會在 5 分鐘內自動同步。

## 📁 文件結構

```
ednakrdiary-linkinbio/
├── app/
│   ├── page.tsx              # 主頁面
│   ├── api/
│   │   └── content/
│   │       └── route.ts      # 內容 API (從 Notion 讀取)
│   ├── layout.tsx            # 根佈局
│   └── globals.css           # 全局樣式
├── lib/
│   └── notion.ts             # Notion 集成
├── data/
│   └── content.json          # 備用內容資料
├── public/
│   └── images/
│       └── avatar.jpg        # 頭像
├── .env.local.example        # 環境變數範例
├── DEPLOYMENT.md             # 部署指南
├── NOTION_SETUP.md           # Notion 設置指南
├── README.md                 # 本說明文件
└── QUICKSTART.md             # 快速開始指南
```

## 🎨 設計特色

### 美學
- **背景色**：米白色（#faf8f3）
- **字體**：Playfair Display（標題）+ Lora（正文）
- **分隔線**：細線（1px）
- **按鈕風格**：簡約黑白配色，悸動效果

### 排版
- 大量留白，視覺呼吸感
- 英文字母間距大（letter-spacing）
- 圓形頭像配淡色背景
- 分級式標題排版

## 🔐 安全性

- `.env.local` 已列入 `.gitignore`，不會上傳
- Notion API 金鑰安全存儲在環境變數中
- 生產環境中 API 金鑰絕不會暴露到客戶端

## 📚 相關文檔

- [NOTION_SETUP.md](./NOTION_SETUP.md) - Notion 詳細設置指南
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Vercel 部署指南
- [QUICKSTART.md](./QUICKSTART.md) - 快速開始指南

## 🛠️ 技術棧

- **框架**：[Next.js 16](https://nextjs.org)
- **語言**：[TypeScript](https://www.typescriptlang.org)
- **樣式**：[Tailwind CSS 4](https://tailwindcss.com)
- **字體**：[Google Fonts](https://fonts.google.com)
- **CMS**：[Notion](https://www.notion.so) + [Notion API](https://developers.notion.com)

## 📜 授權

MIT License

---

Made with 🍯 by 蔚樺 웨이화
