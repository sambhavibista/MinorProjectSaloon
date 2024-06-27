import { Box, Typography } from '@mui/material'
import React from 'react'

function FooterComponents() {
  return (
    <Box
        sx={{
            display: "flex",
            backgroundColor: "white",
            justifyContent: "space-around",
            height: "100px",
            alignItems: "center"
        }}
    >
        <Typography
            className='responsive_fontsize18'
        >Terms and Conditions</Typography>
        <Typography
             className='responsive_fontsize18'
        >Copyright @ {new Date().getFullYear}</Typography>
        <Typography
             className='responsive_fontsize18'
        >Developed by @BM</Typography>
    </Box>
  )
}

export default FooterComponents