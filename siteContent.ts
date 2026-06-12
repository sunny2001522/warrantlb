// 權證小哥官網 — 全站內容資料層
// 結構仿照 enru 專案的 constants.tsx / softwareContent.ts
// 資料來源: CMoney 理財寶商品頁、App Store/Google Play、dispostock-web 專案資料、
//          YouTube、Facebook、媒體報導 (2026-06 查證)

/* ───────────────────────── 講師檔案 ───────────────────────── */

export const EXPERT_NAME = "權證小哥";
export const EXPERT_TAGLINE = "破解主力籌碼 × 精通金融商品";

export const EXPERT_INTRO =
  "素人起家的專職交易人。國立大學科學教育系畢業、曾任學校老師,歷經三次本金歸零的挫敗後," +
  "在 2009 年台股多頭行情中,以僅存的 10 萬元本金搭配高槓桿的「權證」操作,滾出千萬資產、達成財務自由。" +
  "交易核心鎖定「籌碼流向」與「量價結構」,強項是破解主力大戶的交易手法,並以公開真實對帳單的方式教學。";

export interface StatItem {
  value: string;
  label: string;
  icon: string; // Font Awesome class
}

export const EXPERT_STATS: StatItem[] = [
  { value: "21萬+", label: "Facebook 粉絲", icon: "fab fa-facebook-f" },
  { value: "9萬+", label: "YouTube 訂閱", icon: "fab fa-youtube" },
  { value: "6 本", label: "暢銷著作", icon: "fas fa-book" },
  { value: "10萬→千萬", label: "權證實戰績效", icon: "fas fa-chart-line" },
];

export interface TimelineItem {
  period: string;
  title: string;
  desc: string;
}

export const EXPERT_TIMELINE: TimelineItem[] = [
  {
    period: "起點",
    title: "理工出身的學校老師",
    desc: "國立大學科學教育系畢業,沒有財經背景,曾是朝九晚五的上班族,飽受薪水追不上生活成本的煎熬。",
  },
  {
    period: "低谷",
    title: "三次本金歸零",
    desc: "初入市場連續經歷三次血本無歸,卻也從失敗中養成對主力籌碼的洞察與對金融商品規則的徹底研究。",
  },
  {
    period: "2009",
    title: "10 萬元滾出千萬資產",
    desc: "台股多頭行情中,以僅存的 10 萬元本金搭配高槓桿權證操作,七個月滾出千萬資產,正式成為全職交易員。",
  },
  {
    period: "現在",
    title: "全職交易人・財經講師・暢銷作家",
    desc: "出版六本著作、開發多套籌碼工具,於財訊、Smart 智富撰寫專欄,受邀至台大、清大與各大券商、證交所、CME 授課。",
  },
];

export const EXPERT_AWARDS: string[] = [
  "2009 寶來權證百萬挑戰賽 冠軍",
  "2010 寶來權證百萬汽車得主",
  "2010 元大權證百萬大富翁 第一名",
  "2010 元大權證獲利大富翁 第二名",
  "2010 元大權證壓寶大富翁 第一名",
  "永豐金權證比賽 傑出頂尖獎",
  "六大券商合辦 月獲利王・桂冠獎",
];

export const EXPERT_EXPERIENCES: string[] = [
  "CMoney 理財寶 資深講師",
  "財訊、Smart 智富 專欄作家",
  "CME 芝加哥商品交易所 講師",
  "台灣證券交易所 講師",
  "台大、清大、台北大學等校園講座講師",
  "永豐金、元富等券商特約講師",
  "【理財達人秀】常駐嘉賓,節目累積千萬觀看",
];

export interface BookItem {
  title: string;
  subtitle?: string;
  accent: string; // tailwind gradient classes for the cover card
}

export const EXPERT_BOOKS: BookItem[] = [
  { title: "權證小哥教你十萬元變千萬", accent: "from-[#7a5c1e] to-[#2a1f08]" },
  { title: "權證小哥完全公開權證暴賺勝經", accent: "from-[#8b0000] to-[#2a0808]" },
  { title: "權證小哥贏家的智計", accent: "from-[#1a3a6a] to-[#080c14]" },
  { title: "權證小哥 權證進階交易技巧", accent: "from-[#2d5a3d] to-[#0a1f12]" },
  { title: "權證小哥:股市致勝交易筆記", accent: "from-[#5a3d7a] to-[#150a1f]" },
  {
    title: "權證小哥短線終極戰法",
    subtitle: "4 大策略 × 6 種工具 × 68 個實戰案例",
    accent: "from-[#a06010] to-[#1f1205]",
  },
];

