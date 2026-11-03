import { Order } from '../types';
import { OFFICIAL_PHONE, OFFICIAL_EMAIL } from '../data/games';

/**
 * Generates an official, beautifully styled digital invoice receipt in HTML format
 * and triggers a client-side download as a self-contained file.
 */
export function downloadReceiptFile(order: Order) {
  const formattedDate = new Date(order.timestamp).toLocaleString('es-PY', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const receiptHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Comprobante de Pago #${order.id} - Mi Respawn</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
    }
    .receipt-container {
      background: #ffffff;
      max-width: 680px;
      width: 100%;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    }
    .header {
      background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
      color: #ffffff;
      padding: 32px 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 900;
      letter-spacing: -0.5px;
    }
    .brand-subtitle {
      font-size: 13px;
      color: #a7f3d0;
      margin-top: 4px;
    }
    .receipt-badge {
      text-align: right;
    }
    .badge-number {
      font-family: monospace;
      font-size: 16px;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.2);
      padding: 4px 12px;
      border-radius: 6px;
      display: inline-block;
    }
    .badge-status {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 6px;
      color: #ecfdf5;
    }
    .body {
      padding: 36px;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding-bottom: 24px;
      border-bottom: 1px dashed #cbd5e1;
      margin-bottom: 24px;
    }
    .meta-item h4 {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      margin-bottom: 4px;
    }
    .meta-item p {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
    }
    .order-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .order-table th {
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      padding: 12px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    .order-table td {
      padding: 16px 0;
      font-size: 14px;
      border-bottom: 1px solid #f1f5f9;
    }
    .total-section {
      background: #f8fafc;
      padding: 20px 24px;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .total-title {
      font-size: 14px;
      font-weight: 700;
      color: #334155;
    }
    .total-amount {
      font-size: 24px;
      font-weight: 900;
      color: #059669;
      font-family: monospace;
    }
    .pin-box {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      padding: 16px 20px;
      border-radius: 10px;
      margin-bottom: 24px;
    }
    .pin-title {
      font-size: 12px;
      font-weight: 700;
      color: #065f46;
      margin-bottom: 6px;
    }
    .pin-code {
      font-family: monospace;
      font-size: 18px;
      font-weight: 900;
      letter-spacing: 2px;
      color: #047857;
      background: #ffffff;
      padding: 8px 14px;
      border-radius: 6px;
      display: inline-block;
      border: 1px dashed #34d399;
    }
    .footer {
      border-top: 1px solid #e2e8f0;
      padding: 24px 36px;
      background: #fafafa;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #64748b;
    }
    .btn-print {
      display: inline-block;
      padding: 10px 20px;
      background: #0f172a;
      color: #ffffff;
      text-decoration: none;
      font-weight: 700;
      font-size: 13px;
      border-radius: 8px;
      cursor: pointer;
    }
    @media print {
      body { background: #ffffff; padding: 0; }
      .receipt-container { box-shadow: none; border: none; max-width: 100%; }
      .btn-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="header">
      <div>
        <div class="brand-title">MI RESPAWN</div>
        <div class="brand-subtitle">Recargas & Suscripciones Gamer Oficiales</div>
      </div>
      <div class="receipt-badge">
        <div class="badge-number">#${order.id}</div>
        <div class="badge-status">● ${order.status === 'completed' ? 'Completado / Entregado' : 'Procesado'}</div>
      </div>
    </div>

    <div class="body">
      <div class="meta-grid">
        <div class="meta-item">
          <h4>Fecha de Transacción</h4>
          <p>${formattedDate}</p>
        </div>
        <div class="meta-item">
          <h4>Método de Pago</h4>
          <p>${order.paymentMethod}</p>
        </div>
        <div class="meta-item">
          <h4>Cliente</h4>
          <p>${order.customerEmail}</p>
          <p style="font-size: 12px; color: #64748b; font-weight: normal; margin-top: 2px;">Tel: ${order.customerPhone}</p>
        </div>
        <div class="meta-item">
          <h4>ID Transacción Servidor</h4>
          <p style="font-family: monospace; font-size: 12px; word-break: break-all;">${order.serverTransactionId || 'TX-GAR-89552-OK'}</p>
        </div>
      </div>

      <table class="order-table">
        <thead>
          <tr>
            <th>Descripción del Artículo</th>
            <th>Destino / Jugador</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>${order.gameName}</strong>
              <div style="font-size: 12px; color: #64748b; margin-top: 2px;">${order.packageName} (${order.amount})</div>
            </td>
            <td>
              ${order.playerId ? `UID: <strong style="font-family: monospace;">${order.playerId}</strong>` : 'Entrega Digital'}
              ${order.playerNickname ? `<div style="font-size: 12px; color: #64748b;">Alias: ${order.playerNickname}</div>` : ''}
              ${order.server ? `<div style="font-size: 11px; color: #94a3b8;">Servidor: ${order.server}</div>` : ''}
            </td>
            <td style="text-align: right; font-weight: 700; font-family: monospace;">
              ${order.currency} ${order.localPrice.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      ${order.digitalPin ? `
      <div class="pin-box">
        <div class="pin-title">CÓDIGO DIGITAL / PIN DE ACTIVACIÓN</div>
        <div class="pin-code">${order.digitalPin}</div>
        ${order.redeemUrl ? `<p style="font-size: 12px; color: #065f46; margin-top: 8px;">Canjear en: <a href="${order.redeemUrl}" style="color: #047857; font-weight: bold;">${order.redeemUrl}</a></p>` : ''}
        ${order.redeemInstructions ? `<p style="font-size: 11px; color: #047857; margin-top: 4px;">${order.redeemInstructions}</p>` : ''}
      </div>
      ` : ''}

      <div class="total-section">
        <div>
          <div class="total-title">Total Pagado</div>
          <div style="font-size: 11px; color: #64748b;">IVA incluido (0% Exento Digital)</div>
        </div>
        <div class="total-amount">${order.currency} ${order.localPrice.toFixed(2)}</div>
      </div>

      <div style="font-size: 11px; color: #94a3b8; line-height: 1.5; margin-bottom: 24px;">
        * Este documento certifica la acreditación de saldo digital en la plataforma correspondiente. Conserva tu ID de referencia para cualquier consulta con nuestro equipo de soporte por WhatsApp oficial: ${OFFICIAL_PHONE}.
      </div>

      <div style="text-align: center;">
        <button onclick="window.print()" class="btn-print">🖨️ Imprimir o Guardar como PDF</button>
      </div>
    </div>

    <div class="footer">
      <div>
        <strong>Mi Respawn Gaming Store</strong> · Soporte: ${OFFICIAL_EMAIL}
      </div>
      <div>WhatsApp: ${OFFICIAL_PHONE}</div>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([receiptHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Recibo_MiRespawn_${order.id}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
