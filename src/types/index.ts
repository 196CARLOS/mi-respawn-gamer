export type CategoryType = 'recarga_id' | 'suscripcion' | 'gift_card';

export interface PackageOption {
  id: string;
  name: string;
  amount: string;
  bonus?: string;
  priceUSD: number;
  originalPriceUSD?: number;
  badge?: string;
  popular?: boolean;
}

export interface GameItemFaq {
  question: string;
  answer: string;
}

export interface GameItem {
  id: string;
  name: string;
  slug: string;
  category: CategoryType;
  publisher: string;
  shortDesc: string;
  description: string;
  tagline: string;
  gradient: string;
  accentColor: string;
  badgeGraphic?: string;
  imageUrl?: string;
  requiresPlayerId: boolean;
  idFieldName: string;
  idPlaceholder: string;
  serverOptions?: string[];
  popular?: boolean;
  packages: PackageOption[];
  detailedDescription?: string;
  deliveryProcess?: string;
  requirements?: string[];
  features?: string[];
  faq?: GameItemFaq[];
}

export type OrderStatus = 'processing' | 'verifying_id' | 'delivering' | 'completed' | 'failed';

export type DeliveryType = 'direct_account' | 'digital_pin';

export interface Order {
  id: string;
  date: string;
  timestamp: number;
  gameId: string;
  gameName: string;
  packageName: string;
  amount: string;
  priceUSD: number;
  currency: string;
  localPrice: number;
  paymentMethod: string;
  status: OrderStatus;
  deliveryType: DeliveryType;
  playerId?: string;
  playerNickname?: string;
  server?: string;
  digitalPin?: string;
  redeemUrl?: string;
  redeemInstructions?: string;
  customerPhone: string;
  customerEmail: string;
  customerCountry: string;
  whatsappNotified: boolean;
  whatsappMessagePreview?: string;
  serverTransactionId?: string;
  imageUrl?: string;
}

export interface SavedPlayerId {
  id: string;
  gameId: string;
  gameName: string;
  playerId: string;
  server?: string;
  nickname: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rate: number; // 1 USD = rate units
}

export type PaymentMethodId = 
  | 'card' 
  | 'pago_movil' 
  | 'yape_plin' 
  | 'mercado_pago' 
  | 'pse' 
  | 'spei' 
  | 'binance_pay' 
  | 'respawn_balance';

export interface PaymentMethodOption {
  id: PaymentMethodId;
  name: string;
  category: 'Tarjeta' | 'Transferencia Local' | 'Billetera Digital' | 'Cripto' | 'Saldo';
  icon: string;
  tag: string;
  instantDelivery: boolean;
  feePercent: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
  relatedGameId?: string;
  gradient: string;
  accentColor: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  vipTier: 'Plata' | 'Oro' | 'Diamante VIP';
  balanceUSD: number;
  respawnCoins: number;
  createdAt: string;
  imageUrl?: string;
}

export interface VerifiedGameProfile {
  playerId: string;
  gameId: string;
  gameName: string;
  nickname: string;
  level: number;
  server?: string;
  rank?: string;
  avatarIcon?: string;
  verifiedAt: string;
  status: 'active' | 'suspended' | 'not_found';
  publisherVerified: boolean;
}

export interface CartItem {
  id: string;
  gameId: string;
  gameName: string;
  gameSlug: string;
  gameCategory: CategoryType;
  gameGradient: string;
  imageUrl?: string;
  packageId: string;
  packageName: string;
  amount: string;
  priceUSD: number;
  quantity: number;
  playerId?: string;
  playerNickname?: string;
  server?: string;
  requiresPlayerId: boolean;
}

export interface CartCoupon {
  code: string;
  discountPercentage?: number;
  discountUSD?: number;
  description: string;
}

