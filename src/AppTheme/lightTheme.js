import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: { 500: "#467fcf" },
    disabled: "grey",
  },
  components: {
    MuiTreeItem: {
      styleOverrides: {
        root: {
          "& span": {
            fontFamily: "jaapokkiRegular",
          },
          "& p": {
            fontFamily: "jaapokkiRegular",
          },
        },
        label: {
          fontFamily: "NotMaryKate",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        button: {
          root: {
            fontFamily: "jaapokkiRegular",
          },
        },
        body1: {
          root: {
            fontFamily: "jaapokkiRegular",
          },
        },
        subtitle1: {
          fontFamily: "NotMaryKate",
        },
        h5: {
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
    MuiListItemText: {
      primary: {
        fontFamily: "jaapokkiRegular",
      },
      secondary: {
        fontFamily: "jaapokkiRegular",
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
    MuiAccordionDetails: {
      root: {
        fontFamily: "jaapokkiRegular",
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        groupLabel: {
          fontFamily: "jaapokkiRegular",
        },
        root: {
          fontFamily: "jaapokkiRegular",
        },
      },
    },
  },
});

export default lightTheme;
