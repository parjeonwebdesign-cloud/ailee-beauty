/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ShadeFinderModal } from './components/ShadeFinderModal';
import { ShadeComparatorModal } from './components/ShadeComparatorModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { IMAGES, handleImageError } from './assets/images';
import { ProductDetailView } from './views/ProductDetailView';
import { AboutView } from './views/AboutView';
import { JournalView } from './views/JournalView';
import { ContactView } from './views/ContactView';

import { PRODUCTS } from './data/products';
import { Product, ColorShade, CartItem } from './types';
import { Sparkles, X, Search } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('HOME');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedShadeCode, setSelectedShadeCode] = useState<string | undefined>(undefined);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Modals
  const [shadeFinderOpen, setShadeFinderOpen] = useState<boolean>(false);
  const [shadeComparatorOpen, setShadeComparatorOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Select Product and navigate to Detail
  const handleSelectProduct = (product: Product, shade?: ColorShade) => {
    setSelectedProduct(product);
    setSelectedShadeCode(shade ? shade.code : undefined);
    setCurrentTab('DETAIL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Management
  const handleAddToCart = (product: Product, shade: ColorShade, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedShade.id === shade.id
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedShade: shade, quantity }];
      }
    });
    showToast(`✨ ${product.name} (${shade.code} ${shade.name})가 장바구니에 담겼습니다.`);
  };

  const handleUpdateQuantity = (productId: string, shadeId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedShade.id === shadeId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string, shadeId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedShade.id === shadeId))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`${product.name}가 위시리스트에서 제외되었습니다.`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`❤️ ${product.name}가 위시리스트에 저장되었습니다.`);
        return [...prev, product];
      }
    });
  };

  // Filter products for global search modal
  const searchedProducts = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.nameKo.includes(searchQuery) ||
          p.shades.some(
            (s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.nameKo.includes(searchQuery)
          )
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#2D262B] selection:bg-[#FFE5EC] selection:text-[#E86C78]">
      
      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenShadeFinder={() => setShadeFinderOpen(true)}
        onOpenShadeComparator={() => setShadeComparatorOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'HOME' && (
          <HomeView
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            onOpenShadeFinder={() => setShadeFinderOpen(true)}
            onOpenShadeComparator={() => setShadeComparatorOpen(true)}
            setCurrentTab={setCurrentTab}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentTab === 'SHOP' && (
          <ShopView
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            onOpenShadeFinder={() => setShadeFinderOpen(true)}
            onOpenShadeComparator={() => setShadeComparatorOpen(true)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentTab === 'DETAIL' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            selectedShadeCode={selectedShadeCode}
            onBack={() => setCurrentTab('SHOP')}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onOpenShadeFinder={() => setShadeFinderOpen(true)}
            onOpenShadeComparator={() => setShadeComparatorOpen(true)}
          />
        )}

        {currentTab === 'ABOUT' && (
          <AboutView
            setCurrentTab={setCurrentTab}
            onOpenShadeFinder={() => setShadeFinderOpen(true)}
          />
        )}

        {currentTab === 'JOURNAL' && (
          <JournalView setCurrentTab={setCurrentTab} />
        )}

        {currentTab === 'CONTACT' && (
          <ContactView />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        onOpenShadeFinder={() => setShadeFinderOpen(true)}
      />

      {/* Modals & Drawers */}
      <ShadeFinderModal
        isOpen={shadeFinderOpen}
        onClose={() => setShadeFinderOpen(false)}
        onSelectProductShade={(prod, shade) => {
          handleSelectProduct(prod, shade);
          setShadeFinderOpen(false);
        }}
        onAddToCart={(prod, shade) => {
          handleAddToCart(prod, shade);
          setIsCartOpen(true);
        }}
      />

      <ShadeComparatorModal
        isOpen={shadeComparatorOpen}
        onClose={() => setShadeComparatorOpen(false)}
        onAddToCart={(prod, shade) => {
          handleAddToCart(prod, shade);
          setIsCartOpen(true);
        }}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onGoToDetail={(prod, shade) => {
          handleSelectProduct(prod, shade);
          setQuickViewProduct(null);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Global Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="glass-card w-full max-w-xl rounded-3xl p-6 bg-white border border-white shadow-2xl relative space-y-4">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-5 right-5 p-2 text-[#6B5A69] hover:text-[#2D262B] rounded-full hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 border-b border-[#FFE5EC] pb-3">
              <Search className="w-5 h-5 text-[#E86C78]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="AILÉE의 제품명 또는 원하는 컬러를 검색해 보세요"
                className="w-full text-sm font-bold text-[#2D262B] focus:outline-none bg-transparent"
                autoFocus
              />
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {searchQuery.trim() === '' ? (
                <div className="text-xs text-[#8C7A8B] text-center py-6">
                  인기 검색어: <span className="font-bold text-[#2D262B]">Rosy Glass, 핑크 페탈, 글래스 베일, 피치 소다</span>
                </div>
              ) : searchedProducts.length === 0 ? (
                <div className="text-xs text-[#8C7A8B] text-center py-6">
                  검색 결과가 없습니다.
                </div>
              ) : (
                searchedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      handleSelectProduct(prod);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-3 rounded-2xl hover:bg-[#FFE5EC]/40 border border-transparent hover:border-[#FFE5EC] flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 rounded-xl object-cover"
                        onError={(e) => handleImageError(e, prod.id === 'jelly-glow-tint' ? 'jellyTint' : prod.id === 'cloud-blur-lip-mousse' ? 'cloudMousse' : prod.id === 'glass-veil-highlighter' ? 'glassHighlighter' : prod.id === 'dew-drop-glow-balm' ? 'dewBalm' : 'heroBanner')}
                      />
                      <div>
                        <h4 className="font-bold text-xs text-[#2D262B]">{prod.name}</h4>
                        <p className="text-[11px] text-[#6B5A69]">{prod.nameKo}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#2D262B]">{prod.price.toLocaleString()}원</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-card px-5 py-3 rounded-full border border-white shadow-xl bg-white/95 text-xs font-bold text-[#2D262B] flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <Sparkles className="w-4 h-4 text-[#E86C78]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
