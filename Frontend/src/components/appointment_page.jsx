import React from 'react';
import { useLocation } from 'react-router-dom';
import AppointmentSection from './appointment_section';
import ServicesSection from './services_section';
import Contact from './contact';
import FooterComponents from '../layout/footer';

function AppointmentPage() {
  const location = useLocation();
  const { selectedShop } = location.state || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ServicesSection selectedShop={selectedShop} />
      <AppointmentSection selectedShop={selectedShop} />
      <Contact />
      <FooterComponents />
    </div>
  );
}

export default AppointmentPage;
