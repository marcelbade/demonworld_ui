import { useEffect, useRef, useState } from "react";
import useCustomMediaQuery from "../../customHooks/UseCustomMediaQuery";
import { Fab, Grid2 as Grid } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

/**
 * Higher order component that adds a "go back to the top floating" button to the UI if
 * the the viewport is under a certain size (MUI breakpoint sm ws used). The button is
 * a floating buton that appears once the topmost element is no longer in the viewport.
 * @param {*} props
 * @returns a JSX HOC
 */
const BackToTopContainer = (props) => {
  const headerRef = useRef(null);
  const displaySize = useCustomMediaQuery();
  const ROOT_MARGIN = "10em";

  const [buttonOpacity, setButtonOpacity] = useState(0);

  useEffect(() => {
    const current = headerRef?.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setButtonOpacity(+!entry.isIntersecting);
      },
      { ROOT_MARGIN }
    );
    current && observer?.observe(current);

    return () => current && observer.unobserve(current);
  }, []);

  const scrollCallback = () => {
    headerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Grid
        container //
        size={12}
        sx={{
          height: "0.5em",
          width: "100%",
        }}
        ref={headerRef}
      ></Grid>

      {props.children}

      <Grid
        container //
        justifyContent="end"
        sx={{
          position: "fixed",
          bottom: "5em",
          width: "100%",
        }}
      >
        {displaySize.isSmallDisplay || displaySize.isTinyDisplay ? (
          <Fab
            onClick={scrollCallback}
            sx={{
              marginRight: "2em",
              marginBottom: "3em",
              opacity: buttonOpacity,
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        ) : null}
      </Grid>
    </>
  );
};

export default BackToTopContainer;
