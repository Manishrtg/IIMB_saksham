import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',   // ← ADD THIS LINE (this fixes Netlify 100%)
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
