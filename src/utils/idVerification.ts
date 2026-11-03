import { VerifiedGameProfile } from '../types';

export interface VerificationProgress {
  step: number;
  totalSteps: number;
  message: string;
}

// Map of known demo/saved players for instant recognition
const KNOWN_PLAYERS: Record<string, Partial<VerifiedGameProfile>> = {
  '2894175023': {
    nickname: '⚡ Slayer_LATAM',
    level: 72,
    rank: 'Gran Maestro ★★★',
    server: 'Sudamérica (SAC)',
    avatarIcon: '🔥',
  },
  'ReynaMain#LAN': {
    nickname: 'ReynaMain#LAN',
    level: 148,
    rank: 'Inmortal II',
    server: 'LATAM (LAN)',
    avatarIcon: '🎯',
  },
  '18274619': {
    nickname: '👑 Valkyrie_Queen',
    level: 65,
    rank: 'Mítico Honor',
    server: 'Servidor Global (2910)',
    avatarIcon: '⚔️',
  },
  '#8YG29QP0': {
    nickname: '⭐ Leon_Master',
    level: 54,
    rank: 'Maestría III',
    server: 'Global',
    avatarIcon: '⭐',
  },
  '6749281039485728': {
    nickname: 'Ghost_SpecialOps',
    level: 150,
    rank: 'Leyenda Multijugador',
    server: 'LATAM Activision',
    avatarIcon: '🎖️',
  },
  '602819405': {
    nickname: '✨ Trailblazer_Luo',
    level: 70,
    rank: 'Nivel de Equilibrio 6',
    server: 'América',
    avatarIcon: '🌌',
  },
};

/**
 * Validates a game player ID against simulated official publisher servers.
 * Delays with step updates to show the live loader and verification progress.
 */
export async function verifyGamePlayerId(
  gameId: string,
  gameName: string,
  playerId: string,
  selectedServer?: string,
  onProgress?: (progress: VerificationProgress) => void
): Promise<{ success: boolean; profile?: VerifiedGameProfile; error?: string }> {
  const cleanId = playerId.trim();

  // Basic format validations
  if (!cleanId) {
    return {
      success: false,
      error: 'Por favor ingresa un ID o UID de jugador para verificar.',
    };
  }

  if (cleanId.length < 4) {
    return {
      success: false,
      error: 'El ID ingresado es demasiado corto. Debe tener al menos 4 caracteres.',
    };
  }

  // Artificial invalid tests (e.g., repeating zeros or invalid test tags)
  if (/^0+$/.test(cleanId) || cleanId.toLowerCase() === 'noexiste' || cleanId.toLowerCase() === 'error') {
    if (onProgress) {
      onProgress({ step: 1, totalSteps: 3, message: `Conectando con el servidor de ${gameName}...` });
      await new Promise(r => setTimeout(r, 400));
      onProgress({ step: 2, totalSteps: 3, message: 'Buscando registro en la base de datos oficial...' });
      await new Promise(r => setTimeout(r, 450));
    }
    return {
      success: false,
      error: `No se encontró ningún jugador registrado con el ID "${cleanId}" en los servidores oficiales de ${gameName}. Revisa tu UID dentro del juego.`,
    };
  }

  // Step 1: Connect to publisher server
  if (onProgress) {
    onProgress({
      step: 1,
      totalSteps: 3,
      message: `Conectando con la API oficial de ${gameName}...`,
    });
  }
  await new Promise(resolve => setTimeout(resolve, 380));

  // Step 2: Query player database
  if (onProgress) {
    onProgress({
      step: 2,
      totalSteps: 3,
      message: `Consultando UID [${cleanId.length > 12 ? cleanId.substring(0, 10) + '...' : cleanId}] en el servidor...`,
    });
  }
  await new Promise(resolve => setTimeout(resolve, 420));

  // Step 3: Validate nickname and status
  if (onProgress) {
    onProgress({
      step: 3,
      totalSteps: 3,
      message: 'Comprobando estado de cuenta y sincronizando apodo...',
    });
  }
  await new Promise(resolve => setTimeout(resolve, 320));

  // Generate realistic profile based on known match or deterministic hash
  const known = KNOWN_PLAYERS[cleanId] || KNOWN_PLAYERS[cleanId.split(' ')[0]];

  let nickname: string;
  let level: number;
  let rank: string = '';
  let server: string = selectedServer || 'Servidor Oficial';
  let avatarIcon: string = '🎮';

  if (known) {
    nickname = known.nickname || `Gamer_${cleanId.slice(-4)}`;
    level = known.level || 50;
    rank = known.rank || 'Veterano';
    server = selectedServer || known.server || 'Servidor Principal';
    avatarIcon = known.avatarIcon || '🛡️';
  } else {
    // Generate deterministic values based on player ID characters
    const hash = cleanId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const prefixes = ['Valkyrie', 'Shadow', 'Phoenix', 'Titan', 'Specter', 'Alpha', 'Sniper', 'Nova', 'Cyber'];
    const prefix = prefixes[hash % prefixes.length];

    if (cleanId.includes('#')) {
      // Riot ID or Tag
      nickname = cleanId;
      avatarIcon = '🎯';
    } else if (gameId.includes('free-fire')) {
      nickname = `⚡ ${prefix}_${cleanId.slice(-4) || 'Booyah'}`;
      avatarIcon = '🔥';
      rank = hash % 2 === 0 ? 'Heroico (3,240 pts)' : 'Diamante IV';
    } else if (gameId.includes('mobile-legends')) {
      nickname = `👑 ${prefix}_MLBB`;
      avatarIcon = '⚔️';
      rank = 'Mítico ★★★';
    } else if (gameId.includes('brawl-stars')) {
      nickname = `⭐ ${prefix}_Brawler`;
      avatarIcon = '⭐';
      rank = 'Rango 25 (750 Copas)';
    } else if (gameId.includes('cod-mobile')) {
      nickname = `🎯 ${prefix}_Soldier`;
      avatarIcon = '🎖️';
      rank = 'Maestro V';
    } else {
      nickname = `${prefix}_${cleanId.slice(-4) || '99'}`;
      avatarIcon = '🛡️';
      rank = 'Cuenta Verificada';
    }

    level = 25 + (hash % 65);
    if (!rank) {
      rank = level > 60 ? 'Rango Élite' : 'Rango Oro';
    }
  }

  const profile: VerifiedGameProfile = {
    playerId: cleanId,
    gameId,
    gameName,
    nickname,
    level,
    server,
    rank,
    avatarIcon,
    verifiedAt: 'Justo ahora',
    status: 'active',
    publisherVerified: true,
  };

  return {
    success: true,
    profile,
  };
}
