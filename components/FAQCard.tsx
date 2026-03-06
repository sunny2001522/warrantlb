import React from 'react';
import { FAQItem } from '../constants';

interface FAQCardProps {
  item: FAQItem;
  index: number;
}

export const FAQCard: React.FC<FAQCardProps> = ({ item, index }) => {
  const stickyTop = 80 + index * 30;

  return (
    <div
      className="w-full sticky"
      style={{ top: `${stickyTop}px`, zIndex: index }}
    >
      <div className="course-card-bg rounded-[1.2rem] md:rounded-[2rem] p-4 md:p-10 mb-3 md:mb-4 shadow-[0_-20px_50px_rgba(0,0,0,0.9)] border border-white/5 backdrop-blur-xl group transition-transform duration-500 hover:scale-[1.01]">
        <div className="flex flex-col md:flex-row gap-3 md:gap-10">

          {/* Silver Metallic Number */}
          <div className="flex-shrink-0 relative pr-3 md:pr-6">
            <span className="text-silver-gradient text-3xl md:text-7xl font-black serif-font select-none leading-none inline-block drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)]">
              {item.id < 10 ? `0${item.id}` : item.id}
            </span>
          </div>

          <div className="flex-1 relative">
            {/* Question Label */}
            <span className="text-gray-500 text-[8px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-black block mb-1 md:mb-2 opacity-50">Question</span>

            {/* Question Title */}
            <h3 className="text-sm md:text-2xl font-black text-[#d4af37] serif-font tracking-tight leading-tight mb-3 md:mb-6">
              {item.question}
            </h3>

            {/* Answer Content */}
            <div className="pl-0 md:pl-4 border-l-0 md:border-l-2 border-[#d4af37]/20">
               <p className="text-gray-300 text-xs md:text-lg leading-relaxed font-bold">
                 <span className="text-white/40 mr-1 md:mr-2 serif-font italic">A:</span>
                 {item.answer}
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};