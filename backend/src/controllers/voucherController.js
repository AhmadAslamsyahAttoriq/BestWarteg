// ─── CONTROLLER: VOUCHER ──────────────────────────────────────────────────────

import { DEFAULT_SHIPPING } from '../config/constants.js';

export function calculateVoucher(totalBelanja, voucherCode) {
  if (!voucherCode) return { discount: 0, shipping: DEFAULT_SHIPPING, error: null };

  const code = voucherCode.toUpperCase().trim();

  if (code === 'DISKON25') {
    if (totalBelanja < 20000) return { error: 'Minimal belanja untuk voucher DISKON25 adalah Rp20.000' };
    let discount = Math.round(totalBelanja * 0.25);
    if (discount > 10000) discount = 10000;
    return { discount, shipping: DEFAULT_SHIPPING, error: null };
  }
  if (code === 'MAKANHEMAT') {
    if (totalBelanja < 15000) return { error: 'Minimal belanja untuk voucher MAKANHEMAT adalah Rp15.000' };
    return { discount: 5000, shipping: DEFAULT_SHIPPING, error: null };
  }
  if (code === 'GRATISONGKIR') {
    if (totalBelanja < 30000) return { error: 'Minimal belanja untuk voucher GRATISONGKIR adalah Rp30.000' };
    return { discount: 0, shipping: 0, error: null };
  }
  return { error: 'Kode voucher tidak valid atau sudah kedaluwarsa' };
}

export function checkVoucher(req, res) {
  const { total, voucher } = req.body;
  if (total === undefined || total === null) {
    return res.status(400).json({ success: false, message: 'Total belanja wajib dikirim' });
  }
  const result = calculateVoucher(Number(total), voucher);
  if (result.error) return res.status(400).json({ success: false, message: result.error });
  res.json({ success: true, data: result });
}
