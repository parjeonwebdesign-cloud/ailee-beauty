import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Heart, Sparkles } from 'lucide-react';
import { Product, ColorShade } from '../types';
import { IMAGES, handleProductImageError } from '../assets/images';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product, shade?: ColorShade) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, shade: ColorShade) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist
}) => {
  const [activeShade, setActiveShade] = useState<ColorShade>(product.shades[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="glass-card rounded-3xl p-4 glass-card-hover group relative flex flex-col justify-between border border-white/80 bg-white/80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* Top Badges & Wishlist */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#FAF9F6] border border-[#FFE5EC] mb-4">
          
          {/* Main Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => handleProductImageError(e, product.id)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {product.isBestseller && (
              <span className="px-2.5 py-1 rounded-full bg-[#E86C78] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
                BESTSELLER
              </span>
            )}
            {product.isNew && (
              <span className="px-2.5 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] text-[10px] font-bold tracking-wider uppercase shadow-xs border border-white">
                NEW
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full bg-white/90 text-[#2D262B] text-[10px] font-medium tracking-wider shadow-xs backdrop-blur-xs">
              {product.textureType}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleWishlist) onToggleWishlist(product);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 cursor-pointer ${
              isWishlisted
                ? 'bg-[#FFE5EC] text-[#E86C78]'
                : 'bg-white/80 text-[#8C7A8B] hover:text-[#E86C78]'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Quick View Floating Overlay Button */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="flex-1 py-2 px-3 rounded-full bg-white/95 text-[#2D262B] text-xs font-bold shadow-md hover:bg-[#FFE5EC] transition-colors flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-sm"
            >
              <Eye className="w-3.5 h-3.5 text-[#E86C78]" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Color Swatch Circles */}
        <div className="flex items-center gap-1.5 mb-3 px-1 overflow-x-auto pb-1 scrollbar-none">
          {product.shades.map((shade) => (
            <button
              key={shade.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveShade(shade);
              }}
              className={`w-5 h-5 rounded-full border-2 transition-all cursor-pointer flex-shrink-0 relative group/swatch ${
                activeShade.id === shade.id
                  ? 'border-[#2D262B] scale-110 shadow-xs'
                  : 'border-white opacity-80 hover:opacity-100'
              }`}
              style={{ background: shade.lipSwatchBg || shade.hex }}
              title={`${shade.code} ${shade.name}`}
            />
          ))}
          <span className="text-[10px] text-[#8C7A8B] font-medium ml-1">
            {product.shades.length} Shades
          </span>
        </div>

        {/* Title & Info */}
        <div 
          onClick={() => onSelectProduct(product, activeShade)}
          className="space-y-1.5 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#E86C78] tracking-wider uppercase">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-[#6B5A69]">
              <Star className="w-3 h-3 fill-[#FFD166] text-[#FFD166]" />
              <span className="font-bold">{product.rating.toFixed(1)}</span>
              <span className="text-[#8C7A8B]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-serif font-bold text-sm text-[#2D262B] group-hover:text-[#E86C78] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#6B5A69] line-clamp-1">
            {product.nameKo} — <span className="font-medium text-[#2D262B]">{activeShade.code} {activeShade.name}</span>
          </p>

          <p className="text-xs text-[#8C7A8B] line-clamp-1 pt-0.5">
            {product.summary}
          </p>
        </div>
      </div>

      {/* Footer Price & Add to Cart */}
      <div className="pt-4 mt-3 border-t border-[#FFE5EC] flex items-center justify-between">
        <div>
          <span className="text-xs text-[#8C7A8B] block text-[10px]">KRW</span>
          <span className="text-base font-bold text-[#2D262B]">
            {product.price.toLocaleString()}원
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product, activeShade)}
          className="px-3.5 py-2 rounded-full bg-[#2D262B] text-white hover:bg-[#E86C78] transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-xs"
          title="Shop Now / Add to Cart"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#FFE5EC]" />
          <span>Shop Now</span>
        </button>
      </div>

    </div>
  );
};
