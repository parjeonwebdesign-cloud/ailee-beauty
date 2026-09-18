import React, { useState } from 'react';
import { Search, Filter, Sparkles, ArrowRightLeft, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Product, ColorShade } from '../types';

interface ShopViewProps {
  onSelectProduct: (product: Product, shade?: ColorShade) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, shade: ColorShade) => void;
  onOpenShadeFinder: () => void;
  onOpenShadeComparator: () => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  initialCategory?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({
  onSelectProduct,
  onQuickView,
  onAddToCart,
  onOpenShadeFinder,
  onOpenShadeComparator,
  wishlist,
  onToggleWishlist,
  initialCategory = 'ALL'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedFinish, setSelectedFinish] = useState<string>('ALL');
  const [selectedTone, setSelectedTone] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter products
  const filteredProducts = PRODUCTS.filter((product) => {
    // Category match
    if (selectedCategory !== 'ALL' && product.category !== selectedCategory) {
      return false;
    }
    // Finish match
    if (selectedFinish !== 'ALL' && product.finish !== selectedFinish) {
      return false;
    }
    // Tone match (check if any shade matches tone)
    if (selectedTone !== 'ALL') {
      const hasTone = product.shades.some(s => s.tone === selectedTone);
      if (!hasTone) return false;
    }
    // Search query match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q) || product.nameKo.includes(q);
      const matchShade = product.shades.some(s => s.name.toLowerCase().includes(q) || s.nameKo.includes(q));
      if (!matchName && !matchShade) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured
  });

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedFinish('ALL');
    setSelectedTone('ALL');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFE5EC] text-[#E86C78] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AILÉE Light Collection</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#2D262B]">
          SHOP ALL PRODUCTS
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5A69] leading-relaxed">
          유리알 광택 립 틴트, 구름 무스, 하이라이터, 멀티 이슬 밤.<br />
          원하는 마무리감과 퍼스널 톤에 맞춰 나만의 빛을 찾아보세요.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={onOpenShadeFinder}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FFE5EC] to-[#FFF6D6] text-[#2D262B] border border-white text-xs font-bold hover:shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E86C78]" />
            <span>나에게 맞는 Shade Finder 퀴즈</span>
          </button>
          
          <button
            onClick={onOpenShadeComparator}
            className="px-5 py-2 rounded-full bg-white text-[#6B5A69] border border-[#FFE5EC] text-xs font-bold hover:text-[#2D262B] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>컬러 나란히 비교</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-6 rounded-3xl border border-white space-y-4 bg-white/80">
        
        {/* Search & Sort row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#8C7A8B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="제품명, 컬러명 (예: Rosy Glass, 핑크 페탈) 검색"
              className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-white border border-[#FFE5EC] focus:outline-none focus:border-[#E86C78]"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
            <span className="font-bold text-[#6B5A69]">정렬:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-full border border-[#FFE5EC] bg-white font-bold text-[#2D262B] focus:outline-none focus:border-[#E86C78]"
            >
              <option value="featured">AILÉE 추천순</option>
              <option value="price-asc">낮은 가격순</option>
              <option value="price-desc">높은 가격순</option>
              <option value="rating">평점 높은순</option>
            </select>
          </div>

        </div>

        {/* Filter Pills */}
        <div className="space-y-3 pt-2 border-t border-[#FFE5EC]">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#2D262B] min-w-[60px]">카테고리:</span>
            {['ALL', 'Lip', 'Face', 'Eye', 'Cheek', 'Highlighter'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2D262B] text-white'
                    : 'bg-white text-[#6B5A69] border border-[#FFE5EC] hover:bg-[#FFE5EC]'
                }`}
              >
                {cat === 'ALL' ? '전체보기' : cat === 'Lip' ? 'LIP (립)' : cat === 'Face' ? 'FACE (페이스)' : cat === 'Eye' ? 'EYE (아이)' : cat === 'Cheek' ? 'CHEEK (치크)' : 'HIGHLIGHTER (하이라이터)'}
              </button>
            ))}
          </div>

          {/* Finish Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#2D262B] min-w-[60px]">텍스처:</span>
            {['ALL', 'Glossy', 'Blur', 'Dewy', 'Pearl', 'Matte', 'Shimmer', 'Satin'].map((fin) => (
              <button
                key={fin}
                onClick={() => setSelectedFinish(fin)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedFinish === fin
                    ? 'bg-[#E86C78] text-white'
                    : 'bg-white text-[#6B5A69] border border-[#FFE5EC] hover:bg-[#FFE5EC]'
                }`}
              >
                {fin === 'ALL' ? '전체 텍스처' : fin}
              </button>
            ))}
          </div>

          {/* Undertone Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#2D262B] min-w-[60px]">퍼스널 톤:</span>
            {['ALL', 'Warm', 'Cool', 'Neutral'].map((tone) => (
              <button
                key={tone}
                onClick={() => setSelectedTone(tone)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedTone === tone
                    ? 'bg-[#E0F2FE] text-[#0284C7] font-bold border border-white'
                    : 'bg-white text-[#6B5A69] border border-[#FFE5EC] hover:bg-[#FFE5EC]'
                }`}
              >
                {tone === 'ALL' ? '전체 톤' : tone === 'Warm' ? '웜톤 (Warm)' : tone === 'Cool' ? '쿨톤 (Cool)' : '뉴트럴 (Neutral)'}
              </button>
            ))}

            {(selectedCategory !== 'ALL' || selectedFinish !== 'ALL' || selectedTone !== 'ALL' || searchQuery !== '') && (
              <button
                onClick={handleResetFilters}
                className="ml-auto flex items-center gap-1 text-xs text-[#E86C78] font-bold hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>필터 초기화</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center glass-card rounded-3xl p-8 space-y-4">
          <p className="text-base font-bold text-[#2D262B]">
            조건에 맞는 제품을 찾을 수 없습니다.
          </p>
          <p className="text-xs text-[#6B5A69]">
            다른 필터를 선택하시거나 초기화 버튼을 눌러주세요.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2 rounded-full bg-[#2D262B] text-white text-xs font-bold hover:bg-[#E86C78]"
          >
            전체 필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              isWishlisted={wishlist.some(w => w.id === product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}

    </div>
  );
};
