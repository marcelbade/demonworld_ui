import { createTheme, adaptV4Theme } from "@mui/material/styles";

const theme = createTheme(adaptV4Theme({
  palette: {
    primary: { 500: "#467fcf" },
  },

  typography: {
    allVariants: {
      fontFamily: "jaapokkiRegular",
      textTransform: "none",
    },
  },
}));

theme.overrides = {
  MuiTreeItem:{
    root:{
      fontFamily: "NotMaryKate",
    },
  },

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
