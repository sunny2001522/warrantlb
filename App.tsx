import React, { useEffect, useRef, useState } from "react";
import { CTAButton } from "./components/Button";
import { StackingCard } from "./components/StackingCard";
import { FAQCard } from "./components/FAQCard";
import { Reveal } from "./components/Reveal";
import { MarqueeCarousel } from "./components/MarqueeCarousel";
import { ChatWidget } from "./components/chat/ChatWidget";
import chatAvatarImage from "./assets/Gemini_Generated_Image_3zi9un3zi9un3zi9.png";
import heroSm from "./assets/super easy 1080_1080 px_opt.jpg";
import heroMd from "./assets/md.jpg";
import cmLogo from "./assets/CM logo.png";
import bookBr from "./assets/book_br_opt.png";
import bookGr from "./assets/book_gr_opt.png";
import triangleImg from "./assets/triangle.png";
import lecturer1Img from "./assets/LECTURER1_opt.jpg";
import {
  COURSE_FEATURES,
  PROBLEMS,
  COURSE_DURATION_INFO,
  APP_VIP_FEATURES,
  LECTURER_BIO,
  FAQ_DATA,
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

const CountdownTimer: React.FC<{ targetDate: string; compact?: boolean }> = ({
  targetDate,
  compact,
}) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }, 60000);

    const now = new Date().getTime();
    const distance = new Date(targetDate).getTime() - now;
    if (distance > 0) {
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div
      className={`flex gap-3 md:gap-4 items-center justify-center border-y border-white/10 ${compact ? "py-1.5 md:py-2 my-2 md:my-4" : "py-2 md:py-4 my-3 md:my-6"}`}
    >
      <div className="flex flex-col items-center">
        <span
          className={`${compact ? "text-lg md:text-3xl" : "text-2xl md:text-5xl"} font-black text-[#d4af37]`}
        >
          {timeLeft.days}
        </span>
        <span className="text-[8px] md:text-[10px] text-gray-500 font-bold">
          天
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span
          className={`${compact ? "text-lg md:text-3xl" : "text-2xl md:text-5xl"} font-black text-[#d4af37]`}
        >
          {timeLeft.hours}
        </span>
        <span className="text-[8px] md:text-[10px] text-gray-500 font-bold">
          時
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span
          className={`${compact ? "text-lg md:text-3xl" : "text-2xl md:text-5xl"} font-black text-[#d4af37]`}
        >
          {timeLeft.minutes}
        </span>
        <span className="text-[8px] md:text-[10px] text-gray-500 font-bold">
          分
        </span>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const problemRef = useRef<HTMLDivElement>(null);
  const methodRef = useRef<HTMLDivElement>(null);
  const lecturerRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);
  const registrationRef = useRef<HTMLDivElement>(null);
  const appVipRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

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

  // Replace local asset path with imported image
  const galleryWithImports = LECTURER_GALLERY.map((img) =>
    img === "assets/LECTURER1.jpg" ? lecturer1Img : img,
  );
  const marqueeImages = [
    ...galleryWithImports,
    ...galleryWithImports,
    ...galleryWithImports,
  ];

  return (
    <div className="min-h-screen bg-[#0a0806] text-white selection:bg-[#d4af37] selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0806]/90 backdrop-blur-md border-b border-[#d4af37]/20 px-4 md:px-6 py-2 md:py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-3">
          <img src={cmLogo} alt="CMoney Logo" className="h-6 md:h-10" />

          <div className="flex flex-col">
            <span className="text-xs md:text-base font-black tracking-widest text-white leading-tight">
              飆股女王林恩如
            </span>
            <span className="text-[8px] md:text-xs text-[#d4af37] font-bold tracking-[0.2em]">
              CMoney
            </span>
          </div>
        </div>

        {/* Desktop Anchor Menu */}
        <div className="hidden lg:flex items-center gap-8 mr-8">
          {[
            { label: "痛點分析", ref: problemRef },
            { label: "核心方法", ref: methodRef },
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

        <CTAButton
          onClick={() => scrollToSection(registrationRef)}
          className="!px-4 md:!px-6 !py-1.5 md:!py-2 !text-[10px] md:!text-sm"
          trackingLocation="nav"
        >
          報名體驗課
        </CTAButton>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full pt-12 md:pt-[72px] pb-6 md:pb-0 bg-[#0a0806]">
        {/* Mobile hero: full width, natural height */}
        <div className="w-full md:hidden relative">
          <img
            src={heroSm}
            alt="飆股女王林恩如 美股致富勝經"
            className="w-full h-auto"
          />
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0806] to-transparent pointer-events-none"></div>
          {/* CTA at gradient boundary */}
          <div className="absolute inset-x-0 -bottom-10 z-20 flex flex-col items-center gap-2 pb-4">
            <CTAButton
              onClick={() => scrollToSection(registrationRef)}
              className="!px-8 !py-3 !text-base shadow-[0_0_50px_rgba(185,28,28,0.6)] whitespace-nowrap"
              trackingLocation="hero_mobile"
            >
              立即報名，免費體驗課
            </CTAButton>
            <span className="text-gray-400 text-xs font-bold tracking-widest drop-shadow-lg">
              名額有限，額滿關閉。
            </span>
          </div>
        </div>

        {/* Desktop hero */}
        <div className="w-full hidden md:block relative">
          <img
            src={heroMd}
            alt="飆股女王林恩如 美股致富勝經"
            className="w-full h-auto"
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0a0806] to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 flex flex-col items-center gap-4">
            <CTAButton
              onClick={() => scrollToSection(registrationRef)}
              className="!px-20 !py-8 !text-4xl shadow-[0_0_50px_rgba(185,28,28,0.6)] whitespace-nowrap"
              trackingLocation="hero_desktop"
            >
              立即報名，免費體驗課
            </CTAButton>
            <span className="text-gray-400 text-lg font-bold tracking-widest drop-shadow-lg">
              名額有限，額滿關閉。
            </span>
          </div>
        </div>
      </section>

      <div className="h-4 md:h-32 bg-[#0a0806]"></div>

      {/* 1. Problem Section - 痛點分析 */}
      <section
        ref={problemRef}
        className="relative py-8 md:py-20 px-4 md:px-6 deep-glow-bg overflow-hidden flex flex-col items-center justify-center "
      >
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col items-center mb-6 md:mb-8 text-center">
            <Reveal delay={0}>
              <div className="bg-black/40 border border-[#d4af37]/30 rounded-full px-6 md:px-10 py-2 md:py-3 mb-4 md:mb-8 shadow-lg">
                <h3 className="text-base md:text-3xl font-bold serif-font italic">
                  我也想開始投資<span className="text-red-600">美股</span>
                  ，但總是卡關...
                </h3>
              </div>
            </Reveal>

            <Reveal
              delay={200}
              className="flex flex-col gap-2 md:gap-4 mb-6 md:mb-12"
            >
              <h4 className="text-[#d4af37] text-lg md:text-5xl font-black tracking-widest md:tracking-[0.4em] serif-font text-gold-gradient">
                超簡單趨勢波段 | 錢進美股
              </h4>
              <p className="text-white/70 text-sm md:text-3xl font-bold serif-font tracking-widest">
                從新手到上手 | 零經驗的致富聖經
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 xl:gap-12 relative mb-8 md:mb-8">
            {PROBLEMS.map((problem, idx) => (
              <Reveal
                key={idx}
                delay={idx * 150 + 400}
                className="flex flex-col items-center text-center group cursor-pointer"
                onClick={() => scrollToSection(registrationRef)}
              >
                <div className="relative mb-3 md:mb-8">
                  <div className="w-28 h-28 md:w-52 md:h-52 rounded-full p-1 md:p-1.5 bg-gradient-to-br from-[#d4af37] via-transparent to-[#d4af37] shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#d4af37]/60 group-hover:border-white/80 transition-colors">
                      <img
                        src={problem.img}
                        alt={problem.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="absolute top-1 right-1 md:top-4 md:right-4 w-6 h-6 md:w-10 md:h-10 bg-red-600 rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-white text-sm md:text-2xl font-black">
                      !
                    </span>
                  </div>
                </div>
                <h4 className="text-[#d4af37] text-sm md:text-2xl font-black mb-1 md:mb-3 serif-font group-hover:text-white transition-colors tracking-wider md:tracking-widest">
                  {problem.title}
                </h4>
                <p className="text-white text-xs md:text-lg font-bold serif-font opacity-80">
                  {problem.desc}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={1000} className="flex justify-center">
            <CTAButton
              onClick={() => scrollToSection(registrationRef)}
              className="!px-10 md:!px-24 !py-4 md:!py-8 !text-base md:!text-3xl shadow-[0_0_40px_rgba(185,28,28,0.4)]"
              trackingLocation="problem_section"
            >
              報名體驗課
            </CTAButton>
          </Reveal>
        </div>
      </section>

      {/* 2. Core Method Section */}
      <section
        ref={methodRef}
        className="py-8 md:py-16 px-4 md:px-6 deep-glow-bg relative overflow-hidden flex flex-col items-center justify-center border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center h-full">
          <div className="text-center mb-4 md:mb-12 flex flex-col items-center">
            <Reveal delay={0}>
              <div className="mb-4 md:mb-6">
                <span className="text-[#d4af37] text-xs md:text-2xl font-bold tracking-[0.2em] md:tracking-[0.3em] serif-font italic opacity-90 block mb-2 md:mb-3 uppercase">
                  報名美股體驗課，你將學會
                </span>
                <h2 className="text-2xl md:text-7xl font-black text-gold-gradient serif-font leading-tight mb-2 md:mb-4">
                  超簡單趨勢波段 | 錢進美股
                </h2>
                <span className="text-white text-sm md:text-3xl font-bold tracking-[0.2em] md:tracking-[0.3em] serif-font opacity-90 block uppercase">
                  讓你懂選、懂抱、一直賺
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300} className="w-full flex justify-center">
            <div
              className="relative group max-w-4xl mx-auto flex justify-center cursor-pointer"
              onClick={() => scrollToSection(registrationRef)}
            >
              <img
                src={triangleImg}
                alt="核心教學法寶"
                className="max-h-[45vh] md:max-h-[55vh] w-auto object-contain transition-transform duration-700 group-hover:scale-[1.02] drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              />
            </div>
          </Reveal>

          <Reveal delay={600} className="mt-6 md:mt-12">
            <CTAButton
              onClick={() => scrollToSection(registrationRef)}
              className="!px-8 md:!px-12 !py-3 md:!py-5 !text-sm md:!text-xl"
              trackingLocation="method_section"
            >
              獲取核心心法
            </CTAButton>
          </Reveal>
        </div>
      </section>

      {/* 3. Course Includes Section */}
      <section className="py-8 md:py-32 px-4 md:px-6 bg-black relative border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8 md:mb-24">
            <h2 className="text-2xl md:text-6xl font-black serif-font italic text-gold-gradient mb-3 md:mb-6">
              完整課程包含什麼?
            </h2>
            <p className="text-gray-500 text-sm md:text-xl font-bold tracking-[0.2em]">
              ALL-IN-ONE 投資致富包
            </p>
            <div className="w-16 md:w-24 h-1 bg-[#d4af37] mx-auto rounded-full mt-4 md:mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 items-stretch">
            {COURSE_INCLUDES.map((item, idx) => (
              <Reveal
                key={item.id}
                delay={idx * 200}
                className="h-full hover:transform hover:scale-[1.02] transition-transform duration-500"
              >
                <div
                  onClick={() => handleIncludeCardClick(item.id)}
                  className="relative flex flex-col items-center text-center p-5 md:p-12 h-full rounded-[1.5rem] md:rounded-[2.5rem] bg-[#111] border border-[#d4af37]/20 transition-all duration-500 hover:-translate-y-4 hover:border-[#d4af37]/60 group cursor-pointer shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(145deg, #161616 0%, #0a0a0a 100%)",
                  }}
                >
                  <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out"></div>
                  </div>

                  <div className="w-14 h-14 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#d4af37] to-[#854d0e] flex items-center justify-center mb-4 md:mb-10 shadow-[0_15px_30px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform duration-500 relative">
                    <div className="absolute inset-1 rounded-full border border-white/20"></div>
                    <i
                      className={`${item.icon} text-xl md:text-4xl text-white drop-shadow-lg`}
                    ></i>
                  </div>

                  <h4 className="text-lg md:text-3xl font-black text-white mb-1 md:mb-2 serif-font italic">
                    {item.title}
                  </h4>
                  <span className="text-[#d4af37] text-xs md:text-sm font-bold mb-3 md:mb-6 block tracking-widest uppercase">
                    {item.subtitle}
                  </span>

                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mb-4 md:mb-8"></div>

                  <ul className="space-y-2 md:space-y-4 mb-4 md:mb-10 flex-1">
                    {item.desc.map((d, i) => (
                      <li
                        key={i}
                        className="flex items-start justify-center gap-2 md:gap-3"
                      >
                        <i className="fas fa-star text-[#d4af37] text-[8px] md:text-[10px] mt-1 md:mt-1.5 flex-shrink-0"></i>
                        <p className="text-gray-400 font-bold text-xs md:text-base leading-relaxed">
                          {d}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-2 md:pt-4 flex items-center gap-3 text-[#d4af37] transition-all duration-300 group-hover:gap-5">
                    <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">
                      查看詳情
                    </span>
                    <i className="fas fa-arrow-right text-[8px] md:text-[10px] animate-pulse"></i>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Lecturer Section & Marquee */}
      <section
        ref={lecturerRef}
        className="py-8 md:py-32 pr-4 pl-0 md:px-6 lecturer-red-gradient relative border-t border-white/5 overflow-hidden"
      >
        <div className="max-w-6xl md:mx-auto flex flex-row items-end gap-0 md:gap-20">
          <Reveal className="w-5/12 md:w-1/2 flex-shrink-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse group-hover:bg-[#d4af37]/20 transition-all"></div>
              <img
                src="https://meee.com.tw/h1CHCBG.png"
                alt="林恩如"
                className="relative w-full md:w-2/3 h-auto z-10 filter drop-shadow-[0_20px_50px_rgba(212,175,55,0.3)] md:mx-auto"
              />
            </div>
          </Reveal>
          <div className="w-7/12 md:w-1/2 pb-4 md:pb-0">
            <Reveal delay={200}>
              <h2 className="text-xl md:text-6xl font-black mb-2 md:mb-8 serif-font italic text-gold-gradient leading-tight">
                <span className="!text-white">飆股女王</span>林恩如
              </h2>
              <p className="text-gray-300 text-[10px] md:text-xl font-bold leading-relaxed mb-3 md:mb-10 serif-font">
                {LECTURER_BIO}
              </p>

              <div className="flex gap-3 md:gap-6 mb-0 md:mb-10 justify-center">
                <img
                  src={bookBr}
                  alt="極簡投資"
                  className="w-1/3 h-auto rounded-md md:rounded-lg drop-shadow-lg hover:scale-105 transition-transform"
                />
                <img
                  src={bookGr}
                  alt="超簡單投資法"
                  className="w-1/3 h-auto rounded-md md:rounded-lg drop-shadow-lg hover:scale-105 transition-transform"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="w-full mt-0">
          <MarqueeCarousel images={marqueeImages} />
        </div>
      </section>

      {/* 6. Course Chapters */}
      <section
        ref={chaptersRef}
        className="py-8 md:py-32 px-3 md:px-4 bg-black overflow-visible relative "
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="text-center mb-10 md:mb-20">
            <h3 className="text-2xl md:text-6xl font-black mb-4 md:mb-8 italic serif-font text-gold-gradient">
              課程內容大綱
            </h3>
            <div className="inline-block px-4 md:px-8 py-2 md:py-3 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-full">
              <span className="text-xs md:text-2xl text-[#d4af37] font-bold tracking-wider md:tracking-widest serif-font italic">
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
        </div>
      </section>

      {/* 4. APP VIP Section */}
      <section
        ref={appVipRef}
        className="py-8 md:py-20 px-4 md:px-6 bg-gradient-to-b from-[#0a0806] to-[#1a1510] flex flex-col justify-center overflow-hidden "
      >
        <div className="max-w-7xl mx-auto w-full relative">
          <div className="text-center mb-8 md:mb-24">
            <h3 className="text-[#d4af37] text-sm md:text-xl font-black tracking-widest mb-2 md:mb-4 uppercase">
              VIP EXCLUSIVE
            </h3>
            <h2 className="text-2xl md:text-7xl font-black mb-4 md:mb-8 italic">
              美股聚寶盆
              <span className="text-gold-gradient px-2 md:px-4">App</span>
            </h2>

            <CTAButton
              onClick={() => scrollToSection(registrationRef)}
              className="!px-8 md:!px-12 !py-3 md:!py-5 !text-sm md:!text-xl"
              trackingLocation="app_vip_section"
            >
              體驗課獨家教學
            </CTAButton>
          </div>

          <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 xl:gap-8 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory px-2 md:px-0 mb-8 md:mb-32">
            {APP_VIP_FEATURES.map((item, idx) => (
              <Reveal
                key={item.id}
                delay={idx * 200}
                className="flex-shrink-0 w-[70vw] md:w-auto snap-center flex flex-col group h-full"
              >
                <div className="app-feature-card-bg rounded-[1.5rem] md:rounded-[2.5rem] pt-6 md:pt-10 h-full flex flex-col border border-white/5 shadow-2xl relative overflow-hidden min-h-[350px] md:min-h-[500px]">
                  <div className="text-center px-4 md:px-6 mb-4 md:mb-10 relative z-10">
                    <h4 className="text-[#d4af37] text-base md:text-2xl font-black mb-1 md:mb-3 italic serif-font drop-shadow-lg">
                      {item.title}
                    </h4>
                    <p className="text-white font-bold text-xs md:text-base leading-relaxed opacity-90">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="relative w-2/3 mx-auto aspect-[9/16] overflow-hidden bg-transparent mt-auto mb-2 md:mb-4">
                    <img
                      src={item.imgUrl}
                      alt={item.title}
                      className="w-full h-full object-contain animate-img-reveal"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Registration Events */}
      <section
        ref={registrationRef}
        className="py-8 md:py-16 px-4 md:px-6 bg-gradient-to-b from-black to-[#1a110a] border-t border-[#d4af37]/20"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-6xl font-black text-white serif-font mb-3 md:mb-4 italic text-gold-gradient">
              預約您的致富場次
            </h2>
            <div className="w-16 md:w-24 h-1 bg-[#d4af37] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 xl:gap-12 max-w-6xl mx-auto">
            {REGISTRATION_EVENTS.map((event, idx) => (
              <Reveal
                key={event.id}
                delay={idx * 250}
                className="bg-[#0f0d0b] border border-[#d4af37]/30 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl transition-all hover:border-[#d4af37] hover:-translate-y-1 group h-full"
              >
                <div className="p-4 md:p-10 flex-1 flex flex-col">
                  <h3 className="text-base md:text-3xl font-black text-white serif-font mb-3 md:mb-6 leading-tight min-h-0 md:min-h-[4rem] group-hover:text-[#d4af37] transition-colors">
                    {event.title}
                  </h3>
                  <div className="bg-[#d4af37]/5 border-l-4 border-[#d4af37] p-3 md:p-5 mb-2 md:mb-4 rounded-r-xl text-left">
                    <div className="flex flex-col gap-0.5 md:gap-1">
                      <span className="text-[#d4af37] text-[8px] md:text-[10px] font-black tracking-widest uppercase opacity-70">
                        上課日期與時間
                      </span>
                      <span className="text-base md:text-3xl font-black text-white serif-font leading-none py-0.5 md:py-1">
                        {event.dateStr}
                      </span>
                      <span className="text-sm md:text-2xl font-bold text-gray-400">
                        {event.timeStr}
                      </span>
                    </div>
                  </div>
                  <div className="mb-1 md:mb-2">
                    <CountdownTimer
                      targetDate={event.targetDate}
                      compact={true}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-auto mb-3 md:mb-6 py-3 md:py-4 px-4 md:px-6 bg-white/5 rounded-xl md:rounded-2xl border border-white/10">
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] md:text-xs text-gray-500 font-bold line-through">
                        原價 NT${event.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-[#d4af37] text-[10px] md:text-xs font-black italic">
                        省 NT$
                        {(
                          event.originalPrice - event.discountPrice
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1 md:gap-2">
                        <span className="text-[10px] md:text-xs font-normal text-gray-400">
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
                    className="w-full red-shimmer-btn py-4 md:py-6 rounded-[1rem] md:rounded-[1.2rem] text-center text-base md:text-xl font-black text-white shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                  >
                    立即免費預約
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section
        ref={faqRef}
        className="py-8 md:py-32 px-3 md:px-4 bg-black overflow-visible relative border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="text-center mb-10 md:mb-20">
            <h3 className="text-2xl md:text-6xl font-black mb-4 md:mb-8 px-3 italic serif-font text-gold-gradient">
              FAQ 常見問題
            </h3>
          </div>
          <div className="relative pb-20 md:pb-40 w-full">
            {FAQ_DATA.map((item, idx) => (
              <FAQCard key={item.id} item={item} index={idx} />
            ))}
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
                    飆股女王林恩如
                  </span>
                  <span className="text-[10px] text-[#d4af37] font-bold tracking-[0.2em]">
                    CMoney
                  </span>
                </div>
              </div>
              <p className="text-gray-500 text-xs font-bold leading-relaxed serif-font">
                專注於「超簡單投資法」，簡化市場規則，幫助投資者建立獲利模型。
              </p>
            </div>

            {/* Quick Navigation Anchors */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white text-base font-black tracking-widest serif-font border-b border-[#d4af37]/30 pb-2">
                快速導覽
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {[
                  { label: "痛點分析", ref: problemRef },
                  { label: "核心方法", ref: methodRef },
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
                  href="https://www.facebook.com/imoney889/?locale=zh_TW"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-white transition-all duration-300"
                >
                  <i className="fab fa-facebook-f text-base"></i>
                </a>
                <a
                  href="https://www.youtube.com/playlist?list=PL8JLWRfy17gLggQ8YZnZr6XIAHpddudp3"
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  <i className="fab fa-youtube text-base"></i>
                </a>
                <a
                  href="https://www.cmoney.tw/app/expert/imoney889"
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

      {/* Chat Widget - 恩如 AI 助理 */}
      <ChatWidget
        authorSlug="enru"
        avatarUrl={chatAvatarImage}
        authorName="林恩如"
      />

      {/* Fixed bottom-right CTA */}
      <button
        onClick={() => scrollToSection(registrationRef)}
        className="fixed bottom-6 right-6 z-50 red-shimmer-btn px-4 py-3 md:px-6 md:py-4 text-sm md:text-base font-black text-white rounded-full shadow-[0_4px_24px_rgba(185,28,28,0.5)] active:scale-95 transition-transform cursor-pointer"
      >
        免費報名
      </button>
    </div>
  );
};

export default App;
