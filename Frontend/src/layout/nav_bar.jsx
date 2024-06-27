import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
// ICONS IMPORT
import MenuIcon from '@mui/icons-material/Menu';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CancelIcon from '@mui/icons-material/Cancel';

// Ensure correct image import path
import logo from "../assets/images/SELOGO 1.png"
// const images = require("../assets/images/SELCOGO 1.png").default;


const navItems = [
  'Home',
  'About',
  'Services',
  'Appointment',
  'Shops',
  'Contact Us',
];

function NavBar() {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  function toggleMobileDrawer() {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
  }

  const renderLogo = (
    <img src={logo} alt="Style Easy" style={{ width: '100%', height: '100%' }} />
  );

  const renderItems = (
    <Box sx={{ display: 'flex', gap: '30px' }}>
      {navItems.map((item, index) => (
        <Typography key={index} variant="h6" color="textPrimary">
          {item}
        </Typography>
      ))}
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Toolbar disableGutters className="apply_maxwidth" sx={{ width: '100%', py: 0 }}>
        {/* MOBILE VIEW */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>{renderLogo}</Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleMobileDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
        {/* END MOBILE VIEW */}

        {/* DESKTOP VIEW */}
        <Box
          sx={{
            justifyContent: 'space-between',
            backgroundColor: 'white',
            width: '100%',
            alignItems: 'center',
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Box>{renderLogo}</Box>
          <Box
            sx={{
              display: 'flex',
              gap: '30px',
            }}
          >
            {renderItems}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Divider
              orientation="vertical"
              variant="fullWidth"
              flexItem
              sx={{ borderLeftWidth: 0.5, backgroundColor: 'black' }}
            />
            <Box sx={{ mx: '0.2rem', alignItems: 'center', color: "black" }}>
              <FacebookIcon />
              <PinterestIcon />
              <LinkedInIcon />
              <InstagramIcon />
              <YouTubeIcon />
            </Box>
            <Divider
              orientation="vertical"
              variant="fullWidth"
              flexItem
              sx={{ borderLeftWidth: 0.5, backgroundColor: 'black' }}
            />
          </Box>
        </Box>
        {/* END DESKTOP VIEW */}
      </Toolbar>
      <Drawer
        anchor="top"
        open={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        variant="temporary"
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem' }}>
          <IconButton onClick={() => setIsMobileDrawerOpen(false)}>
            <CancelIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            textAlign: 'center',
            letterSpacing: '.2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1.5rem',
            paddingY: 2,
          }}
        >
          {renderItems}
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default NavBar;
