import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// import { BookingsProvider } from './admin/BookingContext.jsx';

// Get the root element
const rootElement = document.getElementById('root');

// Create the root
const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    {/* <BookingsProvider> */}
      <App />
    {/* </BookingsProvider> */}
  </React.StrictMode>
);
