import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

/**
 * Custom hook uses useMediaQuery to return functions that allow
 * the conditional rendering of components.   
 * @returns an object with the following functions:
 * - isLargeDisplay
 * - isMediumDisplay
 * - isSmallDisplay
 * - isTinyDisplay
   - isPortraitModus
 * - isLandscapeModus
 */
const useCustomMediaQuery = () => {
  const theme = useTheme();

  return {
    isLargeDisplay: useMediaQuery(theme.breakpoints.down("xl")),
    isMediumDisplay: useMediaQuery(theme.breakpoints.down("lg")),
    isSmallDisplay: useMediaQuery(theme.breakpoints.down("md")),
    isTinyDisplay: useMediaQuery(theme.breakpoints.down("sm")),
    isPortraitModus: window.matchMedia("(orientation:portrait)").matches,
    isLandscapeModus: window.matchMedia("(orientation:landscape)").matches,
  };
};

export default useCustomMediaQuery;