export const PHILOSOPHY_PILLARS = [
  {
    icon: "fas fa-water",
    title: "籌碼流向",
    desc: "不做基本面研究,每天追蹤關鍵分點與主力大戶的籌碼變化,看懂大戶豆腐怎麼吃。",
  },
  {
    icon: "fas fa-chart-bar",
    title: "量價結構",
    desc: "從成交量與價格結構辨識主力意圖,把複雜的主力手法拆解成可重複執行的 SOP。",
  },
  {
    icon: "fas fa-file-invoice-dollar",
    title: "真實對帳單",
    desc: "真槍實彈教學,公開真實獲利對帳單驗證策略,不講理論、只教市場上驗證過的方法。",
  },
] as const;

/* ───────────────────────── 軟體工具 (三大產品線) ───────────────────────── */

import dispoIcon from "./assets/tools/dispo-icon.jpg";
import dispoShot from "./assets/disposition/mobile/1-1.png";
import omniIcon from "./assets/tools/omni-icon.jpg";
import omniShot1 from "./assets/tools/omni-shot1.jpg";
import omniShot2 from "./assets/tools/omni-shot2.jpg";
import daytradeIcon from "./assets/tools/daytrade-icon.jpg";
import daytradeShot1 from "./assets/tools/daytrade-shot1.jpg";
import daytradeShot2 from "./assets/tools/daytrade-shot2.jpg";

export interface ToolCardData {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  href: string; // internal route or external url
  external: boolean;
  cta: string;
  theme: string; // tailwind gradient
  icon: string;
  iconImg: string; // APP 官方圖示
  screenshot?: string; // APP 截圖
  badge?: string;
}

export const TOOL_CARDS: ToolCardData[] = [
  {
    title: "處置神器",
    subtitle: "處置股預測・監控 APP",
    description:
      "明日處置預測準確度高達 99%,不必懂計算、只要看答案。每日處置日報、八段燈號監控、處置統計大數據與獨家「雙刀戰法」,把處置股風險化為獲利機會。",
    features: ["明日必關股提前一日掌握", "處置統計三大樣本(全樣本/近20日/近5日)", "雙刀戰法完整資料", "App Store 4.9 ★ 評價"],
    href: "/about/DispositionGod",
    external: false,
    cta: "了解處置神器",
    theme: "from-[#1a3a6a] via-[#10182a] to-[#0a1228]",
    icon: "fas fa-gavel",
    iconImg: dispoIcon,
    screenshot: dispoShot,
    badge: "小哥團隊出品",
  },
  {
    title: "全方位盤中監控 APP",
    subtitle: "主力大戶下單監控",
    description:
      "全方位 APP 融合電腦版三大軟體,獨家「主力流水牆」幫助您一眼看出主力盤中多空方向,加權指數與台指期推播、國際股市資料一手掌握。",
    features: ["獨家主力流水牆", "融合電腦版三大軟體", "加權指數・台指期即時推播", "國際股市資料"],
    href: "/software/omni-monitor",
    external: false,
    cta: "了解全方位監控",
    theme: "from-[#2d5a3d] via-[#0e1f15] to-[#0a1228]",
    icon: "fas fa-desktop",
    iconImg: omniIcon,
    screenshot: omniShot1,
    badge: "小哥團隊出品",
  },
  {
    title: "當沖飆股神手",
    subtitle: "你最實用的當沖工具",
    description:
      "協助判斷股價高低點的當沖軟體。獨家燈號亮起看出主力攻擊方向,16 種策略找出多空強弱勢股,14 項關鍵技術指標監控資金流向。",
    features: ["獨家燈號看主力攻擊方向", "16 種多空強弱勢股策略", "14 項關鍵技術指標", "小哥免費教學影片"],
    href: "/software/day-trade",
    external: false,
    cta: "了解當沖飆股神手",
    theme: "from-[#7a2e1e] via-[#241008] to-[#0a1228]",
    icon: "fas fa-bolt",
    iconImg: daytradeIcon,
    screenshot: daytradeShot1,
    badge: "小哥團隊出品",
  },
];

