import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18+

import App from '@/components/App'; // Using path alias from tsconfig and webpack
import '@/styles/global.css'; // Import global styles
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  if (process.env.NODE_ENV !== 'production') {
    console.error('Failed to find the root element with id "root"');
  } else {
    document.body.innerHTML =
      '<div class="error-message">Application failed to load. Please refresh the page.</div>';
  }
}
