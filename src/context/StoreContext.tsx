import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameItem, PackageOption, Order, Currency, SavedPlayerId, PaymentMethodId, BlogPost, UserProfile, CartItem, CartCoupon, VerifiedGameProfile } from '../types';
import { GAMES_DATA, CURRENCIES, INITIAL_ORDERS, OFFICIAL_PHONE, OFFICIAL_EMAIL } from '../data/games';
import { BLOG_POSTS } from '../data/blogs';

interface WhatsAppNotificationState {
  isOpen: boolean;
  order: Order | null;
  message: string;
  phone: string;
  timestamp: string;
}

export type ModalType = 'recharge' | 'checkout' | 'delivery' | 'dashboard' | 'whatsapp_test' | 'login' | 'blog_detail' | 'cart' | 'contact' | 'none';

export type MainViewType = 'store' | 'blog';

interface StoreContextType {
  // Navigation View
  currentView: MainViewType;
  setCurrentView: (view: MainViewType) => void;

  // Catalog
  games: GameItem[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Blog
  blogPosts: BlogPost[];
  selectedBlogPost: BlogPost | null;
  setSelectedBlogPost: (post: BlogPost | null) => void;

  // Currency
  currentCurrency: Currency;
  setCurrentCurrency: (curr: Currency) => void;
  formatPrice: (priceUSD: number) => string;
  convertPrice: (priceUSD: number) => number;
  
  // Auth & User Profile
  isLoggedIn: boolean;
  currentUser: UserProfile;
  loginUser: (email: string, phone: string, name?: string) => void;
  logoutUser: () => void;
  updateUserAvatar: (avatar: string) => void;
  userName: string;
  setUserName: (name: string) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  userPhone: string;
  setUserPhone: (phone: string) => void;
  userBalanceUSD: number;
  setUserBalanceUSD: (bal: number) => void;
  respawnCoins: number;
  savedPlayerIds: SavedPlayerId[];
  addSavedPlayerId: (item: Omit<SavedPlayerId, 'id'>) => void;
  removeSavedPlayerId: (id: string) => void;
  
  // Orders
  orders: Order[];
  currentOrderInDelivery: Order | null;
  clearCurrentOrderInDelivery: () => void;
  processNewOrder: (params: {
    game: GameItem;
    pkg: PackageOption;
    playerId?: string;
    server?: string;
    paymentMethodId: PaymentMethodId;
    customerPhone: string;
    customerEmail: string;
  }) => Promise<Order>;
  
  // Cart & eCommerce
  cart: CartItem[];
  addToCart: (game: GameItem, pkg: PackageOption, playerId?: string, server?: string, playerNickname?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotalUSD: number;
  appliedCoupon: CartCoupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartDiscountUSD: number;
  cartFinalTotalUSD: number;
  processCartCheckout: (params: {
    paymentMethodId: PaymentMethodId;
    customerPhone: string;
    customerEmail: string;
  }) => Promise<Order[]>;

  // WhatsApp Integration
  whatsAppToast: WhatsAppNotificationState | null;
  dismissWhatsAppToast: () => void;
  triggerManualWhatsAppNotification: (order: Order) => void;
  openRealWhatsAppUrl: (phone: string, text: string) => void;
  autoWhatsAppNotificationEnabled: boolean;
  setAutoWhatsAppNotificationEnabled: (enabled: boolean) => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (gameId: string) => void;
  isInWishlist: (gameId: string) => boolean;

  // Active Modals & Views
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  selectedGame: GameItem | null;
  setSelectedGame: (game: GameItem | null) => void;
  selectedPackage: PackageOption | null;
  setSelectedPackage: (pkg: PackageOption | null) => void;
  dashboardInitialTab: 'orders' | 'vault' | 'wallet' | 'profiles' | 'whatsapp' | 'wishlist';
  setDashboardInitialTab: (tab: 'orders' | 'vault' | 'wallet' | 'profiles' | 'whatsapp' | 'wishlist') => void;

  // Active Player Verification State
  activePlayerId: string;
  setActivePlayerId: (id: string) => void;
  activePlayerNickname: string;
  setActivePlayerNickname: (nick: string) => void;
  activeServer: string;
  setActiveServer: (server: string) => void;
  activeVerifiedProfile: VerifiedGameProfile | null;
  setActiveVerifiedProfile: (profile: VerifiedGameProfile | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<MainViewType>('store');
  const [games] = useState<GameItem[]>(GAMES_DATA);
  const [blogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('respawn_currency');
    return saved && CURRENCIES[saved] ? CURRENCIES[saved] : CURRENCIES.USD;
  });

  // Client Session & Auth
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('respawn_logged_in') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('respawn_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      id: 'USR-89552',
      name: 'Roberto Carlos Giménez',
      email: OFFICIAL_EMAIL,
      phone: OFFICIAL_PHONE,
      avatar: '🎮',
      vipTier: 'Oro',
      balanceUSD: 35.50,
      respawnCoins: 540,
      createdAt: '2026-01-15',
    };
  });