/* ─────────────── 工具獨立頁資料 (仿 enru ProductPageData) ─────────────── */

export interface ToolPageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  iconImg: string; // APP 官方圖示
  screenshots: string[]; // APP 截圖
  heroTheme: string; // gradient classes
  summaryCards: { label: string; value: string; detail: string }[];
  features: { icon: string; title: string; desc: string }[];
  pricing: { plan: string; price: string; original?: string; note?: string; highlight?: boolean }[];
  purchaseHref: string;
  storeLinks: { label: string; icon: string; url: string }[];
  disclaimer?: string;
}

export const OMNI_MONITOR_PAGE: ToolPageData = {
  slug: "omni-monitor",
  metaTitle: "全方位盤中監控 APP|獨家主力流水牆 - 權證小哥官網",
  metaDescription:
    "權證小哥-全方位盤中監控APP:融合電腦版三大軟體,獨家主力流水牆幫你一眼看出主力盤中多空方向,加權指數與台指期即時推播、國際股市資料。季訂 NT$2,688 起。",
  eyebrow: "OMNI INTRADAY MONITOR",
  title: "全方位盤中監控 APP",
  subtitle: "幫你監控主力大戶的好幫手",
  description:
    "全方位 APP 融合電腦版三大軟體,獨家「主力流水牆」幫助您一眼看出主力盤中多空方向。盤中即時監控主力大戶下單動態,第一時間掌握大單異動與關鍵價位。",
  icon: "fas fa-desktop",
  iconImg: omniIcon,
  screenshots: [omniShot1, omniShot2],
  heroTheme: "from-[#15402a] via-[#0d2418] to-[#0a1228]",
  summaryCards: [
    { label: "獨家功能", value: "主力流水牆", detail: "一眼看出主力多空方向" },
    { label: "整合", value: "3 套軟體", detail: "電腦版三大軟體融合" },
    { label: "推播", value: "即時", detail: "加權指數・台指期" },
  ],
  features: [
    { icon: "fas fa-stream", title: "獨家主力流水牆", desc: "主力大戶下單動態即時呈現,盤中多空方向一目了然。" },
    { icon: "fas fa-layer-group", title: "融合三大軟體", desc: "電腦版三大監控軟體功能整合進一支手機 APP。" },
    { icon: "fas fa-bell", title: "加權・台指期推播", desc: "大盤與台指期關鍵異動即時推播,不盯盤也不漏接。" },
    { icon: "fas fa-globe-asia", title: "國際股市資料", desc: "國際股市行情整合(2023/06 新增),全球連動一手掌握。" },
    { icon: "fas fa-bolt", title: "大單異動警示", desc: "盤中大單即時警示,跟上主力進出第一時間。" },
    { icon: "fas fa-sliders-h", title: "自訂監控條件", desc: "依自己的交易邏輯設定監控條件,把策略變成自動化燈號。" },
  ],
  pricing: [
    { plan: "季訂閱", price: "NT$2,688", original: "NT$3,888", highlight: true },
    { plan: "年訂閱", price: "NT$8,888", original: "NT$16,888" },
  ],
  purchaseHref: "https://www.cmoney.tw/app/itemcontent.aspx?id=2770",
  storeLinks: [
    { label: "App Store / Google Play", icon: "fas fa-mobile-alt", url: "https://www.cmoney.tw/app/itemcontent.aspx?id=2770" },
  ],
  disclaimer: "App 商店搜尋「全方位獨門監控」。提供免費試用,試用期後自動續訂;本商品為行動版 APP,不含電腦版軟體。",
};

