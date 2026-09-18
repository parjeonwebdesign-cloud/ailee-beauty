import React, { useState } from 'react';
import { Sparkles, BookOpen, Clock, ArrowRight, X } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journals';
import { JournalArticle } from '../types';
import { IMAGES, handleImageError } from '../assets/images';

interface JournalViewProps {
  setCurrentTab: (tab: string) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({ setCurrentTab }) => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFE5EC] text-[#E86C78] text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>AILÉE Editorial Journal</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#2D262B]">
          JOURNAL & BEAUTY GUIDE
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5A69] leading-relaxed">
          맑고 투명한 유리알 피부 연출 팁부터 생화 메이크업 룩, 퍼스널 글로우 가이드까지 AILÉE의 오라를 담은 뷰티 에디토리얼을 소개합니다.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {JOURNAL_ARTICLES.map((article) => (
          <article
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="glass-card rounded-3xl p-5 glass-card-hover cursor-pointer border border-white space-y-4 flex flex-col justify-between bg-white/90"
          >
            <div className="space-y-3">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#FAF9F6]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => handleImageError(e, 'heroBanner')}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#8C7A8B]">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFE5EC] text-[#E86C78] font-bold">
                  {article.category}
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <h2 className="font-serif font-bold text-base text-[#2D262B] line-clamp-2">
                {article.title}
              </h2>

              <p className="text-xs text-[#6B5A69] leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-[#FFE5EC] flex items-center justify-between text-xs font-bold text-[#E86C78]">
              <span>아티클 전체 읽기</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="glass-card w-full max-w-2xl rounded-3xl p-6 sm:p-8 bg-white border border-white shadow-2xl relative max-h-[85vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 text-[#6B5A69] hover:text-[#2D262B] rounded-full hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 rounded-full bg-[#FFE5EC] text-[#E86C78] text-xs font-bold inline-block">
              {selectedArticle.category}
            </span>

            <h2 className="text-2xl font-serif font-bold text-[#2D262B]">
              {selectedArticle.title}
            </h2>

            <div className="aspect-video rounded-2xl overflow-hidden">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e, 'heroBanner')}
              />
            </div>

            <div className="text-xs text-[#6B5A69] leading-relaxed space-y-3 whitespace-pre-line">
              {selectedArticle.content}
            </div>

            <div className="pt-4 border-t border-[#FFE5EC] flex justify-end">
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  setCurrentTab('SHOP');
                }}
                className="px-6 py-2.5 rounded-full bg-[#2D262B] text-white text-xs font-bold hover:bg-[#E86C78]"
              >
                관련 제품 Shop All →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
