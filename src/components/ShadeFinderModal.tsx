import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw, Heart, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, ColorShade } from '../types';
import { IMAGES, handleImageError } from '../assets/images';

interface ShadeFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProductShade: (product: Product, shade: ColorShade) => void;
  onAddToCart: (product: Product, shade: ColorShade) => void;
}

export const ShadeFinderModal: React.FC<ShadeFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectProductShade,
  onAddToCart
}) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    mood: '',
    finish: '',
    undertone: ''
  });

  if (!isOpen) return null;

  const moodOptions = [
    { value: 'Natural', label: 'Natural', desc: '자연스럽고 생기 있는 일상 데일리 무드', color: '#F68E71' },
    { value: 'Lovely', label: 'Lovely', desc: '사랑스럽고 화사한 생화 꽃잎 무드', color: '#F48FB1' },
    { value: 'Cool', label: 'Cool', desc: '세련되고 도회적인 오묘한 모브/베리 무드', color: '#B06D85' },
    { value: 'Bold', label: 'Bold', desc: '또렷하고 선명한 존재감 넘치는 체리 레전드 무드', color: '#E53935' },
  ];

  const finishOptions = [
    { value: 'Glossy', label: 'Glossy (유리알 광택)', desc: '맑고 투명한 유리알처럼 탱글하고 반짝이는 글로우', tag: 'Jelly Glow Tint 추천' },
    { value: 'Blur', label: 'Blur (구름 블러)', desc: '구름처럼 부드럽고 가볍게 밀착되는 보송 무스', tag: 'Cloud Blur Lip Mousse 추천' },
    { value: 'Dewy', label: 'Dewy (이슬 수분 윤기)', desc: '갓 스파를 받아나온 듯 촉촉하게 살아나는 멀티 이슬 수분밤', tag: 'Dew Drop Glow Balm 추천' },
  ];

  const toneOptions = [
    { value: 'Spring Warm', label: '봄 웜톤 (Spring Warm)', desc: '화사하고 따스한 피치, 로지 베이지 톤' },
    { value: 'Summer Cool', label: '여름 쿨톤 (Summer Cool)', desc: '맑고 깨끗한 쿨 핑크, 모브 톤' },
    { value: 'Autumn Warm', label: '가을 웜톤 (Autumn Warm)', desc: '그윽하고 따스한 누디 베이지, 로즈 톤' },
    { value: 'Winter Cool', label: '겨울 쿨톤 (Winter Cool)', desc: '선명하고 또렷한 딥 체리, 베리 톤' },
  ];

  // Logic to calculate exact recommended shade
  const getRecommendation = () => {
    let recProduct = PRODUCTS[0]; // default Jelly Glow Tint
    let recShade = recProduct.shades[2]; // 03 Pink Petal

    if (answers.finish === 'Blur') {
      recProduct = PRODUCTS.find(p => p.id === 'cloud-blur-lip-mousse') || PRODUCTS[1];
      if (answers.undertone.includes('Spring') || answers.mood === 'Natural') {
        recShade = recProduct.shades.find(s => s.code === '02') || recProduct.shades[1]; // 02 Peach Cream
      } else if (answers.undertone.includes('Autumn')) {
        recShade = recProduct.shades.find(s => s.code === '01') || recProduct.shades[0]; // 01 Vanilla Beige
      } else if (answers.undertone.includes('Winter') || answers.mood === 'Bold') {
        recShade = recProduct.shades.find(s => s.code === '04') || recProduct.shades[3]; // 04 Berry Jam
      } else {
        recShade = recProduct.shades.find(s => s.code === '03') || recProduct.shades[2]; // 03 Rose Latte
      }
    } else if (answers.finish === 'Dewy') {
      recProduct = PRODUCTS.find(p => p.id === 'dew-drop-glow-balm') || PRODUCTS[3];
      if (answers.mood === 'Lovely' || answers.undertone.includes('Summer')) {
        recShade = recProduct.shades.find(s => s.code === '02') || recProduct.shades[1]; // 02 Pearl Drop
      } else if (answers.mood === 'Natural') {
        recShade = recProduct.shades.find(s => s.code === '01') || recProduct.shades[0]; // 01 Pure Dew
      } else {
        recShade = recProduct.shades.find(s => s.code === '03') || recProduct.shades[2]; // 03 Rosy Beam
      }
    } else {
      // Glossy (Jelly Glow Tint)
      recProduct = PRODUCTS.find(p => p.id === 'jelly-glow-tint') || PRODUCTS[0];
      if (answers.mood === 'Lovely' && answers.undertone.includes('Summer')) {
        recShade = recProduct.shades.find(s => s.code === '03') || recProduct.shades[2]; // 03 Pink Petal
      } else if (answers.mood === 'Natural' || answers.undertone.includes('Spring')) {
        recShade = recProduct.shades.find(s => s.code === '02') || recProduct.shades[1]; // 02 Peach Soda
      } else if (answers.mood === 'Cool' && answers.undertone.includes('Summer')) {
        recShade = recProduct.shades.find(s => s.code === '05') || recProduct.shades[4]; // 05 Mauve Mist
      } else if (answers.mood === 'Bold' || answers.undertone.includes('Winter')) {
        recShade = recProduct.shades.find(s => s.code === '04') || recProduct.shades[3]; // 04 Cherry Jelly
      } else {
        recShade = recProduct.shades.find(s => s.code === '01') || recProduct.shades[0]; // 01 Rosy Glass
      }
    }

    return { product: recProduct, shade: recShade };
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ mood: '', finish: '', undertone: '' });
  };

  const recommendation = step === 4 ? getRecommendation() : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-card w-full max-w-xl rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-white shadow-2xl bg-white/95">
        
        {/* Background ambient light blur */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#FFE5EC] blur-3xl pointer-events-none opacity-80" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#E0F2FE] blur-3xl pointer-events-none opacity-80" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#6B5A69] hover:text-[#2D262B] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="text-center space-y-1 mb-6 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5EC] text-[#E86C78] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
            <span>AILÉE Personal Shade Finder</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2D262B]">
            나만의 빛을 발견하는 컬러 진단
          </h2>
          <p className="text-xs text-[#6B5A69]">
            몇 가지 간단한 질문으로 당신에게 꼭 어울리는 립 & 글로우 컬러를 찾아드립니다.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#FFE5EC]/60 h-1.5 rounded-full mb-8 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#E86C78] to-[#BAE6FD] h-full transition-all duration-500 rounded-full"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Step 1: Mood */}
        {step === 1 && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h3 className="text-sm font-bold text-[#2D262B] text-center">
              Q1. 평소 가장 좋아하는 메이크업 분위기는 어떤 느낌인가요?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {moodOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setAnswers({ ...answers, mood: opt.value });
                    setStep(2);
                  }}
                  className="p-4 rounded-2xl border border-[#FFE5EC] hover:border-[#E86C78] hover:bg-[#FFE5EC]/30 text-left transition-all cursor-pointer group hover:shadow-xs flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: opt.color }} />
                      <span className="font-bold text-xs text-[#2D262B] group-hover:text-[#E86C78]">
                        {opt.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B5A69]">{opt.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8C7A8B] group-hover:text-[#E86C78] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Finish */}
        {step === 2 && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h3 className="text-sm font-bold text-[#2D262B] text-center">
              Q2. 입술이나 피부 위 원하는 마무리 텍스처는 무엇인가요?
            </h3>
            <div className="space-y-3">
              {finishOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setAnswers({ ...answers, finish: opt.value });
                    setStep(3);
                  }}
                  className="w-full p-4 rounded-2xl border border-[#FFE5EC] hover:border-[#E86C78] hover:bg-[#FFF6D6]/30 text-left transition-all cursor-pointer group hover:shadow-xs flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#2D262B] group-hover:text-[#E86C78]">
                        {opt.label}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFE5EC] text-[#E86C78]">
                        {opt.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B5A69]">{opt.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8C7A8B] group-hover:text-[#E86C78] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-[#8C7A8B] hover:underline block mx-auto pt-2 cursor-pointer"
            >
              ← 이전 질문으로 돌아가기
            </button>
          </div>
        )}

        {/* Step 3: Tone */}
        {step === 3 && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <h3 className="text-sm font-bold text-[#2D262B] text-center">
              Q3. 당신의 피부 톤 또는 퍼스널 컬러 타입을 선택해 주세요.
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {toneOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setAnswers({ ...answers, undertone: opt.value });
                    setStep(4);
                  }}
                  className="p-4 rounded-2xl border border-[#FFE5EC] hover:border-[#E86C78] hover:bg-[#E0F2FE]/40 text-left transition-all cursor-pointer group hover:shadow-xs flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-xs text-[#2D262B] group-hover:text-[#E86C78]">
                      {opt.label}
                    </span>
                    <p className="text-[11px] text-[#6B5A69]">{opt.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8C7A8B] group-hover:text-[#E86C78] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="text-xs text-[#8C7A8B] hover:underline block mx-auto pt-2 cursor-pointer"
            >
              ← 이전 질문으로 돌아가기
            </button>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && recommendation && (
          <div className="space-y-6 text-center animate-in zoom-in-95 duration-400 relative">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FFE5EC]/80 via-white to-[#FFF6D6]/80 border border-white shadow-lg space-y-4">
              
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E86C78] text-white text-[11px] font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>매칭률 98.4% Perfect Match</span>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-[#8C7A8B] font-medium">AILÉE가 추천하는 당신의 컬러는</p>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#E86C78]">
                  {recommendation.shade.code} {recommendation.shade.name} ({recommendation.shade.nameKo})
                </h3>
                <p className="text-xs font-semibold text-[#2D262B]">
                  {recommendation.product.nameKo}
                </p>
              </div>

              {/* Shade preview circle */}
              <div className="flex items-center justify-center gap-4 py-2">
                <div
                  className="w-16 h-16 rounded-full shadow-md border-2 border-white transform hover:scale-110 transition-transform"
                  style={{ background: recommendation.shade.lipSwatchBg || recommendation.shade.hex }}
                />
                <div className="text-left space-y-1 text-xs">
                  <div className="px-2 py-0.5 rounded-full bg-[#2D262B] text-white text-[10px] inline-block font-bold">
                    {recommendation.shade.toneTag}
                  </div>
                  <p className="text-[#6B5A69] max-w-xs">{recommendation.shade.description}</p>
                </div>
              </div>

              {/* Product Card */}
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/90 border border-[#FFE5EC] text-left">
                <img
                  src={recommendation.product.image}
                  alt={recommendation.product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#FFE5EC]"
                  onError={(e) => handleImageError(e, recommendation.product.id === 'jelly-glow-tint' ? 'jellyTint' : recommendation.product.id === 'cloud-blur-lip-mousse' ? 'cloudMousse' : recommendation.product.id === 'glass-veil-highlighter' ? 'glassHighlighter' : recommendation.product.id === 'dew-drop-glow-balm' ? 'dewBalm' : 'heroBanner')}
                />
                <div className="flex-1 space-y-0.5">
                  <span className="text-[10px] font-bold text-[#E86C78] uppercase">{recommendation.product.textureType}</span>
                  <h4 className="font-bold text-xs text-[#2D262B]">{recommendation.product.name}</h4>
                  <p className="text-xs font-bold text-[#2D262B]">{recommendation.product.price.toLocaleString()}원</p>
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  onAddToCart(recommendation.product, recommendation.shade);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2D262B] text-white text-xs font-bold hover:bg-[#E86C78] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-4 h-4 text-[#FFE5EC]" />
                <span>장바구니 담기 (Shop Now)</span>
              </button>

              <button
                onClick={() => {
                  onSelectProductShade(recommendation.product, recommendation.shade);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-[#2D262B] border border-[#FFE5EC] text-xs font-bold hover:bg-[#FFE5EC] transition-colors cursor-pointer"
              >
                <span>상세 페이지에서 보기</span>
              </button>

              <button
                onClick={handleReset}
                className="p-3 rounded-full bg-white text-[#8C7A8B] border border-[#FFE5EC] hover:text-[#2D262B] transition-colors cursor-pointer"
                title="다시 진단하기"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
