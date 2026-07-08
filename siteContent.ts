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
  {
    period: "巔峰",
    title: "一個月靠處置策略賺 1 億",
    desc: "將處置股「人棄我取」的籌碼洞察發揮到極致,單月以處置策略創下獲利 1 億的紀錄,把市場最恐慌的時刻變成黃金買點。",
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

import book100k from "./assets/books/book-100k.jpg";
import bookBible from "./assets/books/book-bible.jpg";
import bookWisdom from "./assets/books/book-wisdom.jpg";
import bookAdvanced from "./assets/books/book-advanced.jpg";
import bookNotes from "./assets/books/book-notes.jpg";
import bookUltimate from "./assets/books/book-ultimate.jpg";

export interface BookItem {
  title: string;
  subtitle?: string;
  cover: string; // 實際書封 (博客來)
  url: string; // 博客來購書連結
}

export const EXPERT_BOOKS: BookItem[] = [
  {
    title: "權證小哥教你十萬元變千萬",
    subtitle: "全新增修版",
    cover: book100k,
    url: "https://www.books.com.tw/products/0010833820",
  },
  {
    title: "權證小哥完全公開權證暴賺勝經",
    cover: bookBible,
    url: "https://www.books.com.tw/products/0010619530",
  },
  {
    title: "權證小哥:贏家的智計",
    cover: bookWisdom,
    url: "https://www.books.com.tw/products/0010721771",
  },
  {
    title: "權證小哥 權證進階交易技巧",
    cover: bookAdvanced,
    url: "https://www.books.com.tw/products/0010789869",
  },
  {
    title: "權證小哥:股市致勝交易筆記",
    cover: bookNotes,
    url: "https://www.books.com.tw/products/0010954992",
  },
  {
    title: "權證小哥短線終極戰法",
    subtitle: "4 大策略 × 6 種工具 × 68 個實戰案例",
    cover: bookUltimate,
    url: "https://www.books.com.tw/products/0011014572",
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

/* ─────────────── 專業定位 / 方法論 / 信任 / 入口 / FAQ ─────────────── */

export interface CoreItem {
  tag: string;
  icon: string;
  title: string;
  desc: string;
}

/** 專業定位 — 小哥專注的三個核心 */
export const POSITIONING: CoreItem[] = [
  {
    tag: "核心一",
    icon: "fas fa-water",
    title: "籌碼流向",
    desc: "觀察主力、大戶與關鍵分點的進出變化,從買賣行為中理解市場資金可能的方向。",
  },
  {
    tag: "核心二",
    icon: "fas fa-chart-bar",
    title: "量價結構",
    desc: "從成交量、價格位置與盤中力道,判斷短線行情是否延續,避免只看漲跌做決策。",
  },
  {
    tag: "核心三",
    icon: "fas fa-coins",
    title: "金融商品",
    desc: "理解權證、處置股、當沖等商品規則、交易限制與風險,讓操作判斷更有依據。",
  },
];

/** 方法論 — 三步驟觀察流程 */
export const METHOD_STEPS: CoreItem[] = [
  {
    tag: "STEP 1",
    icon: "fas fa-magnifying-glass-chart",
    title: "先看籌碼",
    desc: "觀察誰在買、誰在賣,是否有關鍵分點或特定資金持續進出。",
  },
  {
    tag: "STEP 2",
    icon: "fas fa-chart-line",
    title: "再看量價",
    desc: "確認成交量是否支持價格變化,盤中力道是否延續,價格位置是否合理。",
  },
  {
    tag: "STEP 3",
    icon: "fas fa-scale-balanced",
    title: "最後看規則",
    desc: "把商品制度、處置規則、交易成本與風險納入判斷,避免只看訊號就進場。",
  },
];

export const METHOD_RISK_NOTE =
  "風險提醒:任何教學與工具都只能作為輔助判斷,投資人仍需依照自身資金狀況、風險承受度與交易紀律做決策。";

/** 內容入口分流 — 第一次認識小哥從這裡開始 */
export interface EntryCard {
  small: string;
  title: string;
  desc: string;
  btn: string;
  href: string;
  icon: string;
}

export const ENTRY_CARDS: EntryCard[] = [
  {
    small: "第一次認識",
    icon: "fas fa-play",
    title: "免費影音",
    desc: "適合想先了解小哥教學方式與籌碼觀察邏輯的人。",
    btn: "觀看影音精選",
    href: "/media",
  },
  {
    small: "想系統學習",
    icon: "fas fa-graduation-cap",
    title: "免費體驗課",
    desc: "適合想了解處置股、籌碼與短線交易流程的人。",
    btn: "報名免費體驗課",
    href: "/course",
  },
  {
    small: "想輔助觀察",
    icon: "fas fa-toolbox",
    title: "實戰工具",
    desc: "適合已有交易經驗,想用工具整理資訊與追蹤盤面的人。",
    btn: "查看實戰工具",
    href: "/software",
  },
  {
    small: "長期追蹤",
    icon: "fas fa-bell",
    title: "社群追蹤",
    desc: "適合想追蹤每日籌碼觀察、直播與活動資訊的人。",
    btn: "追蹤社群",
    href: "#social",
  },
];

/** 信任背書 */
export interface TrustBadge {
  label: string;
  title: string;
  desc: string;
}

export const TRUST_BADGES: TrustBadge[] = [
  { label: "社群", title: "社群影響力", desc: "持續於 Facebook、YouTube、Instagram、Telegram 分享籌碼觀察與活動資訊。" },
  { label: "6 本", title: "出版著作", desc: "內容涵蓋權證、短線交易、交易策略與實戰案例。" },
  { label: "授課", title: "媒體與講座", desc: "包含 CMoney 理財寶、財經媒體、學校、券商與相關活動分享。" },
  { label: "實戰", title: "交易紀錄", desc: "交易經歷、比賽紀錄與真實對帳單可作為教學案例,但不代表未來績效。" },
];

/** FAQ */
export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "權證小哥主要教什麼?",
    a: "主要分享籌碼流向、量價結構、權證、處置股與短線交易相關內容。核心不是單純看漲跌,而是透過市場資金、價格位置與交易規則,建立更有系統的觀察流程。",
  },
  {
    q: "新手適合看小哥的內容嗎?",
    a: "可以,但建議從免費影音或入門課程開始。若完全沒有交易經驗,建議先理解基本名詞、商品規則與風險,再進一步接觸權證、處置股或短線工具。",
  },
  {
    q: "小哥是提供明牌嗎?",
    a: "不是。教學重點是建立觀察框架與判斷依據,不是提供保證獲利的買賣建議。任何投資決策都應依照自己的資金狀況、風險承受度與交易紀律判斷。",
  },
  {
    q: "免費影音、體驗課、工具差在哪?",
    a: "免費影音適合先了解小哥的教學方式與常見觀察邏輯;體驗課適合想更系統理解特定主題的人;工具則適合已有基本交易經驗,想提升資訊整理與盤中觀察效率的人。",
  },
  {
    q: "課程與工具是否保證獲利?",
    a: "不保證。課程與工具都只能作為學習與輔助判斷,不能取代個人風控與獨立判斷。市場存在不確定性,投資人仍需自行承擔投資風險。",
  },
];

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
  category?: string; // 3 大產品分列用:類別小標
  tagline?: string; // 3 大產品分列用:一句話標語
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
    category: "處置股・雙刀戰法",
    tagline: "明日處置預測 99% 準確,把處置股風險化為獲利機會",
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
    category: "盤中監控",
    tagline: "監控主力大單,一眼掌握主力攻擊標的",
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
    category: "當沖・極短線",
    tagline: "判斷盤中股價位階,從此不再追高殺低",
  },
];

