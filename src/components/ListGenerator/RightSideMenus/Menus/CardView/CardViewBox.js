// React
import { useContext, useState, useEffect } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
// icons
import CancelIcon from "@material-ui/icons/Cancel";
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";
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
  const classes = useStyles();
  const COLUMN = "column";

  const [isSingleElement, setIsSingleElement] = useState(false);
  const [carouselCards, setCarouselCards] = useState([]);
  const [displayedCard, setDisplayedCard] = useState({});

  // set the default unit card that is displayeds
  useEffect(() => {
    setDisplayedCard({ ...AC.statCardState.clickedUnit });
  }, [AC.statCardState.clickedUnit]);

  // Does the stat card belong to a unit with more than 1 element?
  useEffect(() => {
    if (AC.statCardState.clickedUnit !== undefined) {
      const isSingleElement = isSingleElementCard(AC.statCardState.clickedUnit);
      setIsSingleElement(isSingleElement);
    }
  }, [AC.statCardState.clickedUnit]);

  // if the unit has multiple state cards, store them all has carousel cards.
  useEffect(() => {
    if (AC.statCardState.clickedUnit !== undefined && AC.statCardState.clickedUnit.isMultiStateUnit) {
      const allStateCards = AC.listOfAllFactionUnits.filter((u) => u.belongsToUnit === AC.statCardState.clickedUnit.unitName);
      setCarouselCards(allStateCards);
    }
  }, [AC.statCardState.clickedUnit]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function allwos user to cycle through the multiple stat cards counter-clockwise.
   */
  const carouselForwards = () => {
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
  const carouselBackwards = () => {
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
            AC.closeCardDisplay();
          }}
        >
          <CancelIcon />
        </IconButton>
      </Grid>
      <Grid container item>
        {AC.statCardState.clickedUnit !== undefined ? (
          <CardView
            isMultiStateCard={AC.statCardState.clickedUnit?.isMultiStateUnit}
            cardData={displayedCard}
            alignment={COLUMN}
            isSingleElement={isSingleElement}
            carouselForwards={carouselForwards}
            carouselBackwards={carouselBackwards}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default CardViewBox;
