import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useShops } from './Context/shopContext';


function TotalShops() {
  const { shops, deleteShop } = useShops();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Search functionality
  const filteredShops = shops.filter(shop => 
    (shop.name && shop.name.toLowerCase().includes(search.toLowerCase())) || 
    (shop.location && shop.location.toLowerCase().includes(search.toLowerCase()))
  );

  const handleEdit = (shop) => {
    navigate(`/edit-shop/${shop.id}`, { state: shop }); // Passing the shop object to the AddShop component
  };

  const handleViewStylists = (shop) => {
    navigate(`/shop/${shop.id}/stylists`, { state: shop });
  };
  

  const handleDelete = (id) => {
    deleteShop(id); 
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Total Shops Added
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Search Shops"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button variant="contained" component={Link} to="/add-shop">Add New Shop</Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredShops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell>
                    <img 
                      src={shop.image} 
                      alt={shop.name} 
                      style={{ width: '100px', height: 'auto' }} 
                    />
                  </TableCell>
                  <TableCell>{shop.name}</TableCell>
                  <TableCell>{shop.location}</TableCell>
                  <TableCell>{shop.contact}</TableCell>
                  <TableCell>{shop.status}</TableCell>
                  <TableCell>
                  <Button variant="contained" onClick={() => handleViewStylists(shop)}>View Stylists</Button>
                    <Button onClick={() => handleEdit(shop)}>Edit</Button>
                    <Button color="error" onClick={() => handleDelete(shop.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default TotalShops;