/* ─────────────── 小哥全產品線 (PC + APP 合併一頁, 標平台標籤) ─────────────── */

import exdivIcon from "./assets/tools/exdiv-icon.jpg";

export type Platform = "PC" | "APP" | "WEB";

export interface ProductItem {
  title: string;
  tagline: string;
  platforms: Platform[];
  /** 附贈說明 (如 送手機版 / 買Web送APP) */
  gift?: string;
  href: string;
  external: boolean;
  /** APP 官方圖示 (無則用 icon tile) */
  iconImg?: string;
  icon: string; // FA icon (PC 產品 tile 用)
  theme: string; // 卡片漸層
}

export const ALL_PRODUCTS: ProductItem[] = [
  {
    title: "處置神器(進階版)",
    tagline: "精準預測處置股,即時監控注意股與處置股,提前掌握交易限制。",
    platforms: ["WEB", "APP"],
    gift: "買 Web 送 APP",
    href: "/about/DispositionGod",
    external: false,
    iconImg: dispoIcon,
    icon: "fas fa-gavel",
    theme: "from-[#1a3a6a] via-[#10182a] to-[#0a1228]",
  },
  {
    title: "全方位盤中監控 APP",
    tagline: "獨家主力流水牆,一眼看出主力盤中多空方向;加權、台指期推播。",
    platforms: ["APP"],
    href: "/software/omni-monitor",
    external: false,
    iconImg: omniIcon,
    icon: "fas fa-desktop",
    theme: "from-[#2d5a3d] via-[#0e1f15] to-[#0a1228]",
  },
  {
    title: "當沖飆股神手 APP",
    tagline: "連次、連量獨家燈號,盤中低買高賣,避免追高殺低。",
    platforms: ["APP"],
    href: "/software/day-trade",
    external: false,
    iconImg: daytradeIcon,
    icon: "fas fa-bolt",
    theme: "from-[#7a2e1e] via-[#241008] to-[#0a1228]",
  },
  {
    title: "全方位獨門監控電腦版",
    tagline: "資訊速度直接影響帳上獲利!盤中權證主力動作全數即時跳出,換你監控主力下單。",
    platforms: ["PC", "APP"],
    gift: "送手機版",
    href: "https://www.cmoney.tw/app/itemcontent.aspx?id=2507",
    external: true,
    icon: "fas fa-tower-observation",
    theme: "from-[#14532d] via-[#0c2818] to-[#0a1228]",
  },
  {
    title: "當沖神器電腦版",
    tagline: "協助判斷股價高低點的當沖軟體,搭配小哥當沖教學,避開追高殺低的窘境。",
    platforms: ["PC", "APP"],
    gift: "送手機版",
    href: "https://www.cmoney.tw/app/itemcontent.aspx?id=3070",
    external: true,
    icon: "fas fa-gauge-high",
    theme: "from-[#7a2e1e] via-[#2a1008] to-[#0a1228]",
  },
  {
    title: "挑選權證小幫手",
    tagline: "不知道該如何挑權證?讓權證小哥幫您挑!",
    platforms: ["PC"],
    href: "https://www.cmoney.tw/app/itemcontent.aspx?id=1958",
    external: true,
    icon: "fas fa-hand-pointer",
    theme: "from-[#7a5c1e] via-[#241c0a] to-[#0a1228]",
  },
  {
    title: "挑選股期小幫手",
    tagline: "不知道該如何挑選股期標的?讓最強散戶【權證小哥】幫您挑!",
    platforms: ["PC"],
    href: "https://www.cmoney.tw/app/itemcontent.aspx?id=2250",
    external: true,
    icon: "fas fa-magnifying-glass-chart",
    theme: "from-[#1e3a5f] via-[#0e1c2e] to-[#0a1228]",
  },
  {
    title: "可轉債主力分析及套利系統",
    tagline: "徹底分析可轉債主力手法,4 大招式洞悉可轉債與股票間的操作及套利模式。",
    platforms: ["PC"],
    href: "https://www.cmoney.tw/app/itemcontent.aspx?id=2328",
    external: true,
    icon: "fas fa-scale-unbalanced-flip",
    theme: "from-[#5a3d7a] via-[#170e1f] to-[#0a1228]",
  },
  {
    title: "除權息獲利神器",
    tagline: "飆漲前搶先卡位,爽領股利又賺價差!",
    platforms: ["APP"],
    href: "https://www.cmoney.tw/app/itemcontent.aspx?id=4527",
    external: true,
    iconImg: exdivIcon,
    icon: "fas fa-sack-dollar",
    theme: "from-[#8a6d1e] via-[#2a2008] to-[#0a1228]",
  },
];

