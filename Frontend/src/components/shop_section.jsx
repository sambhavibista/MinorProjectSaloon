import React from "react";
// import Divider from '@mui/material/Divider';
import "../global.css";


import {
    Box,
    Typography
} from "@mui/material";
import ShopsList from '../components/shopSection/shop_section_card_services';
// import FeaturedList from '../card/cardServices';
// import HorizontalDivider from "../ui/HorizontalDivider";
function ShopSection(){
    return(
        <Box sx={{marginTop:"20px",paddingBottom:"40px"
        }}>
      {/* first box */}

      {/* <Box
        sx={{
          // backgroundColor: "green",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
        }}
      > */}
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center",marginBottom:'1rem', marginTop:'30px',
        }}>
        {/* <HorizontalDivider /> */}
        <Typography className="responsive_fontsize32"
          sx={{
            // color: "secondary.secondary_600",
            fontWeight:"bold",
            padding:"10px",
            textAlign:"center",
            letterSpacing:"1px",
            color:'#ff5757',
           
          }}
        >
          <h2>Shops</h2>
        </Typography>
        {/* <HorizontalDivider /> */}
        {/* </Box> */}
      </Box>
      {/* second Box */}
      <Box sx={{ display: "flex", width: "100%", flexDirection: "row" }}>
        <ShopsList/>
      </Box>
    </Box>
    )
}
export default ShopSection;