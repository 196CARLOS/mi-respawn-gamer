import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { OFFICIAL_PHONE, OFFICIAL_EMAIL } from '../data/games';
import { X, MessageSquare, Mail, HelpCircle, ShieldCheck, Clock, Send, Sparkles } from 'lucide-react';

export const ContactModal: React.FC = () => {
  const { activeModal, setActiveModal, openRealWhatsAppUrl, setDashboardInitialTab } = useStore();
  const [quickQuery, setQuickQuery] = useState('');
  const [queryCategory, setQueryCategory] = useState<'recarga' | 'pago' | 'pin' | 'otro'>('recarga');

  if (activeModal !== 'contact') return null;

  const handleClose = () => {
    setActiveModal('none');
  };

  const handleWhatsAppClick = () => {
    const text = quickQuery.trim()
      ? `¡Hola Mi Respawn! Tengo una consulta sobre [${queryCategory.toUpperCase()}]: ${quickQuery.trim()}`
      : '¡Hola Mi Respawn! Quisiera realizar una consulta sobre una recarga o método de pago.';
    openRealWhatsAppUrl(OFFICIAL_PHONE, text);
    handleClose();
  };

  const handleFaqClick = () => {
    handleClose();
    setDashboardInitialTab('whatsapp');
    setActiveModal('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0b1220] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden my-8 animate-in zoom-in-95 duration-200 flex flex-col">
        {/* Top Header */}
        <div className="p-6 bg-[#080d19] border-b border-slate-800 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#131f38] hover:bg-[#1a294a] border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Atención Gamer 24/7</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Canales de Contacto Directo
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-medium">
            Comunícate al instante con nuestro soporte técnico a través del canal de tu preferencia. Despacho automatizado y asistencia personalizada.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 bg-[#0b1220] overflow-y-auto max-h-[75vh] scrollbar-thin scrollbar-thumb-slate-800">
          {/* Quick Message Box */}
          <div className="p-4 rounded-xl bg-[#0d1527] border border-slate-800 space-y-3">
            <label className="text-xs font-bold text-slate-300 block">
              ¿Sobre qué deseas consultar? (Opcional)
            </label>

            <div className="grid grid-cols-4 gap-1.5">
              {(['recarga', 'pago', 'pin', 'otro'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setQueryCategory(cat)}
                  className={`py-1.5 text-[11px] font-bold rounded-lg border text-center uppercase transition-all cursor-pointer ${
                    queryCategory === cat
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                      : 'bg-[#080d1a] text-slate-400 border-slate-700 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  {cat === 'recarga' ? 'Recarga' : cat === 'pago' ? 'Pago' : cat === 'pin' ? 'Código' : 'Otro'}
                </button>
              ))}
            </div>

            <textarea
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              placeholder="Escribe brevemente tu pregunta o número de pedido si ya realizaste una compra..."
              rows={2}
              className="w-full p-2.5 bg-[#080d1a] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-medium resize-none"
            />
          </div>

          {/* Primary Action Buttons: Pure buttons without raw phone or email text */}
          <div className="space-y-3">
            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full p-4 bg-[#25d366] hover:bg-[#20ba5a] text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-[#25d366]/20 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-slate-950/15 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 fill-slate-950 text-slate-950" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-950 leading-tight">
                    Contactar por WhatsApp
                  </div>
                  <div className="text-[11px] font-bold text-slate-900/80">
                    Respuesta promedio &lt; 2 minutos · Chat en vivo
                  </div>
                </div>
              </div>
              <Send className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            {/* Email Button */}
            <a
              href={`mailto:${OFFICIAL_EMAIL}?subject=Consulta%20Mi%20Respawn%20[${queryCategory.toUpperCase()}]&body=${encodeURIComponent(quickQuery)}`}
              className="w-full p-4 bg-[#0d1527] hover:bg-[#131f38] border border-slate-700 text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-[#080d1a] border border-slate-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="font-extrabold text-white leading-tight">
                    Enviar un Correo Electrónico
                  </div>
                  <div className="text-[11px] font-medium text-slate-400">
                    Soporte corporativo y comprobantes oficiales
                  </div>
                </div>
              </div>
              <Send className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </a>

            {/* FAQ & Guide Button */}
            <button
              onClick={handleFaqClick}
              className="w-full p-3.5 bg-[#0d1527] hover:bg-[#131f38] border border-slate-800 text-slate-300 font-bold text-xs rounded-xl transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Preguntas Frecuentes & Guías de Canje</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold">Ver respuestas</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-around text-[11px] text-slate-400 font-semibold">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> Atención 24/7
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Despacho Protegido
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Cero Esperas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
