import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PAYMENT_METHODS, OFFICIAL_PHONE, OFFICIAL_EMAIL } from '../data/games';
import { PaymentMethodId } from '../types';
import { GameLogo } from './GameLogo';
import {
  X,
  Lock,
  CreditCard,
  Smartphone,
  Banknote,
  Building2,
  Zap,
  Coins,
  Sparkles,
  ArrowLeft,
  MessageSquare,
  AlertCircle,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const SecureCheckoutModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    selectedGame,
    selectedPackage,
    formatPrice,
    currentCurrency,
    userBalanceUSD,
    userPhone,
    setUserPhone,
    userEmail,
    setUserEmail,
    userName,
    processNewOrder,
    autoWhatsAppNotificationEnabled,
    setAutoWhatsAppNotificationEnabled,
    activePlayerId,
    activePlayerNickname,
    activeServer,
    activeVerifiedProfile,
  } = useStore();

  const [selectedMethodId, setSelectedMethodId] = useState<PaymentMethodId>('card');
  const [phoneInput, setPhoneInput] = useState<string>(userPhone || OFFICIAL_PHONE);
  const [emailInput, setEmailInput] = useState<string>(userEmail || OFFICIAL_EMAIL);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Card form state
  const [cardNumber, setCardNumber] = useState<string>('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState<string>('08/28');
  const [cardCvv, setCardCvv] = useState<string>('•••');
  const [cardHolder, setCardHolder] = useState<string>(userName || 'Roberto Carlos Giménez');

  if (activeModal !== 'checkout' || !selectedGame || !selectedPackage) return null;

  const handleBack = () => {
    setActiveModal('recharge');
  };

  const handleClose = () => {
    setActiveModal('none');
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!phoneInput.trim()) {
      alert('Ingresa tu número de WhatsApp para enviarte el comprobante oficial.');
      return;
    }

    if (selectedMethodId === 'respawn_balance' && userBalanceUSD < selectedPackage.priceUSD) {
      alert('Saldo insuficiente en tu monedero Respawn. Puedes recargarlo o elegir otro método de pago.');
      return;
    }

    if (selectedGame.requiresPlayerId && !activePlayerId && !activeVerifiedProfile?.playerId) {
      alert('Debes ingresar y validar tu ID de jugador antes de continuar al pago.');
      setActiveModal('recharge');
      return;
    }

    setIsSubmitting(true);
    setUserPhone(phoneInput);
    setUserEmail(emailInput);

    try {
      await processNewOrder({
        game: selectedGame,
        pkg: selectedPackage,
        paymentMethodId: selectedMethodId,
        customerPhone: phoneInput,
        customerEmail: emailInput,
        playerId: activePlayerId || activeVerifiedProfile?.playerId,
        server: activeServer || activeVerifiedProfile?.server,
      });
    } catch (err) {
      console.error(err);
      alert('Hubo un error al procesar el pago. Por favor intenta de nuevo.');
      setIsSubmitting(false);
    }
  };

  const renderMethodIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard': return <CreditCard className="w-4 h-4" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Banknote': return <Banknote className="w-4 h-4" />;
      case 'Building2': return <Building2 className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Coins': return <Coins className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0b1220] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#080d19] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-[#131f38] hover:bg-[#1a294a] border border-slate-700 transition-colors cursor-pointer"
              title="Volver"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Pasarela de Pago Segura SSL 256-Bit</span>
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Transacción cifrada punto a punto con entrega automatizada inmediata
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-[#131f38] hover:bg-[#1a294a] border border-slate-700 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePay} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#0b1220]">
          {/* Left Column: Payment Methods & Fields (7 cols) */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
                1. Selecciona Método de Pago
              </label>

              <div className="grid grid-cols-2 gap-2">
                {PAYMENT_METHODS.map((method) => {
                  const isSelected = selectedMethodId === method.id;
                  const isBalance = method.id === 'respawn_balance';

                  return (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setSelectedMethodId(method.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950/60 border-emerald-400 ring-1 ring-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                          : 'bg-[#0e172a] border-slate-800 hover:border-slate-700 hover:bg-[#131f38]'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                        isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {renderMethodIcon(method.icon)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white truncate">
                          {method.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate font-medium">
                          {isBalance ? `Saldo: $${userBalanceUSD.toFixed(2)}` : method.tag}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic payment details area */}
            <div className="p-4 rounded-xl bg-[#0d1527] border border-slate-800 space-y-3.5">
              {selectedMethodId === 'card' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-bold text-white">Datos de la Tarjeta</span>
                    <span className="text-[10px] text-emerald-300 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      3D Secure Habilitado
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">Número de Tarjeta</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 0000 0000 0000"
                      className="w-full px-3 py-2 bg-[#080d1a] border border-slate-700 rounded-lg text-xs text-white font-mono font-bold focus:outline-none focus:border-emerald-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 font-medium block mb-1">Expiración (MM/AA)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/AA"
                        className="w-full px-3 py-2 bg-[#080d1a] border border-slate-700 rounded-lg text-xs text-white font-mono font-bold focus:outline-none focus:border-emerald-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 font-medium block mb-1">Código CVV</label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-2 bg-[#080d1a] border border-slate-700 rounded-lg text-xs text-white font-mono font-bold focus:outline-none focus:border-emerald-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">Nombre del Titular</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Nombre como figura en la tarjeta"
                      className="w-full px-3 py-2 bg-[#080d1a] border border-slate-700 rounded-lg text-xs text-white font-medium focus:outline-none focus:border-emerald-400"
                      required
                    />
                  </div>
                </div>
              )}

              {selectedMethodId === 'pago_movil' && (
                <div className="space-y-2 text-xs">
                  <div className="font-bold text-emerald-400">Giros Tigo / SIPAP (Paraguay)</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Envía a la Billetera Oficial de Mi Respawn (Roberto Carlos Giménez). Validación automática con el extracto o comprobante digital.
                  </p>
                </div>
              )}

              {selectedMethodId === 'yape_plin' && (
                <div className="space-y-2 text-xs">
                  <div className="font-bold text-emerald-400">Yape / Plin (Perú)</div>
                  <p className="text-slate-400 text-[11px]">
                    Transfiere al número oficial: <strong className="text-white font-mono">+51 984 219 042</strong>. Se acredita automáticamente al validar la constancia.
                  </p>
                </div>
              )}

              {selectedMethodId === 'pse' && (
                <div className="space-y-2 text-xs">
                  <div className="font-bold text-emerald-400">PSE / Nequi (Colombia)</div>
                  <p className="text-slate-400 text-[11px]">
                    Conexión directa con la pasarela bancaria PSE sin recargos.
                  </p>
                </div>
              )}

              {selectedMethodId === 'spei' && (
                <div className="space-y-2 text-xs">
                  <div className="font-bold text-emerald-400">SPEI / OXXO (México)</div>
                  <p className="text-slate-400 text-[11px]">
                    Transferencia interbancaria SPEI acreditada en segundos las 24 horas del día.
                  </p>
                </div>
              )}

              {selectedMethodId === 'binance_pay' && (
                <div className="space-y-2 text-xs">
                  <div className="font-bold text-emerald-400">Binance Pay (USDT)</div>
                  <p className="text-slate-400 text-[11px]">
                    Binance Pay ID: <strong className="text-white font-mono">89421092</strong>. Aprobación en la blockchain en menos de 20 segundos sin comisión de red.
                  </p>
                </div>
              )}

              {selectedMethodId === 'respawn_balance' && (
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">Saldo Respawn Coins</span>
                    <span className="text-white font-mono font-bold">${userBalanceUSD.toFixed(2)} USD</span>
                  </div>
                  {userBalanceUSD < selectedPackage.priceUSD ? (
                    <div className="text-[11px] text-rose-400 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Saldo insuficiente. Recarga en tu panel o elige otro método.</span>
                    </div>
                  ) : (
                    <p className="text-slate-400 text-[11px]">
                      Pago instantáneo debitado de tu monedero con acreditación en 5 segundos y 5% de cashback en Respawn Coins.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* WhatsApp Notification input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#25d366] fill-[#25d366]" />
                <span>2. Número de WhatsApp para el Comprobante</span>
              </label>

              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="+595 9XX XXX XXX"
                className="w-full px-3 py-2 bg-[#080d1a] border border-slate-700 rounded-lg text-xs text-white font-mono font-bold focus:outline-none focus:border-emerald-400"
                required
              />

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="waConsent"
                  checked={autoWhatsAppNotificationEnabled}
                  onChange={(e) => setAutoWhatsAppNotificationEnabled(e.target.checked)}
                  className="rounded border-slate-700 text-[#25d366] focus:ring-[#25d366] bg-[#080d1a]"
                />
                <label htmlFor="waConsent" className="text-[11px] text-slate-400 cursor-pointer font-medium">
                  Enviar comprobante oficial, PIN y confirmación a este WhatsApp inmediatamente
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Pay CTA (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            <div className="p-4 rounded-xl bg-[#0d1527] border border-slate-800 space-y-3.5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                Resumen de la Orden
              </h3>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0 shadow-xs flex items-center justify-center">
                  {selectedGame.imageUrl ? (
                    <img
                      src={selectedGame.imageUrl}
                      alt={selectedGame.name}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <GameLogo gameIdOrSlug={selectedGame.id} size="sm" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-black text-white">{selectedGame.name}</div>
                  <div className="text-[11px] text-slate-400 font-medium">{selectedPackage.name} ({selectedPackage.amount})</div>
                </div>
              </div>

              {/* Verified Player ID Box */}
              {selectedGame.requiresPlayerId && (
                <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs space-y-1">
                  <div className="flex items-center justify-between text-emerald-300 font-extrabold text-[11px]">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Destino Verificado</span>
                    </span>
                    <span className="text-[10px] bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded font-sans font-bold">
                      {activeVerifiedProfile?.rank || 'Cuenta Activa'}
                    </span>
                  </div>
                  <div className="text-white font-black flex items-center gap-1.5 text-xs">
                    <span>{activeVerifiedProfile?.nickname || activePlayerNickname || 'Jugador'}</span>
                    <span className="font-mono text-[10px] text-emerald-300 font-bold bg-[#080d19] px-1.5 py-0.5 rounded border border-emerald-500/30">
                      UID: {activePlayerId || activeVerifiedProfile?.playerId}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    Servidor: {activeServer || activeVerifiedProfile?.server || 'Servidor Oficial'}
                  </div>
                </div>
              )}

              <div className="space-y-2 text-xs pt-2 border-t border-slate-800 text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums font-bold text-white">{formatPrice(selectedPackage.priceUSD)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Comisión Pasarela</span>
                  <span className="text-emerald-400 font-bold">GRATIS (0%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Cashback Respawn (5%)</span>
                  <span className="text-amber-300 font-bold">+{Math.round(selectedPackage.priceUSD * 5)} Coins</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Total a Pagar</span>
                  <span className="text-[10px] text-slate-400 font-mono">Tasa Oficial en {currentCurrency.code}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-emerald-400 font-mono tabular-nums">
                    {formatPrice(selectedPackage.priceUSD)}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Guarantee badge */}
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-[11px] text-emerald-300 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Garantía de Entrega Automatizada</span>
              </div>
              <p className="text-emerald-300/80 leading-normal font-medium">
                Soporte directo 24/7 y despacho inmediato con verificación oficial Mi Respawn.
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-700 disabled:to-slate-700 disabled:opacity-50 text-white text-xs sm:text-sm font-black rounded-xl shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 stroke-[2.5]" />
              <span>
                {isSubmitting ? 'Procesando Transacción...' : `Pagar ${formatPrice(selectedPackage.priceUSD)} y Recargar`}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
