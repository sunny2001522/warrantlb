import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    const certPath = path.resolve(__dirname, '.certs/localhost.pem');
    const keyPath = path.resolve(__dirname, '.certs/localhost-key.pem');
    const httpsConfig = fs.existsSync(certPath) && fs.existsSync(keyPath)
      ? { cert: fs.readFileSync(certPath), key: fs.readFileSync(keyPath) }
      : {};

    return {
      build: {
        // 強制 ASCII 檔名 (避免 CJK 檔名在 Cloud Run container import 時失敗)
        rollupOptions: {
          output: {
            assetFileNames: 'assets/[hash][extname]',
            chunkFileNames: 'assets/[hash].js',
            entryFileNames: 'assets/[hash].js',
          },
        },
      },
      server: {
        port: 3003,
        host: '0.0.0.0',
        https: httpsConfig,
        proxy: {
          '/api/experience-course': {
            target: 'https://columnist-landingpage.cmoney.tw',
            changeOrigin: true,
          },
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
