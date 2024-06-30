
import './App.css';
import React from 'react';
// import { Box } from '@mui/material';
import Login from './Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Signup';
import Home from './Home';
// import ShopSection from './components/shop_section';
import AppointmentPage from './components/appointment_page';

function App() {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/shop' element={<AppointmentPage />}></Route>

     </Routes>
     </BrowserRouter>
    
    
    
  );
}

export default App;
