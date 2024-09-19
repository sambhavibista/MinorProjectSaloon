import React from "react";
import "../global.css";
import { Box, Typography } from "@mui/material";
import ShopService from './shopSection/shop_section_card_services';
import { useNavigate } from 'react-router-dom';
import NavBar from "../layout/nav_bar";

function ShopSection({ shopRef }) {


  const navigate = useNavigate();

  const handleCardClick = (item) => {
    navigate('/shop', { state: { selectedShop: item } });
  };

  return (
    <>
    
    <Box ref={shopRef} sx={{ marginTop: "20px", paddingBottom: "40px" }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: '1rem', marginTop: '30px' }}>
        <Typography
          className="responsive_fontsize32"
          sx={{
            fontWeight: "bold",
            padding: "10px",
            textAlign: "center",
            letterSpacing: "1px",
            color: '#ff5757',
          }}
        >
          <h2>Shops</h2>
        </Typography>
      </Box>
      <Box sx={{ display: "flex", width: "100%", flexDirection: "row" }}>
        <ShopService onCardClick={handleCardClick} />
      </Box>
    </Box>
    </>
  );

}

export default ShopSection;
