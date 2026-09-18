import React, { useState } from 'react';
import { X, Sparkles, ArrowRightLeft, Check, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, ColorShade } from '../types';

interface ShadeComparatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, shade: ColorShade) => void;
}

export const ShadeComparatorModal: React.FC<ShadeComparatorModalProps> = ({
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('jelly-glow-tint');
  
  const currentProduct = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  
  const [shade1, setShade1] = useState<ColorShade>(currentProduct.shades[0]);
  const [shade2, setShade2] = useState<ColorShade>(currentProduct.shades[2] || currentProduct.shades[1]);

  if (!isOpen) return null;

  const handleProductChange = (prodId: string) => {
    setSelectedProductId(prodId);
    const prod = PRODUCTS.find(p => p.id === prodId) || PRODUCTS[0];
    setShade1(prod.shades[0]);
    setShade2(prod.shades[1] || prod.shades[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-card w-full max-w-3xl rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-white shadow-2xl bg-white/95 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#6B5A69] hover:text-[#2D262B] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] text-xs font-semibold">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>AILÉE Color Swatch Comparator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2D262B]">
            컬러 나란히 비교하기
          </h2>
          <p className="text-xs text-[#6B5A69]">
            두 가지 컬러를 손쉽게 비교해 나만의 오라와 착붙 톤을 정교하게 찾아보세요.
          </p>
        </div>

        {/* Product Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {PRODUCTS.map((prod) => (
            <button
              key={prod.id}
              onClick={() => handleProductChange(prod.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedProductId === prod.id
                  ? 'bg-[#2D262B] text-white shadow-xs'
                  : 'bg-[#FAF9F6] text-[#6B5A69] border border-[#FFE5EC] hover:bg-[#FFE5EC]'
              }`}
            >
              {prod.nameKo}
            </button>
          ))}
        </div>

        {/* Side by side comparison container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          
          {/* VS Badge */}
          <div className="hidden md:flex absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#E86C78] text-white font-serif font-bold text-xs items-center justify-center border-2 border-white shadow-md">
            VS
          </div>

          {/* Column 1 */}
          <div className="glass-card rounded-2xl p-5 border border-[#FFE5EC] space-y-4">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold text-[#8C7A8B] uppercase">SHADE A</span>
              
              {/* Dropdown */}
              <select
                value={shade1.id}
                onChange={(e) => {
                  const s = currentProduct.shades.find(item => item.id === e.target.value);
                  if (s) setShade1(s);
                }}
                className="w-full p-2.5 rounded-xl border border-[#FFE5EC] bg-white text-xs font-bold text-[#2D262B] focus:outline-none focus:border-[#E86C78]"
              >
                {currentProduct.shades.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code} {s.name} ({s.nameKo}) - {s.toneTag}
                  </option>
                ))}
              </select>
            </div>

            {/* Swatch circle */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#FAF9F6] border border-[#FFE5EC] space-y-3">
              <div
                className="w-20 h-20 rounded-full shadow-md border-4 border-white"
                style={{ background: shade1.lipSwatchBg || shade1.hex }}
              />
              <div className="text-center">
                <span className="text-xs font-bold text-[#2D262B] block">{shade1.code} {shade1.name}</span>
                <span className="text-[11px] text-[#E86C78] font-semibold block">{shade1.toneTag}</span>
              </div>
            </div>

            <p className="text-xs text-[#6B5A69] text-center leading-relaxed bg-white p-3 rounded-xl border border-[#FFE5EC]">
              {shade1.description}
            </p>

            <button
              onClick={() => onAddToCart(currentProduct, shade1)}
              className="w-full py-2.5 rounded-xl bg-[#2D262B] text-white text-xs font-bold hover:bg-[#E86C78] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#FFE5EC]" />
              <span>{shade1.code} 컬러 담기</span>
            </button>
          </div>

          {/* Column 2 */}
          <div className="glass-card rounded-2xl p-5 border border-[#FFE5EC] space-y-4">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold text-[#8C7A8B] uppercase">SHADE B</span>
              
              {/* Dropdown */}
              <select
                value={shade2.id}
                onChange={(e) => {
                  const s = currentProduct.shades.find(item => item.id === e.target.value);
                  if (s) setShade2(s);
                }}
                className="w-full p-2.5 rounded-xl border border-[#FFE5EC] bg-white text-xs font-bold text-[#2D262B] focus:outline-none focus:border-[#E86C78]"
              >
                {currentProduct.shades.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code} {s.name} ({s.nameKo}) - {s.toneTag}
                  </option>
                ))}
              </select>
            </div>

            {/* Swatch circle */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#FAF9F6] border border-[#FFE5EC] space-y-3">
              <div
                className="w-20 h-20 rounded-full shadow-md border-4 border-white"
                style={{ background: shade2.lipSwatchBg || shade2.hex }}
              />
              <div className="text-center">
                <span className="text-xs font-bold text-[#2D262B] block">{shade2.code} {shade2.name}</span>
                <span className="text-[11px] text-[#E86C78] font-semibold block">{shade2.toneTag}</span>
              </div>
            </div>

            <p className="text-xs text-[#6B5A69] text-center leading-relaxed bg-white p-3 rounded-xl border border-[#FFE5EC]">
              {shade2.description}
            </p>

            <button
              onClick={() => onAddToCart(currentProduct, shade2)}
              className="w-full py-2.5 rounded-xl bg-[#2D262B] text-white text-xs font-bold hover:bg-[#E86C78] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#FFE5EC]" />
              <span>{shade2.code} 컬러 담기</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
