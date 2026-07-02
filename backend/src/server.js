// ─── ENTRY POINT BACKEND ─────────────────────────────────────────────────────
// Jalankan dengan: npm run dev   (di dalam folder backend/)
// Server akan aktif di http://localhost:3001

import app from './app.js';
import { PORT } from './config/constants.js';

app.listen(PORT, () => {
  console.log(`\n🍛 Best Warteg Backend`);
  console.log(`📡 Server   : http://localhost:${PORT}`);
  console.log(`📋 Endpoint utama:`);
  console.log(`   POST   /api/auth/register`);
  console.log(`   POST   /api/auth/login`);
  console.log(`   POST   /api/auth/admin-login`);
  console.log(`   GET    /api/menu`);
  console.log(`   GET    /api/menu/categories`);
  console.log(`   GET    /api/cart/:sid`);
  console.log(`   POST   /api/cart/:sid`);
  console.log(`   POST   /api/voucher`);
  console.log(`   POST   /api/orders   (butuh token)`);
  console.log(`   GET    /api/orders   (butuh token)\n`);
});
