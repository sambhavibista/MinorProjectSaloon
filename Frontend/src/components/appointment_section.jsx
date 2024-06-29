import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import "../theme";

function AppointmentSection({ appointmentRef, selectedShop }) {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [service, setService] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleDateChange = (newValue) => {
    setAppointmentDate(newValue);
  };

  const handleServiceChange = (event) => {
    setService(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box ref={appointmentRef} sx={{ padding: '50px', backgroundColor: '#f0e5e5', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: '600', marginBottom: '20px', color: "#ff5757" }}>Book an Appointment</Typography>
      {selectedShop && (
        <Typography variant="h6" sx={{ marginBottom: '20px' }}>
          Booking at: {selectedShop.name}
        </Typography>
      )}
      <Box component="form" sx={{ backgroundColor:'#f0e5e5', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', margin: '0 auto' }} onSubmit={handleSubmit}>
        <TextField label="Full Name" variant="outlined" fullWidth required />
        <TextField label="Email Address" variant="outlined" fullWidth required />
        <TextField label="Phone Number" variant="outlined" fullWidth required />
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
            label="mm/dd/yyyy"
            value={appointmentDate}
            onChange={handleDateChange}
            minDate={new Date()} //set minimum  date to today
            renderInput={(params) => <TextField {...params} fullWidth required />}
          />
        </LocalizationProvider>
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
        />
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
