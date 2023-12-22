import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: { 500: "#467fcf" },
  },
  components: {
    MuiTreeItem: {
      styleOverrides: {
        root: {
          "& > .MuiTreeItem-content .MuiTreeItem-label": {
            fontFamily: "NotMaryKate",
          },
          "& > .MuiTreeItem-label .MuiTypography-body1": {
            fontFamily: "NotMaryKate",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        button: {
          fontFamily: "jaapokkiRegular"
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
          color: "black",
          width: "15em",
          padding: "2em",
          height: "5em",
          fontFamily: "NotMaryKate",
        },
      },
      ":hover": {
        backgroundColor: "lightGrey",
      },
    },
    MuiListItemText:{
      primary: {
        fontFamily: "jaapokkiRegular",
      },
      secondary:{
        fontFamily: "jaapokkiRegular",
      }
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

export default lightTheme ;

