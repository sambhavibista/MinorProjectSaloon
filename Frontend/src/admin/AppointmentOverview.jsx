import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import Sidebar from './Sidebar';

function AppointmentOverview() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments when the component is mounted
    axios.get('http://localhost:8081/api/appointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  }, []);

  return (
    <Box sx={{display:"flex"}}>
      <Sidebar />
    <Box sx={{ padding: '50px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Appointment Overview</Typography>
      {appointments.length === 0 ? (
        <Typography variant="h6" sx={{ marginBottom: '20px' }}>
          No appointments have been booked yet.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Client Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Stylist</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Shop</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.email}</TableCell>
                  <TableCell>{appointment.phone}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>{appointment.stylist}</TableCell>
                  <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.shop}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
    </Box>
  );
}

export default AppointmentOverview;
