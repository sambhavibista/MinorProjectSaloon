import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select } from '@mui/material';
import Sidebar from './Sidebar';

function TotalBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState({ dateRange: '', service: '', stylist: '', status: '' });
  
  useEffect(() => {
    // Fetch bookings data from API or backend
    // setBookings(fetchedData);
  }, [filter]);

  return (
    <Box sx={{display:"flex"}}>
    <Sidebar />
    <Box sx={{ padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>
        Total Bookings
      </Typography>
      
      {/* Filters */}
      <Box sx={{ marginBottom: '1rem' }}>
        <TextField
          label="Date Range"
          type="date"
          value={filter.dateRange}
          onChange={(e) => setFilter({ ...filter, dateRange: e.target.value })}
          InputLabelProps={{ shrink: true }}
        />
        <Select
          label="Service"
          value={filter.service}
          onChange={(e) => setFilter({ ...filter, service: e.target.value })}
        >
          {/* Populate with services */}
          <MenuItem value="">All Services</MenuItem>
          <MenuItem value="Haircut">Haircut</MenuItem>
          <MenuItem value="Coloring">Coloring</MenuItem>
        </Select>
        <Select
          label="Stylist"
          value={filter.stylist}
          onChange={(e) => setFilter({ ...filter, stylist: e.target.value })}
        >
          {/* Populate with stylists */}
          <MenuItem value="">All Stylists</MenuItem>
          <MenuItem value="Stylist1">Stylist1</MenuItem>
          <MenuItem value="Stylist2">Stylist2</MenuItem>
        </Select>
        <Select
          label="Status"
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <MenuItem value="">All Statuses</MenuItem>
          <MenuItem value="Confirmed">Confirmed</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Canceled">Canceled</MenuItem>
        </Select>
      </Box>

      {/* Booking List */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Stylist</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.clientName}</TableCell>
                <TableCell>{booking.service}</TableCell>
                <TableCell>{booking.dateTime}</TableCell>
                <TableCell>{booking.stylist}</TableCell>
                <TableCell>{booking.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Box>
  );
}

export default TotalBookings;
