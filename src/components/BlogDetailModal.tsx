import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Clock, Calendar, User, Share2, Zap, ArrowRight, MessageSquare } from 'lucide-react';
import { OFFICIAL_PHONE } from '../data/games';
import { GameLogo } from './GameLogo';

export const BlogDetailModal: React.FC = () => {
  const { activeModal, setActiveModal, selectedBlogPost, openRealWhatsAppUrl, setSelectedGame, games } = useStore();

  if (activeModal !== 'blog_detail' || !selectedBlogPost) return null;

  const post = selectedBlogPost;
  const relatedGame = post.relatedGameId ? games.find(g => g.id === post.relatedGameId) : null;

  const handleClose = () => {
    setActiveModal('none');
  };

  const handleShare = () => {
    const text = `📖 *${post.title}*\n\nLee el artículo completo en el Blog Oficial de Mi Respawn:\nPlataforma de Recargas Gamer con Despacho Automatizado`;
    openRealWhatsAppUrl(OFFICIAL_PHONE, text);
  };

  const handleRechargeNow = () => {
    if (relatedGame) {
      setSelectedGame(relatedGame);
      setActiveModal('recharge');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0b1220] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className={`p-6 bg-gradient-to-r ${post.gradient} border-b border-slate-800 relative`}>
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-3">
            <span className="text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 font-extrabold">
              {post.category}
            </span>
            <button
              onClick={handleClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg bg-black/40 hover:bg-black/60 transition-colors cursor-pointer border border-white/10"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug drop-shadow-md">
            {post.title}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>{post.author}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.date}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.readTime}</span>
            </span>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-sm text-slate-300 leading-relaxed font-normal bg-[#0b1220] scrollbar-thin scrollbar-thumb-slate-800">
          <p className="text-base font-semibold text-emerald-200 leading-relaxed border-l-4 border-emerald-400 pl-3.5 py-1.5 bg-emerald-950/40 rounded-r-lg">
            {post.excerpt}
          </p>

          <div className="space-y-3.5 pt-2">
            {post.content.map((paragraph, idx) => (
              <p key={idx} className="text-slate-300 leading-relaxed text-sm">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Related Product Call To Action if exists */}
          {relatedGame && (
            <div className="mt-6 p-4 rounded-xl bg-[#0d1527] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <GameLogo gameIdOrSlug={relatedGame.id} size="md" />
                <div>
                  <div className="text-xs font-bold text-white">¿Listo para recargar {relatedGame.name}?</div>
                  <div className="text-[11px] text-slate-400">Acreditación directa por Player ID en menos de 60 segundos</div>
                </div>
              </div>

              <button
                onClick={handleRechargeNow}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-950/50 flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Recargar Ahora</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#080d19] border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handleShare}
            className="px-4 py-2 bg-[#25d366] hover:bg-[#20ba5a] text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Compartir por WhatsApp</span>
          </button>

          <button
            onClick={handleClose}
            className="px-4 py-2 bg-[#131f38] hover:bg-[#1a294a] text-slate-300 hover:text-white border border-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
