import React, { useState } from 'react';
import { Sparkles, Instagram, Youtube, Heart, ArrowRight, Check } from 'lucide-react';
import { SparklingWingIcon } from './SparklingWingIcon';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onOpenShadeFinder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, onOpenShadeFinder }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#FAF9F6] via-[#FFF6D6]/30 to-[#FFE5EC]/50 border-t border-[#FFE5EC] pt-16 pb-12 text-[#2D262B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 mb-16 relative overflow-hidden text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/80 shadow-sm">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5EC] text-[#E86C78] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AILÉE Light Club</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2D262B]">
              빛나는 순간들을 가장 먼저 받아보세요
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5A69]">
              구독 시 신제품 프리뷰 소식과 함께 <strong className="text-[#E86C78]">10% 웰컴 할인 쿠폰 (LIGHT10)</strong>을 발급해 드립니다.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full sm:w-auto flex flex-col sm:flex-row gap-2.5">
            {subscribed ? (
              <div className="px-6 py-3 rounded-full bg-[#E0F2FE] text-[#0284C7] font-medium text-xs flex items-center justify-center gap-2 border border-white">
                <Check className="w-4 h-4" />
                <span>구독 완료! 웰컴 쿠폰 [LIGHT10]이 전달되었습니다.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소를 입력하세요"
                  required
                  className="px-5 py-3 rounded-full text-xs bg-white/90 border border-[#FFE5EC] focus:outline-none focus:border-[#E86C78] w-full sm:w-64 text-[#2D262B]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#2D262B] text-white text-xs font-medium hover:bg-[#E86C78] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>구독하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#FFE5EC]">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFE5EC] to-[#E0F2FE] flex items-center justify-center border border-white">
                <SparklingWingIcon className="w-5 h-5 text-[#E86C78]" />
              </div>
              <span className="text-xl font-serif font-bold text-[#2D262B] tracking-wider">
                AILÉE
              </span>
            </div>
            <p className="text-xs text-[#6B5A69] leading-relaxed">
              Beauty that catches the light.<br />
              빛을 머금은 순간, 더 아름답게.<br />
              투명한 광채와 섬세한 컬러로 일상의 순간을 반짝이게 만드는 뷰티 브랜드.
            </p>
            <div className="flex items-center space-x-3 pt-2 text-[#6B5A69]">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white border border-[#FFE5EC] hover:text-[#E86C78] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white border border-[#FFE5EC] hover:text-[#E86C78] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#2D262B]">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs text-[#6B5A69]">
              <li><button onClick={() => setCurrentTab('HOME')} className="hover:text-[#E86C78] transition-colors cursor-pointer">HOME</button></li>
              <li><button onClick={() => setCurrentTab('SHOP')} className="hover:text-[#E86C78] transition-colors cursor-pointer">SHOP ALL</button></li>
              <li><button onClick={() => setCurrentTab('ABOUT')} className="hover:text-[#E86C78] transition-colors cursor-pointer">BRAND STORY</button></li>
              <li><button onClick={() => setCurrentTab('JOURNAL')} className="hover:text-[#E86C78] transition-colors cursor-pointer">JOURNAL & EDITORIAL</button></li>
              <li><button onClick={() => setCurrentTab('CONTACT')} className="hover:text-[#E86C78] transition-colors cursor-pointer">CONTACT & SHOWROOM</button></li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#2D262B]">
              COLLECTIONS
            </h4>
            <ul className="space-y-2 text-xs text-[#6B5A69]">
              <li><button onClick={() => setCurrentTab('SHOP')} className="hover:text-[#E86C78] transition-colors cursor-pointer">Jelly Glow Tint (젤리 글로우 틴트)</button></li>
              <li><button onClick={() => setCurrentTab('SHOP')} className="hover:text-[#E86C78] transition-colors cursor-pointer">Cloud Blur Lip Mousse (클라우드 블러 무스)</button></li>
              <li><button onClick={() => setCurrentTab('SHOP')} className="hover:text-[#E86C78] transition-colors cursor-pointer">Glass Veil Highlighter (글래스 베일 하이라이터)</button></li>
              <li><button onClick={() => setCurrentTab('SHOP')} className="hover:text-[#E86C78] transition-colors cursor-pointer">Dew Drop Glow Balm (듀 드롭 글로우 밤)</button></li>
              <li>
                <button 
                  onClick={onOpenShadeFinder} 
                  className="inline-flex items-center gap-1 text-[#E86C78] font-semibold hover:underline cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Interactive Shade Finder</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#2D262B]">
              CUSTOMER CARE
            </h4>
            <div className="text-xs text-[#6B5A69] space-y-1.5 leading-relaxed">
              <p className="font-semibold text-[#2D262B]">AILÉE 고객지원센터</p>
              <p className="text-base font-bold text-[#E86C78]">1800-AILÉE (1800-2453)</p>
              <p>평일 10:00 - 18:00 (점심시간 12:30 - 13:30)</p>
              <p>주말 및 공휴일 휴무</p>
              <p className="pt-2">이메일 문의: help@ailee-beauty.com</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7A8B] gap-4">
          <p>© {new Date().getFullYear()} AILÉE Beauty Inc. All rights reserved. Beauty that catches the light.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:underline cursor-pointer">개인정보처리방침</span>
            <span>|</span>
            <span className="hover:underline cursor-pointer">이용약관</span>
            <span>|</span>
            <span className="hover:underline cursor-pointer">사업자정보확인</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
