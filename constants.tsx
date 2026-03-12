import heroImg from "./assets/warrant_hero.png";
import methodImg from "./assets/warrant_method.png";
import chaptersImg from "./assets/warrant_chapters.png";
import skillsImg from "./assets/warrant_skills.png";
import appIntroImg from "./assets/warrant_app_intro.png";
import shop1 from "./assets/商店頁-1.png";
import shop2 from "./assets/商店頁-2.png";
import shop3 from "./assets/商店頁-3.png";
import gold1 from "./assets/藍金_01.png";
import gold2 from "./assets/藍金_02.png";
import gold3 from "./assets/藍金_03.png";
import gold4 from "./assets/藍金_04.png";
import gallery1 from "./assets/LINE_NOTE_260309_1.jpg";
import gallery2 from "./assets/LINE_NOTE_260309_2.jpg";
import gallery3 from "./assets/LINE_NOTE_260309_3.jpg";
import gallery4 from "./assets/LINE_NOTE_260309_4.jpg";
import gallery5 from "./assets/LINE_NOTE_260309_5.jpg";
import gallery6 from "./assets/LINE_NOTE_260309_6.jpg";
import gallery7 from "./assets/LINE_NOTE_260309_7.jpg";
import gallery8 from "./assets/LINE_NOTE_260309_8.jpg";

export const CTA_LINK = "https://www.cmoney.tw/cashflow/Index.aspx?platform=1";

export const CASHFLOW_DOMAIN = "https://www.cmoney.tw/";

export const HERO_IMAGE = heroImg;

export const LOGO_URL =
  "https://www.cmoney.tw/course-media/_nuxt/img/logo.ef6c96d.svg";

export const COURSE_DURATION_INFO = "VVIP 進階版 4 章 | 永久觀看 影音課程";

export const APP_VIP_LONG_IMAGE = appIntroImg;

// 講師相關
export const LECTURER_BIO =
  "物理老師化身千萬散戶傳奇。只花七個月，用10萬滾出1,000萬。投資比賽常勝軍，並贏來頂級名車。社群頻道超過20萬粉絲追蹤。【理財達人秀】常駐嘉賓，擁有千萬觀看次數。";

// 實戰講座跑馬燈照片
export const LECTURER_GALLERY = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
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
    title: "【免費直播】權證小哥-高勝率處置策略線上體驗課",
    dateStr: "3/19 (四)",
    timeStr: "21:00 - 22:00",
    targetDate: "2026-03-19T21:00:00",
    originalPrice: 6000,
    discountPrice: 0,
    url: "https://www.cmoney.tw/datasite/shoppingcar.ashx?action=checkout&productType=777004&functionid=3043",
    productType: 777004,
    functionId: 3043,
  },
  {
    id: 2,
    title: "【免費直播】權證小哥-高勝率處置策略線上體驗課",
    dateStr: "3/26 (四)",
    timeStr: "21:00 - 22:00",
    targetDate: "2026-03-26T21:00:00",
    originalPrice: 6000,
    discountPrice: 0,
    url: "https://www.cmoney.tw/datasite/shoppingcar.ashx?action=checkout&productType=777004&functionid=3044",
    productType: 777004,
    functionId: 3044,
  },
  {
    id: 3,
    title: "【免費直播】權證小哥-高勝率處置策略線上體驗課",
    dateStr: "4/09 (四)",
    timeStr: "21:00 - 22:00",
    targetDate: "2026-04-09T21:00:00",
    originalPrice: 6000,
    discountPrice: 0,
    url: "https://www.cmoney.tw/datasite/shoppingcar.ashx?action=checkout&productType=777004&functionid=3045",
    productType: 777004,
    functionId: 3045,
  },
];

