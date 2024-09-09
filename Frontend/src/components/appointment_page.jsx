import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStylists } from '../admin/Context/stylistContect'; // Import the custom hook
import AppointmentSection from './appointment_section';
import StylistSection from './stylist_section';
import ServicesSection from './services_section';
import Contact from './contact';
import FooterComponents from '../layout/footer';

const AppointmentPage = () => {
  const location = useLocation();
  const { selectedShop } = location.state || {};
  const { stylists } = useStylists(); // Use stylists from the global context
  const [selectedStylist, setSelectedStylist] = useState(null);

  const handleStylistChange = (stylist) => {
    setSelectedStylist(stylist);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <StylistSection
        selectedShop={selectedShop}
        stylistList={stylists} // Pass the stylists from context
        handleStylistChange={handleStylistChange}
        selectedStylist={selectedStylist}
      />
      <ServicesSection selectedShop={selectedShop} />
      <AppointmentSection
        selectedShop={selectedShop}
        stylistList={stylists} // Pass the stylists from context
        handleStylistChange={handleStylistChange}
      />
      <Contact />
      <FooterComponents />
    </div>
  );
};

export default AppointmentPage;
