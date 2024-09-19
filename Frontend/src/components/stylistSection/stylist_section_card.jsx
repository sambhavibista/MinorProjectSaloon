import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavBar from '../../layout/nav_bar';

function CommonCard({ name, service }) {
  return (
    <div style={{ marginBottom: '1rem', display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card>
        {/* <CardActionArea> */}
          {/* Image Section */}
          {/* <div style={{ position: 'relative' }}> */}
          {/* <CardMedia
            component="img"
            image={imageUrl}
            alt={`${name} image`}
            sx={{
              height: { xs: "220px", sm: "210px", md: "230px", lg: '280px' },
              width: { xs: "270px", sm: "270px", md: "320px", lg: '380px' },
              objectFit: 'cover'
            }}
          /> */}
          {/* </div> */}
          {/* Card Content */}
          <CardContent>
            
            <Box sx={{ height: "auto", margin: '0px 1px' }}>
              {/* Stylist Name */}
              <Typography sx={{ color: '#ff5757', fontWeight: 'bold' }} variant="h6" component="div">
                {name}
              </Typography>
              {/* Service Provided */}
              <Typography sx={{ color: '#555', marginTop: '8px' }} variant="body2" color="textSecondary">
                {service}
              </Typography>
            </Box>
          </CardContent>
        {/* </CardActionArea> */}
      </Card>
    </div>
  );
}

export default CommonCard;
