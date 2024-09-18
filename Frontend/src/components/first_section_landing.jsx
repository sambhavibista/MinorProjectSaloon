import React from 'react'
import { Box, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './first_section.css';

function FirstSectionLanding() {
  const text = "FIND YOUR COMPLETE HAIR SOLUTION".split("")
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const backgroundPositionY = `${-scrollY / 6.5 }px`;
  return (
    <Box>
    <Box className="HeroSection" style={{backgroundPositionY}}>
      
    <Box className="header-content">
      <Box className="text-container" sx={{textAlign:"left", maxWidth:"600px"}}>
        <Typography
          variant="h3"
          className='responsive_fontsize64' 
          sx={{
            
            fontFamily: "Roboto Slab",
            fontWeight: 'bold',
            color: "#ff575",
            textAlign:"left",
            marginTop:'0px'
          }}
        >
          {
            text.map((el, i) => (
              <motion.span
              initial={{ opacity: 0, color: "#ffffff" }} // Initial color set to white
              animate={{ opacity: 2, color: "#D24C52" }} // Animate color change
              transition={{
                duration: 0.3,
                delay: i/10,
              }}
              key={i}
              >{el}{""}</motion.span>
            ))
          }
        </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff5757",
            
            opacity: "0.8",
            color: "white",
            "&:hover": {
              backgroundColor: "white",
              color:"#ff5757",
              opacity: "1",
            },
          }}
        >
          Book Appointment
          </Button>
          
      </Box>
    </Box>



</Box>
  )
}

export default FirstSectionLanding