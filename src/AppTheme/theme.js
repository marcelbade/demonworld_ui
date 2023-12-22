import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    //  mode: "dark",
    primary: { 500: "#467fcf" },
  },
  typography: {
    allVariants: {
      fontFamily: "NotMaryKate",
      textTransform: "none",
    },
    button: {
      fontFamily: "jaapokkiRegular",
    },
    body1: {
      fontFamily: "jaapokkiRegular",
    },
    subtitle1: {
      fontFamily: "NotMaryKate",
      color: "green",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        button: {
          fontFamily: "jaapokkiRegular",
        },
        body1: {
          fontFamily: "jaapokkiRegular",
        },
        subtitle1: {
          fontFamily: "NotMaryKate",
          color: "green",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        outlined: {
          color: "black",
          width: "15em",
          padding: "2em",
          height: "5em",
        },
      },
      ":hover": {
        backgroundColor: "lightGrey",
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          fontFamily: "NotMaryKate",
          ":hover": {
            backgroundColor: "lightGrey",
          },
        },
      },
    },
  },
});

export default theme;
