import React, { useState } from 'react';
import { Box, Typography, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useLocation , Link} from 'react-router-dom';
import { useStylists } from './Context/stylistContect';




function StylistsList() {
    const location = useLocation();
    const { state: shop } = location;
    const { stylists, toggleAvailability } = useStylists(); // Get stylists and toggleAvailability function from context
  
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Stylists at {shop.name}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Stylist Name</TableCell>
                <TableCell>Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stylists.map((stylist) => (
                <TableRow key={stylist.id}>
                  <TableCell>{stylist.name}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={stylist.available}
                      onChange={() => toggleAvailability(stylist.id)} // Update availability in context
                    />
                    {stylist.available ? 'Available' : 'Not Available'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" component={Link} to="/admin/total-shops">Back to Shops</Button>
      </Box>
    );
  }
  
  export default StylistsList;