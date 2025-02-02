import { createTheme } from "@mui/material/styles";
import animationTheme from "./animationTheme";

const lightTheme = createTheme({
  palette: {
    primary: { 500: "#000000" },
    disabled: "grey",
    color: "black",
    errorColor: "red",
    compendiumHeaderBackground: "black",
    statCards: {
      backGround: {
        backgroundColor: "lightgrey", //
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
    cardCreator: {
      name: {
        width: "max-content",
        border: " solid 2px black",
        borderRadius: "10px",
      },
      box: {
        marginTop: "1em",
        padding: "1em",
        width: "50em",
        border: " solid 2px black",
        borderRadius: "10px",
      },
      checkbox: {
        color: "black",
        "&.Mui-checked": {
          color: "black",
        },
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
          background: "black",
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
          color: "black",
        },

        outlined: {
          color: "black",
          width: "15em",
          padding: "2em",
          height: "5em",
          fontFamily: "NotMaryKate",
        },
        text: {
          color: "black",
          width: "15em",
          padding: "2em",
          height: "5em",
          fontFamily: "NotMaryKate",
          ":hover": {
            backgroundColor: "lightGrey",
          },
        },
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

export default lightTheme;
