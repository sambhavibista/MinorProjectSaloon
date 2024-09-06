import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

function AppointmentSection({ selectedShop, stylistList }) {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState(null);
  const [service, setService] = useState('');
  const [stylistId, setStylistId] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleDateChange = (newValue) => {
    setAppointmentDate(newValue);
  };

  const handleTimeChange = (newValue) => {
    setAppointmentTime(newValue);
  };

  const handleServiceChange = (event) => {
    const selectedService = event.target.value;
    setService(selectedService);

    // Find the first available stylist that specializes in the selected service
    const availableStylist = stylistList.find(stylist => stylist.service === selectedService && stylist.available);

    // If an available stylist is found, set the stylistId
    if (availableStylist) {
      setStylistId(availableStylist.id);
    } else {
      // Alert or handle the case where no stylist is available for the selected service
      alert(`No stylist available for ${selectedService} service at the moment.`);
      setStylistId('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedStylist = stylistList.find(stylist => stylist.id === stylistId);
    if (!selectedStylist || !selectedStylist.available) {
      alert('Please select an available stylist.');
      return;
    }

    const formData = {
      name: event.target.elements.fullName.value,
      email: event.target.elements.emailAddress.value,
      phone: event.target.elements.phoneNumber.value,
      service,
      stylist: stylistId,
      date: appointmentDate,
      time: appointmentTime,
      shop: selectedShop ? selectedShop.name : '',
      message: event.target.elements.message.value
    };

    axios.post('http://localhost:8081/api', formData)
      .then(response => {
        console.log('Appointment booked successfully:', response.data);
        setOpenSnackbar(true);

        if (onAppointmentBooked) {
          onAppointmentBooked(response.data);  // Pass the new appointment data
        }
  })
      .catch(error => {
        console.error('Error booking appointment:', error);
        if (error.response && error.response.status === 409) {
          alert("Appointment already exists!");
        } else {
          alert('An error occurred. Please try again later.');
        }
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: '50px', backgroundColor: '#f0e5e5', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: '600', marginBottom: '20px', color: "#ff5757" }}>Book an Appointment</Typography>
      {selectedShop && (
        <Typography variant="h6" sx={{ marginBottom: '20px' }}>
          Booking at: {selectedShop.name}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={{ backgroundColor: '#f0e5e5', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <TextField name="fullName" label="Full Name" variant="outlined" fullWidth required />
        <TextField name="emailAddress" label="Email Address" variant="outlined" fullWidth required />
        <TextField name="phoneNumber" label="Phone Number" variant="outlined" fullWidth required />
        <FormControl fullWidth required>
          <InputLabel>Choose Service</InputLabel>
          <Select value={service} onChange={handleServiceChange} label="Choose Service">
            <MenuItem value="Hair Coloring">Hair Coloring</MenuItem>
            <MenuItem value="Hair Smoothing">Hair Smoothing</MenuItem>
            <MenuItem value="Hair Cutting">Hair Cutting</MenuItem>
            <MenuItem value="Hair Styling">Hair Styling</MenuItem>
            <MenuItem value="Herbal Massage">Herbal Massage</MenuItem>
            <MenuItem value="Facials">Facials</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel>Choose Stylist</InputLabel>
          <Select
            value={stylistId}
            onChange={(e) => setStylistId(e.target.value)}
            label="Choose Stylist"
          >
            {stylistList.map(stylist => (
              <MenuItem key={stylist.id} value={stylist.id} disabled={!stylist.available || stylist.service !== service}>
                {stylist.name} - {stylist.available ? 'Available' : 'Not Available'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={appointmentDate}
            onChange={handleDateChange}
            minDate={new Date()}
            renderInput={(params) => <TextField {...params} fullWidth required />}
          />
          <TimePicker
            label="Time"
            value={appointmentTime}
            onChange={handleTimeChange}
            renderInput={(params) => <TextField {...params} fullWidth required />}
          />
        </LocalizationProvider>
        <TextField name="message" label="Message" variant="outlined" multiline rows={4} fullWidth />
        <Button type="submit" variant="contained" sx={{ backgroundColor: '#ff5757', height: "60px", '&:hover': { backgroundColor: "white", color: "#ff5757", opacity: "1" } }} size="large">
          Book Appointment
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Congratulations! Your appointment has been booked successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AppointmentSection;
