import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,   // ← This deletes old/empty files before building
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});