export const DAY_TRADE_PAGE: ToolPageData = {
  slug: "day-trade",
  metaTitle: "當沖飆股神手 APP|獨家燈號×16策略×14指標 - 權證小哥官網",
  metaDescription:
    "權證小哥-當沖飆股神手APP:你最實用的當沖工具。獨家燈號看出主力攻擊方向、16 種多空強弱勢股策略、14 項關鍵技術指標監控資金流向,搭配小哥免費教學影片。季訂 NT$3,688 起。",
  eyebrow: "DAY TRADE MASTER",
  title: "當沖飆股神手",
  subtitle: "你最實用的當沖工具",
  description:
    "協助判斷股價高低點的當沖軟體。獨家燈號在走勢圖上亮起,看出主力攻擊方向與盤中轉折點;連次、連量分析搭配籌碼資金流向,支援多空雙向的當沖決策。",
  icon: "fas fa-bolt",
  iconImg: daytradeIcon,
  screenshots: [daytradeShot1, daytradeShot2],
  heroTheme: "from-[#5a2418] via-[#2e1208] to-[#0a1228]",
  summaryCards: [
    { label: "獨家燈號", value: "主力攻擊", detail: "走勢圖亮燈看轉折" },
    { label: "策略", value: "16 種", detail: "多空強弱勢股全覆蓋" },
    { label: "技術指標", value: "14 項", detail: "籌碼與資金流監控" },
  ],
  features: [
    { icon: "fas fa-traffic-light", title: "獨家燈號訊號", desc: "燈號亮起即看出主力攻擊方向,抓住盤中轉折點。" },
    { icon: "fas fa-chess", title: "16 種當沖策略", desc: "多頭、空頭市場的強勢股與弱勢股策略全覆蓋。" },
    { icon: "fas fa-tachometer-alt", title: "14 項關鍵指標", desc: "連次、連量、籌碼資金流向等核心指標即時監控。" },
    { icon: "fas fa-arrows-alt-v", title: "高低點判斷", desc: "協助判斷股價高低點,支援做多做空雙向決策。" },
    { icon: "fas fa-video", title: "小哥免費教學影片", desc: "內建小哥的免費教學影片,授人以漁學會方法。" },
    { icon: "fas fa-search", title: "盤後選股", desc: "兼具盤中當沖工具與盤後選股功能,一支 APP 兩種用法。" },
  ],
  pricing: [
    { plan: "季訂閱", price: "NT$3,688", original: "NT$6,000", note: "最熱門", highlight: true },
    { plan: "年訂閱", price: "NT$8,888", original: "NT$13,600" },
    { plan: "App 內月訂閱", price: "NT$1,490 / 月" },
  ],
  purchaseHref: "https://www.cmoney.tw/app/itemcontent.aspx?id=4776",
  storeLinks: [
    { label: "App Store", icon: "fab fa-apple", url: "https://apps.apple.com/tw/app/id1522218686" },
    { label: "Google Play", icon: "fab fa-google-play", url: "https://play.google.com/store/apps/details?id=com.cmoney.mrwarrantpocketstocks" },
  ],
  disclaimer: "App Store 4.3★(166 則評價)。提供免費試用,試用期後自動續訂;本商品為行動版 APP。",
};

/* ───────────────────────── 影音與社群 ───────────────────────── */

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@cng07151";
export const EBC_SHOW_CHANNEL_URL = "https://www.youtube.com/@EBCmoneyshow";

export interface VideoItem {
  title: string;
  desc: string;
  /** YouTube video id; 無 id 時連到頻道 */
  videoId?: string;
  tag: string;
}

export const TUTORIAL_SERIES: VideoItem[] = [
  {
    title: "新手教學 第一集|賺到第一桶金",
    desc: "小哥的起家故事:如何從 10 萬元本金,靠權證在多頭行情滾出第一桶金。",
    tag: "新手教學",
  },
  {
    title: "新手教學 第二集|如何分辨主力",
    desc: "用分點籌碼分辨主力與散戶,看懂大戶進出貨的足跡。",
    tag: "新手教學",
  },
  {
    title: "新手教學 第三集|強勢股為何也賠錢",
    desc: "追強勢股卻賠錢的原因解析:量價結構與進場時機的眉角。",
    tag: "新手教學",
  },
];

export const FEATURED_VIDEOS: VideoItem[] = [
  {
    title: "找出關鍵分點重押股,提升投資勝率!",
    desc: "教你用關鍵分點找出主力重押的股票,站在贏家那一邊。",
    videoId: "ItrLYbHQ_54",
    tag: "籌碼教學",
  },
  {
    title: "2 大分點追蹤基礎教學:關鍵分點、高手分點",
    desc: "分點追蹤入門:關鍵分點與高手分點的差異與用法。",
    videoId: "AFRm8G0L4bU",
    tag: "籌碼教學",
  },
  {
    title: "不再追高殺低!小哥帶你看懂主力籌碼,短線操作輕鬆賺!",
    desc: "破解追高殺低的散戶宿命,用主力籌碼做短線操作。",
    videoId: "VcylpXubjVY",
    tag: "短線戰法",
  },
];

