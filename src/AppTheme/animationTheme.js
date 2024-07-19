import { createTheme } from "@mui/material";

const animationTheme = createTheme({
  palette: {
    fadeAway: {
      "@keyframes fade": {
        "0%": {
          display: "none",
          opacity: 1,
        },
        "1%": {
          display: "block",
          opacity: 1,
        },
        "100%": {
          display: "block",
          opacity: 0,
        },
      },
      animation: "fade 1s linear 1",
      animationFillMode: "forwards",
    },
    fadeIn: {
      "@keyframes fade": {
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
      animation: "fade 2s linear 1",
      animationFillMode: "forwards",
    },
  },
});

export default animationTheme;
