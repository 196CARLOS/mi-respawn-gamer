import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, MessageSquare, HelpCircle, Mail, Phone } from 'lucide-react';
import { OFFICIAL_PHONE, OFFICIAL_EMAIL } from '../data/games';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setActiveModal, setDashboardInitialTab, openRealWhatsAppUrl } = useStore();

  const handleOpenHelp = () => {
    openRealWhatsAppUrl(OFFICIAL_PHONE, '¡Hola Mi Respawn! Tengo una consulta sobre una recarga o método de pago.');
  };

  const handleOpenFaq = () => {
    setDashboardInitialTab('whatsapp');
    setActiveModal('dashboard');
  };

  return (
    <footer className="mt-20 bg-[#050811] border-t border-slate-800 text-slate-400 text-xs pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-black text-base">
              <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-md shadow-emerald-600/30">
                R
              </div>
              <span className="font-display">MI RESPAWN</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              La plataforma líder en recargas de videojuegos, suscripciones y gift cards digitales para América Latina con entrega automatizada.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400 font-bold font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Entrega 100% automatizada & Garantizada</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">
              Categorías Populares
            </h4>
            <ul className="space-y-1.5 font-medium">
              <li>
                <button
                  onClick={() => setSelectedCategory('recarga_id')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Recargas por ID (Free Fire, MLBB, Valorant)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('suscripcion')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Suscripciones (PlayStation Plus, Game Pass, Discord)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('gift_card')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Tarjetas de Regalo (Roblox, Steam Wallet, Google Play)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer font-bold text-emerald-400/90"
                >
                  Ver Catálogo Completo
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Service Buttons */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">
              Canales de Contacto Directo
            </h4>
            <div className="space-y-2">
              <button
                onClick={handleOpenHelp}
                className="w-full py-2.5 px-3.5 bg-[#25d366] hover:bg-[#20ba5a] text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-[#25d366]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Contactar por WhatsApp</span>
              </button>

              <a
                href={`mailto:${OFFICIAL_EMAIL}?subject=Consulta%20Mi%20Respawn`}
                className="w-full py-2.5 px-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Mail className="w-4 h-4 text-slate-300" />
                <span>Enviar un Correo Electrónico</span>
              </a>

              <button
                onClick={handleOpenFaq}
                className="w-full py-2 px-3 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Preguntas Frecuentes & Guías</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 text-center font-mono">
              Atención humana inmediata y despacho &lt; 45 segundos
            </p>
          </div>

          {/* Col 4: Trust & Security Badges */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">
              Seguridad & Pagos
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Todas las transacciones están protegidas con cifrado TLS 1.3 de 256 bits y verificación bancaria 3D Secure.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-300 font-bold">
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">VISA / MC</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">SIPAP / TIGO</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">YAPE / PLIN</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">PAGO MÓVIL</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">MERCADO PAGO</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">USDT BINANCE</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-medium font-mono">
          <div>
            © {new Date().getFullYear()} Mi Respawn. Todos los derechos reservados. Plataforma de Recargas Gamer & Entrega Automatizada.
          </div>
          <div className="flex items-center gap-3">
            <span>Términos de Servicio</span>
            <span>·</span>
            <span>Política de Privacidad</span>
            <span>·</span>
            <span>Garantía de Satisfacción</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
