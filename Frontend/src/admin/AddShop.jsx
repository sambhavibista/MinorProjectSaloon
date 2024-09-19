import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography,Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useShops } from './Context/shopContext';
import { useLocation, useNavigate } from 'react-router-dom';

function AddShop() {
  const { addShop, updateShop } = useShops();
  const [shopDetails, setShopDetails] = useState({ name: '', location: '', contact: '', status: '', image: '' });
  const [image, setImage] = useState(null); // New state for image
  const navigate = useNavigate();
  const location = useLocation();
  const shopToEdit = location.state; // Get shop data from location state

  useEffect(() => {
    if (shopToEdit) {
      setShopDetails(shopToEdit); // Pre-fill form when editing
    }
  }, [shopToEdit]);

  const handleChange = (e) => {
    setShopDetails({
      ...shopDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // Convert image to base64 and store it
    };
    
    if (file) {
      reader.readAsDataURL(file); // Read file as base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newShop = {
      ...shopDetails,
      image: image || shopDetails.image, // Use new image or keep old one
    };
    
    if (shopToEdit) {
      updateShop(newShop); // If editing, update the shop
    } else {
      addShop(newShop); // If adding a new shop
    }
    
    navigate('/admin/total-shops'); // Navigate back to the shop list
  };

  return (
    <Box>
      <Typography variant="h4">{shopToEdit ? 'Edit Shop' : 'Add New Shop'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          value={shopDetails.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          name="location"
          variant="outlined"
          value={shopDetails.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contact"
          name="contact"
          variant="outlined"
          value={shopDetails.contact}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
    <Box sx={{display: 'flex', flexDirection: 'column'}}>

       
    <FormControl halfWidth margin="normal">

  <InputLabel id="status-label">Status</InputLabel>
  <Select
    labelId="status-label"
    name="status"
    value={shopDetails.status} // Bound to the "status" in shopDetails
    onChange={handleChange} // The same handleChange method
    label="Status" // Important to keep consistent labeling with InputLabel
  >
    <MenuItem value="Open">Open</MenuItem>
    <MenuItem value="Closed">Closed</MenuItem>
    <MenuItem value="Temporarily Closed">Temporarily Closed</MenuItem>
    <MenuItem value="Permanently Closed">Permanently Closed</MenuItem>

  </Select>
</FormControl>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ margin: '20px' }}
        />
        </Box>
        <Button variant="contained" type="submit">
          {shopToEdit ? 'Update Shop' : 'Add Shop'}
        </Button>
        
      </form>

    </Box>
  );
}

export default AddShop;
