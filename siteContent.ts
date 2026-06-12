// 權證小哥官網 — 全站內容資料層
// 結構仿照 enru 專案的 constants.tsx / softwareContent.ts
// 資料來源: CMoney 達人頁、理財寶、App Store、YouTube、Facebook、媒體報導 (2026-06 整理)

/* ───────────────────────── 講師檔案 ───────────────────────── */

export const EXPERT_NAME = "權證小哥";
export const EXPERT_TAGLINE = "破解主力籌碼 × 精通金融商品";

export const EXPERT_INTRO =
  "素人起家的專職交易人。國立大學科學教育系畢業、曾任學校老師，歷經三次本金歸零的挫敗後," +
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

/* ───────────────────────── 軟體工具 ───────────────────────── */

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
  badge?: string;
}

export const TOOL_CARDS: ToolCardData[] = [
  {
    title: "處置神器",
    subtitle: "處置股預測・監控 APP",
    description:
      "明日處置預測準確度高達 99%,不必懂計算、只要看答案。每日處置日報、八段燈號監控、獨家兩年大數據統計,把處置股風險化為獲利機會。",
    features: ["明日必關股提前一日掌握", "漲跌機率・平均漲幅統計", "浪子回頭・深蹲蓄力智慧提醒", "App Store 4.9 ★ 評價"],
    href: "/about/DispositionGod",
    external: false,
    cta: "了解處置神器",
    theme: "from-[#1a3a6a] via-[#10182a] to-[#080c14]",
    icon: "fas fa-gavel",
    badge: "小哥團隊出品",
  },
  {
    title: "籌碼K線",
    subtitle: "主力籌碼追蹤 APP",
    description:
      "小哥每天研究籌碼的核心武器。追蹤關鍵分點籌碼變化、看懂主力進出貨,搭配 K 線型態快速判斷多空方向。",
    features: ["關鍵分點進出追蹤", "主力大戶買賣超分析", "個股籌碼集中度", "多空戰法直播教學"],
    href: "https://www.cmoney.tw/app/itemcontent.aspx?id=2244",
    external: true,
    cta: "前往理財寶",
    theme: "from-[#7a5c1e] via-[#241c0a] to-[#080c14]",
    icon: "fas fa-chart-line",
  },
  {
    title: "全方位盤中監控 APP",
    subtitle: "主力大戶下單監控",
    description:
      "幫你盤中即時監控主力大戶的下單動態,第一時間掌握大單異動、漲跌停板與關鍵價位,換你監控主力下單。",
    features: ["盤中大單即時警示", "主力下單動態追蹤", "自訂監控條件", "電腦版+手機版雙平台"],
    href: "https://www.cmoney.tw/app/itemcontent.aspx?id=2770",
    external: true,
    cta: "前往理財寶",
    theme: "from-[#2d5a3d] via-[#0e1f15] to-[#080c14]",
    icon: "fas fa-desktop",
  },
  {
    title: "從分點探索權證標的",
    subtitle: "權證標的篩選工具",
    description:
      "從關鍵分點的籌碼動向回推適合操作的權證標的,搭配主力收購股評估表,跟著大戶腳步挑對權證。",
    features: ["分點籌碼回推選股", "主力收購股評估表", "權證標的快速篩選", "搭配權證進階戰法"],
    href: "https://www.cmoney.tw/app/itemcontent.aspx?id=1631",
    external: true,
    cta: "前往理財寶",
    theme: "from-[#5a3d7a] via-[#170e1f] to-[#080c14]",
    icon: "fas fa-search-dollar",
  },
];

/* ───────────────────────── 影音與社群 ───────────────────────── */

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@cng07151";

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
  { label: "處置體驗課", shortLabel: "體驗課", href: "/" },
  { label: "處置神器", href: "/about/DispositionGod" },
  { label: "軟體工具", href: "/software" },
  { label: "影音專區", href: "/media" },
  { label: "關於小哥", href: "/about" },
];
