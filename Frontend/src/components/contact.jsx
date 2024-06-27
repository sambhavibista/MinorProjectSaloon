import React from 'react'
import { Box, List, ListItem, Typography } from '@mui/material';
import './contact_style.css';
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import Divider from '@mui/material/Divider';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function Contact() {
  return (
    <>
      <Box sx={{
        display: { xs: 'flex', md: 'flex' },
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-evenly',
        color: '#ff5757',
        marginTop: '30px',
        textAlign: 'center'
      }}>
        <Box sx={{ paddingLeft: '50px', marginTop: '20px' }}>
          <Typography className='itemTitle'>
            <Typography className='responsive_fontsize26' variant="h3" sx={{ fontWeight: '600' }}>
              Quick Links
            </Typography>
          </Typography>
          <ul className='responsive_fontsize18'>
            <a href="#"><ListItem>Home</ListItem></a>
            <a href="#"><ListItem>About</ListItem></a>
            <a href="#"><ListItem>Services</ListItem></a>
            <a href="#"><ListItem>Appointment</ListItem></a>
            <a href="#"><ListItem>Shops</ListItem></a>
            <a href="#"><ListItem>Contact Us</ListItem></a>
          </ul>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton sx={{ backgroundColor: "white", boxShadow: " 0px 4px 4px 0px #292C6A", margin: 1 }}>
              <FacebookIcon sx={{ color: "blue" }} />
            </IconButton>
            <IconButton sx={{ backgroundColor: "white", boxShadow: " 0px 4px 4px 0px #292C6A", margin: 1 }}>
              <YouTubeIcon sx={{ color: "red" }} />
            </IconButton>
            <IconButton sx={{ backgroundColor: "white", boxShadow: " 0px 4px 4px 0px #292C6A", margin: 1 }}>
              <PinterestIcon sx={{ color: "#E60023" }} />
            </IconButton>
            <IconButton sx={{ backgroundColor: "white", boxShadow: " 0px 4px 4px 0px #292C6A", margin: 1 }}>
              <InstagramIcon sx={{ color: "#405DE6" }} />
            </IconButton>
            <IconButton sx={{ backgroundColor: "white", boxShadow: " 0px 4px 4px 0px  #292C6A", margin: 1 }}>
              <LinkedInIcon sx={{ color: " #0077b5" }} />
            </IconButton>
          </Box>
        </Box>
        <Divider orientation="horizontal" flexItem sx={{ margin: '20px', display: { xs: 'flex', md: 'none' } }} />
        <Divider orientation="vertical" variant="middle" flexItem sx={{ margin: '20px 20px 200px 20px', backgroundColor: 'black', display: { xs: 'none', md: 'flex' } }} />
        <Box sx={{ paddingLeft: '50px', marginTop: '20px' }}>
          <Typography className='itemTitle'>
            <Typography variant="h3" sx={{ fontWeight: '600' }} className='responsive_fontsize26'>
              Properties
            </Typography>
          </Typography>
          <List className='responsive_fontsize18'>
            <a href="#"><ListItem>Shops Selection</ListItem></a>
            <a href="#"><ListItem>Stylist Selection</ListItem></a>
            <a href="#"><ListItem>Appointment Booking</ListItem></a>
          </List>
        </Box>
        <Divider orientation="horizontal" flexItem sx={{ margin: '20px', display: { xs: 'flex', md: 'none' } }} />
        <Divider orientation="vertical" flexItem sx={{ margin: '15px 0px 200px 0px', backgroundColor: 'black', display: { xs: 'none', md: 'flex' } }} />
        <Box sx={{ padding: '0 50px', overflow: 'hidden', marginTop: '20px' }}>
          <Typography className='itemTitle '>
            <Typography variant="h3" sx={{ fontWeight: '600' }} className='responsive_fontsize26'>
              Contact Info
            </Typography>
          </Typography>
          <List className='responsive_fontsize18'>
            <ListItem>
              <LocationOnIcon />
              Sanepa Lalitpur, Nepal
            </ListItem>
            <ListItem>
              <CallIcon />
              01-1234567
            </ListItem>
            <ListItem><WhatsAppIcon />
              +9779877735741
            </ListItem>
          </List>
          <Box className='map'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28271.991916311705!2d85.29495851139528!3d27.655502971182738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb177f078f1cd9%3A0xb514415c5a76afb3!2sKusunti%2C%20Lalitpur%2044700!5e0!3m2!1sen!2snp!4v1715060575540!5m2!1sen!2snp" width="100%" height="200" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Contact;
