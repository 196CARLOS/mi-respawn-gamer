import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { BlogPost } from '../types';
import { BookOpen, Clock, User, ArrowRight, Search, Share2, Sparkles, MessageSquare } from 'lucide-react';
import { OFFICIAL_PHONE } from '../data/games';

export const BlogSection: React.FC = () => {
  const { blogPosts, setSelectedBlogPost, setActiveModal, openRealWhatsAppUrl, setSelectedGame, games } = useStore();
  const [selectedBlogCat, setSelectedBlogCat] = useState<string>('all');
  const [blogSearch, setBlogSearch] = useState<string>('');

  const categories = ['all', 'Guías de Recarga', 'Tutoriales', 'Noticias & Análisis', 'Suscripciones', 'Ciberseguridad Gamer'];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCat = selectedBlogCat === 'all' || post.category === selectedBlogCat;
      const matchesSearch = 
        blogSearch.trim() === '' ||
        post.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(blogSearch.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(blogSearch.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [blogPosts, selectedBlogCat, blogSearch]);

  const handleReadPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setActiveModal('blog_detail');
  };

  const handleShareWhatsApp = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `📢 *${post.title}*\n\n${post.excerpt}\n\nLee más guías oficiales y recarga seguro en Mi Respawn (Entrega Automatizada)`;
    openRealWhatsAppUrl(OFFICIAL_PHONE, text);
  };

  const handleQuickRechargeRelated = (gameId?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!gameId) return;
    const game = games.find(g => g.id === gameId);
    if (game) {
      setSelectedGame(game);
      setActiveModal('recharge');
    }
  };

  return (
    <section id="blog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Blog Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-500/40 uppercase tracking-wider mb-3 font-mono">
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>Blog Gamer & Guías de Recarga</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-sm">
          Noticias, Tutoriales y Consejos de Ciberseguridad
        </h2>
        <p className="mt-3 text-sm text-slate-400 font-medium leading-relaxed">
          Aprende cómo optimizar tus recargas, canjear pases de batalla oficiales y evitar fraudes en internet.
        </p>

        {/* Search bar inside blog */}
        <div className="mt-6 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={blogSearch}
            onChange={(e) => setBlogSearch(e.target.value)}
            placeholder="Buscar artículos (Free Fire, Valorant, Robux...)"
            className="w-full pl-10 pr-3 py-2.5 bg-[#0d1424] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium shadow-lg"
          />
        </div>

        {/* Filter categories tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedBlogCat(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedBlogCat === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'Todos los Artículos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <article
            key={post.id}
            onClick={() => handleReadPost(post)}
            className="group rounded-2xl bg-[#0c1324] border border-slate-800 hover:border-emerald-500/60 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] cursor-pointer"
          >
            {/* Header graphic */}
            <div className={`p-5 bg-gradient-to-br ${post.gradient} border-b border-slate-800 flex flex-col justify-between relative`}>
              <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-4">
                <span className="text-emerald-300 font-mono text-[11px] uppercase tracking-wider">{post.category}</span>
                <span className="flex items-center gap-1 text-[11px] text-slate-300 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <h3 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors leading-snug drop-shadow-sm">
                {post.title}
              </h3>
            </div>

            {/* Body in Dark Style */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-[#0a0f1e]">
              <p className="text-xs text-slate-300 leading-relaxed font-medium line-clamp-3">
                {post.excerpt}
              </p>

              <div className="space-y-3 pt-3 border-t border-slate-800">
                {/* Clean unboxed tags */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                  {post.tags.map(t => (
                    <span key={t} className="font-semibold text-slate-400 font-mono">#{t}</span>
                  ))}
                </div>

                {/* Footer and Actions */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500 font-mono font-medium">{post.date}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleShareWhatsApp(post, e)}
                      className="p-1.5 text-slate-400 hover:text-[#25d366] transition-colors rounded hover:bg-slate-800 cursor-pointer"
                      title="Compartir en WhatsApp"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Leer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