  // Backward compatibility user state getters
  const userName = currentUser.name;
  const setUserName = (name: string) => {
    setCurrentUser(prev => ({ ...prev, name }));
  };

  const userEmail = currentUser.email;
  const setUserEmail = (email: string) => {
    setCurrentUser(prev => ({ ...prev, email }));
  };

  const userPhone = currentUser.phone;
  const setUserPhone = (phone: string) => {
    setCurrentUser(prev => ({ ...prev, phone }));
  };

  const userBalanceUSD = currentUser.balanceUSD;
  const setUserBalanceUSD = (bal: number) => {
    setCurrentUser(prev => ({ ...prev, balanceUSD: bal }));
  };

  const respawnCoins = currentUser.respawnCoins;

  const [autoWhatsAppNotificationEnabled, setAutoWhatsAppNotificationEnabled] = useState<boolean>(true);

  // Saved player IDs for 1-click auto recharge
  const [savedPlayerIds, setSavedPlayerIds] = useState<SavedPlayerId[]>(() => {
    const saved = localStorage.getItem('respawn_saved_ids');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      { id: '1', gameId: 'free-fire', gameName: 'Free Fire', playerId: '2894175023', server: 'Sudamérica', nickname: 'Slayer_LATAM' },
      { id: '2', gameId: 'valorant', gameName: 'Valorant', playerId: 'ReynaMain#LAN', server: 'LATAM (LAN/LAS)', nickname: 'ReynaMain#LAN' },
      { id: '3', gameId: 'mobile-legends', gameName: 'Mobile Legends', playerId: '18274619 (2910)', nickname: 'Valkyrie_Queen' },
    ];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('respawn_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_ORDERS;
  });

  // Current order in automated delivery flow
  const [currentOrderInDelivery, setCurrentOrderInDelivery] = useState<Order | null>(null);

  // WhatsApp toast state
  const [whatsAppToast, setWhatsAppToast] = useState<WhatsAppNotificationState | null>(null);

