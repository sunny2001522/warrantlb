export const CTA_LINK = "https://www.cmoney.tw/cashflow/Index.aspx?platform=1";

export const CASHFLOW_DOMAIN = "https://www.cmoney.tw/";

export const HERO_IMAGE =
  "https://www.cmoney.tw/app/cmstatic/media/course-introduction/3080d085-b998-4c94-80d4-ab308725cac0638960356613287970.jpg";

export const LOGO_URL =
  "https://www.cmoney.tw/course-media/_nuxt/img/logo.ef6c96d.svg";

export const COURSE_DURATION_INFO = "30 單元 × 400 分鐘 | 永久觀看 影音課程";

export const APP_VIP_LONG_IMAGE =
  "https://www.cmoney.tw/app/cmstatic/media/course-introduction/6bE2E2pQ9AnrXz3wU2VnC2.jpg";

// 講師相關
export const LECTURER_BIO =
  "專職交易人，28年全球投資經驗，單月最高創下7億元交易量，個股獲利最高1015%。推廣「超簡單投資法14年，致力於用最簡單的策略，幫助大家創造不簡單的報酬，受惠學員逾 15,000 名。";

export const LECTURER_BOOKS = [
  {
    title: "極簡投資",
    img: "assets/book br.png",
  },
  {
    title: "超簡單投資法",
    img: "assets/book gr.png",
  },
];

// 實戰講座跑馬燈照片
export const LECTURER_GALLERY = [
  "https://meee.com.tw/RYRxenp.png",
  "https://meee.com.tw/hKTNrR9.png",
  "assets/LECTURER1.jpg",
  "https://meee.com.tw/iB9mFTK.png",
  "https://meee.com.tw/ICBbLMb.png",
];

// 課程報名卡片資訊
export interface RegistrationInfo {
  id: number;
  title: string;
  dateStr: string;
  timeStr: string;
  targetDate: string;
  originalPrice: number;
  discountPrice: number;
  url: string;
  productType: number;
  functionId: number;
}

export const REGISTRATION_EVENTS: RegistrationInfo[] = [
  {
    id: 1,
    title: "林恩如【美股致富聖經】｜線上體驗課 ",
    dateStr: "2026年03月10日 (二)",
    timeStr: "19:00 - 21:00",
    targetDate: "2026-03-10T19:00:00",
    originalPrice: 8888,
    discountPrice: 0,
    url: "https://www.cmoney.tw/classes/classdetail/3012",
    productType: 777004,
    functionId: 3012,
  },





























  
];






export const COURSE_INCLUDES = [
  {
    id: 1,
    icon: "fas fa-desktop",
    title: "400分鐘 線上課程",
    subtitle: "系統性教學",
    desc: ["掌握7x4x3x1公式", "從零建構美股交易系統"],
  },
  {
    id: 2,
    icon: "fas fa-flag-usa",
    title: "美股聚寶盆APP年一年VIP權限",
    subtitle: "強大的工具支援",
    desc: ["星級模型、獨創指標選股", "鎖定強勢股，錢進美股。"],
  },
  {
    id: 3,
    icon: "fas fa-users",
    title: "學員專屬社團",
    subtitle: "社群共學成長",
    desc: ["隨時提問、助教解惑", "學員交流操作心得"],
  },
];

export interface Feature {
  id: number;
  title: string;
  duration: string;
  points: string[];
}

export const COURSE_FEATURES: Feature[] = [
  { id: 1, title: "為什麼要投資美股", duration: "35 mins", points: [] },
  { id: 2, title: "美股新手迷思破解", duration: "50 mins", points: [] },
  { id: 3, title: "美股市場必修規則", duration: "35 mins", points: [] },
  { id: 4, title: "開戶與下單方式", duration: "45 mins", points: [] },
  { id: 5, title: "超簡單美股四大法寶", duration: "120 mins", points: [] },
  {
    id: 6,
    title: "APP 實戰篇：從選股到操作一次懂",
    duration: "60 mins",
    points: [],
  },
  { id: 7, title: "美股交易心法", duration: "15 mins", points: [] },
  { id: 8, title: "資產配置與風險控管", duration: "20 mins", points: [] },
  { id: 9, title: "投資是一輩子的旅程(結語)", duration: "15 mins", points: [] },
];

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "我是美股小白、完全沒有經驗，這堂課會太難嗎？",
    answer:
      "一點都不難！這堂體驗課正是為了想跨出第一步的你設計的。我們會撇開複雜的數據與專用語，從最基礎的投資觀念帶你一步步踏入美股市場，讓你發現美股其實可以很簡單。",
  },
  {
    id: 2,
    question: "老師會教怎麼實際用 App 選股嗎？",
    answer:
      "老師會透過直播親自操作「美股聚寶盆」App 示範選股邏輯。你會看到老師如何利用獨創的「星級模型快速鎖定強勢股，完整呈現工具化繁為簡的力量。",
  },
  {
    id: 3,
    question: "課程可以反覆學習嗎？萬一當天沒時間看直播怎麼辦？",
    answer:
      "沒問題！線上課程提供終生反覆觀看的權利。你可以依照自己的節奏隨時回放、複習心法，直到學到會、學到好為止。",
  },
  {
    id: 4,
    question: "如果遇到問題，可以跟老師互動嗎？",
    answer:
      "投資路上你不孤單！加入課程後將有學員專屬社團，老師會在這裡陪伴大家、解答疑惑，讓你在建立獲利模式的路上更有信心。",
  },
];

export interface AppVIPFeature {
  id: number;
  title: string;
  subtitle: string;
  imgUrl: string;
}

export const APP_VIP_FEATURES: AppVIPFeature[] = [
  {
    id: 1,
    title: "快速瀏覽每週精選股",
    subtitle: "追蹤強勢股掌握主流趨勢",
    imgUrl: "https://meee.com.tw/nSnHm1j.png",
  },
  {
    id: 2,
    title: "星級評價選潛力股",
    subtitle: "星級模型快速辨識強勢潛力個股",
    imgUrl: "https://meee.com.tw/0JMGSJs.png",
  },
  {
    id: 3,
    title: "大錢線 x 紫金值",
    subtitle: "精準掌握低檔佈局的黃金時機",
    imgUrl: "https://meee.com.tw/CYB5PvD.png",
  },
  {
    id: 4,
    title: "提供新手教學園地",
    subtitle: "影音實戰教學強化投資實力",
    imgUrl: "https://meee.com.tw/k6KYXK7.png",
  },
];

export const PROBLEMS = [
  {
    title: "頂尖企業千百家",
    desc: "總選不出好標的",
    img: "https://meee.com.tw/kOlLg2v.png",
  },
  {
    title: "開戶好像很麻煩",
    desc: "沒時間心力研究",
    img: "https://meee.com.tw/E1lJBZr.png",
  },
  {
    title: "聽說投資門檻高",
    desc: "不知道從哪開始",
    img: "https://meee.com.tw/b0wXny1.png",
  },
  {
    title: "消息一來就心慌",
    desc: "市場局勢霧煞煞",
    img: "https://meee.com.tw/9O1zy0k.png",
  },
];
