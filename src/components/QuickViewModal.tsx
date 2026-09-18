import React, { useState } from 'react';
import { X, Star, ShoppingBag, Sparkles, Check, Heart } from 'lucide-react';
import { Product, ColorShade } from '../types';
import { IMAGES, handleProductImageError } from '../assets/images';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, shade: ColorShade, quantity: number) => void;
  onGoToDetail: (product: Product, shade: ColorShade) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onGoToDetail
}) => {
  if (!isOpen || !product) return null;

  const [selectedShade, setSelectedShade] = useState<ColorShade>(product.shades[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedShade, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-card w-full max-w-2xl rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-white/95 border border-white shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#6B5A69] hover:text-[#2D262B] rounded-full hover:bg-black/5 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Image & Swatch Box */}
          <div className="space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#FAF9F6] border border-[#FFE5EC] relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => handleProductImageError(e, product.id)}
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#E86C78]">
                {selectedShade.code} {selectedShade.name} ({selectedShade.nameKo})
              </div>
            </div>

            {/* Selected Shade Details */}
            <div className="p-3 rounded-2xl bg-[#FAF9F6] border border-[#FFE5EC] flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full border-2 border-white shadow-xs flex-shrink-0"
                style={{ background: selectedShade.lipSwatchBg || selectedShade.hex }}
              />
              <div className="text-xs">
                <span className="font-bold text-[#2D262B] block">{selectedShade.toneTag}</span>
                <p className="text-[#6B5A69] text-[11px] line-clamp-1">{selectedShade.description}</p>
              </div>
            </div>
          </div>

          {/* Right Product Details */}
          <div className="flex flex-col justify-between space-y-4">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#E86C78] tracking-widest uppercase">
                  {product.category} • {product.textureType}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-[#2D262B]">
                  <Star className="w-3.5 h-3.5 fill-[#FFD166] text-[#FFD166]" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-[#2D262B]">{product.name}</h2>
                <p className="text-xs text-[#6B5A69]">{product.nameKo}</p>
              </div>

              <p className="text-lg font-bold text-[#2D262B]">
                {product.price.toLocaleString()}원
              </p>

              <p className="text-xs text-[#6B5A69] leading-relaxed">
                {product.description}
              </p>

              {/* Shade Selection Grid */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-[#2D262B] block">
                  Color Shade: <span className="text-[#E86C78]">{selectedShade.code} {selectedShade.name}</span>
                </span>
                
                <div className="grid grid-cols-3 gap-2">
                  {product.shades.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedShade(s)}
                      className={`p-2 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center gap-2 ${
                        selectedShade.id === s.id
                          ? 'border-[#2D262B] bg-[#FFE5EC]/40 font-bold'
                          : 'border-[#FFE5EC] hover:bg-[#FAF9F6]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white flex-shrink-0"
                        style={{ background: s.lipSwatchBg || s.hex }}
                      />
                      <span className="truncate text-[11px]">{s.code} {s.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs font-bold text-[#2D262B]">수량:</span>
                <div className="flex items-center border border-[#FFE5EC] rounded-full bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-xs font-bold text-[#2D262B] hover:bg-[#FFE5EC] rounded-l-full cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-xs font-bold text-[#2D262B] hover:bg-[#FFE5EC] rounded-r-full cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-4 border-t border-[#FFE5EC]">
              <button
                onClick={handleAdd}
                className={`w-full py-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  addedAnimation
                    ? 'bg-[#E0F2FE] text-[#0284C7]'
                    : 'bg-[#2D262B] text-white hover:bg-[#E86C78]'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>장바구니에 담겼습니다!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#FFE5EC]" />
                    <span>{product.price * quantity}원 • 장바구니 담기 (Shop Now)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onGoToDetail(product, selectedShade);
                  onClose();
                }}
                className="w-full text-center text-xs font-medium text-[#6B5A69] hover:text-[#2D262B] hover:underline py-1 cursor-pointer"
              >
                상세 페이지에서 더 많은 발색 & 텍스처 보기 →
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
