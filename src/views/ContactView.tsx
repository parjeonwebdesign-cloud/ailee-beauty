import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const faqs = [
    {
      q: 'Q. 나에게 어울리는 립 틴트/하이라이터 컬러는 어떻게 고르나요?',
      a: '상단 네비게이션의 [Shade Finder] 퀴즈를 이용하시면 3가지 질문(분위기, 마무리의 텍스처, 퍼스널 톤)으로 딱 맞는 컬러를 추천해 드립니다. 또한 [컬러 비교] 기능을 통해 2가지 전 색상을 나란히 비교해 보실 수 있습니다.'
    },
    {
      q: 'Q. 젤리 글로우 틴트 바른 후 광택을 오래 유지하는 팁이 있나요?',
      a: '틴트를 도포한 후 10초 동안 입술을 음파하지 않고 가만히 기다려주시면 수분 오일 오라막이 투명하게 피어오릅니다. 끈적임 없이 오랫동안 매끈한 유리알 입술이 유지됩니다.'
    },
    {
      q: 'Q. 배송 기간 및 무료 배송 기준은 어떻게 되나요?',
      a: '30,000원 이상 구매 시 전 상품 무료 배송 혜택을 드립니다. 결제 완료 후 1~2일 이내(주말/공휴일 제외) 안심 출고됩니다.'
    },
    {
      q: 'Q. 오프라인 매장이나 입점처에서 직접 테스트해 볼 수 있나요?',
      a: 'AILÉE 플래그십 스토어(성수/한남) 및 전국 주요 올리브영 매장에서 AILÉE의 전 제품 텍스처와 컬러를 직접 체험해 보실 수 있습니다.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFE5EC] text-[#E86C78] text-xs font-bold">
          <Mail className="w-3.5 h-3.5" />
          <span>Customer Care & Showroom</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#2D262B]">
          CONTACT & SHOWROOM
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5A69] leading-relaxed">
          AILÉE와 함께하는 순간에 궁금한 점이 있으시다면 언제든 편하게 문의해 주세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Info & Showrooms (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white space-y-4 bg-white/90">
            <h2 className="text-lg font-serif font-bold text-[#2D262B]">
              AILÉE 고객지원센터
            </h2>

            <div className="space-y-3 text-xs text-[#6B5A69]">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E86C78]" />
                <div>
                  <span className="font-bold text-[#2D262B] block">1800-AILÉE (1800-2453)</span>
                  <span>평일 10:00 - 18:00 (점심시간 12:30 - 13:30)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Mail className="w-4 h-4 text-[#E86C78]" />
                <div>
                  <span className="font-bold text-[#2D262B] block">help@ailee-beauty.com</span>
                  <span>이메일 문의 시 24시간 이내 순차 답변</span>
                </div>
              </div>
            </div>
          </div>

          {/* Showroom Locations */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white space-y-4 bg-white/90">
            <h2 className="text-lg font-serif font-bold text-[#2D262B]">
              플래그십 쇼룸 (Showrooms)
            </h2>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#FFE5EC] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#2D262B]">
                  <MapPin className="w-3.5 h-3.5 text-[#E86C78]" />
                  <span>AILÉE 성수 빛의 공간 플래그십</span>
                </div>
                <p className="text-[#6B5A69] text-[11px]">서울특별시 성동구 연무장길 45 1층</p>
                <p className="text-[#8C7A8B] text-[10px]">매일 11:00 - 20:00 (체험형 라이트 바 운영)</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#FFE5EC] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#2D262B]">
                  <MapPin className="w-3.5 h-3.5 text-[#E86C78]" />
                  <span>AILÉE 한남 아뜰리에</span>
                </div>
                <p className="text-[#6B5A69] text-[11px]">서울특별시 용산구 이태원로 240 2층</p>
                <p className="text-[#8C7A8B] text-[10px]">화-일 12:00 - 20:00 (월요일 휴무)</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Inquiry Form & FAQ (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* FAQ Section */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white space-y-4 bg-white/90">
            <h2 className="text-lg font-serif font-bold text-[#2D262B]">
              자주 묻는 질문 (FAQ)
            </h2>

            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-[#FFE5EC] rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs text-[#2D262B] bg-[#FAF9F6] hover:bg-[#FFE5EC]/40 flex items-center justify-between cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>

                  {openFaq === idx && (
                    <div className="p-4 text-xs text-[#6B5A69] leading-relaxed bg-white border-t border-[#FFE5EC]">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white space-y-4 bg-white/90">
            <h2 className="text-lg font-serif font-bold text-[#2D262B]">
              1:1 온라인 문의하기
            </h2>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-[#E0F2FE] text-[#0284C7] text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <h3 className="font-bold text-sm">문의가 접수되었습니다.</h3>
                <p className="text-xs">남겨주신 이메일로 24시간 이내 친절하게 답변드리겠습니다.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#2D262B] block mb-1">성함</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="홍길동"
                      className="w-full p-2.5 rounded-xl border border-[#FFE5EC] bg-white focus:outline-none focus:border-[#E86C78]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#2D262B] block mb-1">이메일 주소</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@email.com"
                      className="w-full p-2.5 rounded-xl border border-[#FFE5EC] bg-white focus:outline-none focus:border-[#E86C78]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#2D262B] block mb-1">문의 제목</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="문의하실 내용을 요약해 주세요"
                    className="w-full p-2.5 rounded-xl border border-[#FFE5EC] bg-white focus:outline-none focus:border-[#E86C78]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#2D262B] block mb-1">문의 내용</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="상세 문의 사항을 적어주시면 빠르게 안내해 드립니다."
                    className="w-full p-2.5 rounded-xl border border-[#FFE5EC] bg-white focus:outline-none focus:border-[#E86C78]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#2D262B] text-white font-bold text-xs hover:bg-[#E86C78] transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>문의 보내기</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
