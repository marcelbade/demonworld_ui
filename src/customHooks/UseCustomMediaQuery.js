import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

/**
 * Custom hook uses useMediaQuery to return several functions that allow
 * the conditional rendering of components and variants. Each function checks
 * whether the display is a certain size and returns true, if that is the case.
 * @returns an object with the following functions:
 * - isLargeDisplay
 * - isMediumDisplay
 * - isSmallDisplay
 * - isTinyDisplay
 */
const useCustomMediaQuery = () => {
  const theme = useTheme();
  return {
    isLargeDisplay: useMediaQuery(theme.breakpoints.down("xl")),
    isMediumDisplay: useMediaQuery(theme.breakpoints.down("lg")),
    isSmallDisplay: useMediaQuery(theme.breakpoints.down("md")),
    isTinyDisplay: useMediaQuery(theme.breakpoints.down("sm")),
  };
};

export default useCustomMediaQuery;
