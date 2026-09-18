import React, { useState } from 'react';
import { 
  Star, ShoppingBag, Heart, Sparkles, Check, ArrowLeft, 
  Droplets, Flame, Sun, Layers, Feather, ThumbsUp, Plus, Eye 
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, ColorShade, Review } from '../types';
import { IMAGES, handleProductImageError } from '../assets/images';

interface ProductDetailViewProps {
  product: Product;
  selectedShadeCode?: string;
  onBack: () => void;
  onAddToCart: (product: Product, shade: ColorShade, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onOpenShadeFinder: () => void;
  onOpenShadeComparator: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  selectedShadeCode,
  onBack,
  onAddToCart,
  onSelectProduct,
  onOpenShadeFinder,
  onOpenShadeComparator
}) => {
  // Initial shade selection
  const initialShade = selectedShadeCode
    ? product.shades.find(s => s.code === selectedShadeCode) || product.shades[0]
    : product.shades[0];

  const [activeShade, setActiveShade] = useState<ColorShade>(initialShade);
  const [quantity, setQuantity] = useState<number>(1);
  const [swatchTab, setSwatchTab] = useState<'lips' | 'wrist' | 'texture'>('lips');
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Review modal state
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newContent.trim()) {
      const rev: Review = {
        id: `rev-${Date.now()}`,
        author: newAuthor || 'AILÉE Lover',
        rating: newRating,
        date: new Date().toISOString().split('T')[0],
        shadeUsed: `${activeShade.code} ${activeShade.name}`,
        skinType: '뉴트럴 21호',
        title: newTitle || '너무 마음에 들어요!',
        content: newContent,
        helpfulCount: 1,
        verifiedPurchase: true
      };
      setReviewsList([rev, ...reviewsList]);
      setShowReviewModal(false);
      setNewTitle('');
      setNewContent('');
      setNewAuthor('');
    }
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, activeShade, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1500);
  };

  const pairedProducts = PRODUCTS.filter(p => product.pairsWellWithIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in duration-300">
      
      {/* Back Button & Navigation Path */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B5A69] hover:text-[#2D262B] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>목록으로 돌아가기 (Back to Shop)</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenShadeFinder}
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FFE5EC] text-[#E86C78] hover:bg-[#E86C78] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Shade Finder</span>
          </button>
          <button
            onClick={onOpenShadeComparator}
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#FFE5EC] text-[#6B5A69] hover:text-[#2D262B] transition-colors cursor-pointer"
          >
            <span>컬러 비교</span>
          </button>
        </div>
      </div>

      {/* Hero Section: Product Visuals & Primary Purchase Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Visual Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Stage Image */}
          <div className="glass-card rounded-3xl overflow-hidden aspect-square border border-white shadow-lg relative bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => handleProductImageError(e, product.id)}
            />

            {/* Floating Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.isBestseller && (
                <span className="px-3 py-1 rounded-full bg-[#E86C78] text-white text-xs font-bold tracking-wider shadow-sm">
                  AILÉE BESTSELLER
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2D262B] text-xs font-bold shadow-sm">
                {product.textureType} • {product.finish} Finish
              </span>
            </div>

            {/* Active Shade Preview Overlay */}
            <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-2xl flex items-center justify-between border border-white/80 shadow-md">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full border-2 border-white shadow-xs"
                  style={{ background: activeShade.lipSwatchBg || activeShade.hex }}
                />
                <div>
                  <span className="text-xs font-bold text-[#2D262B] block">
                    {activeShade.code} {activeShade.name} ({activeShade.nameKo})
                  </span>
                  <span className="text-[11px] font-semibold text-[#E86C78]">
                    {activeShade.toneTag}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-[#6B5A69] hidden sm:block max-w-xs text-right">
                {activeShade.description}
              </p>
            </div>
          </div>

          {/* Swatch & Texture Visualizer Panel */}
          <div className="glass-card p-6 rounded-3xl border border-[#FFE5EC] space-y-4">
            <div className="flex items-center justify-between border-b border-[#FFE5EC] pb-3">
              <h3 className="text-sm font-serif font-bold text-[#2D262B] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E86C78]" />
                <span>발색 & 텍스처 오라 미리보기 (Swatch & Finish Visualizer)</span>
              </h3>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSwatchTab('lips')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    swatchTab === 'lips' ? 'bg-[#2D262B] text-white' : 'text-[#6B5A69] hover:bg-[#FFE5EC]'
                  }`}
                >
                  입술 발색
                </button>
                <button
                  onClick={() => setSwatchTab('wrist')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    swatchTab === 'wrist' ? 'bg-[#2D262B] text-white' : 'text-[#6B5A69] hover:bg-[#FFE5EC]'
                  }`}
                >
                  손목 발색
                </button>
                <button
                  onClick={() => setSwatchTab('texture')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    swatchTab === 'texture' ? 'bg-[#2D262B] text-white' : 'text-[#6B5A69] hover:bg-[#FFE5EC]'
                  }`}
                >
                  매크로 텍스처
                </button>
              </div>
            </div>

            {/* Display according to selected swatch tab */}
            {swatchTab === 'lips' && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#FFE5EC]/40 via-white to-[#E0F2FE]/40 text-center space-y-3">
                <div 
                  className="w-full h-28 rounded-2xl shadow-inner border-2 border-white transition-all duration-500 relative flex items-center justify-center overflow-hidden"
                  style={{ background: activeShade.lipSwatchBg || activeShade.hex }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className="relative z-10 text-white font-serif font-bold text-lg drop-shadow-md">
                    {activeShade.code} {activeShade.name} Lip Swatch
                  </span>
                </div>
                <p className="text-xs text-[#6B5A69]">
                  "자연광 아래에서 입술에 올렸을 때의 맑은 이슬 글로우 착색 느낌입니다."
                </p>
              </div>
            )}

            {swatchTab === 'wrist' && (
              <div className="p-6 rounded-2xl bg-[#FAF9F6] text-center space-y-4">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {product.shades.map((s) => (
                    <div key={s.id} className="text-center space-y-1">
                      <div
                        className={`w-12 h-16 rounded-full border-2 transition-transform ${
                          s.id === activeShade.id ? 'border-[#2D262B] scale-110 shadow-md' : 'border-white opacity-80'
                        }`}
                        style={{ background: s.lipSwatchBg || s.hex }}
                      />
                      <span className="text-[10px] font-bold block">{s.code}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#6B5A69]">
                  전 색상 피부 손목 그라데이션 발색 샷입니다. 클릭하여 원하시는 컬러를 선택해 보세요.
                </p>
              </div>
            )}

            {swatchTab === 'texture' && (
              <div className="p-6 rounded-2xl bg-white border border-[#FFE5EC] space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-[#FAF9F6]">
                    <Droplets className="w-5 h-5 text-[#E86C78] mx-auto mb-1" />
                    <span className="text-[10px] text-[#8C7A8B] block">수분 보습도</span>
                    <span className="text-sm font-bold text-[#2D262B]">{product.textureMetrics.moisture}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF9F6]">
                    <Sparkles className="w-5 h-5 text-[#E86C78] mx-auto mb-1" />
                    <span className="text-[10px] text-[#8C7A8B] block">유리알 광택도</span>
                    <span className="text-sm font-bold text-[#2D262B]">{product.textureMetrics.gloss}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF9F6]">
                    <Layers className="w-5 h-5 text-[#E86C78] mx-auto mb-1" />
                    <span className="text-[10px] text-[#8C7A8B] block">밀착 레이어링</span>
                    <span className="text-sm font-bold text-[#2D262B]">{product.textureMetrics.adherence}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF9F6]">
                    <Feather className="w-5 h-5 text-[#E86C78] mx-auto mb-1" />
                    <span className="text-[10px] text-[#8C7A8B] block">무게감</span>
                    <span className="text-sm font-bold text-[#2D262B]">{product.textureMetrics.weightlessness}% (공기감)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Info & Buying Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white space-y-6 bg-white/90">
            
            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#E86C78] tracking-widest uppercase">
                  {product.category} • {product.textureType}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D262B]">
                  <Star className="w-4 h-4 fill-[#FFD166] text-[#FFD166]" />
                  <span>{product.rating.toFixed(1)}</span>
                  <a href="#reviews" className="text-[#8C7A8B] underline text-[11px]">
                    ({reviewsList.length} 리뷰)
                  </a>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D262B]">
                {product.name}
              </h1>
              <p className="text-sm font-semibold text-[#6B5A69]">
                {product.nameKo}
              </p>

              <div className="pt-2 flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-[#2D262B]">
                  {product.price.toLocaleString()}원
                </span>
                <span className="text-xs text-[#0284C7] font-semibold">
                  (첫 구매 10% 할인가 {Math.round(product.price * 0.9).toLocaleString()}원 with LIGHT10)
                </span>
              </div>
            </div>

            {/* Product Summary */}
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#FFE5EC] text-xs text-[#6B5A69] leading-relaxed">
              {product.summary}
            </div>

            {/* ① COLOR Selection */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2D262B]">
                  컬러 선택 (Color Shade):
                </span>
                <span className="text-xs font-bold text-[#E86C78]">
                  {activeShade.code} {activeShade.name} ({activeShade.nameKo})
                </span>
              </div>

              {/* Shade Circle Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {product.shades.map((shade) => (
                  <button
                    key={shade.id}
                    onClick={() => setActiveShade(shade)}
                    className={`p-2 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      activeShade.id === shade.id
                        ? 'border-[#2D262B] bg-[#FFE5EC]/50 font-bold shadow-xs scale-105'
                        : 'border-[#FFE5EC] hover:bg-[#FAF9F6]'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full border-2 border-white shadow-xs"
                      style={{ background: shade.lipSwatchBg || shade.hex }}
                    />
                    <span className="text-[10px] text-[#2D262B] font-semibold">{shade.code}</span>
                  </button>
                ))}
              </div>

              {/* Selected Shade Tone Guide */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-[#FFE5EC]/50 to-[#FFF6D6]/50 text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#2D262B] text-white text-[10px] font-bold">
                    {activeShade.toneTag}
                  </span>
                  <span className="font-bold text-[#2D262B]">{activeShade.name}</span>
                </div>
                <p className="text-[#6B5A69] text-[11px] leading-relaxed">
                  {activeShade.description}
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-[#2D262B]">수량 선택</span>
              <div className="flex items-center border border-[#FFE5EC] rounded-full bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-1.5 text-xs font-bold text-[#2D262B] hover:bg-[#FFE5EC] rounded-l-full cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-1.5 text-xs font-bold text-[#2D262B] hover:bg-[#FFE5EC] rounded-r-full cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Main CTA Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-[#FFE5EC]">
              <button
                onClick={handleAddToCartClick}
                className={`w-full py-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  addedSuccess
                    ? 'bg-[#E0F2FE] text-[#0284C7]'
                    : 'bg-[#2D262B] text-white hover:bg-[#E86C78]'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>장바구니에 추가되었습니다!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#FFE5EC]" />
                    <span>{(product.price * quantity).toLocaleString()}원 • Shop Now (장바구니 담기)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-full py-3 rounded-full text-xs font-bold border transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#FFE5EC] text-[#E86C78] border-[#E86C78]'
                    : 'bg-white text-[#6B5A69] border-[#FFE5EC] hover:text-[#2D262B]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? '위시리스트에 저장됨' : '위시리스트에 담아두기'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Deep-Dive Detailed Content Tabs / Sections */}
      <div className="space-y-12 pt-8 border-t border-[#FFE5EC]">
        
        {/* Section 1: Detailed Description & Concept */}
        <div className="glass-card p-8 rounded-3xl border border-white space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE5EC] text-[#E86C78] text-xs font-bold">
            <Feather className="w-3.5 h-3.5" />
            <span>제품 상세 설명 (Description)</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2D262B]">
            {product.name}이 선사하는 빛의 오라
          </h2>
          <p className="text-sm text-[#6B5A69] leading-relaxed max-w-3xl">
            {product.description}
          </p>
        </div>

        {/* Section 2: How To Use & Recommended Skin Tones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* How To Use */}
          <div className="glass-card p-8 rounded-3xl border border-white space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF6D6] text-[#B45309] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>사용 방법 & 아티스트 팁 (How to Use)</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-[#2D262B]">
              완벽한 광채 연출 가이드
            </h3>
            <ul className="space-y-3 text-xs text-[#6B5A69]">
              {product.howToUse.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#2D262B] text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Skin Tones */}
          <div className="glass-card p-8 rounded-3xl border border-white space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] text-xs font-bold">
              <Sun className="w-3.5 h-3.5" />
              <span>추천 피부톤 (Recommended Skin Tones)</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-[#2D262B]">
              나에게 착붙인 톤 조합
            </h3>
            <div className="space-y-3 text-xs">
              {product.recommendedSkinTones.map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white border border-[#FFE5EC] space-y-1">
                  <span className="font-bold text-[#E86C78] block">{item.tone}</span>
                  <p className="text-[#6B5A69]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Section 3: Recommended Makeup Look & Key Ingredients */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Recommended Makeup Look */}
          <div className="glass-card p-8 rounded-3xl border border-white space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3E8FF] text-[#7E22CE] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>추천 메이크업 룩 (Recommended Makeup)</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-[#2D262B]">
              {product.recommendedMakeupLook.title}
            </h3>
            <p className="text-xs text-[#6B5A69] leading-relaxed">
              {product.recommendedMakeupLook.description}
            </p>
            <div className="p-3 rounded-2xl bg-[#FFE5EC]/50 border border-[#E86C78]/30 text-xs text-[#2D262B] font-medium">
              💡 <strong>Pro Tip:</strong> {product.recommendedMakeupLook.tip}
            </div>
          </div>

          {/* Key Ingredients */}
          <div className="glass-card p-8 rounded-3xl border border-white space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE5EC] text-[#E86C78] text-xs font-bold">
              <Droplets className="w-3.5 h-3.5" />
              <span>주요 성분 & 효능 (Key Ingredients)</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-[#2D262B]">
              피부를 위한 맑은 영양 성분
            </h3>
            <div className="space-y-3 text-xs">
              {product.keyIngredients.map((ing, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white border border-[#FFE5EC] space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#2D262B]">{ing.nameKo} ({ing.name})</span>
                  </div>
                  <p className="text-[#6B5A69] text-[11px]">{ing.effect}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Section 4: "Pairs Well With" (함께 사용하면 좋은 제품) */}
        {pairedProducts.length > 0 && (
          <div className="glass-card p-8 rounded-3xl border border-white space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#E86C78] uppercase tracking-wider">COMPLEMENTARY</span>
                <h3 className="text-xl font-serif font-bold text-[#2D262B]">
                  함께 사용하면 좋은 시너지 조합 (Pairs Well With)
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pairedProducts.map((paired) => (
                <div
                  key={paired.id}
                  className="p-4 rounded-2xl bg-white border border-[#FFE5EC] flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={paired.image}
                      alt={paired.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#FFE5EC]"
                      onError={(e) => handleProductImageError(e, paired.id)}
                    />
                    <div>
                      <span className="text-[10px] font-bold text-[#E86C78] uppercase">{paired.textureType}</span>
                      <h4 className="font-bold text-xs text-[#2D262B]">{paired.name}</h4>
                      <p className="text-xs font-bold text-[#2D262B]">{paired.price.toLocaleString()}원</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectProduct(paired)}
                    className="px-3 py-1.5 rounded-full bg-[#FAF9F6] border border-[#FFE5EC] text-xs font-bold text-[#2D262B] hover:bg-[#FFE5EC] transition-colors cursor-pointer"
                  >
                    보기
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: Real Reviews (리뷰) */}
        <div id="reviews" className="glass-card p-8 rounded-3xl border border-white space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#FFE5EC] pb-6">
            <div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-[#FFD166] text-[#FFD166]" />
                <span className="text-2xl font-serif font-bold text-[#2D262B]">
                  {product.rating.toFixed(1)} / 5.0
                </span>
                <span className="text-xs text-[#8C7A8B]">({reviewsList.length}개의 리얼 구매후기)</span>
              </div>
              <p className="text-xs text-[#6B5A69] pt-1">
                AILÉE 고객님들이 직접 경험한 투명한 발색과 텍스처 후기입니다.
              </p>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="px-5 py-2.5 rounded-full bg-[#2D262B] text-white text-xs font-bold hover:bg-[#E86C78] transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>리뷰 작성하기</span>
            </button>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="p-5 rounded-2xl bg-white border border-[#FFE5EC] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#2D262B]">{rev.author}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-[10px] font-bold">
                      {rev.skinType}
                    </span>
                    <span className="text-[#8C7A8B] text-[10px]">사용컬러: {rev.shadeUsed}</span>
                  </div>
                  <span className="text-[#8C7A8B] text-[10px]">{rev.date}</span>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-[#FFD166] text-[#FFD166]' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-[#2D262B] ml-2">{rev.title}</span>
                </div>

                <p className="text-xs text-[#6B5A69] leading-relaxed">
                  {rev.content}
                </p>

                <div className="pt-2 flex items-center justify-end text-[11px] text-[#8C7A8B]">
                  <button className="flex items-center gap-1 hover:text-[#E86C78] cursor-pointer">
                    <ThumbsUp className="w-3 h-3" />
                    <span>도움돼요 ({rev.helpfulCount})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Review Modal Simulator */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="glass-card w-full max-w-md rounded-3xl p-6 bg-white border border-white shadow-xl space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#2D262B]">
              {product.name} 리뷰 작성
            </h3>

            <form onSubmit={handleAddReview} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#2D262B] block mb-1">별점</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'fill-[#FFD166] text-[#FFD166]' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-[#2D262B] block mb-1">작성자 닉네임</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="예: 핑크러버"
                  className="w-full p-2.5 rounded-xl border border-[#FFE5EC]"
                />
              </div>

              <div>
                <label className="font-bold text-[#2D262B] block mb-1">리뷰 제목</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="한 줄 요약을 입력하세요"
                  className="w-full p-2.5 rounded-xl border border-[#FFE5EC]"
                />
              </div>

              <div>
                <label className="font-bold text-[#2D262B] block mb-1">리뷰 내용</label>
                <textarea
                  required
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="발색, 텍스처, 발림성 등 솔직한 후기를 들려주세요"
                  className="w-full p-2.5 rounded-xl border border-[#FFE5EC]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 rounded-full border border-[#FFE5EC] text-xs font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#2D262B] text-white text-xs font-bold hover:bg-[#E86C78]"
                >
                  등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
