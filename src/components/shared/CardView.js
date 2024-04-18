// React
import React, { Fragment, useEffect, useState } from "react";
// material ui
import { Grid } from "@mui/material";
// components and functions
import StatCard from "./statCards/StatCard";
import StatCardCarousellButton from "./StatCardCarousellButton";

const CardView = (props) => {
  const [displayCard, setLocalDisplayCard] = useState({});
  const [cardNumber, setCardNumber] = useState(0);

  // rerender to correctly display the new unit, whenever the supplied unit changes.
  useEffect(() => {
    const temp = { ...props.unit };
    setLocalDisplayCard(temp);
  }, [props.unit]);

  /**
   * Function allwos user to cycle through the multiple stat cards counter-clockwise.
   */
  const carouselForward = () => {
    if (cardNumber < props.carouselCards.length - 1) {
      setCardNumber(cardNumber + 1);
      setLocalDisplayCard(props.carouselCards[cardNumber + 1]);
    } else {
      setCardNumber(0);
      setLocalDisplayCard(props.carouselCards[0]);
    }
  };

  /**
   * Function allows user to cycle through the multiple stat cards clockwise.
   */
  const carouselBackward = () => {
    if (cardNumber > 0) {
      setCardNumber(cardNumber - 1);
      setLocalDisplayCard(props.carouselCards[cardNumber - 1]);
    } else {
      setCardNumber(props.carouselCards.length - 1);
      setLocalDisplayCard(props.carouselCards[props.carouselCards.length - 1]);
    }
  };

  return (
    <Fragment>
      <Grid
        container //
        item
        direction="row"
        alignItems="center"
        justifyContent="center"
        alignContent="center"
        minHeight="60vh"
        maxHeight="60vh"
      >
        <Grid item>
          {props.isMultiStateCard ? ( //
            <StatCardCarousellButton action={carouselBackward} side={"left"} />
          ) : null}
        </Grid>
        <Grid item>
          <StatCard
            isSingleElement={props.isSingleElement} //
            unit={displayCard}
          />
        </Grid>
        <Grid item>
          {props.isMultiStateCard ? ( //
            <StatCardCarousellButton action={carouselForward} side={"right"} />
          ) : null}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CardView;
