import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],           // ← Enable React support
  server: {
    port: 5173,                 // ← Dev server port
    open: true,                 // ← Auto-open browser
  },
  build: {
    outDir: 'dist',             // ← Output folder
    sourcemap: true,            // ← Debugging maps
  },
});