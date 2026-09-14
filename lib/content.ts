export const siteConfig = {
  name: "蔚樺",
  koreanName: "웨이화",
  brandName: "韓語蜂蜜罐",
  bio: `一位透過各種學習方式學韓文的台灣女子
成均館交換 → 教育部獎學金 → 大邱大學語學堂結業
現在，我用韓綜、美食和日常故事，把韓文變得有趣又好記
跟著我，蜂蜜罐裡的韓文秘訣等你來發現 🍯`,
  avatarUrl: "/images/avatar.jpg",
  lineLink: "https://line.me/R/ti/p/@942pdsee",
  button1Text: "加入 LINE 預約一對一課程",
  button2Text: "查看目前開課班級",
  bgColor: "#faf8f3",
  button1Color: "#000000",
  button2Color: "#d3d3d3",
};

export const courses = [
  {
    id: "course-1",
    day: "週二",
    time: "20:00-21:30",
    level: "一級",
    name: "初級密集班",
    availableSpots: 1,
    description: "此班級發音已教完，進入一級基礎文法！實際進度及報名請私訊老師",
    registrationLink: "https://line.me/R/ti/p/@942pdsee",
  },
  {
    id: "course-2",
    day: "週三",
    time: "21:00-22:30",
    level: "零基礎",
    name: "零基礎密集班",
    availableSpots: 0,
    description: "目前已滿班",
    registrationLink: "https://line.me/R/ti/p/@942pdsee",
  },
  {
    id: "course-3",
    day: "週四",
    time: "20:00-21:30",
    level: "三級",
    name: "三級密集班",
    availableSpots: 2,
    description: "此班級為中級班！實際進度及報名請私訊老師",
    registrationLink: "https://line.me/R/ti/p/@942pdsee",
  },
];

export const resources = [
  {
    id: "resource-construction",
    title: "施工中",
    category: "Coming Soon",
    description: "敬請期待更多學習資源...",
    link: "#",
    image: null,
  },
];

export const deals = [
  {
    id: "deal-construction",
    title: "施工中",
    description: "敬請期待好康分享...",
    link: "#",
    image: null,
  },
];
