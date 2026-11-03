import React from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Zap, Shield, MessageCircle, Gift, PhoneCall } from 'lucide-react';
import { OFFICIAL_PHONE } from '../data/games';

export const HeroSection: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    games,
    openRealWhatsAppUrl,
  } = useStore();

  const totalGames = games.length;

  return (
    <section className="relative pt-8 pb-10 sm:pt-14 sm:pb-16 overflow-hidden">
      {/* Dark Gaming Radial Energy Mesh Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-500/40 mb-4 tracking-wide shadow-lg shadow-emerald-950/50">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>TIENDA GAMER OFICIAL</span>
            </span>
            <span aria-hidden="true" className="text-emerald-600">·</span>
            <span>ENTREGA AUTOMÁTICA &lt; 60S</span>
            <span aria-hidden="true" className="text-emerald-600">·</span>
            <button
              onClick={() => openRealWhatsAppUrl(OFFICIAL_PHONE, '¡Hola Mi Respawn! Quisiera hacer una consulta sobre recargas o suscripciones.')}
              className="text-[#25d366] hover:text-[#20ba5a] font-black flex items-center gap-1 hover:underline cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>SOPORTE 24/7</span>
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight text-balance leading-tight drop-shadow-md">
            Recargas de Juegos & Suscripciones en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Menos de 60 Segundos
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance max-w-2xl mx-auto font-medium">
            Diamantes, Robux, Riot Points y suscripciones con inyección directa por Player ID o código digital. Confirmación en tiempo real enviada directamente a tu WhatsApp.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busca por juego, diamantes, pase o gift card (ej. Free Fire, Valorant, Robux...)"
                className="w-full pl-12 pr-4 py-3.5 bg-[#0d1424]/90 text-sm text-white placeholder-slate-400 border border-slate-700 rounded-xl shadow-xl shadow-black/40 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-semibold text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Value Proposition Strip in Dark Esports Style */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-[#0c1424]/90 border border-slate-800 hover:border-emerald-500/40 shadow-lg hover:shadow-xl transition-all">
            <div className="w-9 h-9 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-2.5 shadow-sm">
              <Zap className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-sm font-bold text-white">Despacho Automatizado</h3>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Conexión directa con APIs oficiales de Garena, Riot y Valve. Entrega en 30 a 60s.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0c1424]/90 border border-slate-800 hover:border-[#25d366]/40 shadow-lg hover:shadow-xl transition-all">
            <div className="w-9 h-9 rounded-lg bg-[#25d366]/15 text-[#25d366] border border-[#25d366]/30 flex items-center justify-center mb-2.5 shadow-sm">
              <MessageCircle className="w-4 h-4 stroke-[2.5] fill-current" />
            </div>
            <h3 className="text-sm font-bold text-white">Alertas por WhatsApp</h3>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Recibe al instante tu PIN, recibo fiscal y estado de despacho directo a tu smartphone.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0c1424]/90 border border-slate-800 hover:border-cyan-500/40 shadow-lg hover:shadow-xl transition-all">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-2.5 shadow-sm">
              <Shield className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-sm font-bold text-white">Pasarela Segura SSL</h3>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Tarjetas, Giros Tigo/SIPAP, Pago Móvil, Yape, SPEI y Cripto sin recargos.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0c1424]/90 border border-slate-800 hover:border-amber-500/40 shadow-lg hover:shadow-xl transition-all">
            <div className="w-9 h-9 rounded-lg bg-amber-950/80 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-2.5 shadow-sm">
              <Gift className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="text-sm font-bold text-white">5% Cashback Respawn</h3>
            <p className="text-xs text-slate-400 mt-1 leading-normal">
              Acumula monedas por cada recarga y canjéalas por saldo en compras futuras.
            </p>
          </div>
        </div>

        {/* Interactive Filter Tabs in Dark Gamer Segmented Style */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#0a0f1d] border border-slate-800 rounded-xl max-w-2xl mx-auto shadow-2xl">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            Todos los Productos ({totalGames})
          </button>
          <button
            onClick={() => setSelectedCategory('recarga_id')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === 'recarga_id'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            Recargas por ID
          </button>
          <button
            onClick={() => setSelectedCategory('suscripcion')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === 'suscripcion'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            Suscripciones Gamer
          </button>
          <button
            onClick={() => setSelectedCategory('gift_card')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === 'gift_card'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            Gift Cards & Pines
          </button>
        </div>
      </div>
    </section>
  );
};