/** 電視節目單元 (理財達人秀 EBCmoneyshow) */
export interface ShowItem {
  title: string;
  desc: string;
  url: string;
  icon: string;
}

export const YOUTUBE_SHOWS: ShowItem[] = [
  {
    title: "理財達人秀|權證小哥",
    desc: "東森《理財達人秀》常駐嘉賓,每集拆解盤面籌碼與處置股動態。",
    url: EBC_SHOW_CHANNEL_URL,
    icon: "fas fa-tv",
  },
  {
    title: "哥有籌必報",
    desc: "小哥的籌碼觀察固定單元,主力分點、大戶買賣超有籌必報。",
    url: EBC_SHOW_CHANNEL_URL,
    icon: "fas fa-bullhorn",
  },
];

/** CMoney 線上影音課程 (來源: dispostock-web courses 資料) */
export interface CourseItem {
  title: string;
  desc: string;
  url: string;
  tag: string;
}

export const CMONEY_COURSES: CourseItem[] = [
  {
    title: "處置神器 ✕ 進階雙刀處置策略",
    desc: "VVIP 專屬:處置股進階雙刀戰法完整教學。",
    url: "https://www.cmoney.tw/app/expert/warrantlb",
    tag: "VVIP 專屬",
  },
  {
    title: "權證小哥 ETF 套利 × 吃豆腐",
    desc: "6 小時 × 5 戰術多空雙賺 ft. 葉芷娟。",
    url: "https://www.cmoney.tw/app/expert/warrantlb",
    tag: "線上課程",
  },
  {
    title: "籌碼致勝!7 小時多空實戰新手班",
    desc: "從籌碼出發的多空實戰入門,新手也能跟上。",
    url: "https://www.cmoney.tw/app/expert/warrantlb",
    tag: "線上課程",
  },
  {
    title: "獲利為王!當沖新手全攻略",
    desc: "當沖入門到實戰的完整攻略課。",
    url: "https://www.cmoney.tw/app/expert/warrantlb",
    tag: "線上課程",
  },
];

export interface SocialLink {
  platform: string;
  handle: string;
  stat: string;
  url: string;
  icon: string;
  hoverColor: string; // tailwind hover bg class
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "Facebook",
    handle: "@warrantlb",
    stat: "21 萬+ 粉絲",
    url: "https://www.facebook.com/warrantlb/?locale=zh_TW",
    icon: "fab fa-facebook-f",
    hoverColor: "hover:bg-[#1877f2]",
  },
  {
    platform: "YouTube",
    handle: "@cng07151",
    stat: "9 萬+ 訂閱",
    url: YOUTUBE_CHANNEL_URL,
    icon: "fab fa-youtube",
    hoverColor: "hover:bg-red-600",
  },
  {
    platform: "Instagram",
    handle: "@warrant_lb",
    stat: "3 萬+ 追蹤",
    url: "https://www.instagram.com/warrant_lb/",
    icon: "fab fa-instagram",
    hoverColor: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]",
  },
  {
    platform: "Telegram",
    handle: "@stock168",
    stat: "8 千+ 訂閱",
    url: "https://t.me/stock168",
    icon: "fab fa-telegram-plane",
    hoverColor: "hover:bg-[#229ed9]",
  },
  {
    platform: "PressPlay",
    handle: "權證小哥的交易筆記本",
    stat: "籌碼分析訂閱專欄",
    url: "https://www.pressplay.cc/project/ED4E52D5B7157BF2E7BE3267FCE16238/about",
    icon: "fas fa-pen-nib",
    hoverColor: "hover:bg-[#d4af37]",
  },
  {
    platform: "CMoney 達人頁",
    handle: "warrantlb",
    stat: "理財寶專欄・工具",
    url: "https://www.cmoney.tw/app/expert/warrantlb",
    icon: "fas fa-user-tie",
    hoverColor: "hover:bg-[#d4af37]",
  },
];

/* ───────────────────────── 導覽列 ───────────────────────── */

export interface NavItem {
  label: string;
  shortLabel?: string;
  href: string;
}

export const SITE_NAV: NavItem[] = [
  { label: "關於小哥", shortLabel: "首頁", href: "/" },
  { label: "處置體驗課", shortLabel: "體驗課", href: "/course" },
  { label: "處置神器", href: "/about/DispositionGod" },
  { label: "軟體工具", href: "/software" },
  { label: "影音專區", href: "/media" },
];
