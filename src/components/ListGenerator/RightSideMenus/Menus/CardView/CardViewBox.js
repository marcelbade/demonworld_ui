// React
import { useContext } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, IconButton } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// components and functions
import { RightMenuContext } from "../../../../../contexts/rightMenuContext";
import CardView from "./CardView";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "30vw",
    paddingRight: "2em",
  },
});

const CardViewBox = () => {
  const classes = useStyles();
  const RC = useContext(RightMenuContext);
  const COLUMN = "column";

  // // set the unit card that is displayed. Check if it's a multi state card
  // useEffect(() => {}, [RC.statCardState.clickedUnit]); // eslint-disable-line react-hooks/exhaustive-deps

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
    <Grid container direction="column" className={classes.overlay}>
      <Grid item>
        <IconButton
          onClick={() => {
            RC.closeCardDisplay();
          }}
          size="large">
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
  );
};

export default CardViewBox;
