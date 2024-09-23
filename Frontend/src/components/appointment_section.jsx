import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert, Popover, Grid } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

function AppointmentSection({ selectedShop, stylistList = [] }) {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState('');
  const [service, setService] = useState('');
  const [stylistId, setStylistId] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State to control Popover visibility

  const handleDateChange = (newValue) => {
    setAppointmentDate(newValue);
  };

  const handleServiceChange = (event) => {
    const selectedService = event.target.value;
    setService(selectedService);

    const availableStylist = stylistList.find(stylist => stylist.service === selectedService && stylist.available);
    if (availableStylist) {
      setStylistId(availableStylist.id);
    } else {
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

  const handlePhoneInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, ''); // Allow only numbers
  };

  // Function to generate 30-minute interval time slots between 10:00 AM and 5:00 PM
  const generateTimeSlots = () => {
    const slots = [];
    let start = new Date();
    start.setHours(10, 0, 0); // Start at 10:00 AM

    const end = new Date();
    end.setHours(17, 0, 0); // End at 5:00 PM

    while (start <= end) {
      let hours = start.getHours();
      let minutes = start.getMinutes();
      let timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      slots.push(timeString);
      start.setMinutes(start.getMinutes() + 30); // Increment by 30 minutes
    }

    return slots;
  };

  // Handle time slot selection
  const handleTimeSlotClick = (timeSlot) => {
    setAppointmentTime(timeSlot);
    setAnchorEl(null); // Close the Popover
  };

  // Open Popover
  const handleOpenTimePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close Popover
  const handleCloseTimePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
        <TextField
          name="phoneNumber"
          label="Phone Number"
          variant="outlined"
          fullWidth
          required
          inputProps={{ maxLength: 10 }} // Restrict to 10 characters
          onInput={handlePhoneInput} // Allow only numbers
        />
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
        </LocalizationProvider>

        {/* Time Selection */}
        <TextField
          label="Time"
          value={appointmentTime}
          onClick={handleOpenTimePopover}
          fullWidth
          required
          InputProps={{
            readOnly: true,
          }}
        />

        {/* Popover for Time Slots */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseTimePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', gap: 2, maxWidth: 400, flexWrap: 'wrap' }}>
            {generateTimeSlots().map(timeSlot => (
              <Button
                key={timeSlot}
                onClick={() => handleTimeSlotClick(timeSlot)}
                variant={appointmentTime === timeSlot ? 'contained' : 'outlined'}
                color="primary"
                size="small"
              >
                {timeSlot}
              </Button>
            ))}
          </Box>
        </Popover>

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
