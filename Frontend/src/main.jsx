import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BookingsProvider } from './admin/BookingContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<BookingsProvider >
    <App />
    </BookingsProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
