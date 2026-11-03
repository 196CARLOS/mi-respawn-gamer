import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, MessageSquare, Zap, Wallet, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import { OFFICIAL_PHONE } from '../data/games';

export const AdminSimulationToolbar: React.FC = () => {
  const {
    games,
    setSelectedGame,
    setSelectedPackage,
    setActiveModal,
    triggerManualWhatsAppNotification,
    orders,
    setUserBalanceUSD,
    userBalanceUSD,
    setDashboardInitialTab,
  } = useStore();

  const [isExpanded, setIsExpanded] = useState(false);

  const handleSimulateQuickFreeFire = () => {
    const ff = games.find(g => g.id === 'free-fire');
    if (ff) {
      setSelectedGame(ff);
      setSelectedPackage(ff.packages[1]); // 310 diamantes
      setActiveModal('recharge');
    }
  };

  const handleTestWhatsAppNotification = () => {
    if (orders.length > 0) {
      triggerManualWhatsAppNotification(orders[0]);
    }
  };

  const handleQuickAddBalance = () => {
    setUserBalanceUSD(userBalanceUSD + 20);
  };

  const handleOpenWhatsAppPanel = () => {
    setDashboardInitialTab('whatsapp');
    setActiveModal('dashboard');
  };

  return (
    <div className="fixed bottom-36 md:bottom-24 right-4 sm:right-6 z-30">
      {isExpanded ? (
        <div className="bg-[#0b1220] border border-slate-700/90 rounded-2xl shadow-2xl p-4 w-72 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
            <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Simulación & WhatsApp</span>
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <button
              onClick={handleTestWhatsAppNotification}
              className="w-full py-2 px-3 bg-[#25d366]/20 hover:bg-[#25d366]/30 text-[#25d366] font-bold rounded-lg text-left flex items-center gap-2 transition-colors border border-[#25d366]/40 cursor-pointer shadow-2xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25d366] fill-[#25d366]" />
              <span>Simular Alerta WhatsApp</span>
            </button>

            <button
              onClick={handleSimulateQuickFreeFire}
              className="w-full py-2 px-3 bg-[#0d1527] hover:bg-[#131f38] text-slate-200 font-bold rounded-lg text-left flex items-center gap-2 transition-colors cursor-pointer border border-slate-800"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Recarga Rápida (Free Fire)</span>
            </button>

            <button
              onClick={handleQuickAddBalance}
              className="w-full py-2 px-3 bg-[#0d1527] hover:bg-[#131f38] text-slate-200 font-bold rounded-lg text-left flex items-center gap-2 transition-colors cursor-pointer border border-slate-800"
            >
              <Wallet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cargar +$20 al Monedero</span>
            </button>

            <button
              onClick={handleOpenWhatsAppPanel}
              className="w-full py-2 px-3 bg-[#0d1527] hover:bg-[#131f38] text-slate-200 font-bold rounded-lg text-left flex items-center gap-2 transition-colors cursor-pointer border border-slate-800"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Configurar WhatsApp & Perfil</span>
            </button>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 text-center font-mono">
            Mi Respawn · Centro de Simulación & Entrega
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#0c1424] hover:bg-[#131f38] text-emerald-300 border border-slate-700/90 rounded-full shadow-xl backdrop-blur text-xs font-black transition-all hover:scale-105 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Simulador & Alertas</span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      )}
    </div>
  );
};
