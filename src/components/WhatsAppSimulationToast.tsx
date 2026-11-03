import React from 'react';
import { useStore } from '../context/StoreContext';
import { MessageSquare, ExternalLink, X, CheckCheck, ShieldCheck } from 'lucide-react';

export const WhatsAppSimulationToast: React.FC = () => {
  const { whatsAppToast, dismissWhatsAppToast, openRealWhatsAppUrl, setActiveModal, setDashboardInitialTab } = useStore();

  if (!whatsAppToast || !whatsAppToast.isOpen) return null;

  const handleOpenWhatsApp = () => {
    openRealWhatsAppUrl(whatsAppToast.phone, whatsAppToast.message);
  };

  const handleViewReceipt = () => {
    dismissWhatsAppToast();
    setDashboardInitialTab('orders');
    setActiveModal('dashboard');
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full mx-auto p-2 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-[#121b22] border border-[#25d366]/40 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
        {/* WhatsApp App Header */}
        <div className="bg-[#1f2c34] px-3.5 py-2 flex items-center justify-between border-b border-[#2a3942]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#25d366] flex items-center justify-center text-white">
              <MessageSquare className="w-3 h-3 fill-current" />
            </div>
            <span className="text-[12px] font-bold text-white">Mi Respawn Bot · Verificado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-emerald-300 font-medium">{whatsAppToast.timestamp}</span>
            <button
              onClick={dismissWhatsAppToast}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              title="Cerrar notificación"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* WhatsApp Chat Bubble */}
        <div className="p-3.5 bg-[#0b141a]">
          <div className="bg-[#005c4b] text-[#e9edef] rounded-lg p-3 text-[13px] leading-relaxed shadow-sm relative">
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#0f7a65]">
              <span className="font-bold text-white flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Transacción Confirmada
              </span>
              <span className="text-[11px] text-emerald-200 font-mono">
                #{whatsAppToast.order?.id}
              </span>
            </div>

            <p className="whitespace-pre-line font-sans text-xs text-slate-100">
              {whatsAppToast.message}
            </p>

            <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-emerald-200/80">
              <span>{new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
              <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-2.5 flex items-center gap-2">
            <button
              onClick={handleOpenWhatsApp}
              className="flex-1 py-1.5 px-3 bg-[#25d366] hover:bg-[#20ba5a] text-slate-950 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir en WhatsApp</span>
            </button>
            <button
              onClick={handleViewReceipt}
              className="py-1.5 px-3 bg-[#2a3942] hover:bg-[#374955] text-slate-200 text-xs font-medium rounded-lg transition-colors"
            >
              Ver Pedidos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
