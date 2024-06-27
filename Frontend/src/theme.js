import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5757", // BLUE COLOR
    },
    secondary: {
      main: "#e26f6f", // YELLOW COLOR
      
    },
    accent: {
      white: "#FFFFFF", // white COLOR
      black: "#000000", // black color
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 950,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "Roboto Slab",
    fontWeightRegular:"400",
    fontWeightMedium:"500",
    fontWeightSemiBold:"600",
    fontWeightBold:"700"
  },
});

export default theme;