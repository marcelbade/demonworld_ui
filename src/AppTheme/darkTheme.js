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
    options: {
      title: { marginTop: "1em" },
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
          fontSize: "20px",
        },
        body1: {
          fontFamily: "jaapokkiRegular",
          fontSize: "16px",
        },
        h5: {
          fontFamily: "NotMaryKate",
          fontSize: "20px",
        },
        h6: {
          fontFamily: "NotMaryKate",
          fontSize: "20px",
        },
        h3: {
          fontFamily: "NotMaryKate",
          fontSize: "20px",
        },
        subtitle1: {
          fontSize: "20px",
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
        tooltip: {
          fontFamily: "jaapokkiRegular",
          fontSize: "20px",
          color: "white",
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
    MuiPagination: {
      styleOverrides: {
        root: {
          "& .MuiButtonBase-root": {
            height: "2em",
            width: "2em",
            fontSize: "20px",
            marginBottom: "1em",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": { fontFamily: "jaapokkiRegular" },
          "& .MuiFormLabel-root": {
            fontFamily: "NotMaryKate",
          },
        },
      },
    },
  },
});

export default darkTheme;
