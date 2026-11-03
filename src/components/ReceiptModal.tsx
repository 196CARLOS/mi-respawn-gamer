import React, { useState } from 'react';
import { Order } from '../types';
import { X, Download, Printer, Copy, Check, MessageSquare, ShieldCheck, ExternalLink } from 'lucide-react';
import { OFFICIAL_PHONE, OFFICIAL_EMAIL } from '../data/games';
import { downloadReceiptFile } from '../utils/receiptGenerator';
import { GameLogo } from './GameLogo';

interface ReceiptModalProps {
  order: Order | null;
  onClose: () => void;
  onSendWhatsApp: (order: Order) => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose, onSendWhatsApp }) => {
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const handleCopySummary = () => {
    const summary = `🧾 COMPROBANTE MI RESPAWN #${order.id}
Artículo: ${order.gameName} - ${order.packageName} (${order.amount})
Fecha: ${order.date}
Estado: ${order.status === 'completed' ? 'Completado / Acreditado' : 'Procesando'}
${order.playerId ? `Destino UID: ${order.playerId}` : ''}
${order.digitalPin ? `Código PIN: ${order.digitalPin}` : ''}
Total: ${order.currency} ${order.localPrice.toFixed(2)}
Ref Servidor: ${order.serverTransactionId || 'OK'}
Soporte WhatsApp: ${OFFICIAL_PHONE}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(order.timestamp).toLocaleString('es-PY', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0b1220] border border-slate-700/80 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden my-4 sm:my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Receipt Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-5 flex items-center justify-between border-b border-emerald-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black/30 backdrop-blur-xs flex items-center justify-center text-white font-black text-base shadow-xs border border-white/10">
              🧾
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                Comprobante Oficial de Compra
              </div>
              <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                <span className="text-white">Mi Respawn</span>
                <span className="font-mono text-xs bg-black/40 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                  #{order.id}
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg bg-black/30 hover:bg-black/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cyber style Receipt Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto bg-[#070c18]">
          
          {/* Status banner */}
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Transacción Acreditada y Confirmada</span>
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-md shadow-[0_0_12px_rgba(16,185,129,0.4)]">
              {order.status === 'completed' ? 'Completado' : 'En proceso'}
            </span>
          </div>

          {/* Transaction Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs border border-slate-800 py-4 bg-[#0d1527] p-4 rounded-xl">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block tracking-wider">FECHA & HORA</span>
              <span className="font-semibold text-slate-200">{formattedDate}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block tracking-wider">MÉTODO DE PAGO</span>
              <span className="font-semibold text-slate-200">{order.paymentMethod}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block tracking-wider">CLIENTE REGISTRADO</span>
              <span className="font-semibold text-slate-200 break-all">{order.customerEmail}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block tracking-wider">TELÉFONO / WHATSAPP</span>
              <span className="font-semibold text-slate-200">{order.customerPhone}</span>
            </div>
          </div>

          {/* Item details */}
          <div className="bg-[#0d1527] p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
              <span>Detalle del Pedido</span>
              <span>Importe</span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 shrink-0 flex items-center justify-center">
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
                  <div className="font-black text-white text-sm">{order.gameName}</div>
                  <div className="text-xs text-slate-300 font-medium">{order.packageName} · {order.amount}</div>
                  
                  {order.playerId && (
                    <div className="mt-2 text-xs bg-[#080d1a] p-2.5 rounded-lg border border-slate-800 space-y-0.5">
                      <span className="text-slate-400 font-medium text-[11px]">Destino de entrega:</span>
                      <div className="font-mono font-bold text-emerald-400">UID: {order.playerId}</div>
                      {order.playerNickname && (
                        <div className="text-slate-300 text-[11px]">Alias: {order.playerNickname}</div>
                      )}
                      {order.server && (
                        <div className="text-slate-400 text-[11px]">Servidor: {order.server}</div>
                      )}
                    </div>
                  )}

                  {order.digitalPin && (
                    <div className="mt-2 text-xs bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-500/40 space-y-1">
                      <span className="text-emerald-300 font-bold block text-[11px]">PIN / Código de Canje:</span>
                      <span className="font-mono font-black text-emerald-300 text-sm tracking-wider bg-black/60 px-2 py-0.5 rounded border border-emerald-500/50 inline-block">
                        {order.digitalPin}
                      </span>
                      {order.redeemUrl && (
                        <a 
                          href={order.redeemUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-cyan-400 font-bold flex items-center gap-1 hover:underline mt-1"
                        >
                          <span>Canjear en página oficial</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-black font-mono text-base text-white">
                  {order.currency} {order.localPrice.toFixed(2)}
                </span>
                <span className="block text-[10px] text-slate-400">≈ ${order.priceUSD.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Total Row */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-300">Total Liquidado</span>
                <span className="block text-[10px] text-slate-500">Impuestos y tasas incluidas</span>
              </div>
              <span className="text-xl font-black font-mono text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                {order.currency} {order.localPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Validation hash */}
          <div className="p-3 rounded-lg bg-[#080d1a] border border-slate-800 text-[11px] font-mono text-slate-400 break-all space-y-1">
            <span className="font-bold text-slate-300 block uppercase text-[10px] tracking-wider">ID de Validación del Servidor:</span>
            <span className="text-cyan-400">{order.serverTransactionId || `RSP-TX-${order.id}-AUTH-OK`}</span>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            <button
              onClick={() => downloadReceiptFile(order)}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Recibo (HTML)</span>
            </button>

            <button
              onClick={() => onSendWhatsApp(order)}
              className="w-full py-2.5 px-4 bg-[#25d366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span>Enviar a mi WhatsApp</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="py-2 px-3 bg-[#0d1527] hover:bg-[#131f38] border border-slate-700 text-slate-200 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">¡Copiado al Portapapeles!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Resumen</span>
                </>
              )}
            </button>

            <button
              onClick={() => window.print()}
              className="py-2 px-3 bg-[#0d1527] hover:bg-[#131f38] border border-slate-700 text-slate-200 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Comprobante</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>¿Tienes dudas con este comprobante oficial?</span>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${OFFICIAL_EMAIL}?subject=Consulta%20Orden%20${order.id}`}
                className="px-3 py-1 bg-[#0d1527] hover:bg-[#131f38] text-slate-200 font-bold rounded-lg border border-slate-700 shadow-2xs transition-colors cursor-pointer"
              >
                Escribir a Soporte
              </a>
              <button
                onClick={() => onSendWhatsApp(order)}
                className="px-3 py-1 bg-[#25d366]/20 hover:bg-[#25d366]/30 text-[#25d366] font-bold rounded-lg border border-[#25d366]/40 transition-colors cursor-pointer flex items-center gap-1"
              >
                <MessageSquare className="w-3 h-3 text-[#25d366]" />
                <span>Contactar por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
