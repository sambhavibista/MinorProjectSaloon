import React from "react";
import "../global.css";
import { Box, Typography } from "@mui/material";
import ShopService from './shopSection/shop_section_card_services';

function ShopSection({ shopRef, onCardClick }) {
  console.log("onCardClick in ShopSection: ", onCardClick); 

  const handleCardClick = (item) => {
    console.log("Clicked on card with item:", item);
    onCardClick(item); // Trigger the prop function
  };

  return (
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
  );
}

export default ShopSection;
