import { createTheme } from "@mui/material/styles";
import animationTheme from "./animationTheme";

const lightTheme = createTheme({
  palette: {
    primary: { 500: "#000000" },
    disabled: "grey",
    color: "black",
    errorColor: "red",
    compendiumHeaderBackground: "black",
    dialogs: {
      title: {
        backgroundColor: "black",
        color: "white",
      },
    },
    contrastedOptions: {
      color: "white",
      backgroundColor: "darkRed",
    },

    options: {
      title: { marginTop: "1em" },
    },
    statCards: {
      backGround: {
        backgroundColor: "rgb(138, 158, 150)", //
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
          color: "black",
          ":hover": {
            color: "white", //
            backgroundColor: "darkRed",
          },
        },

        outlined: {
          color: "black",
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
          color: "black",
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
            fontFamily: "jaapokkiRegular",
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

export default lightTheme;
