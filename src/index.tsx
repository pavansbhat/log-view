import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/components/App';
import '@/styles/global.css';
import { worker } from '@/mocks/browser';

async function startApp() {
  if (process.env.NODE_ENV === 'development') {
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
    console.log('MSW initialized');
  }

  const rootElement = document.getElementById('root');

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  } else {
    return '<div class="error-message">Application failed to load. Please refresh the page.</div>';
  }
}

startApp();
