// React
import { useContext, useState, useEffect } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
// icons
import CancelIcon from "@material-ui/icons/Cancel";
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";
import { RightMenuContext } from "../../../../../contexts/rightMenuContext";
import CardView from "./CardView";
import { isSingleElementCard } from "../../../../shared/sharedFunctions";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "30vw",
    paddingRight: "2em",
  },
});

const CardViewBox = () => {
  const AC = useContext(ArmyContext);
  const RC = useContext(RightMenuContext);
  const classes = useStyles();
  const COLUMN = "column";

  const [isSingleElement, setIsSingleElement] = useState(false);
  const [carouselCards, setCarouselCards] = useState([]);
  const [displayedCard, setDisplayedCard] = useState({});

  // set the unit card that is displayed. Check if it's a multi state card 
  useEffect(() => {
    if (RC.statCardState.clickedUnit !== undefined) {
      setDisplayedCard({ ...RC.statCardState.clickedUnit });
      setIsSingleElement(isSingleElementCard(RC.statCardState.clickedUnit));
    }

    if (RC.statCardState.clickedUnit !== undefined && RC.statCardState.clickedUnit.isMultiStateUnit) {
      const allStateCards = AC.listOfAllFactionUnits.filter((u) => u.belongsToUnit === RC.statCardState.clickedUnit.unitName);
      setCarouselCards(allStateCards);
    }
  }, [RC.statCardState.clickedUnit]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function allwos user to cycle through the multiple stat cards counter-clockwise.
   */
  const carouselForward = () => {
    const number = displayedCard.multiStateOrderNumber;

    if (number < carouselCards.length) {
      setDisplayedCard(carouselCards[number]);
    } else {
      setDisplayedCard(carouselCards[0]);
    }
  };

  /**
   * Function allows user to cycle through the multiple stat cards clockwise.
   */
  const carouselBackward = () => {
    const number = displayedCard.multiStateOrderNumber;

    if (number > 1) {
      setDisplayedCard(carouselCards[number - 2]);
    } else {
      setDisplayedCard(carouselCards[carouselCards.length - 1]);
    }
  };

  return (
    <Grid container direction="column" className={classes.overlay}>
      <Grid item>
        <IconButton
          onClick={() => {
            RC.closeCardDisplay();
          }}
        >
          <CancelIcon />
        </IconButton>
      </Grid>
      <Grid container item>
        {RC.statCardState.clickedUnit !== undefined ? (
          <CardView
            isMultiStateCard={RC.statCardState.clickedUnit?.isMultiStateUnit}
            cardData={displayedCard}
            alignment={COLUMN}
            isSingleElement={isSingleElement}
            carouselForward={carouselForward}
            carouselBackward={carouselBackward}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default CardViewBox;
