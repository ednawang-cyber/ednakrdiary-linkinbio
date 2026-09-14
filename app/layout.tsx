import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "蔚樺 웨이화 | 韓語蜂蜜罐",
  description: "透過韓綜、美食和日常故事，把韓文變得有趣又好記。加入韓語蜂蜜罐，發現韓文秘訣！",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "蔚樺 웨이화 | 韓語蜂蜜罐",
    description: "透過韓綜、美食和日常故事學習韓文",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-TW"
      className={`${playfairDisplay.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50">{children}</body>
    </html>
  );
}
