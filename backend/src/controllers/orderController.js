// ─── CONTROLLER: PESANAN ──────────────────────────────────────────────────────

import { orders, carts } from '../store/memoryStore.js';
import { calculateVoucher } from './voucherController.js';
import { TAX_RATE } from '../config/constants.js';

const PAY_LABEL = { qris: 'QRIS', transfer: 'Transfer Bank BCA', cod: 'Tunai / COD' };

export function createOrder(req, res) {
  const { sessionId, payment, note, voucher, items: bodyItems } = req.body;
  const cart = bodyItems && bodyItems.length ? bodyItems : (carts[sessionId] || []);
  if (!cart.length) return res.status(400).json({ success: false, message: 'Keranjang kosong' });

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const voucherResult = calculateVoucher(total, voucher);
  if (voucherResult.error) return res.status(400).json({ success: false, message: voucherResult.error });

  const tax = Math.round(total * TAX_RATE);
  const grand = total - voucherResult.discount + voucherResult.shipping + tax;

  const order = {
    orderId: 'BW-' + String(Date.now()).slice(-6),
    userId: req.user.id,
    userName: req.user.name,
    items: [...cart],
    subtotal: total,
    discount: voucherResult.discount,
    shipping: voucherResult.shipping,
    voucher: voucher || null,
    tax,
    total: grand,
    payment,
    paymentLabel: PAY_LABEL[payment] || payment,
    note: note || '',
    date: new Date().toLocaleString('id-ID'),
    status: 'diproses',
  };

  orders.push(order);
  if (sessionId) carts[sessionId] = [];
  res.json({ success: true, data: order });
}

export function getMyOrders(req, res) {
  const myOrders = orders.filter(o => o.userId === req.user.id).slice().reverse();
  res.json({ success: true, data: myOrders });
}

export function confirmOrder(req, res) {
  const order = orders.find(o => o.orderId === req.params.id && o.userId === req.user.id);
  if (!order) return res.status(404).json({ success: false, message: 'Pesanan tidak ditemukan' });
  if (order.status === 'selesai') {
    return res.status(400).json({ success: false, message: 'Pesanan ini sudah dikonfirmasi sebelumnya' });
  }
  order.status = 'selesai';
  order.confirmedAt = new Date().toLocaleString('id-ID');
  res.json({ success: true, data: order });
}

export function deleteOrder(req, res) {
  const idx = orders.findIndex(o => o.orderId === req.params.id && o.userId === req.user.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Pesanan tidak ditemukan' });
  orders.splice(idx, 1);
  res.json({ success: true, message: 'Pesanan dihapus' });
}

export function clearMyOrders(req, res) {
  for (let i = orders.length - 1; i >= 0; i--) {
    if (orders[i].userId === req.user.id) orders.splice(i, 1);
  }
  res.json({ success: true, message: 'Semua riwayat dihapus' });
}