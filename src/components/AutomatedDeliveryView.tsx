import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Zap,
  Printer,
  Sparkles,
  ArrowRight,
  QrCode
} from 'lucide-react';
import { OFFICIAL_PHONE } from '../data/games';
import { GameLogo } from './GameLogo';

export const AutomatedDeliveryView: React.FC = () => {
  const {
    currentOrderInDelivery,
    clearCurrentOrderInDelivery,
    openRealWhatsAppUrl,
    setActiveModal,
    setDashboardInitialTab,
    formatPrice,
  } = useStore();

  const [copiedPin, setCopiedPin] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  if (!currentOrderInDelivery) return null;

  const order = currentOrderInDelivery;
  const isCompleted = order.status === 'completed';

  const handleCopyPin = () => {
    if (order.digitalPin) {
      navigator.clipboard.writeText(order.digitalPin);
      setCopiedPin(true);
      setTimeout(() => setCopiedPin(false), 2000);
    }
  };

  const handleOpenWhatsApp = () => {
    const pinPart = order.digitalPin
      ? `\n🔑 *PIN DIGITAL:* \`${order.digitalPin}\`\n🔗 *Portal de Canje:* ${order.redeemUrl || 'En la web oficial'}`
      : `\n🎮 *Acreditación Directa a:* ${order.playerNickname || order.playerId}\n🌐 *Servidor:* ${order.server || 'Oficial'}`;

    const text = `🟢 *MI RESPAWN - COMPROBANTE OFICIAL*\n──────────────────────\n✅ *¡Transacción Exitosa!*\n📦 *Producto:* ${order.gameName} - ${order.packageName}\n💰 *Monto Pagado:* ${order.currency} ${order.localPrice.toFixed(2)}\n🧾 *Orden:* #${order.id}\n💳 *Método de Pago:* ${order.paymentMethod}${pinPart}\n──────────────────────\n🕒 ${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}\n🛡️ _Soporte Oficial Mi Respawn (${OFFICIAL_PHONE}): ¡Gracias por tu compra!_`;

    openRealWhatsAppUrl(order.customerPhone || OFFICIAL_PHONE, text);
  };

  const handleGoToOrders = () => {
    clearCurrentOrderInDelivery();
    setDashboardInitialTab('orders');
    setActiveModal('dashboard');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0b1220] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#080d19] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs font-black text-white uppercase tracking-wider">
                Sistema Automatizado de Despacho
              </span>
              <span className="text-[11px] text-slate-400 block font-mono">
                Orden #{order.id}
              </span>
            </div>
          </div>

          {isCompleted && (
            <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Despacho Exitoso</span>
            </span>
          )}
        </div>

        {/* Real-time automated progression tracker in Cyber Dark Theme */}
        <div className="p-6 border-b border-slate-800 bg-[#060913]">
          <div className="grid grid-cols-4 gap-2 text-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-[11px] font-bold text-white mt-2">1. Pago Seguro</span>
              <span className="text-[10px] text-emerald-400 font-mono font-semibold">Aprobado</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shadow-sm ${
                order.status === 'processing'
                  ? 'bg-amber-400 text-slate-950 animate-pulse'
                  : 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
              }`}>
                {order.status === 'processing' ? '2' : <Check className="w-4 h-4 stroke-[3]" />}
              </div>
              <span className="text-[11px] font-bold text-white mt-2">2. Conexión API</span>
              <span className="text-[10px] text-slate-400 font-mono font-medium">
                {order.status === 'processing' ? 'Conectando...' : 'Autenticado'}
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shadow-sm ${
                order.status === 'processing' || order.status === 'verifying_id'
                  ? 'bg-slate-800 text-slate-500'
                  : order.status === 'delivering'
                  ? 'bg-amber-400 text-slate-950 animate-pulse'
                  : 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
              }`}>
                {order.status === 'completed' ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
              </div>
              <span className="text-[11px] font-bold text-white mt-2">3. Inyección / PIN</span>
              <span className="text-[10px] text-slate-400 font-mono font-medium">
                {order.status === 'completed' ? 'Generado' : order.status === 'delivering' ? 'Despachando' : 'En cola'}
              </span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shadow-sm ${
                isCompleted ? 'bg-[#25d366] text-slate-950 font-black shadow-[0_0_10px_rgba(37,211,102,0.5)]' : 'bg-slate-800 text-slate-500'
              }`}>
                {isCompleted ? <MessageSquare className="w-4 h-4 fill-current" /> : '4'}
              </div>
              <span className="text-[11px] font-bold text-white mt-2">4. WhatsApp</span>
              <span className="text-[10px] text-slate-400 font-mono font-medium">
                {isCompleted ? 'Notificado' : 'Pendiente'}
              </span>
            </div>
          </div>

          {/* Animated line if in progress */}
          {!isCompleted && (
            <div className="mt-4 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-2/3 animate-pulse rounded-full" />
            </div>
          )}
        </div>

        {/* Delivery Details Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto bg-[#0b1220] scrollbar-thin scrollbar-thumb-slate-800">
          {/* Product Header with Real Artwork */}
          <div className="flex items-center gap-3.5 p-3.5 bg-[#0d1527] rounded-xl border border-slate-800">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0 shadow-2xs flex items-center justify-center">
              {order.imageUrl ? (
                <img
                  src={order.imageUrl}
                  alt={order.gameName}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <GameLogo gameIdOrSlug={order.gameId} size="md" />
              )}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                {order.deliveryType === 'direct_account' ? 'Recarga Directa por ID' : 'Código PIN Oficial'}
              </span>
              <h4 className="text-sm font-black text-white mt-1">{order.gameName}</h4>
              <p className="text-xs text-slate-400 font-medium">{order.packageName} ({order.amount})</p>
            </div>
          </div>

          {/* Direct Account Delivery Box */}
          {order.deliveryType === 'direct_account' ? (
            <div className="p-4 rounded-xl bg-[#0d1527] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Detalles de la Acreditación Directa
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  {order.serverTransactionId}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-[#080d19] border border-slate-700/80 shadow-xs">
                  <span className="text-[10px] text-slate-400 block font-medium">Juego</span>
                  <span className="font-bold text-white">{order.gameName}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#080d19] border border-slate-700/80 shadow-xs">
                  <span className="text-[10px] text-slate-400 block font-medium">Monto Acreditado</span>
                  <span className="font-black text-emerald-400">{order.amount}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#080d19] border border-slate-700/80 shadow-xs">
                  <span className="text-[10px] text-slate-400 block font-medium">Cuenta / Nickname</span>
                  <span className="font-bold text-white font-mono">{order.playerNickname || order.playerId}</span>
                </div>
              </div>

              <div className="text-[11px] text-emerald-300 bg-emerald-950/40 p-3 rounded-lg border border-emerald-500/30 flex items-start gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{order.redeemInstructions}</span>
              </div>
            </div>
          ) : (
            /* Digital PIN Box in Dark Theme */
            <div className="p-5 rounded-xl bg-[#0d1527] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block">
                    Tu Clave Digital / PIN Despachado
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Copia el código o canjéalo en el enlace oficial
                  </span>
                </div>
                <button
                  onClick={() => setShowQrModal(!showQrModal)}
                  className="p-2 rounded-lg bg-[#131f38] border border-slate-700 hover:bg-[#1a294a] text-slate-300 transition-colors shadow-xs cursor-pointer"
                  title="Ver Código QR"
                >
                  <QrCode className="w-4 h-4" />
                </button>
              </div>

              {/* Monospace PIN with Copy Button */}
              <div className="p-4 rounded-xl bg-[#080d1a] border border-slate-700 flex items-center justify-between gap-3 shadow-sm">
                <div className="font-mono text-base sm:text-lg font-black tracking-widest text-emerald-400 select-all overflow-x-auto">
                  {order.digitalPin}
                </div>
                <button
                  onClick={handleCopyPin}
                  className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-emerald-950/50 cursor-pointer"
                >
                  {copiedPin ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar PIN</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instructions and direct link */}
              <div className="text-xs text-slate-400 space-y-2 font-medium">
                <p className="text-[11px]">
                  {order.redeemInstructions}
                </p>
                {order.redeemUrl && (
                  <a
                    href={order.redeemUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 hover:underline font-bold"
                  >
                    <span>Ir a la página de canje oficial ({order.redeemUrl})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* WhatsApp Notification Integration Card */}
          <div className="p-4 rounded-xl bg-[#0d1527] border border-[#25d366]/40 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#25d366] flex items-center justify-center text-slate-950 font-bold shadow-xs">
                  <MessageSquare className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    Notificación enviada por WhatsApp
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Destinatario: <strong className="text-emerald-400 font-mono font-bold">{order.customerPhone || 'WhatsApp Registrado'}</strong>
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-black text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                ENTREGADO
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-[#080d19] p-3 rounded-lg border border-slate-700/80 font-mono text-[11px]">
              "¡Hola Roberto Carlos! Tu recarga de {order.packageName} para {order.gameName} ha sido confirmada con éxito. Orden #{order.id}..."
            </p>

            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-2.5 px-3 bg-[#25d366] hover:bg-[#20ba5a] text-slate-950 text-xs font-black rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Abrir Comprobante en WhatsApp</span>
            </button>
          </div>

          {/* Cashback reward alert */}
          <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs text-amber-300">
            <span className="flex items-center gap-2 font-medium">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>¡Ganaste <strong>+{Math.round(order.priceUSD * 5)} Respawn Coins</strong> con esta compra!</span>
            </span>
            <span className="text-[11px] text-amber-300 font-mono font-bold">5% Cashback</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#080d19] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrintReceipt}
            className="px-3.5 py-2 text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Recibo</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGoToOrders}
              className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-[#131f38] hover:bg-[#1a294a] border border-slate-700 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Ver en Mis Pedidos
            </button>
            <button
              onClick={clearCurrentOrderInDelivery}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-950/50"
            >
              <span>Finalizar y Seguir Comprando</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
