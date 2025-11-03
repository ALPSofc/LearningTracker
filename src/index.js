import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { DataProvider } from './contexts/DataContext.jsx';
import { ConfirmationProvider } from './contexts/ConfirmationContext.jsx'; 
import './i18n'; 
import LoadingLogo from './assets/logo.svg';
import CookieConsent from './components/ui/CookieConsent.jsx';
import { Toaster } from 'react-hot-toast';

const loadingFallback = (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
    <img src={LoadingLogo} alt="Carregando..." className="h-20 w-auto animate-pulse" />
    <p className="text-gray-700 dark:text-gray-300 text-lg mt-4">
      Carregando...
    </p>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Suspense fallback={loadingFallback}>
      <ThemeProvider>
        <DataProvider>
          <ConfirmationProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: 'var(--toast-bg, #fff)', 
                  color: 'var(--toast-color, #000)', 
                  border: '1px solid var(--toast-border, #e5e7eb)', 
                },
                success: {
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#FFFFFF',
                  },
                },
              }}
            />
            
            <App />
            <CookieConsent />
          </ConfirmationProvider>
          
        </DataProvider>
      </ThemeProvider>
    </Suspense>
  </React.StrictMode>
);