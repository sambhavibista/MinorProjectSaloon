import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import NavBar from '../layout/nav_bar';

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StylistSection = ({ selectedShop, stylistList = [], handleStylistChange, selectedStylist }) => {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 6; // Number of stylists initially displayed
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const handleClick = (stylist) => {
    handleStylistChange(stylist); // Pass selected stylist to parent component
  };

  const handleSeeMore = () => {
    setShowAll(true);
    setDisplayCount(stylistList.length); // Show all stylists
  };

  const handleSeeLess = () => {
    setShowAll(false);
    setDisplayCount(initialDisplayCount); // Show initial number of stylists
  };

  const visibleStylists = showAll ? stylistList : stylistList.slice(0, displayCount);

  return (
    <>
    <NavBar/>
    <Root> 
       
      {selectedShop && (
        <Typography variant="h5" component="h2" gutterBottom sx={{
          fontWeight: "bold",
          padding: "10px",
          textAlign: "center",
          letterSpacing: "1px",
          color: '#ff5757',
        }}>
          
          Stylists Available at {selectedShop.name}
        </Typography>
      )}
      <Grid container spacing={3}>
        {visibleStylists.map((stylist) => (
          <Grid item xs={12} sm={6} md={4} key={stylist.id}>
            <ServiceCard onClick={() => handleClick(stylist)}>
              <CardContent>
                <Box sx={{ position: 'relative' }}>
                  <img src={stylist.image} alt={stylist.name} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                  {selectedStylist && selectedStylist.id === stylist.id && (
                    <Typography
                      variant="body2"
                      component="p"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        backgroundColor: stylist.available ? 'green' : 'red',
                        color: 'white',
                        padding: '8px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      {stylist.available ? 'Available' : 'Not Available'}
                    </Typography>
                  )}
                </Box>
                <Typography variant="h5" component="h2" sx={{ marginTop: '10px' }}>
                  {stylist.name}
                </Typography>
                <Typography variant="body2" component="p" sx={{ marginBottom: '10px' }}>
                  Specializes in: {stylist.service}
                </Typography>
              </CardContent>
            </ServiceCard>
          </Grid>
        ))}
      </Grid>
      {!showAll ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleSeeMore}>
            See More
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleSeeLess}>
            See Less
          </Button>
        </Box>
      )}
    </Root>
   </>
  );
  
};

export default StylistSection;
