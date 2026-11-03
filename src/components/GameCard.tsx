import React, { useState } from 'react';
import { GameItem } from '../types';
import { useStore } from '../context/StoreContext';
import { Zap, ArrowRight, Info, CheckCircle2, ShieldCheck, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { GameLogo } from './GameLogo';

interface GameCardProps {
  game: GameItem;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { formatPrice, setSelectedGame, setSelectedPackage, setActiveModal, toggleWishlist, isInWishlist } = useStore();
  const [showDetails, setShowDetails] = useState(false);
  const isWishlisted = isInWishlist(game.id);

  const minPrice = Math.min(...game.packages.map(p => p.priceUSD));
  const categoryLabel = 
    game.category === 'recarga_id' ? 'Recarga Directa por ID' :
    game.category === 'suscripcion' ? 'Suscripción Digital' : 'Código PIN / Tarjeta';

  const handleSelect = () => {
    setSelectedGame(game);
    const defaultPkg = game.packages.find(p => p.popular) || game.packages[0];
    setSelectedPackage(defaultPkg);
    setActiveModal('recharge');
  };

  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative rounded-2xl bg-[#0c1424] border border-slate-800/90 hover:border-emerald-500/70 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]">
      {/* Real Game Image Hero Banner */}
      <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-950 border-b border-slate-800">
        {game.imageUrl && !imageError ? (
          <img
            src={game.imageUrl}
            alt={game.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${game.gradient} flex items-center justify-center`}>
            <GameLogo gameIdOrSlug={game.id} size="lg" />
          </div>
        )}

        {/* Gradient dark overlay for crystal-clear text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-slate-950/40 to-black/30 pointer-events-none" />

        {/* Top Badges: Category, Publisher & Wishlist */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-200 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-700/60 shadow-xs">
              {game.publisher}
            </span>
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-emerald-500/40 shadow-xs">
              {categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {game.popular && (
              <span className="text-[9px] font-black text-amber-950 bg-gradient-to-r from-amber-300 to-yellow-400 px-2 py-0.5 rounded-md shadow-sm font-sans tracking-wide">
                TOP SELLER
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(game.id);
              }}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer backdrop-blur-md ${
                isWishlisted
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md'
                  : 'bg-black/60 border-white/20 text-white/80 hover:text-rose-400 hover:bg-black/80'
              }`}
              title={isWishlisted ? 'Eliminar de mi Lista de Deseos' : 'Guardar en mi Lista de Deseos'}
              aria-label={isWishlisted ? 'Eliminar de mi Lista de Deseos' : 'Guardar en mi Lista de Deseos'}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Banner Content with Icon and Game Title */}
        <div className="absolute bottom-2.5 inset-x-3 z-10 flex items-end gap-2.5">
          <div className="shrink-0 drop-shadow-md">
            <GameLogo gameIdOrSlug={game.id} size="md" />
          </div>
          <div className="min-w-0 text-white drop-shadow">
            <h3 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors line-clamp-1 tracking-tight">
              {game.name}
            </h3>
            <p className="text-[11px] text-slate-300 line-clamp-1 font-medium">
              {game.shortDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Card Body in Dark Gaming Glass */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-[#0b1220] space-y-3">
        <div>
          {/* Tagline */}
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-2">
            <Zap className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
            <span className="line-clamp-1">{game.tagline}</span>
          </div>

          {/* Toggleable Rich Description */}
          {showDetails ? (
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2 animate-in fade-in duration-150">
              <p className="leading-relaxed font-medium">
                {game.detailedDescription || game.description}
              </p>
              {game.features && (
                <ul className="space-y-1 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  {game.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            /* Package sample options preview in Dark Style */
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                <span>Paquetes Disponibles:</span>
                <span className="text-[10px] text-emerald-400 font-bold">Entrega &lt; 60s</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {game.packages.slice(0, 4).map(pkg => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => {
                      setSelectedGame(game);
                      setSelectedPackage(pkg);
                      setActiveModal('recharge');
                    }}
                    className="px-2 py-1.5 rounded-lg bg-slate-900/90 hover:bg-emerald-950/40 hover:border-emerald-500/50 border border-slate-800 text-[11px] flex items-center justify-between cursor-pointer transition-colors text-left"
                    title={`Comprar ${pkg.name}`}
                  >
                    <span className="text-slate-200 font-bold truncate">{pkg.amount}</span>
                    <span className="text-emerald-400 font-mono text-[10px] tabular-nums shrink-0 ml-1 font-bold">
                      {formatPrice(pkg.priceUSD).split(' ')[0]} {formatPrice(pkg.priceUSD).split(' ')[1]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Details Toggle Button */}
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="text-[11px] text-slate-400 hover:text-emerald-400 font-bold flex items-center gap-1 cursor-pointer pt-1 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{showDetails ? 'Ocultar descripción' : 'Ver descripción completa del producto'}</span>
          {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {/* Pricing and Action Button */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">Desde</span>
            <span className="text-sm font-black text-emerald-400 font-mono tabular-nums drop-shadow-xs">
              {formatPrice(minPrice)}
            </span>
          </div>

          <button
            onClick={handleSelect}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-lg transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-emerald-600/30 cursor-pointer"
          >
            <span>{game.category === 'recarga_id' ? 'Recargar' : 'Comprar'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
