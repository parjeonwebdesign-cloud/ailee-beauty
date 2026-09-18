import React from 'react';
import { Sparkles, Heart, Check, Sun, Droplets, Layers } from 'lucide-react';
import { SparklingWingIcon } from '../components/SparklingWingIcon';
import { IMAGES, handleImageError } from '../assets/images';

interface AboutViewProps {
  setCurrentTab: (tab: string) => void;
  onOpenShadeFinder: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setCurrentTab, onOpenShadeFinder }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10 animate-in fade-in duration-300">
      
      {/* Hero Banner Section */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#FFE5EC] via-[#FFF6D6] to-[#E0F2FE] flex items-center justify-center mx-auto border-2 border-white shadow-xs">
          <SparklingWingIcon className="w-7 h-7 sm:w-8 sm:h-8 text-[#E86C78]" />
        </div>

        <div className="space-y-3 sm:space-y-4">
          <span className="text-[11px] font-bold text-[#E86C78] tracking-widest uppercase block">
            BRAND STORY
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#2D262B] leading-tight">
            AILÉE Beauty
          </h1>
          <p className="text-base sm:text-lg font-serif text-[#E86C78] font-bold pt-1 sm:pt-1.5">
            Beauty that catches the light. • 빛을 머금은 순간, 더 아름답게.
          </p>
        </div>

        <p className="text-xs sm:text-sm text-[#6B5A69] leading-relaxed">
          투명한 광채와 섬세한 컬러로 일상의 순간을 조금 더 반짝이게 만드는 뷰티 브랜드입니다.
        </p>
      </section>

      {/* Brand Story Deep Dive */}
      <section className="glass-card rounded-2xl p-5 sm:p-8 border border-white bg-white/95 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center shadow-xs">
        
        <div className="space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5EC] text-[#E86C78] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Origin of AILÉE</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2D262B] leading-snug">
            빛을 향해 피어나는 날개,<br />
            AILÉE의 이야기
          </h2>

          <div className="space-y-2.5 text-xs sm:text-sm text-[#6B5A69] leading-relaxed">
            <p>
              AILÉE라는 이름은 프랑스어 느낌의 유려한 발음과 <strong className="text-[#2D262B]">"빛을 향해 피어나는 날개"</strong>라는 독창적인 이미지를 결합하여 탄생하였습니다.
            </p>
            <p className="p-3 sm:p-3.5 rounded-xl bg-[#FAF9F6] border border-[#FFE5EC] font-serif font-bold text-[#2D262B] text-xs sm:text-sm leading-relaxed">
              "브랜드가 추구하는 것은 완벽한 아름다움이 아니라,<br />
              <span className="text-[#E86C78]">자신만의 빛을 발견하는 것.</span>"
            </p>
            <p>
              우리는 정형화된 과도한 화장이나 무거운 인공적인 커버 대신, 피부 본연의 투명함과 이슬 같은 광채를 끌어올려 나다운 아름다움을 가장 빛나게 만들어 드립니다.
            </p>
          </div>
        </div>

        <div className="max-h-[280px] sm:max-h-[340px] rounded-2xl overflow-hidden glass-card p-2 border border-white shadow-sm flex items-center justify-center">
          <img
            src={IMAGES.journalFlatlay}
            alt="AILÉE Cosmetic Collection"
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => handleImageError(e, 'journalFlatlay')}
          />
        </div>

      </section>

      {/* Brand Aesthetics & Elements */}
      <section className="space-y-8 pt-12 sm:pt-16">
        <div className="text-center space-y-3 sm:space-y-4">
          <span className="text-xs sm:text-sm font-bold text-[#E86C78] tracking-widest uppercase block">
            BRAND MATERIAL & MOTIF
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2D262B] leading-relaxed">
            AILÉE를 완성하는 영감의 오브제
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A69] font-serif font-medium pt-1">
            빛, 유리, 반사, 투명함, 날개의 유연함에서 모티브를 얻었습니다.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-5">
          
          <div className="glass-card p-5 sm:p-6 py-7 sm:py-9 rounded-2xl border border-white text-center space-y-3 shadow-xs flex flex-col items-center justify-center min-h-[170px] sm:min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-[#FFE5EC] text-[#E86C78] flex items-center justify-center mx-auto shadow-2xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-[#2D262B]">Glass (유리)</h3>
            <p className="text-xs sm:text-sm text-[#6B5A69] leading-snug">맑고 투명한<br />유리알 광택</p>
          </div>

          <div className="glass-card p-5 sm:p-6 py-7 sm:py-9 rounded-2xl border border-white text-center space-y-3 shadow-xs flex flex-col items-center justify-center min-h-[170px] sm:min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-[#FFF6D6] text-[#B45309] flex items-center justify-center mx-auto shadow-2xs">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-[#2D262B]">Light (빛)</h3>
            <p className="text-xs sm:text-sm text-[#6B5A69] leading-snug">자연광 아래서<br />뿜어나는 빔</p>
          </div>

          <div className="glass-card p-5 sm:p-6 py-7 sm:py-9 rounded-2xl border border-white text-center space-y-3 shadow-xs flex flex-col items-center justify-center min-h-[170px] sm:min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center mx-auto shadow-2xs">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-[#2D262B]">Water & Jelly</h3>
            <p className="text-xs sm:text-sm text-[#6B5A69] leading-snug">탱글한 이슬<br />수분 윤기</p>
          </div>

          <div className="glass-card p-5 sm:p-6 py-7 sm:py-9 rounded-2xl border border-white text-center space-y-3 shadow-xs flex flex-col items-center justify-center min-h-[170px] sm:min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-[#F3E8FF] text-[#7E22CE] flex items-center justify-center mx-auto shadow-2xs">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-[#2D262B]">Pearl & Gloss</h3>
            <p className="text-xs sm:text-sm text-[#6B5A69] leading-snug">은은한 초미세<br />미네랄 펄</p>
          </div>

          <div className="glass-card p-5 sm:p-6 py-7 sm:py-9 rounded-2xl border border-white text-center space-y-3 shadow-xs flex flex-col items-center justify-center min-h-[170px] sm:min-h-[200px] col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FFE5EC] to-[#FFF6D6] text-[#E86C78] flex items-center justify-center mx-auto shadow-2xs">
              <SparklingWingIcon className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-[#2D262B]">Wings (날개)</h3>
            <p className="text-xs sm:text-sm text-[#6B5A69] leading-snug">공기처럼<br />피어나는 가벼움</p>
          </div>

        </div>
      </section>

      {/* CTA Box */}
      <section className="glass-card rounded-2xl p-6 sm:p-8 text-center space-y-4 border border-white bg-gradient-to-r from-[#FFE5EC] to-[#E0F2FE] shadow-2xs mt-8 sm:mt-12">
        <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D262B]">
          AILÉE와 함께 당신만의 빛을 경험해 보세요
        </h2>
        <div className="flex flex-wrap justify-center gap-2.5">
          <button
            onClick={() => setCurrentTab('SHOP')}
            className="px-6 py-3 rounded-full bg-[#E86C78] text-white text-xs font-bold hover:bg-[#D45562] hover:scale-105 active:scale-95 transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            제품 컬렉션 살펴보기
          </button>
          <button
            onClick={onOpenShadeFinder}
            className="px-6 py-3 rounded-full bg-[#FFE5EC] text-[#E86C78] border border-[#FFCCD8] text-xs font-bold hover:bg-[#E86C78] hover:text-white hover:border-[#E86C78] hover:scale-105 active:scale-95 transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            나만의 컬러 찾기 (Shade Finder)
          </button>
        </div>
      </section>

    </div>
  );
};
