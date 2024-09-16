import React, { useState, useEffect } from 'react';
import { Box, Typography, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, IconButton } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon
import { useStylists } from './Context/stylistContect';

function StylistsList() {
  const location = useLocation();
  const { state: shop } = location;
  const { shops, addStylistToShop, toggleAvailability, removeStylistFromShop } = useStylists();

  const [newStylist, setNewStylist] = useState({ name: '', service: '', available: true, imageUrl: '' });
  const [imagePreview, setImagePreview] = useState(null);
  const currentShop = shops.find(s => s.id === shop.id);

  // Cleanup object URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleInputChange = (e) => {
    setNewStylist({ ...newStylist, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setNewStylist({ ...newStylist, imageUrl });
    }
  };

  const handleAddStylist = () => {
    if (newStylist.name && newStylist.service) {
      const stylistWithId = { ...newStylist, id: Date.now() }; // Generate unique ID
      addStylistToShop(shop.id, stylistWithId);
      setNewStylist({ name: '', service: '', available: true, imageUrl: '' });
      setImagePreview(null);
      console.log("Added stylist", stylistWithId);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Stylists at {currentShop?.name}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Stylist Name</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentShop?.stylists?.map((stylist) => (
              <TableRow key={stylist.id}>
                <TableCell>{stylist.name}</TableCell>
                <TableCell>{stylist.service}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={stylist.available}
                    onChange={() => {
                      toggleAvailability(shop.id, stylist.id)
                    }}
                  />
                  {stylist.available ? 'Available' : 'Not Available'}
                </TableCell>
                <TableCell>
                  {stylist.imageUrl ? (
                    <img src={stylist.imageUrl} alt={stylist.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                  ) : 'No Image'}
                </TableCell>
                <TableCell>
                  <IconButton aria-label="delete" onClick={() => removeStylistFromShop(shop.id, stylist.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Add New Stylist</Typography>
        <TextField
          label="Stylist Name"
          name="name"
          value={newStylist.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Service"
          name="service"
          value={newStylist.service}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button component="label">
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>

        {imagePreview && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Image Preview:</Typography>
            <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          </Box>
        )}

        <Button variant="contained" onClick={handleAddStylist} sx={{ mt: 3 }}>
          Add Stylist
        </Button>
      </Box>

      <Button variant="contained" component={Link} to="/admin/total-shops" sx={{ mt: 3 }}>
        Back to Shops
      </Button>
    </Box>
  );
}

export default StylistsList;
