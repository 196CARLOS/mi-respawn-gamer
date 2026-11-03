import React from 'react';
import { useStore } from '../context/StoreContext';
import { Home, Gamepad2, ShoppingCart, ShoppingBag, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { setActiveModal, setDashboardInitialTab, setSelectedCategory, setCurrentView, currentView, orders, isLoggedIn, cartCount } = useStore();

  const handleNav = (tab: 'orders' | 'vault' | 'wallet') => {
    setDashboardInitialTab(tab);
    setActiveModal('dashboard');
  };

  const handleHome = () => {
    setCurrentView('store');
    setSelectedCategory('all');
    setActiveModal('none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCatalog = () => {
    setCurrentView('store');
    setSelectedCategory('all');
    setActiveModal('none');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleCart = () => {
    setActiveModal('cart');
  };

  const handleUser = () => {
    if (!isLoggedIn) {
      setActiveModal('login');
    } else {
      setDashboardInitialTab('orders');
      setActiveModal('dashboard');
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#070b16]/95 backdrop-blur-xl border-t border-slate-800 md:hidden h-14 px-2 flex items-center justify-around shadow-2xl shadow-black">
      <button
        onClick={handleHome}
        className={`flex flex-col items-center justify-center min-w-[52px] h-full transition-colors cursor-pointer ${
          currentView === 'store' ? 'text-emerald-400 font-black' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Home className="w-4 h-4" />
        <span className="text-[10px] mt-1 font-bold">Inicio</span>
      </button>

      <button
        onClick={handleCatalog}
        className="flex flex-col items-center justify-center min-w-[52px] h-full text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
      >
        <Gamepad2 className="w-4 h-4" />
        <span className="text-[10px] mt-1 font-bold">Catálogo</span>
      </button>

      <button
        onClick={handleCart}
        className="relative flex flex-col items-center justify-center min-w-[52px] h-full text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
      >
        <ShoppingCart className="w-4 h-4" />
        <span className="text-[10px] mt-1 font-bold">Carrito</span>
        {cartCount > 0 && (
          <span className="absolute top-1 right-2 min-w-[16px] h-4 px-1 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-black flex items-center justify-center leading-none">
            {cartCount}
          </span>
        )}
      </button>

      <button
        onClick={() => handleNav('orders')}
        className="relative flex flex-col items-center justify-center min-w-[52px] h-full text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
      >
        <ShoppingBag className="w-4 h-4" />
        <span className="text-[10px] mt-1 font-bold">Pedidos</span>
        {orders.length > 0 && (
          <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-emerald-400" />
        )}
      </button>

      <button
        onClick={handleUser}
        className="flex flex-col items-center justify-center min-w-[52px] h-full text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
      >
        <User className="w-4 h-4" />
        <span className="text-[10px] mt-1 font-bold">{isLoggedIn ? 'Perfil' : 'Ingresar'}</span>
      </button>
    </nav>
  );
};