export const COURSE_INCLUDES = [
  {
    id: 1,
    icon: "fas fa-desktop",
    title: "處置策略",
    subtitle: "完整線上課程",
    desc: ["基礎用法到進階策略一次搞懂"],
  },
  {
    id: 2,
    icon: "fas fa-mobile-alt",
    title: "處置神器APP一年VVIP權限",
    subtitle: "進階版",
    desc: ["知識很重要", "但沒工具就無法實行"],
  },
  {
    id: 3,
    icon: "fas fa-comments",
    title: "學員專屬Line群",
    subtitle: "",
    desc: ["交易是孤獨的", "這裡提供使用相同策略的同學一起交流"],
  },
];

export interface Feature {
  id: number;
  title: string;
  duration: string;
  points: string[];
}

export const COURSE_FEATURES: Feature[] = [
  { id: 1, title: "基本處置策略 — 掌握交易生存之道", duration: "", points: [] },
  { id: 2, title: "進階處置策略 — 洞悉主力控盤心理", duration: "", points: [] },
  { id: 3, title: "雙刀戰法實戰 — 獨家高勝率對鎖策略", duration: "", points: [] },
  { id: 4, title: "軟體畫面解析 — 細節功能應用攻略", duration: "", points: [] },
];

export const SKILLS: Feature[] = [
  { id: 1, title: "基本處置策略", duration: "掌握「一進聽」策略，精準判斷處置前的進退時機", points: [] },
  { id: 2, title: "監控主力控盤節奏", duration: "部份主力不會等到最後一天才動作，算出主力必閃躲的「關鍵日子」", points: [] },
  { id: 3, title: "多空對鎖技巧", duration: "利用相關係數篩選高度連動股，啟動「雙刀戰法」策略", points: [] },
  { id: 4, title: "處置神器 APP", duration: "教你正確利用工具，不用要懂艱澀的法規條文，直接從結果就能輔助判斷", points: [] },
];

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "我完全不懂處置股，這堂課會太難嗎？",
    answer:
      "一點都不難！課程從最基礎的處置規則開始教起，循序漸進帶你理解處置股的運作邏輯，再進入進階策略與實戰應用，即使零經驗也能輕鬆上手。",
  },
  {
    id: 2,
    question: "處置神器APP要怎麼使用？課程會教嗎？",
    answer:
      "會！課程第四章「軟體畫面解析」會完整示範處置神器APP的每個功能與操作細節，讓你從安裝到實戰應用一次搞懂。",
  },
  {
    id: 3,
    question: "課程可以反覆觀看嗎？",
    answer:
      "沒問題！線上課程提供永久觀看權限，你可以依照自己的節奏隨時回放、複習策略，直到完全掌握為止。",
  },
  {
    id: 4,
    question: "買了課程後，遇到問題可以問誰？",
    answer:
      "加入課程後會進入學員專屬Line群，可以隨時提問、交流操作心得，權證小哥團隊也會在群裡協助解答。",
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
    title: "處置日報",
    subtitle: "預測準確度高達99%，不必懂計算，只要看答案",
    imgUrl: shop1,
  },
  {
    id: 2,
    title: "處置統計",
    subtitle: "獨家統計5分/20分處置股，清楚揭示「先跌後踩」的股價黃金週期",
    imgUrl: shop2,
  },
  {
    id: 3,
    title: "注意停看聽",
    subtitle: "用燈號辨識危險性",
    imgUrl: shop3,
  },
];

export const PROBLEMS = [
  {
    title: "買入強勢股",
    desc: "隔天卻被公告處置",
    img: heroImg,
    numberImg: gold1,
  },
  {
    title: "資金被鎖死",
    desc: "無能為力只能乾等",
    img: methodImg,
    numberImg: gold2,
  },
  {
    title: "不懂處置規則",
    desc: "錯過大好行情",
    img: chaptersImg,
    numberImg: gold3,
  },
  {
    title: "主力動向難判斷",
    desc: "不知道該跟還是該跑",
    img: skillsImg,
    numberImg: gold4,
  },
];
