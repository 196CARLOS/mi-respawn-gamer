import React from 'react';
import { useStore } from '../context/StoreContext';
import { UserCheck, CreditCard, MessageSquare, Zap, ShieldCheck, Mail } from 'lucide-react';
import { OFFICIAL_PHONE, OFFICIAL_EMAIL } from '../data/games';

export const HowItWorksSection: React.FC = () => {
  const { openRealWhatsAppUrl } = useStore();

  return (
    <section className="py-14 sm:py-16 border-t border-slate-800 bg-[#070b16]/90 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-500/40 inline-block uppercase tracking-wider mb-2 font-mono">
            ⚡ PROCESO 100% AUTOMATIZADO
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-sm">
            ¿Cómo Funciona Mi Respawn?
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed font-medium">
            Sin esperas ni atención manual. Nuestro servidor inyecta tus compras directamente a la base de datos oficial y envía el recibo a tu WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-[#0c1324] border border-slate-800 hover:border-emerald-500/50 flex flex-col justify-between shadow-xl transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950/90 text-emerald-400 font-mono font-black text-sm flex items-center justify-center mb-4 border border-emerald-500/40 shadow-sm">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Elige tu Juego e Ingresa tu ID
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Selecciona Free Fire, Valorant, Robux o suscripciones. Nuestro sistema verifica tu ID en tiempo real para evitar errores de cuenta.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 flex items-center gap-1.5 font-bold font-mono">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Verificación instantánea de apodo</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-[#0c1324] border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between shadow-xl transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-950/90 text-cyan-400 font-mono font-black text-sm flex items-center justify-center mb-4 border border-cyan-500/40 shadow-sm">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Pago Seguro en tu Moneda Local
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Paga con tarjeta, Giros Tigo/SIPAP (Paraguay), Pago Móvil, Yape, PSE o Cripto con encriptación SSL de grado bancario.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-cyan-400 flex items-center gap-1.5 font-bold font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>0% comisiones y aprobación en segundos</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-[#0c1324] border border-slate-800 hover:border-[#25d366]/50 flex flex-col justify-between shadow-xl transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#25d366]/15 text-[#25d366] font-mono font-black text-sm flex items-center justify-center mb-4 border border-[#25d366]/40 shadow-sm">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Entrega & Alerta en WhatsApp
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tu PIN o saldo se acredita inmediatamente. Nuestro bot de WhatsApp oficial envía el comprobante a tu smartphone.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-[#25d366] flex items-center gap-1.5 font-bold font-mono">
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Confirmación oficial e instantánea en WhatsApp</span>
            </div>
          </div>
        </div>

        {/* Live CTA Strip with Contact Action Buttons Only in Dark Style */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-[#0d1424] to-cyan-950/60 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#25d366] text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-[#25d366]/20">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-sm font-black text-white">¿Tienes dudas o necesitas asistencia personalizada?</div>
              <div className="text-xs text-slate-300 font-medium">
                Atención directa las 24 horas a través de nuestros canales oficiales de soporte digital.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => openRealWhatsAppUrl(OFFICIAL_PHONE, '¡Hola Mi Respawn! Quisiera hacer una consulta antes de recargar.')}
              className="px-4 py-2.5 bg-[#25d366] hover:bg-[#20ba5a] text-slate-950 text-xs font-black rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-[#25d366]/20 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>Contactar por WhatsApp</span>
            </button>

            <a
              href={`mailto:${OFFICIAL_EMAIL}?subject=Consulta%20Mi%20Respawn`}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Mail className="w-4 h-4 text-slate-300" />
              <span>Enviar un Correo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
