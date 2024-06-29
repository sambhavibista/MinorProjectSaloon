import React, { useState, useRef } from 'react';
import ShopSection from './shop_section';
import AppointmentSection from './appointment_section';
import { Modal, Box, Backdrop } from '@mui/material';

function SalonBookingApp({ shopRef }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const appointmentRef = useRef(null);
  const shopsRef = useRef(null);

  const handleCardClick = (shop) => {
    setSelectedShop(shop);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedShop(null);
    setOpenModal(false);
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <Box ref={shopRef}>
      <ShopSection shopsRef={shopsRef} onCardClick={handleCardClick} />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, // Dimming effect
          onClick: handleBackdropClick, // Close modal on backdrop click
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            zIndex: 1500, // Higher z-index to appear in front
            maxWidth: '80vw',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <AppointmentSection appointmentRef={appointmentRef} selectedShop={selectedShop} />
        </Box>
      </Modal>
    </Box>
  );
}

export default SalonBookingApp;
