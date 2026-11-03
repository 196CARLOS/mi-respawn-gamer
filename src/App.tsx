/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { GameCard } from './components/GameCard';
import { HowItWorksSection } from './components/HowItWorksSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { QuickRechargeModal } from './components/QuickRechargeModal';
import { SecureCheckoutModal } from './components/SecureCheckoutModal';
import { AutomatedDeliveryView } from './components/AutomatedDeliveryView';
import { UserDashboardModal } from './components/UserDashboardModal';
import { LoginModal } from './components/LoginModal';
import { BlogDetailModal } from './components/BlogDetailModal';
import { CartDrawerModal } from './components/CartDrawerModal';
import { ContactModal } from './components/ContactModal';
import { WhatsAppSimulationToast } from './components/WhatsAppSimulationToast';
import { AdminSimulationToolbar } from './components/AdminSimulationToolbar';
import { Gamepad2, Star, RefreshCw, BookOpen, ArrowRight } from 'lucide-react';

const StoreContent: React.FC = () => {
  const { games, selectedCategory, searchQuery, setSearchQuery, setSelectedCategory, currentView, setCurrentView } = useStore();

  // Filter games based on search query and category
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.packages.some((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [games, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Real-time WhatsApp Notification Toast */}
      <WhatsAppSimulationToast />

      {/* Cyber Gaming HUD Ticker */}
      <div className="bg-[#050811]/90 border-b border-slate-800/80 text-[10px] sm:text-[11px] font-mono py-1 px-4 text-slate-400 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block -ml-3.5" />
            <span>RESPAWN CORE ONLINE</span>
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-400">NODOS ACTIVOS: <strong className="text-slate-200">GARENA · RIOT · MOONTON · EPIC · STEAM</strong></span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="hidden md:inline">DESPACHO AUTOMATIZADO: <strong className="text-emerald-400 font-bold">&lt;60s</strong></span>
          <span className="text-slate-700 hidden md:inline">|</span>
          <span className="text-emerald-400/90 font-bold">WHATSAPP BOT: 24/7 ACTIVO</span>
        </div>
      </div>

      {/* Top Bar Contract Navigation */}
      <Header />

      {/* Main Container */}
      <main className="flex-1">
        {currentView === 'blog' ? (
          /* Dedicated Blog View */
          <div>
            <div className="bg-[#0a0f1d] border-b border-slate-800 py-4 px-4 sm:px-8">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <button
                    onClick={() => setCurrentView('store')}
                    className="hover:text-emerald-400 cursor-pointer"
                  >
                    Inicio / Catálogo
                  </button>
                  <span>/</span>
                  <span className="text-emerald-400">Blog Gamer & Guías Oficiales</span>
                </div>

                <button
                  onClick={() => setCurrentView('store')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm shadow-emerald-600/30"
                >
                  <span>Ir a Recargas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <BlogSection />
          </div>
        ) : (
          /* Main Store View */
          <>
            {/* Hero Section */}
            <HeroSection />

            {/* Featured Catalog Grid */}
            <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                    <Gamepad2 className="w-4 h-4 text-emerald-400" />
                    <span className="tracking-wider uppercase">PRODUCTOS DIGITALES VERIFICADOS</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-sm">
                    {selectedCategory === 'all'
                      ? 'Catálogo Disponible'
                      : selectedCategory === 'recarga_id'
                      ? 'Recargas Directas por ID'
                      : selectedCategory === 'suscripcion'
                      ? 'Suscripciones & Membresías'
                      : 'Tarjetas de Regalo & Códigos PIN'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                    Mostrando {filteredGames.length} de {games.length} servicios con despacho automatizado en menos de 60 segundos
                  </p>
                </div>

                {searchQuery && (
                  <div className="flex items-center gap-2 text-xs text-slate-200 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700 shadow-lg">
                    <span>Filtrando por: <strong className="text-emerald-400">"{searchQuery}"</strong></span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-emerald-400 hover:underline font-bold ml-1 cursor-pointer"
                    >
                      Borrar
                    </button>
                  </div>
                )}
              </div>

              {/* Catalog Grid */}
              {filteredGames.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#0c1424] border border-slate-800 max-w-lg mx-auto my-8 shadow-xl">
                  <Gamepad2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-white mb-1">No se encontraron resultados</h3>
                  <p className="text-xs text-slate-400 mb-4 font-medium">
                    No encontramos juegos o servicios que coincidan con "{searchQuery}".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/30"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Ver Todos los Productos</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              )}
            </section>

            {/* How It Works Section */}
            <HowItWorksSection />

            {/* Blog Section Preview on Homepage */}
            <BlogSection />

            {/* Verified Gamer Reviews Strip in Dark Gaming Mode */}
            <section className="py-14 border-t border-slate-800/80 bg-[#080d1a]/90 relative overflow-hidden">
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 block mb-1 font-mono uppercase tracking-wider">⚡ RESEÑAS VERIFICADAS EN VIVO</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">Compradores Satisfechos en América Latina</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-white text-sm">4.9 / 5.0</span>
                    <span className="text-slate-400">(Más de 14.800 recargas confirmadas)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#0c1424] border border-slate-800 hover:border-slate-700 space-y-2 shadow-lg transition-all">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Marcos A. · Paraguay</span>
                      <span className="text-slate-500 text-[10px] font-mono">Hace 12 min</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-300 leading-normal font-medium">
                      "Pagué con Giros Tigo los 520 diamantes de Free Fire y al instante me llegó el comprobante al WhatsApp. Acreditado directamente en mi cuenta. 100% recomendado."
                    </p>
                    <div className="text-[11px] text-emerald-400 font-mono font-bold">Free Fire UID: 289417****</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0c1424] border border-slate-800 hover:border-slate-700 space-y-2 shadow-lg transition-all">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Camila R. · Colombia</span>
                      <span className="text-slate-500 text-[10px] font-mono">Hace 34 min</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-300 leading-normal font-medium">
                      "Compré la membresía de Xbox Game Pass Ultimate pagando con Nequi. El código PIN apareció en pantalla de inmediato y también en mi chat. ¡Súper confiable!"
                    </p>
                    <div className="text-[11px] text-emerald-400 font-mono font-bold">Xbox Ultimate 1 Mes</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0c1424] border border-slate-800 hover:border-slate-700 space-y-2 shadow-lg transition-all">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Esteban G. · Perú</span>
                      <span className="text-slate-500 text-[10px] font-mono">Hace 52 min</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-300 leading-normal font-medium">
                      "Pagué por Yape 1000 VP de Valorant. Es la única tienda que te valida el Riot ID antes de pagar para que no te equivoques. Excelente servicio."
                    </p>
                    <div className="text-[11px] text-emerald-400 font-mono font-bold">Riot ID: Valkyrie#LAN</div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar (≤ 15% viewport height) */}
      <MobileBottomNav />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsAppButton />

      {/* Modals */}
      <QuickRechargeModal />
      <SecureCheckoutModal />
      <AutomatedDeliveryView />
      <UserDashboardModal />
      <LoginModal />
      <BlogDetailModal />
      <CartDrawerModal />
      <ContactModal />

      {/* Quick Test / Demo Toolbar */}
      <AdminSimulationToolbar />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
