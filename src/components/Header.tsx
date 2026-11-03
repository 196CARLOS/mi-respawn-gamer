import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CURRENCIES, OFFICIAL_PHONE } from '../data/games';
import { Currency } from '../types';
import { User, Wallet, Sparkles, ChevronDown, MessageSquare, BookOpen, LogIn, Heart, ShoppingCart } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setSelectedCategory,
    currentCurrency,
    setCurrentCurrency,
    formatPrice,
    userBalanceUSD,
    isLoggedIn,
    currentUser,
    setActiveModal,
    setDashboardInitialTab,
    triggerManualWhatsAppNotification,
    orders,
    wishlist,
    cartCount,
    cartFinalTotalUSD,
  } = useStore();

  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const handleNavClick = (category: string) => {
    setCurrentView('store');
    setSelectedCategory(category);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleOpenDashboard = (tab: 'orders' | 'vault' | 'wallet' | 'profiles' | 'whatsapp' | 'wishlist') => {
    if (!isLoggedIn) {
      setActiveModal('login');
    } else {
      setDashboardInitialTab(tab);
      setActiveModal('dashboard');
    }
  };

  const handleOpenLogin = () => {
    setActiveModal('login');
  };

  const handleTestWhatsApp = () => {
    if (orders.length > 0) {
      triggerManualWhatsAppNotification(orders[0]);
    } else {
      setDashboardInitialTab('whatsapp');
      setActiveModal('dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090e1c]/90 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            setCurrentView('store');
            setSelectedCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2.5 hover:opacity-95 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-slate-950 font-black text-base border border-emerald-300/40">
            R
          </div>
          <span className="font-display tracking-tight text-white font-black drop-shadow-sm">MI RESPAWN</span>
        </button>

        {/* Zone 2: 4 Nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-300">
          <button
            onClick={() => handleNavClick('all')}
            className={`hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'store' ? 'text-emerald-400 font-bold' : ''
            }`}
          >
            Catálogo
          </button>
          <button
            onClick={() => handleNavClick('recarga_id')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>Recargas por ID</span>
          </button>
          <button
            onClick={() => handleNavClick('suscripcion')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Suscripciones
          </button>
          <button
            onClick={() => {
              setCurrentView('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
              currentView === 'blog' ? 'text-emerald-400 font-bold' : ''
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Blog Gamer</span>
          </button>
          <button
            onClick={() => setActiveModal('contact')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Contacto</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold bg-[#0d1424] hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
              title="Cambiar divisa"
            >
              <span>{currentCurrency.flag}</span>
              <span>{currentCurrency.code}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[#0c1424] border border-slate-700 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Seleccionar Moneda
                </div>
                {Object.values(CURRENCIES).map((curr: Currency) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrentCurrency(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors cursor-pointer ${
                      currentCurrency.code === curr.code ? 'text-emerald-400 font-bold bg-emerald-950/40' : 'text-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{curr.flag}</span>
                      <span>{curr.code} - {curr.name}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 font-mono">{curr.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => handleOpenDashboard('wishlist')}
            className={`relative p-2 rounded-lg border transition-all whitespace-nowrap shrink-0 flex items-center justify-center cursor-pointer ${
              wishlist.length > 0
                ? 'bg-rose-950/60 border-rose-500/50 text-rose-400 hover:bg-rose-900/60'
                : 'bg-[#0d1424] border-slate-700/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title={wishlist.length > 0 ? `Lista de Deseos (${wishlist.length})` : 'Lista de Deseos'}
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs leading-none">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setActiveModal('cart')}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold text-xs transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              cartCount > 0
                ? 'bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-600/30 hover:bg-emerald-500'
                : 'bg-[#0d1424] border-slate-700/80 text-slate-200 hover:text-white hover:bg-slate-800'
            }`}
            title="Ver carrito de compras"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Carrito</span>
            {cartCount > 0 && (
              <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-slate-950 text-emerald-300 text-[10px] font-black flex items-center justify-center leading-none border border-emerald-400/40">
                {cartCount}
              </span>
            )}
          </button>

          {/* Quick WhatsApp Alert Button */}
          <button
            onClick={handleTestWhatsApp}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#25d366] bg-[#25d366]/15 hover:bg-[#25d366]/25 border border-[#25d366]/40 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Centro de Notificaciones WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25d366] fill-[#25d366]" />
            <span>WhatsApp</span>
          </button>

          {/* User Account / Login Button */}
          {isLoggedIn ? (
            <button
              onClick={() => handleOpenDashboard('orders')}
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-md shadow-emerald-600/30 transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
            >
              <span className="text-sm">{currentUser.avatar}</span>
              <span className="hidden sm:inline font-bold">{currentUser.name.split(' ')[0]}</span>
              <div className="w-px h-3.5 bg-white/30" />
              <span className="font-mono tabular-nums text-emerald-100 font-bold">{formatPrice(userBalanceUSD).split(' ')[1]}</span>
            </button>
          ) : (
            <button
              onClick={handleOpenLogin}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-emerald-600 border border-slate-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Ingresar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
