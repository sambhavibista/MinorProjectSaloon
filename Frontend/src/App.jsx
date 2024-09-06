
import './App.css';
import React from 'react';
// import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Login from './Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Signup';
import Home from './Home';
// import ShopSection from './components/shop_section';
import AppointmentPage from './components/appointment_page';
// import MyComponent from './admin/MyComponent';
// import { BookingsProvider } from './admin/BookingContext';
import Dashboard from './admin/MyComponent';
import AppointmentOverview from './admin/AppointmentOverview';
import TotalBookings from './admin/TotalBookings';
import TotalShops from './admin/TotalShops';
import AddShop from './admin/AddShop';
import { ShopProvider } from './admin/Context/shopContext';
function App() {
  return (
    <ShopProvider>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <BrowserRouter>
      {/* <BookingsProvider> */}
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/shop' element={<AppointmentPage />}></Route>
      <Route path='/admin' element={<Dashboard/>}></Route>
      <Route path='/admin/appointment-overview' element={<AppointmentOverview/>}></Route>
      <Route path='/admin/total-bookings' element={<TotalBookings/>}></Route>
      <Route path='/admin/total-shops' element={<TotalShops/>}></Route>
      <Route path='/add-shop' element={<AddShop/>}></Route>
      <Route path='/edit-shop/:id' element={<AddShop/>}></Route>
     </Routes>
      {/* </BookingsProvider> */}
     </BrowserRouter>
     </LocalizationProvider>
     </ShopProvider>
    
    
    
  );
}

export default App;
