import React from 'react';
import { styled } from '@mui/system';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
}));

const services = [
  { name: 'Hair Coloring', description: 'Add color and vibrance to your hair.' },
  { name: 'Hair Smoothing', description: 'Smooth and sleek hair treatments.' },
  { name: 'Hair Cutting', description: 'Trendy and classic haircuts.' },
  { name: 'Hair Styling', description: 'Stylish hairdos for any occasion.' },
  { name: 'Herbal Massage', description: 'Relaxing herbal massages.' },
  { name: 'Facials', description: 'Rejuvenating facial treatments.' },
];

const ServicesSection = ({ selectedShop }) => {
  return (
    <Root>
      {selectedShop && (
        <Typography variant="h5" component="h2" gutterBottom sx={{
          fontWeight: "bold",
          padding: "10px",
          textAlign: "center",
          letterSpacing: "1px",
          color: '#ff5757',
        }}>
          Services Available at : {selectedShop.name}
        </Typography>
      )}
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ServiceCard>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {service.name}
                </Typography>
                <Typography variant="body2" component="p">
                  {service.description}
                </Typography>
              </CardContent>
            </ServiceCard>
          </Grid>
        ))}
      </Grid>
    </Root>
  );
};

export default ServicesSection;