  // Wishlist state (persisted per client session)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('respawn_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return ['free-fire', 'valorant', 'roblox'];
  });

  // Active navigation modals
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageOption | null>(null);
  const [dashboardInitialTab, setDashboardInitialTab] = useState<'orders' | 'vault' | 'wallet' | 'profiles' | 'whatsapp' | 'wishlist'>('orders');

  // Active game player verification state
  const [activePlayerId, setActivePlayerId] = useState<string>('');
  const [activePlayerNickname, setActivePlayerNickname] = useState<string>('');
  const [activeServer, setActiveServer] = useState<string>('');
  const [activeVerifiedProfile, setActiveVerifiedProfile] = useState<VerifiedGameProfile | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('respawn_currency', currentCurrency.code);
  }, [currentCurrency]);

  useEffect(() => {
    localStorage.setItem('respawn_logged_in', String(isLoggedIn));
    localStorage.setItem('respawn_user_profile', JSON.stringify(currentUser));
  }, [isLoggedIn, currentUser]);

  useEffect(() => {
    localStorage.setItem('respawn_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('respawn_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('respawn_saved_ids', JSON.stringify(savedPlayerIds));
  }, [savedPlayerIds]);

  // Shopping Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('respawn_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<CartCoupon | null>(null);

  useEffect(() => {
    localStorage.setItem('respawn_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    game: GameItem,
    pkg: PackageOption,
    playerId?: string,
    server?: string,
    playerNickname?: string
  ) => {
    const itemId = `${game.id}-${pkg.id}-${(playerId || 'digital').trim()}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: itemId,
          gameId: game.id,
          gameName: game.name,
          gameSlug: game.slug,
          gameCategory: game.category,
          gameGradient: game.gradient,
          imageUrl: game.imageUrl,
          packageId: pkg.id,
          packageName: pkg.name,
          amount: pkg.amount,
          priceUSD: pkg.priceUSD,
          quantity: 1,
          playerId: playerId?.trim(),
          playerNickname: playerNickname?.trim(),
          server: server?.trim(),
          requiresPlayerId: game.requiresPlayerId,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === cartItemId) {
            const newQ = i.quantity + delta;
            return newQ > 0 ? { ...i, quantity: newQ } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalUSD = cart.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'RESPAWN10' || cleanCode === 'DESCUENTO10') {
      const coupon: CartCoupon = {
        code: cleanCode,
        discountPercentage: 10,
        description: '10% de descuento gamer en toda la orden',
      };
      setAppliedCoupon(coupon);
      return { success: true, message: '¡Cupón del 10% aplicado con éxito!' };
    }
    if (cleanCode === 'GAMERVIP' || cleanCode === 'RESPAWN5') {
      const coupon: CartCoupon = {
        code: cleanCode,
        discountUSD: 5,
        description: '$5.00 USD de descuento directo',
      };
      setAppliedCoupon(coupon);
      return { success: true, message: '¡Cupón de $5.00 USD aplicado!' };
    }
    return { success: false, message: 'Cupón no válido. Prueba con RESPAWN10' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const cartDiscountUSD = appliedCoupon
    ? appliedCoupon.discountPercentage
      ? (cartTotalUSD * appliedCoupon.discountPercentage) / 100
      : Math.min(appliedCoupon.discountUSD || 0, cartTotalUSD)
    : 0;

  const cartFinalTotalUSD = Math.max(0, cartTotalUSD - cartDiscountUSD);

  const processCartCheckout = async ({
    paymentMethodId,
    customerPhone,
    customerEmail,
  }: {
    paymentMethodId: PaymentMethodId;
    customerPhone: string;
    customerEmail: string;
  }): Promise<Order[]> => {
    const paymentLabels: Record<PaymentMethodId, string> = {
      card: 'Tarjeta Débito/Crédito (Visa/Mastercard)',
      pago_movil: 'Giros Tigo / SIPAP Paraguay',
      yape_plin: 'Yape / Plin Directo',
      mercado_pago: 'Mercado Pago LATAM',
      pse: 'PSE Colombia',
      spei: 'SPEI México 24/7',
      binance_pay: 'Binance Pay USDT',
      respawn_balance: 'Monedero Respawn Coins',
    };

    const newOrders: Order[] = cart.map((item) => {
      const orderNumber = `RSP-${Math.floor(1000 + Math.random() * 9000)}`;
      const isDirect = item.requiresPlayerId;
      const digitalPin = isDirect ? undefined : generateRandomKey(item.gameSlug);

      return {
        id: orderNumber,
        date: 'Hace un momento',
        timestamp: Date.now(),
        gameId: item.gameId,
        gameName: item.gameName,
        packageName: item.packageName,
        amount: item.amount,
        priceUSD: item.priceUSD * item.quantity,
        currency: currentCurrency.code,
        localPrice: convertPrice(item.priceUSD * item.quantity),
        paymentMethod: paymentLabels[paymentMethodId] || 'Pago Digital Seguro',
        status: 'completed',
        deliveryType: isDirect ? 'direct_account' : 'digital_pin',
        playerId: item.playerId,
        playerNickname: item.playerNickname,
        server: item.server,
        digitalPin: digitalPin,
        redeemUrl: isDirect ? undefined : `https://${item.gameSlug}.com/redeem`,
        redeemInstructions: isDirect
          ? `Tus ${item.amount} han sido inyectados al ID ${item.playerId || ''} en el servidor.`
          : 'Canjea este código en la plataforma oficial del juego.',
        customerPhone: customerPhone || userPhone,
        customerEmail: customerEmail || userEmail,
        customerCountry: currentCurrency.name,
        whatsappNotified: autoWhatsAppNotificationEnabled,
        whatsappMessagePreview: `¡Hola ${currentUser.name}! Tu compra de ${item.gameName} (${item.packageName}) fue acreditada con éxito. Ref: #${orderNumber}.`,
        serverTransactionId: `TX-CART-${Math.random().toString(36).substring(2, 9).toUpperCase()}-OK`,
        imageUrl: item.imageUrl,
      };
    });

    if (paymentMethodId === 'respawn_balance') {
      setUserBalanceUSD(Math.max(0, userBalanceUSD - cartFinalTotalUSD));
    }

    setOrders((prev) => [...newOrders, ...prev]);
    clearCart();

    if (newOrders.length > 0) {
      setCurrentOrderInDelivery(newOrders[0]);
      setActiveModal('delivery');
      if (autoWhatsAppNotificationEnabled) {
        triggerManualWhatsAppNotification(newOrders[0]);
      }
    }

    return newOrders;
  };

  const toggleWishlist = (gameId: string) => {
    if (!isLoggedIn) {
      setActiveModal('login');
      return;
    }
    setWishlist(prev => {
      if (prev.includes(gameId)) {
        return prev.filter(id => id !== gameId);
      } else {
        return [...prev, gameId];
      }
    });
  };

  const isInWishlist = (gameId: string): boolean => {
    return wishlist.includes(gameId);
  };

  const loginUser = (email: string, phone: string, name?: string) => {
    setIsLoggedIn(true);
    setCurrentUser(prev => ({
      ...prev,
      email: email || prev.email,
      phone: phone || prev.phone,
      name: name || prev.name,
    }));
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
  };

  const updateUserAvatar = (avatar: string) => {
    setCurrentUser(prev => ({ ...prev, avatar }));
  };

  const addSavedPlayerId = (item: Omit<SavedPlayerId, 'id'>) => {
    const newItem: SavedPlayerId = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
    };
    setSavedPlayerIds(prev => [newItem, ...prev]);
  };

  const removeSavedPlayerId = (id: string) => {
    setSavedPlayerIds(prev => prev.filter(p => p.id !== id));
  };

  const convertPrice = (priceUSD: number): number => {
    return priceUSD * currentCurrency.rate;
  };

  const formatPrice = (priceUSD: number): string => {
    const converted = convertPrice(priceUSD);
    const isZeroDecimal = ['COP', 'ARS', 'CLP', 'PYG'].includes(currentCurrency.code);
    const formattedNum = new Intl.NumberFormat('es-LA', {
      minimumFractionDigits: isZeroDecimal ? 0 : 2,
      maximumFractionDigits: isZeroDecimal ? 0 : 2,
    }).format(converted);
    return `${currentCurrency.symbol} ${formattedNum} ${currentCurrency.code}`;
  };

  const dismissWhatsAppToast = () => {
    setWhatsAppToast(null);
  };

  const openRealWhatsAppUrl = (phone: string, text: string) => {
    const cleanPhone = (phone || OFFICIAL_PHONE).replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(text);
    const url = cleanPhone.length > 5 
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`
      : `https://api.whatsapp.com/send?text=${encodedText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const triggerManualWhatsAppNotification = (order: Order) => {
    const pinInfo = order.digitalPin 
      ? `\n🔑 *PIN DIGITAL:* \`${order.digitalPin}\`\n🔗 *Canje:* ${order.redeemUrl || 'En la web oficial'}` 
      : `\n🎮 *Acreditado en:* ${order.playerNickname || order.playerId} (${order.server || 'Servidor Oficial'})\n⚡ *Estado:* Acreditación Directa OK`;
    
    const message = `🟢 *MI RESPAWN - COMPROBANTE OFICIAL*\n──────────────────────\n✅ *¡Transacción Exitosa!*\n📦 *Producto:* ${order.gameName} - ${order.packageName}\n💰 *Monto Pagado:* ${order.currency} ${order.localPrice.toFixed(2)}\n🧾 *Orden:* #${order.id}\n💳 *Método:* ${order.paymentMethod}${pinInfo}\n──────────────────────\n🕒 ${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}\n🛡️ _Soporte Oficial Mi Respawn: ¡Gracias por tu compra! WhatsApp: ${OFFICIAL_PHONE}_`;

    setWhatsAppToast({
      isOpen: true,
      order,
      message,
      phone: order.customerPhone || OFFICIAL_PHONE,
      timestamp: 'Ahora',
    });
  };

  const generateRandomKey = (gameSlug: string): string => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const randPart = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    if (gameSlug.includes('roblox')) {
      return `RBLX-${randPart(4)}-${randPart(4)}-${randPart(4)}`;
    }
    if (gameSlug.includes('steam')) {
      return `STM-${randPart(5)}-${randPart(5)}-${randPart(5)}`;
    }
    if (gameSlug.includes('xbox')) {
      return `${randPart(5)}-${randPart(5)}-${randPart(5)}-${randPart(5)}-${randPart(5)}`;
    }
    return `RESPAWN-${randPart(4)}-${randPart(4)}-${randPart(4)}`;
  };

  const getSimulatedNickname = (playerId?: string): string => {
    if (!playerId) return 'Jugador_VIP';
    if (playerId.includes('#')) return playerId;
    const prefixes = ['ProGamer', 'Shadow', 'Phoenix', 'Ninja', 'Alpha', 'Valkyrie', 'Titan'];
    const prefix = prefixes[Math.abs(playerId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % prefixes.length];
    return `${prefix}_${playerId.slice(-4) || '99'}`;
  };

  const processNewOrder = async ({
    game,
    pkg,
    playerId,
    server,
    paymentMethodId,
    customerPhone,
    customerEmail,
  }: {
    game: GameItem;
    pkg: PackageOption;
    playerId?: string;
    server?: string;
    paymentMethodId: PaymentMethodId;
    customerPhone: string;
    customerEmail: string;
  }): Promise<Order> => {
    const orderNumber = `RSP-${Math.floor(1000 + Math.random() * 9000)}`;
    const isDirect = game.category === 'recarga_id';
    const digitalPin = isDirect ? undefined : generateRandomKey(game.slug);
    
    const finalPlayerId = playerId || activePlayerId || undefined;
    const finalNickname = isDirect
      ? ((activeVerifiedProfile && activeVerifiedProfile.playerId === finalPlayerId) ? activeVerifiedProfile.nickname : (activePlayerNickname || getSimulatedNickname(finalPlayerId)))
      : undefined;
    const finalServer = server || activeServer || activeVerifiedProfile?.server || (game.serverOptions ? game.serverOptions[0] : 'Servidor Oficial');

    const paymentLabels: Record<PaymentMethodId, string> = {
      card: 'Tarjeta Débito/Crédito (Visa/Mastercard)',
      pago_movil: 'Giros Tigo / SIPAP Paraguay',
      yape_plin: 'Yape / Plin Directo',
      mercado_pago: 'Mercado Pago LATAM',
      pse: 'PSE Colombia',
      spei: 'SPEI México 24/7',
      binance_pay: 'Binance Pay USDT',
      respawn_balance: 'Monedero Respawn Coins',
    };

    const initialOrder: Order = {
      id: orderNumber,
      date: 'Ahora',
      timestamp: Date.now(),
      gameId: game.id,
      gameName: game.name,
      packageName: pkg.name,
      amount: pkg.amount,
      priceUSD: pkg.priceUSD,
      currency: currentCurrency.code,
      localPrice: convertPrice(pkg.priceUSD),
      paymentMethod: paymentLabels[paymentMethodId],
      status: 'processing',
      deliveryType: isDirect ? 'direct_account' : 'digital_pin',
      playerId: finalPlayerId,
      playerNickname: finalNickname,
      server: finalServer,
      imageUrl: game.imageUrl,
      digitalPin: digitalPin,
      redeemUrl: isDirect ? undefined : (game.slug.includes('roblox') ? 'https://roblox.com/redeem' : game.slug.includes('steam') ? 'https://store.steampowered.com/account/redeemwalletcode' : 'https://mirespawn.com/canje'),
      redeemInstructions: isDirect 
        ? `Tus ${pkg.amount} han sido inyectados directamente al ID ${finalPlayerId} (${finalNickname || ''}) en el servidor ${finalServer}. No necesitas reiniciar tu juego.`
        : `Ingresa al portal de canje oficial, autentica tu cuenta y escribe el PIN digital exactamente como se muestra. El saldo se reflejará de inmediato.`,
      customerPhone: customerPhone || userPhone,
      customerEmail: customerEmail || userEmail,
      customerCountry: currentCurrency.name,
      whatsappNotified: false,
      serverTransactionId: `TX-API-${Math.random().toString(36).substring(2, 10).toUpperCase()}-OK`,
    };

    if (paymentMethodId === 'respawn_balance') {
      setUserBalanceUSD(Math.max(0, userBalanceUSD - pkg.priceUSD));
    }

    setCurrentOrderInDelivery(initialOrder);
    setActiveModal('delivery');

    return new Promise(resolve => {
      setTimeout(() => {
        setCurrentOrderInDelivery(prev => prev ? { ...prev, status: 'verifying_id' } : null);
      }, 1100);

      setTimeout(() => {
        setCurrentOrderInDelivery(prev => prev ? { ...prev, status: 'delivering' } : null);
      }, 2300);

      setTimeout(() => {
        const completedOrder: Order = {
          ...initialOrder,
          status: 'completed',
          whatsappNotified: autoWhatsAppNotificationEnabled,
        };

        setCurrentOrderInDelivery(completedOrder);
        setOrders(prev => [completedOrder, ...prev]);

        // Award 5% Cashback in Respawn Coins
        const earnedCoins = Math.round(pkg.priceUSD * 5);
        setCurrentUser(prev => ({
          ...prev,
          respawnCoins: prev.respawnCoins + earnedCoins,
        }));

        if (autoWhatsAppNotificationEnabled) {
          triggerManualWhatsAppNotification(completedOrder);
        }

        resolve(completedOrder);
      }, 3600);
    });
  };

  const clearCurrentOrderInDelivery = () => {
    setCurrentOrderInDelivery(null);
    setActiveModal('none');
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        games,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        blogPosts,
        selectedBlogPost,
        setSelectedBlogPost,
        currentCurrency,
        setCurrentCurrency,
        formatPrice,
        convertPrice,
        isLoggedIn,
        currentUser,
        loginUser,
        logoutUser,
        updateUserAvatar,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userPhone,
        setUserPhone,
        userBalanceUSD,
        setUserBalanceUSD,
        respawnCoins,
        savedPlayerIds,
        addSavedPlayerId,
        removeSavedPlayerId,
        orders,
        currentOrderInDelivery,
        clearCurrentOrderInDelivery,
        processNewOrder,
        whatsAppToast,
        dismissWhatsAppToast,
        triggerManualWhatsAppNotification,
        openRealWhatsAppUrl,
        autoWhatsAppNotificationEnabled,
        setAutoWhatsAppNotificationEnabled,
        wishlist,
        toggleWishlist,
        isInWishlist,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotalUSD,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartDiscountUSD,
        cartFinalTotalUSD,
        processCartCheckout,
        activeModal,
        setActiveModal,
        selectedGame,
        setSelectedGame,
        selectedPackage,
        setSelectedPackage,
        dashboardInitialTab,
        setDashboardInitialTab,
        activePlayerId,
        setActivePlayerId,
        activePlayerNickname,
        setActivePlayerNickname,
        activeServer,
        setActiveServer,
        activeVerifiedProfile,
        setActiveVerifiedProfile,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
