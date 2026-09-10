# 蔚樺 웨이화 | 韓語蜂蜜罐 - Link in Bio 網頁

最簡單的 Instagram Link in Bio 網頁！編輯 JSON 檔案就能更新內容，無需複雜的後台系統。

## 🎯 功能特性

- ✅ 超簡單編輯方式 - 只需改 JSON 檔案
- ✅ 無需外部服務（無需 Notion、Firebase 等）
- ✅ 5分鐘快速部署到 Vercel
- ✅ 響應式設計，手機和桌面都完美顯示
- ✅ 高效的頁面載入

## 📝 內容區塊

1. **個人介紹** - 頭像、名稱、個人標語
2. **快速操作** - LINE 官方帳號按鈕、課程查看
3. **目前開課班級** - 課程資訊、報名連結
4. **韓文學習資源** - 資源連結集合
5. **好康分享** - 推薦商品、優惠、好文

## ⚡ 編輯內容

編輯這個檔案：`data/content.json`

```json
{
  "courses": [
    {
      "id": "1",
      "name": "零基礎班",
      "day": "週二",
      "level": "零基礎",
      "time": "20:00-21:30",
      "availableSpots": 1,
      "description": "目前進度及報名請私訊老師詢問",
      "registrationLink": ""
    }
  ],
  "resources": [...],
  "deals": [...]
}
```

改好後，執行：
```bash
git add data/content.json
git commit -m "Update content"
git push
```

Vercel 會自動重新部署！

## 🚀 快速開始

### 前置要求
- GitHub 帳號
- Vercel 帳號（或用 Google 登入）

### 部署步驟

1. **上傳代碼到 GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ednakrdiary-linkinbio.git
   git push -u origin main
   ```

2. **部署到 Vercel**
   - 進入 https://vercel.com
   - 用 Google 帳號登入
   - Import GitHub Repository
   - 選擇 `ednakrdiary-linkinbio`
   - 點擊 Deploy！

完成！🎉

## 💻 本地開發

```bash
# 安裝依賴
npm install

# 開發伺服器
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

## 📁 文件結構

```
ednakrdiary-linkinbio/
├── data/
│   └── content.json      # 編輯這個檔案！
├── app/
│   └── page.tsx          # 主頁面
├── public/
│   └── images/
│       └── avatar.jpg    # 你的頭像
└── README.md
```

## 🛠️ 技術棧

- [Next.js](https://nextjs.org) - React 框架
- [TypeScript](https://www.typescriptlang.org) - 類型安全
- [Tailwind CSS](https://tailwindcss.com) - 樣式設計

## 📄 授權

MIT License

---

Made with 🍯 by 蔚樺 웨이화
