import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios'; // Import Axios

function AppointmentSection({ selectedShop }) {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState(null); // State for appointment time
  const [service, setService] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleDateChange = (newValue) => {
    setAppointmentDate(newValue);
  };

  const handleTimeChange = (newValue) => {
    setAppointmentTime(newValue);
  };

  const handleServiceChange = (event) => {
    setService(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare data object to send to backend
    const formData = {
      name: event.target.elements.fullName.value,
      email: event.target.elements.emailAddress.value,
      phone: event.target.elements.phoneNumber.value,
      service,
      date: appointmentDate,
      time: appointmentTime, // Include time in form data
      shop: selectedShop ? selectedShop.name : '',
      message: event.target.elements.message.value
    };

    // Send data to backend using Axios
    axios.post('http://localhost:8081/api/book-appointment', formData)
      .then(response => {
        console.log('Appointment booked successfully:', response.data);
        setOpenSnackbar(true); // Show success message
      })
      .catch(error => {
        console.error('Error booking appointment:', error);
        // Handle error state or display error message
      });
  };

  const handleCloseSnackbar = () => {
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
      <Box component="form" onSubmit={handleSubmit} sx={{ backgroundColor:'#f0e5e5', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <TextField name="fullName" label="Full Name" variant="outlined" fullWidth required />
        <TextField name="emailAddress" label="Email Address" variant="outlined" fullWidth required />
        <TextField name="phoneNumber" label="Phone Number" variant="outlined" fullWidth required />
        <FormControl fullWidth required>
          <InputLabel>Choose Service</InputLabel>
          <Select
            value={service}
            onChange={handleServiceChange}
            label="Choose Service"
          >
            <MenuItem value="Hair Coloring">Hair Coloring</MenuItem>
            <MenuItem value="Hair Smoothing">Hair Smoothing</MenuItem>
            <MenuItem value="Hair Cutting">Hair Cutting</MenuItem>
            <MenuItem value="Hair Styling">Hair Styling</MenuItem>
            <MenuItem value="Herbal Massage">Herbal Massage</MenuItem>
            <MenuItem value="Facials">Facials</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={appointmentDate}
            onChange={handleDateChange}
            minDate={new Date()} // Set minimum date to today
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
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Center the Snackbar message
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Congratulations! Your appointment has been booked. Please check your mail for your message and present it on the counter.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AppointmentSection;
