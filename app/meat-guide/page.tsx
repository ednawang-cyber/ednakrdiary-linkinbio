import Link from "next/link";

export const metadata = {
  title: "肉品部位圖 | 韓語蜂蜜罐",
};

const images = [
  { src: "/meat/beef-cuts.webp", alt: "소고기 부위도 牛肉分布圖" },
  { src: "/meat/pork-cuts.webp", alt: "돼지고기 부위도 豬肉分布圖" },
];

export default function MeatGuidePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#faf8f3" }}>
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link
          href="/#resources"
          className="text-xs text-stone-500 font-serif hover:text-stone-800 transition"
        >
          ← 返回首頁
        </Link>

        <div className="mt-8 mb-12">
          <h1 className="text-3xl font-serif text-stone-900 mb-4">
            肉品部位圖
          </h1>
          <div className="w-16 h-px bg-stone-400"></div>
        </div>

        <div className="space-y-12">
          {images.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className="w-full h-auto border border-stone-300"
            />
          ))}
        </div>

        <div className="mt-12 border border-stone-300 p-6 md:p-8 text-sm text-stone-700 leading-loose whitespace-pre-line">
          {`這兩張圖片歡迎大家截圖或是存在手機裡！
部位的名稱會以台灣人習慣的講法來寫
吃貨如我雖然參考了很多資料
可能會有一些錯誤的地方
也請對肉品非常了解的朋友們留言告訴我們更多唷！

*如果單字及部位有誤，歡迎大家不吝回覆`}
        </div>
      </div>
    </main>
  );
}
