import React from 'react';

interface GameLogoProps {
  gameIdOrSlug: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const GameLogo: React.FC<GameLogoProps> = ({ gameIdOrSlug, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-11 h-11 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
    xl: 'w-16 h-16 rounded-2xl',
  }[size];

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
    xl: 'w-10 h-10',
  }[size];

  switch (gameIdOrSlug) {
    // 1. FREE FIRE (Garena) - Iconic Flaming Crest & Dagger
    case 'free-fire':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 flex items-center justify-center text-white shadow-lg shadow-orange-600/30 border border-amber-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] fill-white`}>
            {/* Free Fire stylized flame and dagger blade */}
            <path d="M50 8 C48 20 40 28 35 38 C30 48 32 60 38 68 C40 58 45 52 48 46 C52 60 56 74 54 88 C66 82 72 70 70 56 C68 46 62 38 62 26 C58 24 54 18 50 8 Z" fill="#FFE082" />
            <path d="M50 16 C53 28 60 34 62 44 C65 54 60 66 52 72 C54 62 51 54 48 48 C44 58 41 68 44 78 C38 72 35 62 38 52 C40 44 46 36 48 26 Z" fill="#FF6D00" />
            <path d="M48 36 L52 36 L54 62 L50 76 L46 62 Z" fill="#FFFFFF" />
            <circle cx="50" cy="84" r="3.5" fill="#FFE082" />
          </svg>
        </div>
      );

    // 2. MOBILE LEGENDS: BANG BANG - Golden Winged Shield with Cyan Star Gem
    case 'mobile-legends':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-blue-700 via-indigo-800 to-sky-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 border border-sky-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            {/* Winged Crest */}
            <path d="M15 30 Q30 35 48 22 Q52 22 55 22 Q70 35 85 30 Q80 55 50 88 Q20 55 15 30 Z" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="4" />
            <path d="M25 36 Q36 40 50 30 Q64 40 75 36 Q70 54 50 78 Q30 54 25 36 Z" fill="#F59E0B" stroke="#FDE68A" strokeWidth="2.5" />
            {/* Central Diamond Gem */}
            <polygon points="50,38 62,50 50,66 38,50" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="50" cy="50" r="3" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // 3. VALORANT - Riot Games Angular 'V' Slash
    case 'valorant':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-rose-600 via-red-600 to-rose-800 flex items-center justify-center text-white shadow-lg shadow-rose-600/30 border border-rose-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] fill-white`}>
            {/* Valorant Official 'V' Polygon Shapes */}
            <polygon points="18,22 46,22 28,78 18,78" fill="#FFFFFF" />
            <polygon points="54,22 82,22 82,50 64,78 54,78 72,50" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // 4. ROBLOX - Official Tilted Square with Cutout
    case 'roblox':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            <g transform="rotate(16 50 50)">
              <rect x="22" y="22" width="56" height="56" rx="10" fill="#FFFFFF" />
              <rect x="40" y="40" width="20" height="20" rx="3" fill="#0D9488" />
            </g>
          </svg>
        </div>
      );

    // 5. DISCORD NITRO - Clyde Controller with Supersonic Booster
    case 'discord-nitro':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-[#5865F2] via-indigo-700 to-violet-800 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] fill-white`}>
            {/* Clyde official face */}
            <path d="M78 28 C72 25 66 23 59 22 C58 24 57 27 56 29 C49 28 42 28 35 29 C34 27 33 24 32 22 C25 23 19 25 13 28 C4 42 1 56 2 70 C10 76 18 80 26 82 C28 79 30 76 32 73 C29 72 26 70 24 68 C25 67 25 66 26 65 C41 72 59 72 74 65 C75 66 76 67 76 68 C74 70 71 72 68 73 C70 76 72 79 74 82 C82 80 90 76 98 70 C99 56 96 42 78 28 Z M33 60 C29 60 25 56 25 51 C25 46 29 42 33 42 C38 42 42 46 42 51 C42 56 38 60 33 60 Z M67 60 C62 60 58 56 58 51 C58 46 62 42 67 42 C72 42 76 46 76 51 C76 56 72 60 67 60 Z" />
          </svg>
        </div>
      );

    // 6. STEAM - Valve Steam Piston Mechanism
    case 'steam-wallet':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-[#171a21] via-[#1b2838] to-[#2a475e] flex items-center justify-center text-white shadow-lg shadow-cyan-900/40 border border-cyan-400/40 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            {/* Steam mechanism */}
            <circle cx="62" cy="38" r="18" fill="none" stroke="#66C0F4" strokeWidth="8" />
            <circle cx="62" cy="38" r="8" fill="#FFFFFF" />
            <path d="M48 46 L28 64" stroke="#66C0F4" strokeWidth="8" strokeLinecap="round" />
            <circle cx="28" cy="64" r="14" fill="#1B2838" stroke="#66C0F4" strokeWidth="6" />
            <circle cx="28" cy="64" r="6" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // 7. XBOX - Glowing Sphere with 3D Carved Cross
    case 'xbox-game-pass':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-green-600 via-emerald-700 to-slate-950 flex items-center justify-center text-white shadow-lg shadow-green-600/30 border border-green-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            {/* Xbox official sphere */}
            <circle cx="50" cy="50" r="40" fill="#107C10" />
            <path d="M30 22 C37 32 46 45 50 54 C54 45 63 32 70 22 C64 16 57 13 50 13 C43 13 36 16 30 22 Z" fill="#FFFFFF" />
            <path d="M22 30 C30 40 44 60 50 67 C44 75 30 84 22 70 C16 64 13 57 13 50 C13 43 16 36 22 30 Z" fill="#FFFFFF" />
            <path d="M78 30 C70 40 56 60 50 67 C56 75 70 84 78 70 C84 64 87 57 87 50 C87 43 84 36 78 30 Z" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // 8. PLAYSTATION - PS Dual-Plane Emblem
    case 'playstation-plus':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-blue-700 via-blue-900 to-indigo-950 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 border border-blue-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            {/* PS Vertical 'P' */}
            <path d="M46 16 L46 76 L58 71 L58 34 C64 36 68 40 68 46 C68 53 62 57 54 57 L54 67 C68 67 79 58 79 45 C79 32 68 25 54 25 C50 25 47 26 46 26 Z" fill="#00439C" stroke="#FFFFFF" strokeWidth="3" />
            {/* S Base */}
            <path d="M24 72 C28 70 36 69 44 70 C52 71 58 75 58 79 C58 83 52 86 42 86 C32 86 24 82 24 78 Z" fill="#0070D1" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M52 78 C60 76 68 76 74 78 C80 80 82 83 78 86 C72 88 62 88 54 86 Z" fill="#2E6DB4" stroke="#FFFFFF" strokeWidth="2" />
          </svg>
        </div>
      );

    // 9. BRAWL STARS - Crowned Skull
    case 'brawl-stars':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 border border-amber-300/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            {/* Crown */}
            <polygon points="30,34 38,44 50,30 62,44 70,34 68,50 32,50" fill="#FBBF24" stroke="#78350F" strokeWidth="3" />
            <circle cx="50" cy="28" r="4" fill="#EF4444" />
            {/* Skull Face */}
            <rect x="30" y="46" width="40" height="34" rx="12" fill="#FFFFFF" stroke="#78350F" strokeWidth="4" />
            <circle cx="42" cy="58" r="6" fill="#1E293B" />
            <circle cx="58" cy="58" r="6" fill="#1E293B" />
            <path d="M44 72 L44 76 M50 72 L50 76 M56 72 L56 76" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      );

    // 10. CALL OF DUTY: MOBILE - Tactical Crosshair & Skull
    case 'cod-mobile':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-stone-700 via-zinc-800 to-black flex items-center justify-center text-white shadow-lg shadow-black/60 border border-stone-500/40 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] fill-white`}>
            {/* Military Chevron Shield */}
            <polygon points="50,14 82,30 82,60 50,88 18,60 18,30" fill="none" stroke="#E2E8F0" strokeWidth="5" />
            {/* Skull Mask */}
            <path d="M35 42 Q50 34 65 42 L65 58 Q65 68 58 72 L56 78 L44 78 L42 72 Q35 68 35 58 Z" fill="#F8FAFC" />
            <ellipse cx="44" cy="54" rx="4" ry="6" fill="#090D16" />
            <ellipse cx="56" cy="54" rx="4" ry="6" fill="#090D16" />
            <rect x="47" y="66" width="6" height="5" rx="1" fill="#090D16" />
          </svg>
        </div>
      );

    // 11. SPOTIFY PREMIUM - Concentric Soundwaves
    case 'spotify-premium':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-[#1DB954] via-emerald-600 to-green-900 flex items-center justify-center text-white shadow-lg shadow-green-600/30 border border-emerald-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] fill-slate-950`}>
            <circle cx="50" cy="50" r="42" fill="#1ED760" />
            <path d="M28 42 C44 36 64 38 76 45 C73 49 70 51 67 49 C57 43 40 42 27 47 Z" fill="#000000" />
            <path d="M30 53 C44 49 60 50 71 56 C68 59 66 61 63 59 C54 54 40 53 29 57 Z" fill="#000000" />
            <path d="M32 64 C43 61 56 62 65 67 C63 70 60 72 58 70 C50 66 39 65 31 68 Z" fill="#000000" />
          </svg>
        </div>
      );

    // 12. CRUNCHYROLL - Orange Anime Eye
    case 'crunchyroll':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-[#F47521] via-orange-600 to-amber-700 flex items-center justify-center text-white shadow-lg shadow-orange-600/30 border border-orange-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>
            {/* Outer Orange Crescent */}
            <circle cx="50" cy="50" r="38" fill="#FFFFFF" />
            <circle cx="58" cy="50" r="32" fill="#F47521" />
            {/* Inner White Eye */}
            <circle cx="42" cy="50" r="16" fill="#FFFFFF" />
            <circle cx="46" cy="50" r="12" fill="#23252B" />
          </svg>
        </div>
      );

    // 13. EA SPORTS FC - Triangular Tactical Crest
    case 'ea-fc-points':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-950 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            {/* Modern Triangle Crest */}
            <polygon points="50,14 88,80 12,80" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinejoin="round" />
            <polygon points="50,30 76,74 24,74" fill="#10B981" />
            <polygon points="50,44 64,68 36,68" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // 14. LEAGUE OF LEGENDS - Hextech Crest
    case 'league-of-legends':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-blue-900 via-indigo-900 to-cyan-900 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 border border-amber-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            {/* Hextech L Shape */}
            <polygon points="26,18 42,18 42,62 76,62 76,78 26,78" fill="#C8AA6E" stroke="#F0E6D2" strokeWidth="3" />
            <polygon points="34,26 38,26 38,68 70,68 70,72 34,72" fill="#0AC8B9" />
          </svg>
        </div>
      );

    // 15. CLASH ROYALE - Royal Crown
    case 'clash-royale':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-amber-500 via-yellow-600 to-orange-700 flex items-center justify-center text-white shadow-lg shadow-amber-600/30 border border-yellow-300/60 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            {/* Golden Crown */}
            <polygon points="18,34 32,50 50,24 68,50 82,34 78,74 22,74" fill="#FBBF24" stroke="#78350F" strokeWidth="4" />
            <rect x="22" y="70" width="56" height="12" rx="4" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
            <circle cx="50" cy="56" r="6" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="34" cy="62" r="4" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="66" cy="62" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
          </svg>
        </div>
      );

    // 16. HONKAI: STAR RAIL - Celestial Galaxy Train Emblem
    case 'honkai-star-rail':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-fuchsia-600 via-purple-700 to-indigo-900 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 border border-fuchsia-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            {/* Star Compass */}
            <polygon points="50,12 56,38 84,40 62,56 70,84 50,68 30,84 38,56 16,40 44,38" fill="#FCD34D" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="50" cy="50" r="10" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="50" cy="50" r="4" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // 17. APEX LEGENDS - Arrowhead Chevron Emblem
    case 'apex-legends':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-rose-600 via-red-700 to-black flex items-center justify-center text-white shadow-lg shadow-red-600/30 border border-rose-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] fill-white`}>
            {/* Apex 'A' Arrowhead */}
            <polygon points="50,14 84,78 68,78 50,44 32,78 16,78" fill="#FFFFFF" />
            <polygon points="50,56 60,78 40,78" fill="#E11D48" />
          </svg>
        </div>
      );

    // 18. NINTENDO eSHOP - Switch Dual Joy-Con
    case 'nintendo-eshop':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-[#E60012] via-red-600 to-rose-900 flex items-center justify-center text-white shadow-lg shadow-red-600/30 border border-red-300/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] fill-white`}>
            {/* Left Joycon */}
            <rect x="22" y="20" width="24" height="60" rx="12" fill="#FFFFFF" />
            <circle cx="34" cy="38" r="6" fill="#E60012" />
            {/* Right Joycon */}
            <rect x="54" y="20" width="24" height="60" rx="12" fill="none" stroke="#FFFFFF" strokeWidth="5" />
            <circle cx="66" cy="62" r="5" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // 19. GOOGLE PLAY - Four-Color Geometric Triangle
    case 'google-play':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center text-white shadow-lg shadow-cyan-900/30 border border-emerald-400/40 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            {/* Play Triangle Segments */}
            <polygon points="18,16 60,50 18,84" fill="#00E676" />
            <polygon points="18,16 60,50 78,34" fill="#00B0FF" />
            <polygon points="60,50 78,34 86,42 78,50" fill="#FFD600" />
            <polygon points="18,84 60,50 78,66 60,84" fill="#FF3D00" />
          </svg>
        </div>
      );

    // 20. APPLE APP STORE & ITUNES - Apple Silhouette
    case 'apple-itunes':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-slate-700 via-slate-800 to-zinc-950 flex items-center justify-center text-white shadow-lg shadow-slate-700/40 border border-slate-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] fill-white`}>
            {/* Apple Logo */}
            <path d="M60 16 C63 20 62 26 58 30 C55 33 49 34 47 31 C46 26 49 20 53 17 C56 15 59 15 60 16 Z M76 68 C74 72 71 77 67 82 C62 88 58 91 53 91 C48 91 45 88 39 88 C34 88 29 91 25 91 C19 91 14 85 10 77 C3 64 6 46 16 39 C22 35 28 35 34 37 C39 39 42 41 46 41 C50 41 54 39 60 37 C66 35 72 35 77 40 C69 45 69 57 76 61 C78 63 77 66 76 68 Z" />
          </svg>
        </div>
      );

    // 21. BLIZZARD BATTLE.NET - Celestial Spiral Nexus
    case 'blizzard-battlenet':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-sky-600 via-blue-800 to-slate-950 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 border border-sky-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            {/* Battle.net Swirl */}
            <circle cx="50" cy="50" r="38" fill="none" stroke="#38BDF8" strokeWidth="4" />
            <path d="M50 22 C64 22 74 34 70 48 C66 60 52 64 42 56 C34 50 36 38 46 34 C54 30 60 38 56 46" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
            <circle cx="50" cy="50" r="5" fill="#38BDF8" />
          </svg>
        </div>
      );

    // 22. MINECRAFT - 3D Isometric Pixel Grass/Dirt Block
    case 'minecraft':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-lime-600 via-emerald-700 to-amber-950 flex items-center justify-center text-white shadow-lg shadow-lime-600/30 border border-lime-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            {/* Top Grass Rhombus */}
            <polygon points="50,18 82,34 50,50 18,34" fill="#4ADE80" stroke="#166534" strokeWidth="2" />
            {/* Left Dirt Face */}
            <polygon points="18,34 50,50 50,84 18,68" fill="#78350F" stroke="#451A03" strokeWidth="2" />
            {/* Right Dirt Face */}
            <polygon points="50,50 82,34 82,68 50,84" fill="#92400E" stroke="#451A03" strokeWidth="2" />
            {/* Pixel Grass Overhangs */}
            <polygon points="18,34 50,50 50,58 42,54 42,60 34,56 34,60 18,52" fill="#22C55E" />
            <polygon points="82,34 50,50 50,58 58,54 58,60 66,56 66,60 82,52" fill="#16A34A" />
          </svg>
        </div>
      );

    // 23. NETFLIX - Bold Red Ribbon
    case 'netflix':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-black via-[#141414] to-red-950 flex items-center justify-center text-white shadow-lg shadow-red-900/40 border border-red-600/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            {/* Ribbon Left */}
            <polygon points="26,18 42,18 42,82 26,82" fill="#B91C1C" />
            {/* Ribbon Right */}
            <polygon points="58,18 74,18 74,82 58,82" fill="#B91C1C" />
            {/* Diagonal Ribbon */}
            <polygon points="26,18 42,18 74,82 58,82" fill="#E50914" />
          </svg>
        </div>
      );

    // 24. TWITCH - Purple Glitch Chat Bubble
    case 'twitch':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-[#9146FF] via-purple-700 to-indigo-900 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 border border-purple-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] fill-white`}>
            <polygon points="22,18 78,18 78,62 64,62 56,74 56,62 36,62 22,48" fill="#FFFFFF" />
            <rect x="40" y="32" width="6" height="16" rx="2" fill="#9146FF" />
            <rect x="54" y="32" width="6" height="16" rx="2" fill="#9146FF" />
          </svg>
        </div>
      );

    // 25. AMAZON PRIME - Dynamic Curved Arrow Smile
    case 'amazon-prime':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-[#00A8E1] via-sky-600 to-slate-900 flex items-center justify-center text-white shadow-lg shadow-sky-600/30 border border-sky-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>
            <path d="M20 54 C38 68 62 68 76 56" fill="none" stroke="#FF9900" strokeWidth="8" strokeLinecap="round" />
            <polygon points="74,48 84,54 78,64" fill="#FF9900" />
            <circle cx="50" cy="34" r="8" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // 26. GENSHIN IMPACT - Celestial Primogem Star
    case 'genshin-impact':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-amber-500 via-orange-600 to-sky-700 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 border border-amber-300/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            {/* Primogem Star */}
            <polygon points="50,14 62,38 86,50 62,62 50,86 38,62 14,50 38,38" fill="#FDE047" stroke="#EA580C" strokeWidth="3" />
            <polygon points="50,26 58,42 74,50 58,58 50,74 42,58 26,50 42,42" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
          </svg>
        </div>
      );

    // 27. PUBG MOBILE - Spetsnaz Tactical Combat Helmet
    case 'pubg-mobile':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-amber-600 via-orange-700 to-stone-900 flex items-center justify-center text-white shadow-lg shadow-amber-600/30 border border-amber-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]`}>
            {/* Level 3 Helmet Silhouette */}
            <path d="M22 48 C22 28 35 18 50 18 C65 18 78 28 78 48 L78 68 C78 74 72 78 64 78 L36 78 C28 78 22 74 22 68 Z" fill="#292524" stroke="#F59E0B" strokeWidth="3" />
            {/* Visor Slit */}
            <rect x="28" y="46" width="44" height="12" rx="4" fill="#000000" stroke="#78716C" strokeWidth="2" />
            <line x1="34" y1="52" x2="66" y2="52" stroke="#F59E0B" strokeWidth="2" />
          </svg>
        </div>
      );

    // 28. FORTNITE - Llama Crest
    case 'fortnite':
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-900 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 border border-purple-400/50 ${className}`}>
          <svg viewBox="0 0 100 100" className={`${iconSizes} drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}>
            {/* Llama Polygon */}
            <polygon points="34,16 46,16 48,30 62,34 68,44 58,54 52,48 50,74 34,74" fill="#C084FC" stroke="#FFFFFF" strokeWidth="3" />
            <polygon points="38,24 44,24 46,36 38,36" fill="#38BDF8" />
            <circle cx="56" cy="40" r="3.5" fill="#FFFFFF" />
            <circle cx="56" cy="40" r="1.5" fill="#000000" />
          </svg>
        </div>
      );

    // Default Fallback - Tactical Cyber Gaming Shield with No Text
    default:
      return (
        <div className={`relative ${sizeClasses} bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 flex items-center justify-center text-white shadow-lg border border-emerald-400/50 ${className}`}>
          <svg viewBox="0 0 24 24" className={`${iconSizes} fill-emerald-300 stroke-white stroke-1`}>
            <path d="M12 2L4 5V11C4 16.55 7.42 21.74 12 23C16.58 21.74 20 16.55 20 11V5L12 2Z" />
          </svg>
        </div>
      );
  }
};