/* ─────────────── 工具獨立頁資料 (仿 enru ProductPageData) ─────────────── */

/** 產品教學影片 (來源: 權證小哥 YouTube 官方頻道,均經 oembed 驗證) */
export interface TutorialVideo {
  title: string;
  videoId: string;
  desc: string;
}

/** 處置神器教學 (處置神器頁用,該頁不走 ToolPageData) */
export const DISPOSITION_TUTORIALS: TutorialVideo[] = [
  {
    title: "處置下的獲利機會:如何用軟體抓出處置股的好買點",
    videoId: "hxzknku_tMo",
    desc: "小哥示範用處置神器在處置股裡找出黃金買點,把風險變獲利機會。",
  },
  {
    title: "關稅大跌是送分題?從籌碼面找出被錯殺的潛力飆股",
    videoId: "1X9TpHDY2CU",
    desc: "恐慌下殺時如何用籌碼結構辨識被錯殺的標的,對應處置股「人棄我取」進場術。",
  },
];

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
  screenshotNotes: { title: string; desc: string }[]; // 對應每張截圖的文字說明
  tutorials: TutorialVideo[]; // 教學影片
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
  screenshotNotes: [
    {
      title: "主力流水牆,8 秒看出多空",
      desc: "盤中即時呈現主力大戶下單動態,用顏色判別大盤多空方向,不必盯滿整個盤面,8 秒就能看出主力今天往哪邊打。",
    },
    {
      title: "三大軟體整合・即時推播",
      desc: "電腦版三大監控軟體功能整合進一支手機 APP,加權指數與台指期的關鍵異動即時推播,國際股市行情也一手掌握。",
    },
  ],
  tutorials: [
    {
      title: "小哥的看盤日常|全方位獨門監控、盤中當沖神器實戰",
      videoId: "9a0afUU_8QM",
      desc: "跟著小哥看盤日常,示範全方位獨門監控如何用主力流水牆判斷盤中多空。",
    },
    {
      title: "小哥的看盤日常|全方位獨門監控操作示範",
      videoId: "Y7dw2oiJ5XY",
      desc: "另一場看盤實況,連次連量訊號搭配主力流水牆抓盤中轉折。",
    },
  ],
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
  screenshotNotes: [
    {
      title: "獨家燈號看主力攻擊方向",
      desc: "走勢圖上燈號亮起,即看出主力的攻擊方向;燈號熄滅時,往往就是盤中轉折的關鍵時刻,新手也能直覺判讀。",
    },
    {
      title: "16 策略 × 14 指標一鍵選股",
      desc: "16 種策略一鍵篩出多空強弱勢股,搭配 14 項關鍵技術指標監控籌碼與資金流向,當沖、盤後選股一支搞定。",
    },
  ],
  tutorials: [
    {
      title: "新手當沖的五個小技巧,跟單隔日沖放空必勝?",
      videoId: "eBvOt3sP3qY",
      desc: "當沖新手必看:五個實用小技巧,搭配當沖飆股神手的燈號訊號操作。",
    },
    {
      title: "10 個當沖 9 個輸?訓練當沖變強的最大關鍵",
      videoId: "CSDS8TjeTWw",
      desc: "小哥分享當沖能否獲利的關鍵心法,配合 16 種策略練出穩定當沖。",
    },
  ],
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

