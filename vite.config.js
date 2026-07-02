import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        private: resolve(__dirname, 'private/index.html'),
        login: resolve(__dirname, 'login/index.html')
      }
    }
  }
});
