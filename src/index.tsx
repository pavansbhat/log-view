import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18+

import App from '@/components/App'; // Using path alias from tsconfig and webpack
import '@/styles/global.css'; // Import global styles

// Import MSW worker
import { worker } from '@/mocks/browser';

async function startApp() {
  // Initialize MSW in development mode
  if (process.env.NODE_ENV === 'development') {
    // Start the MSW worker
    await worker.start({
      onUnhandledRequest: 'bypass', // Silently bypass any unhandled requests
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

// Start the application
startApp();
