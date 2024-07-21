import { createTheme } from "@mui/material";

const animationTheme = createTheme({
  palette: {
    fadeAway: {
      "@keyframes fadeAway": {
        "0%": {
          opacity: 1,
        },
        "1%": {
          opacity: 1,
        },
        "100%": {
          opacity: 0,
        },
      },
      animation: "fadeAway 1s linear 1 forwards",
    },
    fadeIn: {
      "@keyframes fadeIn": {
        "0%": {
          display: "none",
          opacity: 0,
        },
        "1%": {
          display: "block",
          opacity: 0,
        },
        "100%": {
          display: "block",
          opacity: 1,
        },
      },
      animation: "fadeIn 1s linear 1 forwards",
    },
  },
});

export default animationTheme;
