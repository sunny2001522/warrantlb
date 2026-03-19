import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { AdminPage } from './components/AdminPage';
import { ChatPage } from './pages/ChatPage';
import { AuthProvider } from './auth/AuthContext';
import LoginCallback from './auth/callbacks/LoginCallback';
import LogoutCallback from './auth/callbacks/LogoutCallback';
import SilentRefresh from './auth/callbacks/SilentRefresh';
import { initGA, initMetaPixel } from './analytics';

// 初始化 Google Analytics 4
initGA();

// 初始化 Meta Pixel
initMetaPixel();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin-w7k3m9" element={<AdminPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/login" element={<LoginCallback />} />
          <Route path="/logout" element={<LogoutCallback />} />
          <Route path="/refresh" element={<SilentRefresh />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
