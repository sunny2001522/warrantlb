import React, { useEffect, useRef, useState } from "react";
import { CTAButton } from "./components/Button";
import { StackingCard } from "./components/StackingCard";
import { db } from "./firebase";
import { collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import LiveStreamSection from "./components/LiveStreamSection";

import { MarqueeCarousel } from "./components/MarqueeCarousel";
import heroMobile from "./assets/限時動態（1080x1920）.jpg";
import heroTablet from "./assets/1200X900(沒有日期&CTA).png";
import heroDesktop from "./assets/內廣A (1200x500)_0402.jpg";
import lecturerImg from "./assets/man look.png";
import cmLogo from "./assets/同學會 (1).png";
import {
  COURSE_FEATURES,
  SKILLS,
  PROBLEMS,
  COURSE_DURATION_INFO,
  APP_VIP_FEATURES,
  COURSE_INCLUDES,
  LECTURER_GALLERY,
  REGISTRATION_EVENTS,
  CASHFLOW_DOMAIN,
  type RegistrationInfo,
} from "./constants";
import {
  useScrollTracking,
  useSectionVisibility,
  trackNavClick,
  trackRegistrationStart,
} from "./analytics";

const App: React.FC = () => {
  const problemRef = useRef<HTMLDivElement>(null);
  const methodRef = useRef<HTMLDivElement>(null);
  const lecturerRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);
  const registrationRef = useRef<HTMLDivElement>(null);
  const appVipRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const [hasLiveStream, setHasLiveStream] = useState(false);

  // 從 Firestore 載入講座資料，失敗則 fallback 到 constants
  const [events, setEvents] = useState<RegistrationInfo[]>(REGISTRATION_EVENTS);

  useEffect(() => {
    (async () => {
      try {
        const snapshot = await getDocs(collection(db, "registrationEvents"));
        if (!snapshot.empty) {
          const allEvents = snapshot.docs
            .map((d) => ({ id: Number(d.id), ...d.data() } as RegistrationInfo))
            .sort((a, b) => a.id - b.id);

          const now = new Date();
          const active: RegistrationInfo[] = [];

          for (const event of allEvents) {
            const endMatch = event.timeStr.match(/-\s*(\d{1,2}):(\d{2})/);
            if (!endMatch) { active.push(event); continue; }
            const endTime = new Date(event.targetDate);
            endTime.setHours(parseInt(endMatch[1]), parseInt(endMatch[2]), 0, 0);

            if (now >= endTime) {
              // 已結束 → 從 Firestore 刪除
              await deleteDoc(doc(db, "registrationEvents", String(event.id)));
            } else {
              active.push(event);
            }
          }
          setEvents(active);
        } else {
          // Firestore 是空的，自動把 constants 推上去
          for (const event of REGISTRATION_EVENTS) {
            const { id, ...rest } = event;
            await setDoc(doc(db, "registrationEvents", String(id)), rest);
          }
          setEvents([...REGISTRATION_EVENTS]);
        }
      } catch {
        // Firestore 失敗，保持 constants fallback
      }
    })();
  }, []);


  // GA4 追蹤: 滾動深度
  useScrollTracking();

  // GA4 追蹤: 區段曝光
  useSectionVisibility(problemRef, "problem");
  useSectionVisibility(methodRef, "method");
  useSectionVisibility(lecturerRef, "lecturer");
  useSectionVisibility(chaptersRef, "chapters");
  useSectionVisibility(appVipRef, "appVip");
  useSectionVisibility(registrationRef, "registration");
  useSectionVisibility(faqRef, "faq");

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleIncludeCardClick = (id: number) => {
    switch (id) {
      case 1:
        scrollToSection(chaptersRef);
        break;
      case 2:
        scrollToSection(appVipRef);
        break;
      case 3:
        scrollToSection(registrationRef);
        break;
      default:
        break;
    }
  };

  const handleRegistrationClick = async (registration: RegistrationInfo) => {
    // GA4 + Meta Pixel 追蹤: 報名轉換
    trackRegistrationStart(registration);

    // 等待 300ms 確保追蹤事件發送完成
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Free courses (productType=0, functionId=0): navigate directly to class detail page
    if (!registration.productType && !registration.functionId) {
      window.open(registration.url, "_self");
      return;
    }

    try {
      const res = await fetch(`${CASHFLOW_DOMAIN}cashflow/api/shoppingcarts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: registration.productType,
          functionId: registration.functionId,
          count: 1,
        }),
      });
      const data = await res.json();
      if (data.shoppingCartsUrl) {
        window.open(data.shoppingCartsUrl, "_self");
        return;
      }
    } catch {
      // CORS or network error — fallback to GET add-and-view
    }
    // Fallback: direct navigation (no CORS issue)
    window.open(
      `${CASHFLOW_DOMAIN}cashflow/shoppingcarts/add-and-view?productType=${registration.productType}&functionId=${registration.functionId}&count=1`,
      "_self",
    );
  };

  const marqueeImages = [
    ...LECTURER_GALLERY,
    ...LECTURER_GALLERY,
    ...LECTURER_GALLERY,
  ];

  return (
    <div className="min-h-screen bg-[#080c14] text-white selection:bg-[#d4af37] selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080c14]/90 backdrop-blur-md border-b border-[#d4af37]/20 px-4 md:px-6 py-2 md:py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-3">
          <img src={cmLogo} alt="CMoney Logo" className="h-6 md:h-10" />

          <div className="flex flex-col">
            <span className="text-xs md:text-base font-black tracking-widest text-white leading-tight">
              權證小哥
            </span>
            <span className="text-[8px] md:text-xs text-[#d4af37] font-bold tracking-[0.2em]">
              CMoney
            </span>
          </div>
        </div>

        {/* Desktop Anchor Menu */}
        <div className="hidden lg:flex items-center gap-8 mr-8">
          {[
            { label: "處置盲區", ref: problemRef },
            { label: "獲利模型", ref: methodRef },
            { label: "講師介紹", ref: lecturerRef },
            { label: "課程大綱", ref: chaptersRef },
            { label: "APP介紹", ref: appVipRef },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                trackNavClick(item.label);
                scrollToSection(item.ref);
              }}
              className="text-gray-400 hover:text-[#d4af37] text-sm font-bold tracking-widest transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="http://cmy.tw/008I6c"
            target="_blank"
            className="px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-sm font-black tracking-widest border border-[#d4af37] text-[#d4af37] rounded-full hover:bg-[#d4af37] hover:text-black transition-all"
          >
            聯繫客服
          </a>
          <CTAButton
            onClick={() => scrollToSection(registrationRef)}
            className="!px-4 md:!px-6 !py-1.5 md:!py-2 !text-[10px] md:!text-sm"
            trackingLocation="nav"
          >
            報名體驗課
          </CTAButton>
        </div>
      </nav>

      {/* Live Stream Section */}
      <LiveStreamSection onStatusChange={setHasLiveStream} />

      {/* Hero Section */}
      <section className="relative w-full pt-10 md:pt-[72px] bg-[#080c14] overflow-hidden">
        <h1 className="sr-only">權證小哥官網 - 處置股策略教學</h1>

        {/* Mobile (<640px): 直式 1080x1920，寬螢幕上下平均裁切 */}
        <div className="relative sm:hidden overflow-hidden flex items-center" style={{ maxHeight: "85vh" }}>
          <img src={heroMobile} alt="高勝率處置策略線上體驗課" className="w-full h-auto block" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080c14] to-transparent pointer-events-none"></div>
        </div>

        {/* sm~lg (640px~1024px): 4:3 1200x900，完整顯示不裁切 */}
        <div className="relative hidden sm:block lg:hidden">
          <img src={heroTablet} alt="高勝率處置策略線上體驗課" className="w-full h-auto block" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080c14] to-transparent pointer-events-none"></div>
        </div>

        {/* Desktop (>=1024px): 寬幅 1200x500 */}
        <div className="relative hidden lg:block">
          <img src={heroDesktop} alt="高勝率處置策略線上體驗課" className="w-full h-auto block" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080c14] to-transparent pointer-events-none"></div>
        </div>

        {/* CTA — 圖片下方 */}
        <div className="text-center -mt-8 md:-mt-6 relative z-10 pb-6 md:pb-8">
          <CTAButton
            onClick={() => scrollToSection(registrationRef)}
            className="!px-8 !py-3 !text-lg md:!px-12 md:!py-5 md:!text-2xl lg:!px-16 lg:!py-6 lg:!text-3xl shadow-[0_0_50px_rgba(26,58,106,0.6)]"
            trackingLocation="hero"
          >
            【限量報名】直播體驗課
          </CTAButton>
          <p className="text-gray-400 text-xs md:text-sm font-bold tracking-widest mt-2 md:mt-3">
            名額有限，額滿關閉。
          </p>
        </div>
      </section>

      {/* APP VIP Section - 處置神器App */}
      <section
        ref={appVipRef}
        className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#080c14] to-[#0f1a2e] flex flex-col justify-center overflow-hidden "
      >
        <div className="max-w-7xl mx-auto w-full relative">
          <div className="text-center mb-8 md:mb-24 scroll-reveal">
            <h3 className="text-[#d4af37] text-[20px] md:text-xl font-black tracking-widest mb-2 md:mb-4 uppercase">
              VIP EXCLUSIVE
            </h3>
            <h2 className="text-2xl md:text-7xl font-black mb-4 md:mb-8 italic">
              處置神器
              <span className="text-gold-gradient px-2 md:px-4">App</span>
            </h2>
            <p className="text-gray-300 text-[16px] md:text-[20px] font-normal md:font-bold serif-font leading-relaxed mb-2 md:mb-4">
              所有的複雜計算已經交由 APP 處理
            </p>
            <p className="text-gray-300 text-[16px] md:text-[20px] font-normal md:font-bold serif-font leading-relaxed mb-6 md:mb-8">
              體驗課用實戰案例帶你了解，如何直接帶結果上戰場！
            </p>

            <CTAButton
              onClick={() => scrollToSection(registrationRef)}
              className="!px-8 md:!px-12 !py-3 md:!py-5 !text-[20px] md:!text-xl"
              trackingLocation="app_vip_section"
            >
              免費體驗處置神器
            </CTAButton>
          </div>

          <div className="flex items-start md:grid md:grid-cols-3 md:items-start gap-4 md:gap-6 xl:gap-8 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory px-2 md:px-0 mb-8 md:mb-32">
            {APP_VIP_FEATURES.map((item, idx) => (
              <div
                key={item.id}
                className={`scroll-reveal scroll-stagger-${idx + 1} flex-shrink-0 w-[55vw] md:w-auto snap-center flex flex-col group`}
              >
                <div className="app-feature-card-bg rounded-[1.5rem] md:rounded-[2.5rem] pt-6 md:pt-10 flex flex-col border border-white/5 shadow-2xl relative overflow-hidden h-[480px] md:h-[600px]">
                  <div className="text-center px-4 md:px-6 mb-4 md:mb-10 relative z-10 min-h-[100px] md:min-h-[120px] flex flex-col justify-start">
                    <h4 className="text-[#d4af37] text-[20px] md:text-2xl font-black mb-1 md:mb-3 italic serif-font drop-shadow-lg">
                      {item.title}
                    </h4>
                    <p className="text-white font-normal md:font-bold text-[16px] md:text-lg leading-relaxed opacity-90">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="relative px-1 flex-1 overflow-hidden bg-transparent">
                    <img
                      src={item.imgUrl}
                      alt={item.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* 卡片底部漸層遮罩 */}
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0a1528] via-[#0a1528]/90 to-transparent pointer-events-none rounded-b-[1.5rem] md:rounded-b-[2.5rem]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. Problem Section - 痛點分析 */}
      <section
        ref={problemRef}
        className="relative py-12 md:py-24 px-4 md:px-6 deep-glow-bg overflow-hidden flex flex-col items-center justify-center "
      >
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col items-center mb-6 md:mb-8 text-center">
            <div className="scroll-reveal">
              <div className="bg-black/40 border border-[#d4af37]/30 rounded-full px-6 md:px-10 py-2 md:py-3 mb-4 md:mb-8 shadow-lg">
                <h3 className="text-[20px] md:text-3xl font-bold serif-font italic">
                  你是否曾買入強勢股，隔天卻被公告<span className="text-blue-500">處置</span>？
                </h3>
              </div>
            </div>

            <div className="scroll-reveal flex flex-col gap-2 md:gap-4 mb-6 md:mb-12">
              <h4 className="text-[#d4af37] text-[24px] md:text-4xl font-black   serif-font text-gold-gradient">
                處置股不可怕，真正的威脅來自於對規則的陌生
              </h4>
              <p className="text-white/70 text-[20px] md:text-3xl font-bold serif-font tracking-widest">
                你是否經常深受這四大困擾所苦：
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 xl:gap-12 relative mb-8 md:mb-8">
            {PROBLEMS.map((problem, idx) => (
              <div
                key={idx}
                className="scroll-reveal flex flex-col items-center text-center group cursor-pointer"
                onClick={() => scrollToSection(registrationRef)}
              >
                <img
                  src={problem.numberImg}
                  alt={`${idx + 1}`}
                  className="h-14 md:h-24 w-auto object-contain mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-500 rounded-lg"
                />
                <h4 className="text-[#d4af37] text-[20px] md:text-2xl font-black mb-1 md:mb-3 serif-font group-hover:text-white transition-colors tracking-wider md:tracking-widest">
                  {problem.title}
                </h4>
                <p className="text-white text-[16px] md:text-lg font-normal md:font-bold serif-font opacity-80">
                  {problem.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="scroll-reveal flex justify-center">
            <CTAButton
              onClick={() => scrollToSection(registrationRef)}
              className="!px-10 md:!px-24 !py-4 md:!py-8 !text-[20px] md:!text-3xl shadow-[0_0_40px_rgba(26,58,106,0.4)]"
              trackingLocation="problem_section"
            >
              報名體驗課
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 2. Core Method Section */}
      <section
        ref={methodRef}
        className="py-12 md:py-24 px-4 md:px-6 deep-glow-bg relative overflow-hidden flex flex-col items-center justify-center border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center h-full">
          <div className="text-center mb-4 md:mb-12 flex flex-col items-center">
            <div className="scroll-reveal">
              <div className="mb-4 md:mb-6">
               
                <h2 className="text-2xl md:text-7xl font-black text-gold-gradient serif-font leading-tight mb-2 md:mb-4">
                  這堂課 將教你
                </h2>
               
              </div>
            </div>
          </div>

          <div className="w-full max-w-4xl mx-auto">
            {SKILLS.map((skill, idx) => (
              <StackingCard
                key={skill.id}
                feature={skill}
                index={idx}
                total={SKILLS.length}
                variant="skill"
              />
            ))}
          </div>

          <div className="scroll-reveal mt-6 md:mt-12">
            <CTAButton
              onClick={() => scrollToSection(registrationRef)}
              className="!px-8 md:!px-12 !py-3 md:!py-5 !text-[20px] md:!text-xl"
              trackingLocation="method_section"
            >
              獲取處置股策略
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 3. Course Chapters */}
      <section
        ref={chaptersRef}
        className="py-12 md:py-24 px-3 md:px-4 bg-black overflow-visible relative border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="text-center mb-10 md:mb-20 scroll-reveal">
            <h3 className="text-2xl md:text-6xl font-black mb-4 md:mb-8 italic serif-font text-gold-gradient">
              課程內容大綱
            </h3>
            <div className="inline-block px-4 md:px-8 py-2 md:py-3 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-full">
              <span className="text-[20px] md:text-2xl text-[#d4af37] font-bold tracking-wider md:tracking-widest serif-font italic">
                {COURSE_DURATION_INFO}
              </span>
            </div>
          </div>
          <div className="relative pb-6 md:pb-20 w-full">
            {COURSE_FEATURES.map((f, idx) => (
              <StackingCard
                key={f.id}
                feature={f}
                index={idx}
                total={COURSE_FEATURES.length}
              />
            ))}
          </div>
          <div className="scroll-reveal">
            <CTAButton
              onClick={() => scrollToSection(registrationRef)}
              className="!px-10 md:!px-24 !py-4 md:!py-8 !text-[20px] md:!text-3xl shadow-[0_0_40px_rgba(26,58,106,0.4)]"
              trackingLocation="chapters_section"
            >
              立即報名體驗課
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 4. Course Includes Section */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-black relative border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8 md:mb-24 scroll-reveal">
            <h2 className="text-2xl md:text-6xl font-black serif-font italic text-gold-gradient mb-3 md:mb-6">
              完整課程包含什麼?
            </h2>
            <div className="w-16 md:w-24 h-1 bg-[#d4af37] mx-auto rounded-full mt-4 md:mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 items-stretch">
            {COURSE_INCLUDES.map((item, idx) => (
              <div
                key={item.id}
                className="scroll-reveal h-full hover:transform hover:scale-[1.02] transition-transform duration-500"
              >
                <div
                  onClick={() => handleIncludeCardClick(item.id)}
                  className="relative flex flex-col items-center text-center p-5 md:p-12 h-full rounded-[1.5rem] md:rounded-[2.5rem] border border-blue-500/20 transition-all duration-500 hover:-translate-y-4 hover:border-[#d4af37]/60 group cursor-pointer shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(145deg, #0a1528 0%, #060a14 100%)",
                  }}
                >
                  <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out"></div>
                  </div>

                  <div className="w-14 h-14 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#2563eb] to-[#1a3a6a] flex items-center justify-center mb-4 md:mb-10 shadow-[0_15px_30px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform duration-500 relative">
                    <div className="absolute inset-1 rounded-full border border-white/20"></div>
                    <i
                      className={`${item.icon} text-xl md:text-4xl text-[#d4af37] drop-shadow-lg`}
                    ></i>
                  </div>

                  <h4 className="text-lg md:text-3xl font-black text-[#d4af37] mb-1 md:mb-2 serif-font italic">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <span className="text-blue-400 text-[16px] md:text-sm font-normal md:font-bold mb-3 md:mb-6 block tracking-widest">
                      {item.subtitle}
                    </span>
                  )}

                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mb-4 md:mb-8"></div>

                  <ul className="space-y-2 md:space-y-4 mb-4 md:mb-10 flex-1">
                    {item.desc.map((d, i) => (
                      <li
                        key={i}
                        className="flex items-start justify-center gap-2 md:gap-3"
                      >
                        <p className="text-gray-300 font-normal md:font-bold text-[16px] md:text-base leading-relaxed">
                          {d}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-2 md:pt-4 flex items-center gap-3 text-blue-400 transition-all duration-300 group-hover:gap-5">
                    <span className="text-[20px] md:text-xs font-black tracking-widest uppercase">
                      查看詳情
                    </span>
                    <i className="fas fa-arrow-right text-[8px] md:text-[10px] animate-pulse"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="scroll-reveal flex justify-center mt-8 md:mt-16">
            <CTAButton
              onClick={() => scrollToSection(registrationRef)}
              className="!px-10 md:!px-24 !py-4 md:!py-8 !text-[20px] md:!text-3xl shadow-[0_0_40px_rgba(26,58,106,0.4)]"
              trackingLocation="includes_section"
            >
              搶先預約體驗課
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 5. Lecturer Section & Marquee */}
      <section
        ref={lecturerRef}
        className="py-12 md:py-24 px-4 md:px-6 lecturer-blue-gradient relative border-t border-white/5 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center md:flex-row md:items-center md:justify-center gap-6 md:gap-16">
          {/* 左側(桌面) / 上方(手機)：科技感圓形人物照 */}
          <div className="scroll-reveal flex-shrink-0 flex justify-center">
            <div className="relative w-52 h-52 md:w-80 md:h-80 flex items-center justify-center">
              {/* 外層旋轉環 */}
              <div className="absolute inset-0 rounded-full tech-ring-outer">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle cx="100" cy="100" r="96" fill="none" stroke="#2563eb" strokeWidth="0.5" strokeDasharray="8 12" opacity="0.6" />
                  <circle cx="100" cy="100" r="92" fill="none" stroke="#1a4a7a" strokeWidth="0.3" strokeDasharray="4 8" opacity="0.4" />
                </svg>
              </div>
              {/* 內層反向旋轉環 */}
              <div className="absolute inset-2 md:inset-3 rounded-full tech-ring-inner">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle cx="100" cy="100" r="96" fill="none" stroke="#2563eb" strokeWidth="0.8" strokeDasharray="16 8 4 8" opacity="0.5" />
                </svg>
              </div>
              {/* 脈衝光暈 */}
              <div className="absolute inset-4 md:inset-6 rounded-full border border-blue-500/30 tech-ring-pulse"></div>
              <div className="absolute inset-1 md:inset-2 rounded-full border border-blue-400/10 tech-ring-glow"></div>
              {/* 藍色光暈背景 */}
              <div className="absolute inset-6 md:inset-10 rounded-full bg-blue-500/10 blur-xl"></div>
              {/* 人物照片 */}
              <div className="absolute inset-6 md:inset-10 rounded-full overflow-hidden border-2 border-blue-400/40 shadow-[0_0_40px_rgba(37,99,235,0.3)]">
                <img
                  src={lecturerImg}
                  alt="權證小哥"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 四角光點裝飾 */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>
            </div>
          </div>

          {/* 右側(桌面) / 下方(手機)：標題 + 經歷 */}
          <div className="md:flex-1 text-center">
            <div className="scroll-reveal">
              <h2 className="text-2xl md:text-6xl font-black mb-4 md:mb-8 serif-font italic text-gold-gradient leading-tight">
                權證小哥
              </h2>
            </div>
            <div className="space-y-3 md:space-y-4">
              {[
                { text: "物理老師化身", bold: "千萬散戶傳奇", after: "。" },
                { text: "只花七個月，用", bold: "10萬滾出1,000萬", after: "。" },
                { text: "投資比賽常勝軍，並贏來", bold: "頂級名車", after: "。" },
                { text: "社群頻道超過", bold: "20萬粉絲", after: "追蹤。" },
                { text: "【理財達人秀】常駐嘉賓，\n擁有", bold: "千萬觀看", after: "次數。" },
              ].map((line, idx) => (
                <div key={idx} className="scroll-reveal">
                  <p className="text-gray-300 text-[16px] md:text-xl font-normal md:font-bold leading-relaxed serif-font flex items-start gap-2 md:gap-3">
                    <span className="text-[#2563eb] text-[20px] md:text-base mt-0.5 flex-shrink-0">&#x25C9;</span>
                    <span className="whitespace-pre-line text-left">
                      {line.text}<span className="text-blue-400 font-black">{line.bold}</span>{line.after}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full mt-8 md:mt-16">
          <MarqueeCarousel images={marqueeImages} />
        </div>

        <div className="scroll-reveal flex justify-center mt-8 md:mt-16">
          <CTAButton
            onClick={() => scrollToSection(registrationRef)}
            className="!px-10 md:!px-24 !py-4 md:!py-8 !text-[20px] md:!text-3xl shadow-[0_0_40px_rgba(26,58,106,0.4)]"
            trackingLocation="lecturer_section"
          >
            跟著小哥學處置股
          </CTAButton>
        </div>
      </section>

      {/* 7. Registration Events */}
      <section
        ref={registrationRef}
        className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-black to-[#0a1528] border-t border-[#d4af37]/20"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-6 md:mb-12 scroll-reveal">
            <h2 className="text-2xl md:text-6xl font-black text-white serif-font mb-3 md:mb-4 italic text-gold-gradient">
              預約您的學習場次
            </h2>
            <div className="w-16 md:w-24 h-1 bg-[#d4af37] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 xl:gap-8 max-w-7xl mx-auto">
            {events.map((event, idx) => (
              <div
                key={event.id}
                className="scroll-reveal bg-[#0b0f1a] border border-[#d4af37]/30 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl transition-all hover:border-[#d4af37] hover:-translate-y-1 group h-full"
              >
                <div className="p-4 md:p-10 flex-1 flex flex-col">
                  <h3 className="text-[20px] md:text-3xl font-black text-white serif-font mb-3 md:mb-6 leading-tight min-h-0 md:min-h-[4rem] group-hover:text-[#d4af37] transition-colors">
                    {event.title}
                  </h3>
                  <div className="bg-[#d4af37]/5 border-l-4 border-[#d4af37] p-3 md:p-5 mb-2 md:mb-4 rounded-r-xl text-left">
                    <div className="flex flex-col gap-0.5 md:gap-1">
                      <span className="text-[#d4af37] text-[20px] md:text-[10px] font-black tracking-widest uppercase opacity-70">
                        上課日期與時間
                      </span>
                      <span className="text-[20px] md:text-3xl font-black text-white serif-font leading-none py-0.5 md:py-1">
                        {event.dateStr}
                      </span>
                      <span className="text-[20px] md:text-2xl font-bold text-gray-400">
                        {event.timeStr}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto mb-3 md:mb-6 py-3 md:py-4 px-4 md:px-6 bg-white/5 rounded-xl md:rounded-2xl border border-white/10">
                    <div className="flex flex-col text-left">
                      <span className="text-[20px] md:text-xs text-gray-500 font-bold line-through">
                        原價 NT${event.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-[#d4af37] text-[20px] md:text-xs font-black italic">
                        省 NT$
                        {(
                          event.originalPrice - event.discountPrice
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1 md:gap-2">
                        <span className="text-[20px] md:text-xs font-normal text-gray-400">
                          限時
                        </span>
                        <span className="text-xl md:text-4xl font-black text-white">
                          NT${event.discountPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRegistrationClick(event)}
                    className="w-full blue-shimmer-btn py-4 md:py-6 rounded-[1rem] md:rounded-[1.2rem] text-center text-[20px] md:text-xl font-black text-white shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                  >
                    立即免費預約
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. 聯繫客服 Section */}
      <section
        ref={faqRef}
        className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#0a1528] to-black border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-5xl font-black italic serif-font text-gold-gradient mb-4 md:mb-6">
              理財寶官方客服
            </h3>
          </div>

          <div className="scroll-reveal space-y-4 md:space-y-6">
            <p className="text-gray-300 text-[16px] md:text-xl font-normal md:font-bold leading-relaxed">
              對體驗課有疑問？歡迎您使用『 <span className="text-[#06C755] font-bold">理財寶 Line線上客服</span> 』，線上將有專人為您服務解答喔!!
            </p>

            <div className="flex items-center gap-3 md:gap-4">
              <i className="fab fa-line text-2xl md:text-3xl text-[#06C755]"></i>
              <span className="text-white text-[16px] md:text-xl font-normal md:font-bold">
                線上客服 Line ID：<span className="text-[#d4af37] font-bold">@153fwvvy</span>
              </span>
            </div>

            <div className="space-y-2 md:space-y-3 text-gray-300 text-[16px] md:text-lg font-normal md:font-bold">
              <p>服務時間：週一至週五 09:00 - 18:00</p>
              <p>客服信箱：csservice@cmoney.com.tw</p>
            </div>

            <a
              href="http://cmy.tw/008I6c"
              target="_blank"
              className="inline-flex items-center gap-3 md:gap-4 px-8 md:px-12 py-3 md:py-5 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white text-[16px] md:text-xl font-black transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <i className="fab fa-line text-xl md:text-2xl"></i>
              加入 Line 聯繫客服
            </a>

            <p className="text-gray-500 text-[14px] md:text-sm font-normal md:font-bold mt-4 md:mt-6">
              備註：體驗課程免費！我們不會主動要求您匯款或提供密碼、驗證碼或先繳費
            </p>
          </div>
        </div>
      </section>

      {/* Footer - Optimized & Smaller */}
      <footer className="pt-10 md:pt-16 pb-8 md:pb-10 bg-black border-t border-[#d4af37]/20 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-[#d4af37]/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Branding */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img src={cmLogo} alt="CMoney Logo" className="h-8" />
                <div className="h-6 w-[1px] bg-white/20 mx-1"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-black tracking-widest text-white leading-tight">
                    權證小哥
                  </span>
                  <span className="text-[10px] text-[#d4af37] font-bold tracking-[0.2em]">
                    CMoney
                  </span>
                </div>
              </div>
              <p className="text-gray-500 text-xs font-bold leading-relaxed serif-font">
                專注於處置股策略，幫助投資者掌握處置股的獲利模式與避險思維。
              </p>
            </div>

            {/* Quick Navigation Anchors */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white text-base font-black tracking-widest serif-font border-b border-[#d4af37]/30 pb-2">
                快速導覽
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {[
                  { label: "處置盲區", ref: problemRef },
                  { label: "獲利模型", ref: methodRef },
                  { label: "講師介紹", ref: lecturerRef },
                  { label: "課程內容", ref: chaptersRef },
                  { label: "APP介紹", ref: appVipRef },
                  { label: "報名場次", ref: registrationRef },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(item.ref)}
                    className="text-gray-500 hover:text-[#d4af37] text-xs font-bold text-left transition-colors flex items-center gap-2 group"
                  >
                    <i className="fas fa-chevron-right text-[6px] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white text-base font-black tracking-widest serif-font border-b border-[#d4af37]/30 pb-2">
                關注我們
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/warrantlb/?locale=zh_TW"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-white transition-all duration-300"
                >
                  <i className="fab fa-facebook-f text-base"></i>
                </a>
                <a
                  href="https://www.youtube.com/@cng07151"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  <i className="fab fa-youtube text-base"></i>
                </a>
                <a
                  href="https://www.cmoney.tw/app/expert/warrantlb"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-white transition-all duration-300 group"
                >
                  <img
                    src={cmLogo}
                    className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all"
                    alt="CMoney"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center flex flex-col items-center gap-3">
            <p className="text-gray-600 text-[10px] md:text-xs font-bold serif-font italic max-w-2xl">
              本課程屬 CMoney 版權所有。投資具有風險，投資人應獨立判斷審慎評估。
            </p>
            <p className="text-gray-700 text-[9px] font-black tracking-[0.2em] uppercase">
              © {new Date().getFullYear()} CMoney Inc. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Fixed bottom-right CTA */}
      <button
        onClick={() => scrollToSection(registrationRef)}
        className="fixed bottom-6 right-6 z-50 bg-[#1d4ed8] hover:bg-[#1e40af] px-4 py-3 md:px-6 md:py-4 text-[20px] md:text-base font-black text-white rounded-full shadow-[0_4px_24px_rgba(37,99,235,0.6)] active:scale-95 transition-all cursor-pointer"
      >
        免費報名
      </button>
    </div>
  );
};

export default App;
