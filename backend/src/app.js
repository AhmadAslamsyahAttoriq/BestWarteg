// ─── APLIKASI EXPRESS ─────────────────────────────────────────────────────────
// File ini hanya merakit middleware & rute. Logika bisnis ada di controllers/,
// data statis ada di data/, dan penyimpanan sementara ada di store/.

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import voucherRoutes from './routes/voucherRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.send('🍛 Best Warteg API — berjalan dengan baik'));

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/voucher', voucherRoutes);

export default app;
