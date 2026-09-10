# 部署到 Vercel - 超簡單指南

## 📋 前置要求
- GitHub 帳號
- 本地已編輯好 `data/content.json`

## 🚀 5 分鐘快速部署

### 步驟 1️⃣ : 上傳到 GitHub

1. 打開終端，進入項目目錄
2. 在 GitHub 建立新倉庫：https://github.com/new
   - 名稱：`ednakrdiary-linkinbio`
   - 創建倉庫

3. 複製 HTTPS 連結，執行：
```bash
git remote add origin https://github.com/YOUR_USERNAME/ednakrdiary-linkinbio.git
git branch -M main
git push -u origin main
```

### 步驟 2️⃣ : 部署到 Vercel

1. 進入 https://vercel.com
2. 用 Google 帳號登入
3. 點擊「Add New」→「Project」
4. 選擇「Import Git Repository」
5. 選擇 `ednakrdiary-linkinbio`
6. 點擊「Deploy」

**完成！** ✅ 1-2 分鐘後會有部署成功的網址

## 📝 更新內容

編輯 `data/content.json` 後：

```bash
git add data/content.json
git commit -m "Update content"
git push
```

Vercel 會自動重新部署！🚀

## 🔄 編輯 data/content.json 範例

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
  "resources": [
    {
      "id": "1",
      "title": "韓文文法講解",
      "description": "初級常用文法",
      "category": "文法",
      "link": "https://notion.so/...",
      "image": ""
    }
  ],
  "deals": [
    {
      "id": "1",
      "title": "推薦韓文書",
      "description": "新手必讀",
      "link": "https://博客來.com",
      "image": ""
    }
  ]
}
```

## 🎯 檢查清單

- [ ] 編輯好 `data/content.json`
- [ ] 推送到 GitHub
- [ ] Vercel 部署完成
- [ ] 訪問網址檢查內容是否正確
- [ ] LINE 按鈕可以點擊
- [ ] 課程資訊顯示正確

## ❌ 常見問題

**Q: 編輯後沒有立即更新？**
A: 需要重新部署。推送到 GitHub 後，Vercel 會自動部署（需要等待 1-2 分鐘）

**Q: 如何查看部署狀態？**
A: 在 Vercel Dashboard 點擊 Project，看「Deployments」標籤

**Q: JSON 格式有誤怎麼辦？**
A: 檢查是否有漏掉逗號或引號。可以用線上 JSON 驗證工具檢查

---

就這麼簡單！Happy coding! 🍯