/** CMoney 線上影音課程 (來源: 處置神器 web ProductDataProvider 課程池, mobileAppId 268) */
export interface CourseItem {
  title: string;
  desc: string;
  url: string;
  tag: string;
  thumbnail: string;
}

export const CMONEY_COURSES: CourseItem[] = [
  {
    title: "處置神器 ✕ 進階雙刀處置策略",
    desc: "VVIP 專屬:處置股進階雙刀戰法完整教學。",
    url: "https://mobile.cmoney.tw/course-media/16150/chapters",
    tag: "VVIP 專屬",
    thumbnail: "https://image.cmoney.tw/official/promotion/1773244800/462e8965-0269-428f-a319-d426fea0babe.jpg",
  },
  {
    title: "權證小哥 ETF 套利 × 吃豆腐",
    desc: "6 小時 × 5 戰術多空雙賺 ft. 葉芷娟。",
    url: "https://mobile.cmoney.tw/course-media/13079/chapters",
    tag: "線上課程",
    thumbnail: "https://fsv.cmoney.tw/cmstatic/app/media/preview/6388110257048730281463733266.jpg",
  },
  {
    title: "籌碼致勝!7 小時多空實戰新手班",
    desc: "從籌碼出發的多空實戰入門,新手也能跟上。",
    url: "https://mobile.cmoney.tw/course-media/10465/chapters",
    tag: "線上課程",
    thumbnail: "https://fsv.cmoney.tw/cmstatic/app/media/preview/63855709719477478062558666.png",
  },
  {
    title: "獲利為王!當沖新手全攻略",
    desc: "當沖入門到實戰的完整攻略課。",
    url: "https://mobile.cmoney.tw/course-media/10130/chapters",
    tag: "線上課程",
    thumbnail: "https://fsv.cmoney.tw/cmstatic/app/media/preview/638557129242314725893950883.jpg",
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
  { label: "軟體工具", href: "/software" },
  { label: "影音專區", href: "/media" },
];
