import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#467fcf" },
  },

  typography: {
    allVariants: {
      fontFamily: "notMaryKate",
      textTransform: "none",
    },
  },
});

theme.overrides = {
  MuiButton: {
    root: {
      fontFamily: "NotMaryKate",
    },
    outlined: {
      "&:hover": {
        backgroundColor: "grey",
        color: "red",
      },
    },
    text: {
      "&:hover": {
        backgroundColor: "grey",
        color: "red",
      },
    },
  },
  MuiButtonBase: {
    root: {
      fontFamily: "NotMaryKate",
      "&:hover": {
        backgroundColor: "grey",
        color: "red",
      },
    },
  },
};

export default theme;
