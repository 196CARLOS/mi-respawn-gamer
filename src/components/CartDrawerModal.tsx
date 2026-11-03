import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PaymentMethodId } from '../types';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Tag,
  ArrowRight,
  Zap,
  CheckCircle2,
  CreditCard,
  QrCode,
  Smartphone,
  Wallet,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { OFFICIAL_PHONE, OFFICIAL_EMAIL } from '../data/games';
import { GameLogo } from './GameLogo';

export const CartDrawerModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    cart,
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
    formatPrice,
    convertPrice,
    currentCurrency,
    userPhone,
    userEmail,
    currentUser,
    setSelectedCategory,
    setCurrentView,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodId>('card');
  const [phoneInput, setPhoneInput] = useState(userPhone || OFFICIAL_PHONE);
  const [emailInput, setEmailInput] = useState(userEmail || OFFICIAL_EMAIL);
  const [isProcessing, setIsProcessing] = useState(false);

  if (activeModal !== 'cart') return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    if (!phoneInput.trim()) {
      alert('Por favor ingresa un número de teléfono o WhatsApp para recibir el comprobante.');
      return;
    }

    setIsProcessing(true);
    try {
      await processCartCheckout({
        paymentMethodId: selectedPayment,
        customerPhone: phoneInput.trim(),
        customerEmail: emailInput.trim(),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0b1220] border-l border-slate-800 h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#080d19] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>Carrito de Compras</span>
                <span className="text-xs bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-black">
                  {cartCount} {cartCount === 1 ? 'artículo' : 'artículos'}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Despacho automatizado digital & notificaciones WhatsApp
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal('none')}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-[#131f38] hover:bg-[#1a294a] border border-slate-700 transition-colors cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#060913] scrollbar-thin scrollbar-thumb-slate-800">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0d1527] border border-slate-800 flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-white">Tu carrito está vacío</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Agrega diamantes, pases de batalla o códigos digitales de tus juegos favoritos para pagar todo en una sola transacción.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveModal('none');
                  setCurrentView('store');
                  setSelectedCategory('all');
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <span>Productos en la orden</span>
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-slate-500 hover:text-rose-400 underline font-semibold cursor-pointer transition-colors"
                  >
                    Vaciar carrito
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[#0d1527] border border-slate-800/90 hover:border-slate-700 shadow-sm transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0 shadow-xs flex items-center justify-center">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.gameName}
                              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <GameLogo gameIdOrSlug={item.gameId} size="sm" />
                          )}
                        </div>
                        <div>
                          <h5 className="font-extrabold text-white text-xs">
                            {item.gameName}
                          </h5>
                          <span className="text-[11px] text-slate-400 font-medium block">
                            {item.packageName} ({item.amount})
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-black text-xs text-emerald-400 block">
                          {formatPrice(item.priceUSD * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-slate-500 font-mono">
                            {formatPrice(item.priceUSD)} c/u
                          </span>
                        )}
                      </div>
                    </div>

                    {/* UID or Code Tag */}
                    <div className="flex items-center justify-between text-[11px] bg-[#080d19] p-2 rounded-lg border border-slate-800">
                      {item.playerId ? (
                        <div className="text-slate-300 truncate max-w-[240px]">
                          <span className="font-bold text-emerald-400">UID: </span>
                          <span className="font-mono text-white">{item.playerId}</span>
                          {item.playerNickname && ` (${item.playerNickname})`}
                          {item.server && ` · ${item.server}`}
                        </div>
                      ) : (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Zap className="w-3 h-3 text-emerald-400" />
                          <span>Código PIN Oficial Instantáneo</span>
                        </span>
                      )}

                      {/* Quantity & Delete */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center bg-[#0d1527] border border-slate-700 rounded-lg">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-l cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-mono font-bold text-xs text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-r cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                          title="Eliminar del carrito"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Section */}
              <div className="p-3.5 rounded-xl bg-[#0d1527] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-400" />
                    <span>¿Tienes un Cupón Gamer?</span>
                  </span>
                  <span className="text-[10px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded font-mono font-bold border border-emerald-500/30">
                    Prueba: RESPAWN10
                  </span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-950/60 border border-emerald-500/40 p-2.5 rounded-lg text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <div>
                        <span className="font-mono font-black text-white">{appliedCoupon.code}</span>
                        <span className="text-emerald-300 text-[11px] block">{appliedCoupon.description}</span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-rose-400 hover:underline cursor-pointer"
                    >
                      Quitar
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Código de cupón (Ej. RESPAWN10)"
                      className="flex-1 px-3 py-1.5 bg-[#080d1a] border border-slate-700 rounded-lg text-xs font-mono font-semibold text-white uppercase focus:outline-none focus:border-emerald-400"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                      Aplicar
                    </button>
                  </form>
                )}

                {couponFeedback && !appliedCoupon && (
                  <p className={`text-[11px] font-semibold ${couponFeedback.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Payment Method Selector */}
              <div className="p-3.5 rounded-xl bg-[#0d1527] border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-300 block">
                  Selecciona tu Método de Pago Seguro
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedPayment('card')}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-2 ${
                      selectedPayment === 'card'
                        ? 'border-emerald-400 bg-emerald-950/60 font-bold text-white shadow-xs ring-1 ring-emerald-400/50'
                        : 'border-slate-800 bg-[#0e172a] hover:bg-[#131f38] text-slate-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">Tarjeta (Visa/MC)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment('pago_movil')}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-2 ${
                      selectedPayment === 'pago_movil'
                        ? 'border-emerald-400 bg-emerald-950/60 font-bold text-white shadow-xs ring-1 ring-emerald-400/50'
                        : 'border-slate-800 bg-[#0e172a] hover:bg-[#131f38] text-slate-300'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">Tigo / SIPAP PY</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment('yape_plin')}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-2 ${
                      selectedPayment === 'yape_plin'
                        ? 'border-emerald-400 bg-emerald-950/60 font-bold text-white shadow-xs ring-1 ring-emerald-400/50'
                        : 'border-slate-800 bg-[#0e172a] hover:bg-[#131f38] text-slate-300'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">Yape / Plin / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment('respawn_balance')}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-2 ${
                      selectedPayment === 'respawn_balance'
                        ? 'border-emerald-400 bg-emerald-950/60 font-bold text-white shadow-xs ring-1 ring-emerald-400/50'
                        : 'border-slate-800 bg-[#0e172a] hover:bg-[#131f38] text-slate-300'
                    }`}
                  >
                    <Wallet className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">Monedero Respawn</span>
                  </button>
                </div>
              </div>

              {/* Contact Data Verification */}
              <div className="p-3.5 rounded-xl bg-[#0d1527] border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-slate-300 block">
                  Destino de Confirmación Digital
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-0.5">TELÉFONO / WHATSAPP</label>
                    <input
                      type="text"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+595 9XX XXX XXX"
                      className="w-full px-2.5 py-1.5 bg-[#080d1a] border border-slate-700 rounded-lg text-xs font-medium text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block mb-0.5">CORREO ELECTRÓNICO</label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="usuario@gmail.com"
                      className="w-full px-2.5 py-1.5 bg-[#080d1a] border border-slate-700 rounded-lg text-xs font-medium text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Bar */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#080d19] border-t border-slate-800 space-y-3 shadow-xl">
            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Subtotal ({cartCount} artículos)</span>
                <span className="font-mono font-bold text-slate-200">
                  {formatPrice(cartTotalUSD)}
                </span>
              </div>

              {cartDiscountUSD > 0 && (
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>Descuento aplicado</span>
                  <span className="font-mono">
                    -{formatPrice(cartDiscountUSD)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-400">
                <span>Despacho Automatizado</span>
                <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.2 rounded border border-emerald-500/30">
                  GRATIS &lt;45s
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-black text-white block uppercase">
                    Total a Pagar
                  </span>
                  <span className="text-[10px] text-slate-400">
                    IVA incluido (0% exento digital)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black font-mono text-emerald-400">
                    {formatPrice(cartFinalTotalUSD)}
                  </span>
                  <span className="block text-[11px] text-slate-400 font-mono">
                    ≈ ${cartFinalTotalUSD.toFixed(2)} USD
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Procesando pago seguro...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Finalizar Compra y Acreditar</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Entrega &lt;45 segundos
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-[#25d366]" />
                WhatsApp 100% Confirmado
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
