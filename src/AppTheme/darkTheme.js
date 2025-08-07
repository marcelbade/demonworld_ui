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
    dialogs: {
      title: {
        backgroundColor: "darkgrey",
        color: "white",
      },
    },
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
    cardCreator: {
      name: {
        width: "max-content",
        border: " solid 2px white",
        borderRadius: "10px",
      },
      box: {
        marginTop: "1em",
        padding: "1em",
        width: "50em",
        border: " solid 2px white",
        borderRadius: "10px",
      },
      checkbox: {
        color: "white",
        "&.Mui-checked": {
          color: "white",
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
          background: "white",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "jaapokkiRegular",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: "jaapokkiRegular",
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
          ":hover": {
            color: "white", //
            backgroundColor: "darkRed",
          },
        },

        outlined: {
          color: "white",
          width: "15em",
          padding: "2em",
          height: "5em",
          fontFamily: "NotMaryKate",
          ":hover": {
            color: "white", //
            backgroundColor: "darkRed",
          },
        },
        text: {
          color: "white",
          width: "15em",
          padding: "2em",
          height: "5em",
          fontFamily: "NotMaryKate",
          ":hover": {
            color: "white", //
            backgroundColor: "darkRed",
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
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "0.75em",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: "0.5em",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "center",
        },
      },
    },
  },
});

export default darkTheme;
