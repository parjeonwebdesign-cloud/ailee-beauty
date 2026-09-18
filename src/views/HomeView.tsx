import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShoppingBag, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { SparklingWingIcon } from '../components/SparklingWingIcon';
import { PRODUCTS } from '../data/products';
import { Product, ColorShade } from '../types';
import { IMAGES, handleImageError } from '../assets/images';

interface HomeViewProps {
  onSelectProduct: (product: Product, shade?: ColorShade) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, shade: ColorShade) => void;
  onOpenShadeFinder: () => void;
  onOpenShadeComparator: () => void;
  setCurrentTab: (tab: string) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectProduct,
  onQuickView,
  onAddToCart,
  onOpenShadeFinder,
  onOpenShadeComparator,
  setCurrentTab,
  wishlist,
  onToggleWishlist
}) => {
  // Hero Interactive Quick-Purchase State (Product 1: Jelly Glow Tint)
  const heroProduct = PRODUCTS[0];
  const [heroShadeIndex, setHeroShadeIndex] = useState(2); // Default: 03 Pink Petal
  const selectedHeroShade = heroProduct.shades[heroShadeIndex] || heroProduct.shades[0];

  // Interactive Shade Finder Gateway State (Tone Filter)
  type ToneType = 'spring' | 'summer' | 'autumn' | 'winter';
  const [activeTone, setActiveTone] = useState<ToneType>('summer');

  // Tone recommendation logic
  const getToneDetails = (tone: ToneType) => {
    switch (tone) {
      case 'spring':
        return {
          id: 'spring',
          label: '봄 웜톤 (Spring Warm)',
          emoji: '🌷',
          bg: 'from-[#FFE5EC] to-[#FFF6D6]',
          badgeBg: 'bg-[#FFF0F3] text-[#E86C78]',
          badgeText: '화사하고 따스한 피치 젤리 룩',
          product: PRODUCTS[0], // Jelly Glow Tint
          recommendedShade: PRODUCTS[0].shades.find(s => s.code === '02') || PRODUCTS[0].shades[1], // 02 Peach Soda
          reason: '투명하고 탄력 있는 52% 수분 젤리가 봄 웜톤 피부의 생기를 극대화해 줍니다.',
        };
      case 'summer':
        return {
          id: 'summer',
          label: '여름 쿨톤 (Summer Cool)',
          emoji: '🌸',
          bg: 'from-[#FFE5EC] to-[#E0F2FE]',
          badgeBg: 'bg-[#E0F2FE] text-[#0284C7]',
          badgeText: '맑고 청량한 생화 핑크 이슬 룩',
          product: PRODUCTS[0], // Jelly Glow Tint
          recommendedShade: PRODUCTS[0].shades.find(s => s.code === '03') || PRODUCTS[0].shades[2], // 03 Pink Petal
          reason: '차분하면서도 오묘하게 피어나는 맑은 장미빛이 여름 쿨톤을 화사하게 완성합니다.',
        };
      case 'autumn':
        return {
          id: 'autumn',
          label: '가을 웜톤 (Autumn Warm)',
          emoji: '🍂',
          bg: 'from-[#FFF6D6] to-[#FFE5EC]',
          badgeBg: 'bg-[#FFF6D6] text-[#B45309]',
          badgeText: '그윽하고 부드러운 몽환 누디 룩',
          product: PRODUCTS[1], // Cloud Blur Lip Mousse
          recommendedShade: PRODUCTS[1].shades.find(s => s.code === '01') || PRODUCTS[1].shades[0], // 01 Vanilla Beige
          reason: '가볍게 밀착되는 포근한 구름 무스 제형이 가을 웜톤 특유의 감성을 고조시킵니다.',
        };
      case 'winter':
        return {
          id: 'winter',
          label: '겨울 쿨톤 (Winter Cool)',
          emoji: '❄️',
          bg: 'from-[#E0F2FE] to-[#F3E8FF]',
          badgeBg: 'bg-[#F3E8FF] text-[#7E22CE]',
          badgeText: '선명하고 또렷한 루비 모브 룩',
          product: PRODUCTS[0], // Jelly Glow Tint
          recommendedShade: PRODUCTS[0].shades.find(s => s.code === '04') || PRODUCTS[0].shades[3], // 04 Ruby Glass
          reason: '유리알 광택 속에 깊게 물드는 루비 레드 컬러가 겨울 쿨톤의 피부 선을 살려줍니다.',
        };
    }
  };

  const activeRecommendation = getToneDetails(activeTone);

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      
      {/* Step 1: Hero Section with Guided Purchasing Flow */}
      <section className="relative overflow-hidden pt-6 pb-8 sm:pb-12">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#FFE5EC] blur-3xl opacity-70 pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#E0F2FE] blur-3xl opacity-70 pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-10 right-1/3 w-80 h-80 rounded-full bg-[#FFF6D6] blur-3xl opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-8">

          {/* Customer Journey Step Flow Indicator */}
          <div className="flex items-center justify-center lg:justify-start overflow-x-auto pb-0.5 max-w-full">
            <div className="inline-flex items-center gap-1.5 sm:gap-3 px-4 py-2 rounded-full glass-panel border border-white shadow-xs text-[10px] sm:text-xs font-semibold text-[#2D262B] whitespace-nowrap">
              <span className="flex items-center gap-1 text-[#E86C78]">
                <span className="w-4 h-4 rounded-full bg-[#FFE5EC] text-[#E86C78] flex items-center justify-center font-bold text-[9px]">1</span>
                <span>브랜드 스토리</span>
              </span>
              <ChevronRight className="w-3 h-3 text-[#8C7A8B] shrink-0" />
              <span className="flex items-center gap-1 text-[#2D262B]">
                <span className="w-4 h-4 rounded-full bg-[#FFF6D6] text-[#B45309] flex items-center justify-center font-bold text-[9px]">2</span>
                <span>퍼스널 쉐이드 진단</span>
              </span>
              <ChevronRight className="w-3 h-3 text-[#8C7A8B] shrink-0" />
              <span className="flex items-center gap-1 text-[#6B5A69]">
                <span className="w-4 h-4 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center font-bold text-[9px]">3</span>
                <span>맞춤 제품 즉시 구매</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Hero Main Messaging & Flow Buttons */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFE5EC]/80 border border-white text-xs font-bold text-[#E86C78] shadow-2xs whitespace-nowrap">
                <SparklingWingIcon className="w-4 h-4 text-[#E86C78]" />
                <span>AILÉE Beauty • Light-Catching Makeup</span>
              </div>

              <div className="space-y-5">
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D262B] leading-tight tracking-tight">
                  Beauty that catches<br />
                  <span className="shimmer-text">the light.</span>
                </h1>
                <p className="text-sm sm:text-base font-serif text-[#E86C78] font-semibold whitespace-normal sm:whitespace-nowrap">
                  "빛을 머금은 순간, 나만의 퍼스널 쉐이드를 완성하다."
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#6B5A69] leading-relaxed max-w-xl mx-auto lg:mx-0 pt-2">
                투명한 광채와 섬세한 컬러로 일상의 순간을 반짝이게 해드립니다.
                복잡한 선택 고민 없이, <strong>[1단계: 퍼스널 컬러 진단]</strong>을 거쳐 <strong>[2단계: 1초 맞춤 장바구니 구매]</strong>까지의 완벽한 쇼핑 여정을 경험해 보세요.
              </p>

              {/* Main Guided CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={onOpenShadeFinder}
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#2D262B] text-white text-xs font-bold hover:bg-[#E86C78] transition-all cursor-pointer shadow-md hover:shadow-lg hover:scale-102 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-[#FFE5EC] animate-pulse" />
                  <span>[STEP 1] 나만의 쉐이드 진단하기</span>
                </button>

                <button
                  onClick={() => setCurrentTab('SHOP')}
                  className="w-full sm:w-auto px-7 py-4 rounded-full glass-card text-[#2D262B] border border-white text-xs font-bold hover:bg-[#FFE5EC] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs whitespace-nowrap"
                >
                  <span>SHOP 컬렉션 둘러보기</span>
                  <ArrowRight className="w-4 h-4 text-[#E86C78]" />
                </button>
              </div>

              {/* Key Features Bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 text-center border-t border-[#FFE5EC]/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="block text-base sm:text-lg font-serif font-bold text-[#2D262B]">52%</span>
                  <span className="text-[10px] text-[#8C7A8B] uppercase whitespace-nowrap">Water Jelly Moisture</span>
                </div>
                <div>
                  <span className="block text-base sm:text-lg font-serif font-bold text-[#2D262B]">Glass Beam</span>
                  <span className="text-[10px] text-[#8C7A8B] uppercase whitespace-nowrap">Light Reflection</span>
                </div>
                <div>
                  <span className="block text-base sm:text-lg font-serif font-bold text-[#2D262B]">3-Sec Match</span>
                  <span className="text-[10px] text-[#8C7A8B] uppercase whitespace-nowrap">Personal Tone Quiz</span>
                </div>
              </div>

            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-lg aspect-[4/5] sm:aspect-[4/5] rounded-3xl overflow-hidden glass-card p-3 border border-white shadow-xl">
                <img
                  src={IMAGES.heroBanner}
                  alt="AILÉE Beauty Light"
                  className="w-full h-full object-cover object-top rounded-2xl"
                  onError={(e) => handleImageError(e, 'heroBanner')}
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Step 2: Compact & Balanced "Find My Shade" Gateway Section */}
      <section id="find-my-shade-gateway" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-2xl p-3 sm:p-3.5 relative overflow-hidden border border-white bg-gradient-to-br from-white via-[#FFE5EC]/30 to-[#FFF6D6]/30 shadow-xs space-y-2.5 sm:space-y-3">
          
          {/* Gateway Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-[#FFE5EC]/80 pb-2">
            <div className="space-y-1 sm:space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2D262B] text-[#FFE5EC] text-[9.5px] sm:text-[10.5px] font-bold shadow-2xs whitespace-nowrap tracking-wider">
                <Sparkles className="w-2.5 h-2.5 text-[#E86C78]" />
                <span>STEP 2 • PERSONALIZED SHADE MATCHING</span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D262B] whitespace-normal sm:whitespace-nowrap">
                어떤 컬러가 나에게 맞을지 고민되시나요? 3초 만에 찾기
              </h2>
              <p className="text-[11px] sm:text-xs text-[#6B5A69] leading-tight">
                피부 톤(봄/여름/가을/겨울)을 아래에서 선택하면, 베스트 매칭 제품을 실시간으로 확인할 수 있습니다.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-0.5 md:pt-0">
              <button
                onClick={onOpenShadeFinder}
                className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-[#E86C78] text-white text-xs font-bold hover:bg-[#2D262B] transition-colors cursor-pointer shadow-xs flex items-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>3초 정밀 진단 퀴즈</span>
              </button>
              
              <button
                onClick={onOpenShadeComparator}
                className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white text-[#2D262B] border border-[#FFE5EC] text-xs font-bold hover:bg-[#FFE5EC] transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
              >
                <span>컬러 비교</span>
              </button>
            </div>
          </div>

          {/* Tone Quick Selector Tabs */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-[#2D262B] flex items-center gap-1.5 whitespace-nowrap">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#E86C78]" />
                <span>퍼스널 컬러 톤 선택하기 (클릭하여 추천 보기):</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'spring', label: '봄 웜톤 (Spring)', emoji: '🌷', desc: '화사한 피치/로지' },
                { id: 'summer', label: '여름 쿨톤 (Summer)', emoji: '🌸', desc: '맑은 생화 핑크' },
                { id: 'autumn', label: '가을 웜톤 (Autumn)', emoji: '🍂', desc: '차분한 누디 모카' },
                { id: 'winter', label: '겨울 쿨톤 (Winter)', emoji: '❄️', desc: '딥 체리 루비' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTone(t.id as ToneType)}
                  className={`p-2 sm:p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col gap-0.5 ${
                    activeTone === t.id
                      ? 'bg-white border-[#2D262B] shadow-xs ring-1 ring-[#E86C78]/20 scale-101'
                      : 'bg-white/60 border-white/80 text-[#6B5A69] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm">{t.emoji}</span>
                    {activeTone === t.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E86C78]" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#2D262B] whitespace-nowrap">{t.label}</span>
                  <span className="text-[10.5px] sm:text-[11px] text-[#8C7A8B] whitespace-nowrap font-medium">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Compact Dynamic Live Recommendation Card for Selected Tone */}
          <div className={`p-2 sm:p-2.5 rounded-xl bg-gradient-to-r ${activeRecommendation.bg} border border-white shadow-2xs flex flex-col sm:flex-row items-center gap-2.5 transition-all`}>
            
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-white shadow-xs relative">
              <img
                src={activeRecommendation.product.image}
                alt={activeRecommendation.product.name}
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e, activeRecommendation.product.id === 'jelly-glow-tint' ? 'jellyTint' : activeRecommendation.product.id === 'cloud-blur-lip-mousse' ? 'cloudMousse' : activeRecommendation.product.id === 'glass-veil-highlighter' ? 'glassHighlighter' : 'dewBalm')}
              />
              <div className="absolute top-1 left-1">
                <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded-full ${activeRecommendation.badgeBg} shadow-2xs whitespace-nowrap`}>
                  BEST
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-1.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E86C78]">
                <span>{activeRecommendation.emoji}</span>
                <span className="whitespace-nowrap">{activeRecommendation.label} 추천</span>
              </div>

              <h3 className="text-base sm:text-lg font-serif font-bold text-[#2D262B]">
                {activeRecommendation.product.nameKo} — <span className="text-[#E86C78]">{activeRecommendation.recommendedShade.code} {activeRecommendation.recommendedShade.name}</span>
              </h3>

              <p className="text-[11px] text-[#6B5A69] leading-snug max-w-xl">
                {activeRecommendation.reason} ({activeRecommendation.recommendedShade.toneTag})
              </p>

              <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <button
                  onClick={() => onAddToCart(activeRecommendation.product, activeRecommendation.recommendedShade)}
                  className="px-4 py-1.5 rounded-full bg-[#2D262B] text-white text-[11px] font-bold hover:bg-[#E86C78] transition-colors cursor-pointer shadow-2xs flex items-center gap-1 whitespace-nowrap"
                >
                  <ShoppingBag className="w-3 h-3 text-[#FFE5EC]" />
                  <span>추천 쉐이드 담기 ({activeRecommendation.product.price.toLocaleString()}원)</span>
                </button>

                <button
                  onClick={() => onSelectProduct(activeRecommendation.product, activeRecommendation.recommendedShade)}
                  className="px-3.5 py-1.5 rounded-full bg-white text-[#2D262B] border border-white text-[11px] font-bold hover:bg-[#FFE5EC] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>상세보기</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
