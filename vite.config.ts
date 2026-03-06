import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    // HTTPS 配置：如果有 mkcert 生成的憑證就使用，否則跳過
    const certPath = path.resolve(__dirname, 'localhost+2.pem');
    const keyPath = path.resolve(__dirname, 'localhost+2-key.pem');
    const httpsConfig = fs.existsSync(certPath) && fs.existsSync(keyPath)
      ? { cert: fs.readFileSync(certPath), key: fs.readFileSync(keyPath) }
      : undefined;

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // HTTPS 暫時停用，改用 HTTP 測試
        // ...(httpsConfig ? { https: httpsConfig } : {}),
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
