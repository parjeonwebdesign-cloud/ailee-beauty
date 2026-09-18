import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { SparklingWingIcon } from './SparklingWingIcon';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenShadeFinder: () => void;
  onOpenShadeComparator: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenShadeFinder,
  onOpenShadeComparator,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'HOME', label: 'HOME' },
    { id: 'SHOP', label: 'SHOP' },
    { id: 'ABOUT', label: 'ABOUT' },
    { id: 'JOURNAL', label: 'JOURNAL' },
    { id: 'CONTACT', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-[#FFE5EC] via-[#FFF6D6] to-[#E0F2FE] px-4 py-1.5 text-center text-xs font-medium text-[#2D262B] border-b border-white/60">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#E86C78] animate-pulse" />
          <span>
            AILÉE Open Event: 첫 구매시 쿠폰코드 <strong className="font-bold underline decoration-[#E86C78]">LIGHT10</strong> 입력 10% 할인 (30,000원 이상 무료배송)
          </span>
        </div>
      </div>

      {/* Main Glass Header */}
      <div className="glass-panel border-b border-white/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Wing Motif */}
          <button 
            onClick={() => handleNavClick('HOME')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FFE5EC] via-[#FFF6D6] to-[#E0F2FE] flex items-center justify-center border border-white shadow-xs group-hover:scale-110 transition-transform duration-300">
              <SparklingWingIcon className="w-6 h-6 text-[#E86C78]" />
            </div>
            <div>
              <span className="text-2xl font-serif tracking-widest font-semibold text-[#2D262B] group-hover:text-[#E86C78] transition-colors">
                AILÉE
              </span>
              <span className="block text-[9px] tracking-[0.25em] text-[#8C7A8B] -mt-1 uppercase">
                Beauty that catches light
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs tracking-widest font-medium py-1 border-b-2 transition-all cursor-pointer ${
                  currentTab === item.id
                    ? 'text-[#2D262B] border-[#E86C78] font-semibold'
                    : 'text-[#6B5A69] border-transparent hover:text-[#2D262B] hover:border-[#FFE5EC]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions: Shade Finder, Comparator, Search, Wishlist, Cart */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Shade Finder CTA */}
            <button
              onClick={onOpenShadeFinder}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-[#FFE5EC] to-[#FFF6D6] text-[#2D262B] border border-white hover:shadow-md transition-all cursor-pointer hover:scale-105"
              title="Shade Finder"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E86C78]" />
              <span>Shade Finder</span>
            </button>

            {/* Shade Comparator */}
            <button
              onClick={onOpenShadeComparator}
              className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-white/80 text-[#6B5A69] border border-[#FFE5EC] hover:text-[#2D262B] hover:border-[#E86C78] transition-all cursor-pointer"
              title="컬러 비교하기"
            >
              <span>컬러 비교</span>
            </button>

            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#6B5A69] hover:text-[#2D262B] rounded-full hover:bg-white/60 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('SHOP')}
              className="p-2 text-[#6B5A69] hover:text-[#2D262B] rounded-full hover:bg-white/60 transition-colors cursor-pointer relative"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#E86C78] text-white text-[10px] flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Toggle */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2D262B] text-white hover:bg-[#433842] transition-colors cursor-pointer shadow-xs text-xs font-medium"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#FFE5EC]" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-[#E86C78] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold min-w-[18px] text-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2D262B] rounded-lg hover:bg-white/60 cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white p-4 space-y-3 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-sm tracking-wider py-2 px-3 rounded-lg font-medium transition-all ${
                  currentTab === item.id
                    ? 'bg-[#FFE5EC] text-[#2D262B] font-semibold'
                    : 'text-[#6B5A69] hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="pt-2 border-t border-[#FFE5EC] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenShadeFinder();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#FFE5EC] to-[#FFF6D6] text-[#2D262B] border border-white shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#E86C78]" />
              <span>나에게 어울리는 Shade Finder</span>
            </button>

            <button
              onClick={() => {
                onOpenShadeComparator();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-full text-xs font-medium bg-white text-[#6B5A69] border border-[#FFE5EC]"
            >
              <span>컬러 나란히 비교하기</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
