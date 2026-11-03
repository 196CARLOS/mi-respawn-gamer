import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Order, SavedPlayerId } from '../types';
import {
  X,
  ShoppingBag,
  Key,
  Wallet,
  UserCheck,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  Plus,
  Trash2,
  ShieldCheck,
  Sparkles,
  Send,
  Mail,
  Phone,
  Heart,
  ArrowRight,
  Download,
  FileText,
  Search,
  Receipt,
  RotateCcw,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { OFFICIAL_PHONE, OFFICIAL_EMAIL } from '../data/games';
import { downloadReceiptFile } from '../utils/receiptGenerator';
import { ReceiptModal } from './ReceiptModal';
import { GameLogo } from './GameLogo';

export const UserDashboardModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    dashboardInitialTab,
    orders,
    formatPrice,
    userBalanceUSD,
    setUserBalanceUSD,
    respawnCoins,
    userEmail,
    setUserEmail,
    userPhone,
    setUserPhone,
    savedPlayerIds,
    addSavedPlayerId,
    removeSavedPlayerId,
    autoWhatsAppNotificationEnabled,
    setAutoWhatsAppNotificationEnabled,
    triggerManualWhatsAppNotification,
    setSelectedGame,
    setSelectedPackage,
    games,
    wishlist,
    toggleWishlist,
    isInWishlist,
    setCurrentView,
    setSelectedCategory,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'vault' | 'wallet' | 'profiles' | 'whatsapp' | 'wishlist'>(dashboardInitialTab);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Order history search, filter, and receipt preview state
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);
  const [orderSearchQuery, setOrderSearchQuery] = useState<string>('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'completed' | 'pin'>('all');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    if (activeModal === 'dashboard') {
      setActiveTab(dashboardInitialTab);
    }
  }, [dashboardInitialTab, activeModal]);

  // New saved player ID form
  const [newGameId, setNewGameId] = useState<string>('free-fire');
  const [newPlayerIdVal, setNewPlayerIdVal] = useState<string>('');
  const [newNicknameVal, setNewNicknameVal] = useState<string>('');
  const [newServerVal, setNewServerVal] = useState<string>('');

  // Wallet add funds mock amount
  const [fundAmount, setFundAmount] = useState<number>(25);

  if (activeModal !== 'dashboard') return null;

  const handleClose = () => {
    setActiveModal('none');
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleQuickRechargeFromSaved = (saved: SavedPlayerId) => {
    const game = games.find(g => g.id === saved.gameId);
    if (game) {
      setSelectedGame(game);
      setSelectedPackage(game.packages[0]);
      setActiveModal('recharge');
    }
  };

  const handleDownloadReceipt = (order: Order) => {
    downloadReceiptFile(order);
    setDownloadSuccessToast(`¡Comprobante Oficial #${order.id} descargado con éxito!`);
    setTimeout(() => setDownloadSuccessToast(null), 3500);
  };

  const handleReorder = (order: Order) => {
    const game = games.find(g => g.id === order.gameId);
    if (game) {
      setSelectedGame(game);
      const pkg = game.packages.find(p => p.name === order.packageName) || game.packages[0];
      setSelectedPackage(pkg);
      setActiveModal('recharge');
    }
  };

  const handleAddPlayerId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerIdVal.trim()) return;

    const game = games.find(g => g.id === newGameId);
    addSavedPlayerId({
      gameId: newGameId,
      gameName: game ? game.name : newGameId,
      playerId: newPlayerIdVal.trim(),
      server: newServerVal.trim() || undefined,
      nickname: newNicknameVal.trim() || `Player_${newPlayerIdVal.slice(-4)}`,
    });

    setNewPlayerIdVal('');
    setNewNicknameVal('');
    setNewServerVal('');
  };

  const handleAddFunds = () => {
    setUserBalanceUSD(userBalanceUSD + fundAmount);
    alert(`¡Se han acreditado $${fundAmount} USD a tu monedero Respawn!`);
  };

  const handleSendTestWhatsApp = () => {
    if (orders.length > 0) {
      triggerManualWhatsAppNotification(orders[0]);
    } else {
      const demoOrder: Order = {
        id: 'RSP-TEST',
        date: 'Ahora',
        timestamp: Date.now(),
        gameId: 'free-fire',
        gameName: 'Free Fire',
        packageName: '520 Diamantes',
        amount: '520 💎',
        priceUSD: 5.60,
        currency: 'USD',
        localPrice: 5.60,
        paymentMethod: 'Test Notificación WhatsApp',
        status: 'completed',
        deliveryType: 'direct_account',
        playerId: '2894175023',
        playerNickname: 'Slayer_LATAM',
        customerPhone: userPhone || OFFICIAL_PHONE,
        customerEmail: userEmail || OFFICIAL_EMAIL,
        customerCountry: 'Paraguay',
        whatsappNotified: true,
      };
      triggerManualWhatsAppNotification(demoOrder);
    }
  };

  const pinOrders = orders.filter(o => o.deliveryType === 'digital_pin' && o.digitalPin);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0b1220] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden my-4 sm:my-8 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Modal Top Header in Dark Theme */}
        <div className="p-4 sm:p-5 bg-[#080d19] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-emerald-950/50">
              R
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Mi Panel de Usuario</span>
                <span className="text-xs font-semibold text-slate-400 hidden sm:inline">· {userEmail}</span>
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1">
                  <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saldo: <strong className="text-emerald-400 font-mono font-bold">{formatPrice(userBalanceUSD)}</strong></span>
                </span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Coins: <strong className="text-amber-300 font-mono font-bold">{respawnCoins}</strong></span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-[#131f38] hover:bg-[#1a294a] border border-slate-700 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (Segmented Cyber Buttons) */}
        <div className="flex items-center border-b border-slate-800 bg-[#080d19] px-4 overflow-x-auto scrollbar-none gap-2 py-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-[#131f38]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Mis Pedidos ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'vault'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-[#131f38]'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Bóveda de Códigos ({pinOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'wallet'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-[#131f38]'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Monedero & Cashback</span>
          </button>

          <button
            onClick={() => setActiveTab('profiles')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'profiles'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-[#131f38]'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>IDs Guardados ({savedPlayerIds.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'whatsapp'
                ? 'bg-[#25d366] text-slate-950 font-black shadow-xs'
                : 'text-slate-400 hover:text-[#25d366] hover:bg-[#131f38]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Alertas WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'wishlist'
                ? 'bg-rose-500 text-white shadow-xs font-black'
                : 'text-slate-400 hover:text-rose-400 hover:bg-[#131f38]'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-current' : ''}`} />
            <span>Lista de Deseos ({wishlist.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 bg-[#0b1220] scrollbar-thin scrollbar-thumb-slate-800">
          {/* TAB 1: ORDER HISTORY & RECEIPTS */}
          {activeTab === 'orders' && (() => {
            const filteredOrders = orders.filter((order) => {
              const matchesSearch =
                orderSearchQuery.trim() === '' ||
                order.gameName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                order.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                order.packageName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                (order.playerId && order.playerId.toLowerCase().includes(orderSearchQuery.toLowerCase())) ||
                order.paymentMethod.toLowerCase().includes(orderSearchQuery.toLowerCase());

              if (!matchesSearch) return false;
              if (orderStatusFilter === 'completed') return order.status === 'completed';
              if (orderStatusFilter === 'pin') return order.deliveryType === 'digital_pin';
              return true;
            });

            const totalSpentUSD = orders.reduce((sum, o) => sum + (o.priceUSD || 0), 0);
            const completedCount = orders.filter((o) => o.status === 'completed').length;

            return (
              <div className="space-y-4">
                {/* Header & Stats Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-emerald-400" />
                      <span>Historial de Pedidos & Comprobantes Oficiales</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Consulta el detalle de cada compra realizada, estado de despacho y descarga tus recibos oficiales.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-300 font-bold flex items-center gap-1.5 shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{completedCount} compras verificadas</span>
                    </div>
                  </div>
                </div>

                {/* Search & Filter Bar */}
                {orders.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={orderSearchQuery}
                        onChange={(e) => setOrderSearchQuery(e.target.value)}
                        placeholder="Buscar por juego, ref (#RSP), paquete, método o UID..."
                        className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#080d1a] border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                      {orderSearchQuery && (
                        <button
                          onClick={() => setOrderSearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white p-0.5 cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-1 bg-[#080d1a] border border-slate-800 p-1 rounded-xl text-xs shrink-0 overflow-x-auto">
                      <button
                        onClick={() => setOrderStatusFilter('all')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          orderStatusFilter === 'all'
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Todos ({orders.length})
                      </button>
                      <button
                        onClick={() => setOrderStatusFilter('completed')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          orderStatusFilter === 'completed'
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Completados ({completedCount})
                      </button>
                      <button
                        onClick={() => setOrderStatusFilter('pin')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          orderStatusFilter === 'pin'
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Pines ({pinOrders.length})
                      </button>
                    </div>
                  </div>
                )}

                {/* Orders List */}
                {orders.length === 0 ? (
                  <div className="p-10 text-center rounded-2xl bg-[#0d1527] border border-slate-800 space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                      <ShoppingBag className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h4 className="text-sm font-bold text-white">Aún no tienes pedidos registrados</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Cuando realices una recarga de juego o compres una membresía digital, tus comprobantes y transacciones aparecerán aquí.
                    </p>
                    <button
                      onClick={() => {
                        setActiveModal('none');
                        setCurrentView('store');
                        setSelectedCategory('all');
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/40 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>Ir al Catálogo de Recargas</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="p-8 text-center rounded-xl bg-[#0d1527] border border-slate-800 space-y-2">
                    <p className="text-xs font-bold text-slate-300">No se encontraron pedidos con ese criterio de búsqueda.</p>
                    <button
                      onClick={() => {
                        setOrderSearchQuery('');
                        setOrderStatusFilter('all');
                      }}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
                    >
                      Restablecer filtros de búsqueda
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {filteredOrders.map((o) => (
                      <div
                        key={o.id}
                        className="p-4 sm:p-5 rounded-2xl bg-[#0d1527] border border-slate-800 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all space-y-3.5 shadow-2xs"
                      >
                        {/* Top Info Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-800">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 shrink-0 shadow-2xs flex items-center justify-center">
                              {o.imageUrl ? (
                                <img
                                  src={o.imageUrl}
                                  alt={o.gameName}
                                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <GameLogo gameIdOrSlug={o.gameId} size="md" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-extrabold text-white text-sm sm:text-base">
                                  {o.gameName}
                                </h4>
                                <span
                                  onClick={() => handleCopyText(o.id, o.id)}
                                  className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 hover:border-emerald-500/60 px-2 py-0.5 rounded cursor-pointer transition-colors"
                                  title="Haz clic para copiar el ID de pedido"
                                >
                                  {copiedId === o.id ? '¡Copiado!' : `#${o.id}`}
                                </span>
                                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                                  {o.deliveryType === 'direct_account' ? 'Recarga Directa' : 'Código PIN'}
                                </span>
                              </div>
                              <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
                                Registrado el {o.date} · {new Date(o.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center gap-2 self-start sm:self-auto">
                            {o.status === 'completed' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 shadow-2xs">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Acreditado con Éxito</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-950/60 text-blue-300 border border-blue-500/40 shadow-2xs">
                                <Clock className="w-3.5 h-3.5 text-blue-400" />
                                <span>En Proceso de Despacho</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Middle Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-[#080d1a] p-3.5 rounded-xl border border-slate-800">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-400 font-bold uppercase text-[10px]">PAQUETE:</span>
                              <span className="font-extrabold text-white">{o.packageName}</span>
                              <span className="text-emerald-300 font-mono font-bold bg-emerald-950/80 border border-emerald-500/40 px-1.5 py-0.2 rounded text-[11px]">
                                {o.amount}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-400 font-bold uppercase text-[10px]">PAGO:</span>
                              <span className="text-slate-300 font-semibold">{o.paymentMethod}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-400 font-bold uppercase text-[10px]">REF SERVIDOR:</span>
                              <span className="font-mono text-[11px] text-cyan-400 font-semibold truncate max-w-[200px]">
                                {o.serverTransactionId || 'TX-GAR-89552-OK'}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-800 pt-2 md:pt-0 md:pl-3">
                            {o.playerId && (
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-slate-400 font-bold uppercase text-[10px]">UID JUGADOR:</span>
                                  <span className="font-mono font-bold text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/40">
                                    {o.playerId}
                                  </span>
                                </div>
                                {o.playerNickname && (
                                  <span className="text-[11px] text-slate-400 block">
                                    Alias: <strong className="text-slate-200">{o.playerNickname}</strong>
                                    {o.server && ` · Servidor: ${o.server}`}
                                  </span>
                                )}
                              </div>
                            )}

                            {o.digitalPin && (
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-300 font-bold uppercase text-[10px]">PIN DIGITAL:</span>
                                  <code className="font-mono font-bold text-emerald-300 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/40">
                                    {o.digitalPin}
                                  </code>
                                  <button
                                    onClick={() => handleCopyText(o.digitalPin!, `pin-${o.id}`)}
                                    className="p-1 text-slate-400 hover:text-white bg-[#0d1527] rounded border border-slate-700 cursor-pointer"
                                    title="Copiar PIN"
                                  >
                                    {copiedId === `pin-${o.id}` ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </div>
                                {o.redeemUrl && (
                                  <a
                                    href={o.redeemUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                                  >
                                    <span>Página oficial de canje</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            )}

                            <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-[11px] pt-0.5">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>Confirmado al WhatsApp {o.customerPhone}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Actions & Price Row */}
                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs text-slate-400 font-bold uppercase">Total:</span>
                            <span className="text-base sm:text-lg font-black font-mono text-white">
                              {o.currency} {o.localPrice.toFixed(2)}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                              (≈ ${o.priceUSD.toFixed(2)} USD)
                            </span>
                          </div>

                          {/* Action Buttons: DOWNLOAD RECEIPT, View Receipt, WhatsApp, Reorder */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {/* DOWNLOAD RECEIPT BUTTON */}
                            <button
                              onClick={() => handleDownloadReceipt(o)}
                              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                              title="Descargar comprobante oficial de pago"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Descargar Recibo</span>
                            </button>

                            {/* View Receipt Details in Modal */}
                            <button
                              onClick={() => setSelectedReceiptOrder(o)}
                              className="px-3 py-2 bg-[#080d1a] hover:bg-[#131f38] border border-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              title="Ver comprobante detallado en pantalla"
                            >
                              <FileText className="w-3.5 h-3.5 text-slate-400" />
                              <span>Ver Comprobante</span>
                            </button>

                            {/* WhatsApp Notification */}
                            <button
                              onClick={() => triggerManualWhatsAppNotification(o)}
                              className="px-2.5 py-2 bg-[#25d366]/20 hover:bg-[#25d366]/30 text-[#25d366] border border-[#25d366]/40 font-bold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                              title="Reenviar comprobante por WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-[#25d366]" />
                              <span className="hidden sm:inline">WhatsApp</span>
                            </button>

                            {/* Reorder Button */}
                            <button
                              onClick={() => handleReorder(o)}
                              className="p-2 bg-[#080d1a] hover:bg-[#131f38] border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                              title="Comprar este producto de nuevo"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {/* TAB 2: DIGITAL PIN VAULT */}
          {activeTab === 'vault' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Bóveda de Códigos y Pines Digitales
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">
                  Tus claves compradas listas para canjear en cualquier momento con instrucciones directas.
                </p>
              </div>

              {pinOrders.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-[#0d1527] rounded-xl border border-slate-800">
                  <Key className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-white">No tienes pines digitales pendientes o comprados.</p>
                  <p className="text-xs text-slate-400 mt-1">Los códigos de Roblox, Steam, Xbox y Discord aparecerán aquí.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pinOrders.map(p => (
                    <div
                      key={p.id}
                      className="p-4 rounded-xl bg-[#0d1527] border border-slate-800 space-y-3 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{p.gameName}</span>
                        <span className="text-[10px] font-black text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                          LISTO PARA CANJEAR
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 font-medium">{p.packageName} ({p.amount})</div>

                      {/* Code block */}
                      <div className="p-2.5 bg-[#080d1a] rounded-lg border border-slate-800 flex items-center justify-between shadow-2xs">
                        <code className="text-xs font-mono font-black text-emerald-300 tracking-wider">
                          {p.digitalPin}
                        </code>
                        <button
                          onClick={() => handleCopyText(p.digitalPin!, p.id)}
                          className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedId === p.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <a
                          href={p.redeemUrl || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 font-bold"
                        >
                          <span>Canjear en web oficial</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <button
                          onClick={() => triggerManualWhatsAppNotification(p)}
                          className="text-[11px] text-[#25d366] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Enviar a WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WALLET & CASHBACK */}
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Balance Card */}
                <div className="p-5 rounded-2xl bg-[#0d1527] border border-emerald-500/30 shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Saldo Disponible
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      <Wallet className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="text-3xl font-black text-white font-mono tabular-nums">
                    {formatPrice(userBalanceUSD)}
                  </div>

                  <p className="text-xs text-slate-400 font-medium">
                    Úsalo para recargas inmediatas sin ingresar tarjetas ni comisiones bancarias.
                  </p>
                </div>

                {/* Cashback Coins Card */}
                <div className="p-5 rounded-2xl bg-[#0d1527] border border-amber-500/30 shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Respawn Coins (Cashback)
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="text-3xl font-black text-amber-300 font-mono tabular-nums">
                    {respawnCoins} <span className="text-xs text-amber-400 font-bold">Coins</span>
                  </div>

                  <p className="text-xs text-slate-400 font-medium">
                    Equivalente a <strong className="text-white font-bold">${(respawnCoins / 100).toFixed(2)} USD</strong> en descuentos para tus próximas recargas.
                  </p>
                </div>
              </div>

              {/* Add funds simulator */}
              <div className="p-5 rounded-xl bg-[#0d1527] border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Cargar Fondos Rápidos a tu Monedero
                </h4>

                <div className="flex flex-wrap gap-2">
                  {[10, 25, 50, 100].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setFundAmount(amt)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                        fundAmount === amt
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-[#080d1a] text-slate-300 border border-slate-700 hover:bg-[#131f38]'
                      }`}
                    >
                      +${amt} USD
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    Añade ${fundAmount} USD y recibe 50 Respawn Coins de bono.
                  </span>
                  <button
                    onClick={handleAddFunds}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-emerald-900/30 cursor-pointer"
                  >
                    Acreditar Saldo Ahora
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SAVED PROFILES & IDS */}
          {activeTab === 'profiles' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Cuentas de Jugador Guardadas (Recarga Express)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">
                  Guarda tus Player IDs para recargar en 1 clic sin tener que copiar y pegar cada vez.
                </p>
              </div>

              {/* List of saved IDs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedPlayerIds.map(saved => (
                  <div
                    key={saved.id}
                    className="p-3.5 rounded-xl bg-[#0d1527] border border-slate-800 flex items-center justify-between gap-3 shadow-2xs hover:border-emerald-500/40 transition-colors"
                  >
                    <div>
                      <div className="font-bold text-white text-xs">{saved.nickname}</div>
                      <div className="text-[11px] text-emerald-400 font-bold">{saved.gameName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">ID: {saved.playerId} {saved.server && `· ${saved.server}`}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuickRechargeFromSaved(saved)}
                        className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
                      >
                        Recargar
                      </button>
                      <button
                        onClick={() => removeSavedPlayerId(saved.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Eliminar ID"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add new player ID form */}
              <form onSubmit={handleAddPlayerId} className="p-4 rounded-xl bg-[#0d1527] border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Agregar Nueva Cuenta de Jugador</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">Juego</label>
                    <select
                      value={newGameId}
                      onChange={(e) => setNewGameId(e.target.value)}
                      className="w-full px-3 py-2 bg-[#080d1a] border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      {games.filter(g => g.requiresPlayerId).map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">Player ID / UID</label>
                    <input
                      type="text"
                      value={newPlayerIdVal}
                      onChange={(e) => setNewPlayerIdVal(e.target.value)}
                      placeholder="Ej. 2894175023"
                      className="w-full px-3 py-2 bg-[#080d1a] border border-slate-700 rounded-lg text-xs text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">Apodo / Nickname</label>
                    <input
                      type="text"
                      value={newNicknameVal}
                      onChange={(e) => setNewNicknameVal(e.target.value)}
                      placeholder="Ej. Slayer_LATAM"
                      className="w-full px-3 py-2 bg-[#080d1a] border border-slate-700 rounded-lg text-xs text-white font-medium focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-900/40"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Guardar Cuenta</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: WHATSAPP INTEGRATION & SETTINGS */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#25d366] fill-[#25d366]" />
                  <span>Configuración de Alertas en Tiempo Real por WhatsApp</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">
                  Cada recarga y compra realizada genera un comprobante instantáneo con PIN y hash de servidor enviado a tu número de WhatsApp.
                </p>
              </div>

              {/* Number and toggle settings */}
              <div className="p-5 rounded-xl bg-[#0d1527] border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Notificaciones Automáticas por WhatsApp
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Disparo en tiempo real vía Webhook seguro tras aprobarse el pago
                    </span>
                  </div>

                  <input
                    type="checkbox"
                    checked={autoWhatsAppNotificationEnabled}
                    onChange={(e) => setAutoWhatsAppNotificationEnabled(e.target.checked)}
                    className="w-5 h-5 rounded text-[#25d366] focus:ring-[#25d366] bg-[#080d1a] border-slate-700"
                  />
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <label className="text-xs font-bold text-slate-300 block">
                    Tu Teléfono WhatsApp Registrado (Paraguay / Internacional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="+595 9XX XXX XXX"
                      className="flex-1 px-3.5 py-2.5 bg-[#080d1a] border border-slate-700 rounded-lg text-xs text-emerald-400 font-mono font-bold focus:outline-none focus:border-[#25d366]"
                    />
                    <button
                      onClick={() => alert(`¡Número de WhatsApp guardado como: ${userPhone}!`)}
                      className="px-4 py-2.5 bg-[#25d366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs rounded-lg transition-colors shrink-0 shadow-lg shadow-emerald-950/40 cursor-pointer"
                    >
                      Guardar
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <label className="text-xs font-bold text-slate-300 block">
                    Tu Correo Electrónico Registrado
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="tu_correo@gmail.com"
                      className="flex-1 px-3.5 py-2.5 bg-[#080d1a] border border-slate-700 rounded-lg text-xs text-white font-medium focus:outline-none focus:border-[#25d366]"
                    />
                    <button
                      onClick={() => alert(`¡Correo guardado como: ${userEmail}!`)}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors shrink-0 shadow-lg shadow-emerald-900/40 cursor-pointer"
                    >
                      Actualizar
                    </button>
                  </div>
                </div>

                {/* Test button */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400 font-medium">
                    Prueba el funcionamiento enviando una notificación de demostración al número registrado.
                  </div>
                  <button
                    onClick={handleSendTestWhatsApp}
                    className="px-4 py-2 bg-[#080d1a] hover:bg-[#131f38] text-[#25d366] font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shrink-0 border border-slate-700 shadow-2xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#25d366]" />
                    <span>Enviar Alerta de Prueba Ahora</span>
                  </button>
                </div>
              </div>

              {/* Status information */}
              <div className="p-4 rounded-xl bg-[#0d1527] border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Estado de la Conexión de Servidores</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="p-2.5 rounded bg-[#080d1a] border border-slate-800">
                    <span className="text-slate-400 block font-medium">API WhatsApp Cloud</span>
                    <span className="text-emerald-400 font-mono font-bold">Conectado (Latencia 120ms)</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#080d1a] border border-slate-800">
                    <span className="text-slate-400 block font-medium">Despacho Digital</span>
                    <span className="text-emerald-400 font-mono font-bold">Automático &lt;60s</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#080d1a] border border-slate-800">
                    <span className="text-slate-400 block font-medium">Canal de Notificación</span>
                    <span className="text-emerald-400 font-bold">WhatsApp Oficial Activo</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span>Tu Lista de Deseos ({wishlist.length})</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Productos y pases guardados para recargas rápidas con un solo clic.
                  </p>
                </div>
                {wishlist.length > 0 && (
                  <button
                    onClick={() => {
                      setActiveModal('none');
                      setCurrentView('store');
                      setSelectedCategory('all');
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-500/40 transition-colors self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Explorar Más Juegos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {wishlist.length === 0 ? (
                <div className="p-8 sm:p-12 text-center rounded-2xl bg-[#0d1527] border border-slate-800 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-sm">
                    <Heart className="w-8 h-8 stroke-[1.75]" />
                  </div>
                  <div className="max-w-md mx-auto space-y-1.5">
                    <h4 className="text-base font-black text-white">
                      Tu Lista de Deseos está vacía
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Explora nuestro catálogo de recargas directas por ID, pases de batalla y suscripciones digitales. Haz clic en el ícono del corazón <Heart className="w-3 h-3 inline text-rose-500 fill-rose-500 mx-0.5" /> en cualquier juego para guardarlo aquí y recargar rápidamente.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveModal('none');
                      setCurrentView('store');
                      setSelectedCategory('all');
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
                  >
                    <span>Explorar Catálogo de Juegos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {games
                      .filter((g) => wishlist.includes(g.id))
                      .map((game) => (
                        <div
                          key={game.id}
                          className="group relative bg-[#0d1527] border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all flex flex-col justify-between"
                        >
                          {/* Banner with Real Image Artwork */}
                          <div className="relative h-28 w-full overflow-hidden bg-slate-950 border-b border-slate-800">
                            {game.imageUrl ? (
                              <img
                                src={game.imageUrl}
                                alt={game.name}
                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                                className="w-full h-full object-cover opacity-80"
                              />
                            ) : (
                              <div className={`w-full h-full bg-gradient-to-r ${game.gradient}`} />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1527] via-[#0d1527]/50 to-transparent pointer-events-none" />
                            <div className="absolute top-2 inset-x-2 flex items-center justify-between z-10">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/30">
                                {game.category === 'recarga_id' ? 'Recarga Directa' : 'Suscripción'}
                              </span>
                              <button
                                onClick={() => toggleWishlist(game.id)}
                                className="p-1.5 rounded-lg bg-black/50 hover:bg-black/70 text-rose-400 border border-white/20 transition-colors cursor-pointer backdrop-blur-md"
                                title="Quitar de la lista de deseos"
                              >
                                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                              </button>
                            </div>
                            <div className="absolute bottom-2 left-2.5 right-2.5 z-10">
                              <h4 className="font-black text-white text-sm leading-tight drop-shadow truncate">
                                {game.name}
                              </h4>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                            <div className="space-y-1">
                              <p className="text-[11px] text-slate-400 line-clamp-2">
                                {game.description || `Recargas inmediatas con acreditación oficial de ${game.name}.`}
                              </p>
                              <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                                <span className="font-medium text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                                  ⚡ Entrega &lt;60s
                                </span>
                                <span className="text-slate-600">·</span>
                                <span className="text-slate-400">
                                  {game.packages.length} paquetes
                                </span>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                              <div>
                                <span className="text-[10px] text-slate-500 font-bold block">DESDE</span>
                                <span className="text-sm font-black text-white font-mono">
                                  {formatPrice(game.packages[0].priceUSD)}
                                </span>
                              </div>

                              <button
                                onClick={() => {
                                  setSelectedGame(game);
                                  setSelectedPackage(game.packages[0]);
                                  setActiveModal('recharge');
                                }}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-900/30 cursor-pointer"
                              >
                                <span>Recargar</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="p-3 bg-[#0d1527] rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Tus favoritos se sincronizan de forma persistente con tu navegador y cuenta activa.</span>
                    </span>
                    <button
                      onClick={() => {
                        if (confirm('¿Deseas vaciar tu lista de deseos?')) {
                          wishlist.forEach((id) => toggleWishlist(id));
                        }
                      }}
                      className="text-[11px] text-slate-400 hover:text-rose-400 font-semibold underline cursor-pointer shrink-0 ml-2"
                    >
                      Vaciar lista
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Modal Receipt Viewer */}
        <ReceiptModal
          order={selectedReceiptOrder}
          onClose={() => setSelectedReceiptOrder(null)}
          onSendWhatsApp={triggerManualWhatsAppNotification}
        />

        {/* Download Success Floating Notification */}
        {downloadSuccessToast && (
          <div className="fixed bottom-6 right-6 z-60 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{downloadSuccessToast}</span>
          </div>
        )}
      </div>
    </div>
  );
};
