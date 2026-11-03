import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageSquare, ExternalLink, X, Send, ShieldCheck, Clock } from 'lucide-react';
import { OFFICIAL_PHONE } from '../data/games';

export const FloatingWhatsAppButton: React.FC = () => {
  const { openRealWhatsAppUrl } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const handleSendDirect = () => {
    const text = userMsg.trim() 
      ? `¡Hola Mi Respawn! ${userMsg.trim()}`
      : '¡Hola Mi Respawn! Quisiera consultar sobre una recarga de juegos y métodos de pago.';
    openRealWhatsAppUrl(OFFICIAL_PHONE, text);
    setIsOpen(false);
    setUserMsg('');
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Quick Interactive WhatsApp Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#075e54] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#25d366] text-slate-950 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">Mi Respawn WhatsApp</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
                  <span>Atención en línea 24/7</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-100 hover:text-white p-1 rounded transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#ece5dd] space-y-3 max-h-60 overflow-y-auto">
            <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-xs text-xs text-slate-800 leading-relaxed border border-slate-200/80">
              <p className="font-bold text-slate-900 mb-1">¡Hola! ¿En qué podemos ayudarte?</p>
              <p className="text-slate-600 text-[11px]">
                Despachamos recargas de Free Fire, Valorant, Roblox y suscripciones en menos de 60 segundos con comprobante oficial.
              </p>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-600" /> Respuesta inmediata
                </span>
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <ShieldCheck className="w-3 h-3" /> Verificado
                </span>
              </div>
            </div>
          </div>

          {/* Input and Quick Send */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendDirect()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white font-medium"
            />
            <button
              onClick={handleSendDirect}
              className="p-2 bg-[#25d366] hover:bg-[#20ba5a] text-slate-950 rounded-xl shadow-xs transition-colors cursor-pointer"
              title="Enviar a WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action WhatsApp Button with Pulse */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#25d366] hover:bg-[#20ba5a] text-slate-950 font-black rounded-full shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer whatsapp-pulse"
        title="Abrir WhatsApp Oficial"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 fill-current text-slate-950" />
        </div>
        <span className="hidden sm:inline text-xs font-black tracking-tight text-slate-950 whitespace-nowrap">
          WhatsApp Oficial
        </span>
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-700 border-2 border-white" />
      </button>
    </div>
  );
};
