import { createTheme } from "@mui/material";
import animationTheme from "./animationTheme";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { 500: "#060d13" },
    background: {
      default: "#130606",
    },
    color: "white",
    errorColor: "red",
    disabled: "darkgrey",
    compendiumHeaderBackground: "#565757",
    statCards: {
      backGround: {
        backgroundColor: "#5f6a6a", //
      },
      cardTitle: {
        flexWrap: "nowrap",
        fontWeight: "normal",
        fontSize: "30px",
        color: "red",
        fontFamily: "NotMaryKate",
      },
      blackStripe: {
        padding: "10px",
        color: "white",
        backgroundColor: "black",
      },
    },
    animation: {
      fadeAway: animationTheme.palette.fadeAway,
      fadeIn: animationTheme.palette.fadeIn,
    },
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
    MuiDivider: {
      styleOverrides: {
        root: {
          background: "white",
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
        h5: {
          fontFamily: "NotMaryKate",
        },
        h6: {
          fontFamily: "NotMaryKate",
        },
        h3: {
          fontFamily: "NotMaryKate",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          fontFamily: "NotMaryKate",
          color: "white",
        },

        outlined: {
          color: "white",
          width: "15em",
          padding: "2em",
          height: "5em",
          fontFamily: "NotMaryKate",
        },
        text: {
          color: "white",
          width: "15em",
          padding: "2em",
          height: "5em",
          fontFamily: "NotMaryKate",
          ":hover": {
            backgroundColor: "white",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          fontFamily: "NotMaryKate",
          ":hover": {
            color: "black",
            backgroundColor: "darkgrey",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: "jaapokkiRegular",
          fontSize: "1.2em",
        },
        secondary: {
          fontFamily: "jaapokkiRegular",
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
        input: {
          fontFamily: "NotMaryKate",
          fontSize: "1.5em",
        },
        listbox: {
          fontFamily: "NotMaryKate",
        },
        root: {
          paddingBottom: "1.2em",
        },
        label: {
          fontFamily: "NotMaryKate",
          fontSize: "1.5em",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        root: {
          color: "red",
          fontFamily: "jaapokkiRegular",
        },
      },
    },
  },
});

export default darkTheme;
