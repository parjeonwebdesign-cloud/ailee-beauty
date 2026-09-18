import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Check, Truck, Tag } from 'lucide-react';
import { CartItem } from '../types';
import { IMAGES, handleImageError } from '../assets/images';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, shadeId: string, delta: number) => void;
  onRemoveItem: (productId: string, shadeId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // 0.1 for 10%
  const [couponError, setCouponError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Shipping & Total calculations
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 30000;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 3000;
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'LIGHT10') {
      setAppliedDiscount(0.1);
      setCouponError('');
    } else {
      setCouponError('유효하지 않은 쿠폰 코드입니다. (웰컴 쿠폰: LIGHT10)');
    }
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderCompleted(true);
    setTimeout(() => {
      onClearCart();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-card bg-white/95 border-l border-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#FFE5EC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E86C78]" />
              <h2 className="text-lg font-serif font-bold text-[#2D262B]">
                Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#6B5A69] hover:text-[#2D262B] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {orderCompleted ? (
            /* Order Completed View */
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-[#FFE5EC] text-[#E86C78] flex items-center justify-center border-2 border-white shadow-lg">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#2D262B]">
                주문이 성공적으로 완료되었습니다!
              </h3>
              <p className="text-xs text-[#6B5A69] max-w-xs leading-relaxed">
                AILÉE와 함께 빛을 발견해 주셔서 감사합니다. 정성스럽게 포장하여 맑은 광채를 전달해 드리겠습니다.
              </p>
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#FFE5EC] text-xs text-left w-full space-y-1">
                <p className="font-bold text-[#2D262B]">주문 내역 안내</p>
                <p className="text-[#6B5A69]">결제 금액: {finalTotal.toLocaleString()}원</p>
                <p className="text-[#6B5A69]">배송 예정: 1-2일 이내 출고</p>
              </div>
              <button
                onClick={() => {
                  setOrderCompleted(false);
                  setIsCheckingOut(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full bg-[#2D262B] text-white text-xs font-bold hover:bg-[#E86C78] transition-colors cursor-pointer"
              >
                쇼핑 계속하기
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout View */
            <div className="flex-1 p-6 overflow-y-auto space-y-5 animate-in slide-in-from-right duration-300">
              <button
                onClick={() => setIsCheckingOut(false)}
                className="text-xs text-[#8C7A8B] hover:underline cursor-pointer"
              >
                ← 장바구니로 돌아가기
              </button>

              <h3 className="text-lg font-serif font-bold text-[#2D262B]">
                주문 결제하기 (Checkout)
              </h3>

              <form onSubmit={handleSimulatePayment} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[#2D262B]">주문자 성함</label>
                  <input
                    type="text"
                    required
                    defaultValue="김알레"
                    className="w-full p-2.5 rounded-xl border border-[#FFE5EC] bg-white text-xs focus:outline-none focus:border-[#E86C78]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#2D262B]">연락처</label>
                  <input
                    type="tel"
                    required
                    defaultValue="010-1234-5678"
                    className="w-full p-2.5 rounded-xl border border-[#FFE5EC] bg-white text-xs focus:outline-none focus:border-[#E86C78]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#2D262B]">배송지 주소</label>
                  <input
                    type="text"
                    required
                    defaultValue="서울특별시 강남구 테헤란로 123 AILÉE 빌딩"
                    className="w-full p-2.5 rounded-xl border border-[#FFE5EC] bg-white text-xs focus:outline-none focus:border-[#E86C78]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#2D262B]">결제 수단 선택</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="p-2.5 border rounded-xl border-[#E86C78] bg-[#FFE5EC]/30 flex items-center gap-2 cursor-pointer font-bold">
                      <input type="radio" name="payment" defaultChecked />
                      <span>신용/체크카드</span>
                    </label>
                    <label className="p-2.5 border rounded-xl border-[#FFE5EC] bg-white flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="payment" />
                      <span>카카오페이 / 네이버페이</span>
                    </label>
                  </div>
                </div>

                {/* Summary */}
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#FFE5EC] space-y-1 text-xs">
                  <div className="flex justify-between text-[#6B5A69]">
                    <span>상품 금액</span>
                    <span>{subtotal.toLocaleString()}원</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#E86C78] font-semibold">
                      <span>쿠폰 할인</span>
                      <span>-{discountAmount.toLocaleString()}원</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#6B5A69]">
                    <span>배송비</span>
                    <span>{shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#2D262B] pt-2 border-t border-[#FFE5EC]">
                    <span>최종 결제 금액</span>
                    <span className="text-[#E86C78]">{finalTotal.toLocaleString()}원</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#2D262B] text-white font-bold text-xs hover:bg-[#E86C78] transition-colors cursor-pointer shadow-md"
                >
                  {finalTotal.toLocaleString()}원 결제 완료하기
                </button>
              </form>
            </div>
          ) : (
            /* Cart Items List View */
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Free Shipping Meter */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFE5EC] to-[#E0F2FE] border border-white space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#2D262B]">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#E86C78]" />
                    <span>
                      {amountNeededForFreeShipping === 0
                        ? '✨ 무료배송 혜택 적용 완료!'
                        : `무료배송까지 ${amountNeededForFreeShipping.toLocaleString()}원 남았습니다.`}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-white/80 h-2 rounded-full overflow-hidden border border-white">
                  <div
                    className="bg-[#E86C78] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              {items.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <ShoppingBag className="w-12 h-12 text-[#E86C78]/40 mx-auto" />
                  <p className="text-sm font-medium text-[#2D262B]">
                    장바구니가 비어 있습니다.
                  </p>
                  <p className="text-xs text-[#8C7A8B]">
                    AILÉE의 빛나는 제품을 담고 나만의 특별한 아름다움을 발견해 보세요.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedShade.id}`}
                      className="p-3 rounded-2xl bg-white border border-[#FFE5EC] flex gap-3 items-center shadow-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-[#FFE5EC]"
                        onError={(e) => handleImageError(e, item.product.id === 'jelly-glow-tint' ? 'jellyTint' : item.product.id === 'cloud-blur-lip-mousse' ? 'cloudMousse' : item.product.id === 'glass-veil-highlighter' ? 'glassHighlighter' : item.product.id === 'dew-drop-glow-balm' ? 'dewBalm' : 'heroBanner')}
                      />

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif font-bold text-xs text-[#2D262B]">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedShade.id)}
                            className="p-1 text-[#8C7A8B] hover:text-[#E86C78] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] text-[#E86C78] font-medium">
                          <span
                            className="w-3 h-3 rounded-full border border-white inline-block"
                            style={{ background: item.selectedShade.lipSwatchBg || item.selectedShade.hex }}
                          />
                          <span>{item.selectedShade.code} {item.selectedShade.name}</span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-[#FFE5EC] rounded-full bg-[#FAF9F6]">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedShade.id, -1)}
                              className="px-2 py-0.5 text-xs font-bold text-[#2D262B] hover:bg-[#FFE5EC] rounded-l-full cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedShade.id, 1)}
                              className="px-2 py-0.5 text-xs font-bold text-[#2D262B] hover:bg-[#FFE5EC] rounded-r-full cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-xs font-bold text-[#2D262B]">
                            {(item.product.price * item.quantity).toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Promo Coupon Form */}
              {items.length > 0 && (
                <form onSubmit={handleApplyCoupon} className="space-y-1 pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8C7A8B]" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="쿠폰 코드 입력 (예: LIGHT10)"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#FFE5EC] text-xs focus:outline-none focus:border-[#E86C78]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#FFE5EC] text-[#E86C78] text-xs font-bold hover:bg-[#E86C78] hover:text-white transition-colors cursor-pointer"
                    >
                      적용
                    </button>
                  </div>
                  {appliedDiscount > 0 && (
                    <p className="text-[11px] text-[#0284C7] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>10% 웰컴 할인 쿠폰 적용 완료!</span>
                    </p>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-[#E53935]">{couponError}</p>
                  )}
                </form>
              )}

            </div>
          )}

          {/* Footer Checkout Summary */}
          {items.length > 0 && !isCheckingOut && !orderCompleted && (
            <div className="p-6 border-t border-[#FFE5EC] bg-[#FAF9F6] space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[#6B5A69]">
                  <span>상품 소계</span>
                  <span>{subtotal.toLocaleString()}원</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#E86C78] font-semibold">
                    <span>10% 쿠폰 할인</span>
                    <span>-{discountAmount.toLocaleString()}원</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6B5A69]">
                  <span>배송비</span>
                  <span>{shippingFee === 0 ? '무료배송' : `${shippingFee.toLocaleString()}원`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2D262B] pt-2 border-t border-[#FFE5EC]">
                  <span>총 결제 예상 금액</span>
                  <span className="text-[#E86C78]">{finalTotal.toLocaleString()}원</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 rounded-full bg-[#2D262B] text-white font-bold text-xs hover:bg-[#E86C78] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>주문 결제하기 (Checkout)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
