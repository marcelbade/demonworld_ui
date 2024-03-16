// React
import { useContext } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, IconButton, ThemeProvider, CssBaseline } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// components and functions
import { RightMenuContext } from "../../../../../contexts/rightMenuContext";
import CardView from "./CardView";
// theme
import lightTheme from "../../../../../AppTheme/lightTheme";
import darkTheme from "../../../../../AppTheme/darkTheme";
import { LightSwitchContext } from "../../../../../contexts/lightSwitchContext";

const useStyles = makeStyles((theme) => ({
  overlay: {
    height: "100vh",
    width: "30vw",
    padding: "2em",
  },
}));

const CardViewBox = () => {
  const classes = useStyles();
  const RC = useContext(RightMenuContext);
  const LC = useContext(LightSwitchContext);

  const COLUMN = "column";

  /**
   * Function allwos user to cycle through the multiple stat cards counter-clockwise.
   */
  const carouselForward = () => {
    const number = RC.displayedCard.multiStateOrderNumber;

    if (number < RC.carouselCards.length) {
      RC.setDisplayedCard(RC.carouselCards[number]);
    } else {
      RC.setDisplayedCard(RC.carouselCards[0]);
    }
  };

  /**
   * Function allows user to cycle through the multiple stat cards clockwise.
   */
  const carouselBackward = () => {
    const number = RC.displayedCard.multiStateOrderNumber;

    if (number > 1) {
      RC.setDisplayedCard(RC.carouselCards[number - 2]);
    } else {
      RC.setDisplayedCard(RC.carouselCards[RC.carouselCards.length - 1]);
    }
  };

  return (
    <ThemeProvider theme={LC.darkModeOff ? lightTheme : darkTheme}>
      <CssBaseline />
      <Grid container direction="column" className={classes.overlay}>
        <Grid item>
          <IconButton
            onClick={() => {
              RC.closeCardDisplay();
            }}
            size="large"
          >
            <CancelIcon />
          </IconButton>
        </Grid>
        <Grid container item>
          {RC.statCardState.clickedUnit !== undefined ? (
            <CardView
              isMultiStateCard={RC.statCardState.clickedUnit?.isMultiStateUnit}
              cardData={RC.displayedCard}
              alignment={COLUMN}
              isSingleElement={RC.isSingleElement}
              carouselForward={carouselForward}
              carouselBackward={carouselBackward}
            />
          ) : null}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default CardViewBox;
