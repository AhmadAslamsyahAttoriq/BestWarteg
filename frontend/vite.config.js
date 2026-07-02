import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Konfigurasi Vite: dev server React berjalan di http://localhost:5173
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
