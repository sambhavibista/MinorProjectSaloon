import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import './navbar.css';
import Divider from '@mui/material/Divider';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
// ICONS IMPORT
import MenuIcon from '@mui/icons-material/Menu';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CancelIcon from '@mui/icons-material/Cancel';

// Ensure correct image import path
import logo from "../assets/images/SELOGO 1.png";

const navItems = [
  { label: 'Home', path: '/home' },
  { label: 'About' , path:'/home'},
  { label: 'Services', path: '/shop' }, // Update path for Services
  { label: 'Appointment', path: '/shop' }, // Update path for Appointment
  { label: 'Shops'},
  { label: 'ContactUs' },
];

function NavBar({ refs }) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();

  function toggleMobileDrawer() {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
  }

  function handleNavItemClick(item) {
    const sectionRef = refs[item];
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleLogout() {
    // Clear user session or token
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('userSession');
    // Redirect to login page
    navigate('/');
  }

  const renderLogo = (
    <img src={logo} alt="Style Easy" style={{ width: '100%', height: '100%' }} />
  );

  const renderItems = (
    <Box className:logout sx={{ display: 'flex', gap: '20px', background:'', margin:'3px',padding:'6px'}}>
      {navItems.map((item, index) => (
        <Typography
          key={index}
          variant="h6"
          color="textPrimary"
          component={Link}
          to={item.path}
          onClick={() => handleNavItemClick(item.label)}
          style={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }}
        >
          {item.label}
        </Typography>
      ))}
       {/* Add Logout Button
       <Typography
        variant="contained"
        onClick={handleLogout}
        sx={{ backgroundColor: 'black', color: 'white',borderRadius:"7px",'&:hover': { backgroundColor: '#333' } }}
      >
         Logout
      </Typography> */}

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
            backgroundColor: '#fd5c63',
          }}
        >
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>{renderLogo}</Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="medium"
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
             {/* Add Logout Button */}
       <Typography className='logout'
        variant="contained"
        onClick={handleLogout}
      >
         Logout
      </Typography> 
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
