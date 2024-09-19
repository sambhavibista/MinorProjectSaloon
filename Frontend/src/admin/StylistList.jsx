import React, { useState } from 'react';
import { Box, Typography, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, IconButton } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon
import { useStylists } from './Context/stylistContect';

function StylistsList() {
  const location = useLocation();
  const { state: shop } = location;
  const { stylists, toggleAvailability, addStylist, removeStylist } = useStylists(); // Include removeStylist from context
  
  const [newStylist, setNewStylist] = useState({ name: '', service: '', available: true});
  const [imagePreview, setImagePreview] = useState(null); // For previewing the image

  // Handle new stylist input change
  const handleInputChange = (e) => {
    setNewStylist({
      ...newStylist,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload using FileReader like in AddShop
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setNewStylist({
  //         ...newStylist,
  //         imageUrl: reader.result, // Store the base64 image
  //       });
  //       setImagePreview(reader.result); // Preview the image
  //     };
  //     reader.readAsDataURL(file); // Convert the file to base64
  //   }
  // };

  // Handle adding new stylist
  const handleAddStylist = () => {
    if (newStylist.name && newStylist.service) {
      const stylistWithId = { ...newStylist, id: stylists.length + 1 };
      addStylist(stylistWithId);
      setNewStylist({ name: '', service: '', available: true }); // Clear input fields
      // setImagePreview(null); // Clear image preview
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Stylists at {shop.name}
      </Typography>

      {/* Table displaying current stylists */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Stylist Name</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Actions</TableCell> {/* Add a column for actions */}
            </TableRow>
          </TableHead>
          <TableBody>
            {stylists.map((stylist) => (
              <TableRow key={stylist.id}>
                <TableCell>{stylist.name}</TableCell>
                <TableCell>{stylist.service}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={stylist.available}
                    onChange={() => toggleAvailability(stylist.id)}
                  />
                  {stylist.available ? 'Available' : 'Not Available'}
                </TableCell>
                {/* <TableCell>
                  {stylist.imageUrl ? (
                    <img
                      src={stylist.imageUrl}
                      alt={stylist.name}
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                  ) : (
                    'No Image'
                  )}
                </TableCell> */}
                <TableCell>
                  {/* Add a Delete button */}
                  <IconButton aria-label="delete" onClick={() => removeStylist(stylist.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Form to add new stylist */}
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
        {/* <Button component="label">
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button> */}

        {/* Preview the uploaded image
        {imagePreview && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Image Preview:</Typography>
            <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          </Box> */}
        {/* )} */}

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
