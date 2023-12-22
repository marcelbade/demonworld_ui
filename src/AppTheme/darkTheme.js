import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { 500: "#0ceda6" },
    color: "#0ceda6",
  },
  components: {
    MuiTreeItem: {
      styleOverrides: {
        root: {
          "& > .MuiTreeItem-content .MuiTreeItem-label": {
            fontFamily: "NotMaryKate",
          },
        },
      },
    },
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
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          color: "white",
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

export default darkTheme;
