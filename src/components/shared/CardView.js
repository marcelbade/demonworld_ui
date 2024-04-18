// React
import React, { Fragment, useEffect, useState } from "react";
// material ui
import { Grid, IconButton } from "@mui/material";
// icons
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
// components and functions
import StatCard from "./statCards/StatCard";

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
      <Grid item container direction="row" alignItems="center" justifyContent="center" alignContent="center">
        <Grid item>
          {props.isMultiStateCard ? (
            <IconButton
              onClick={() => {
                carouselBackward();
              }}
              size="large"
            >
              <ChevronLeft
                sx={{
                  width: "2em",
                  height: "2em",
                }}
              />
            </IconButton>
          ) : null}
        </Grid>
        <Grid>
          <StatCard
            isSingleElement={props.isSingleElement} //
            alignment={props.alignment}
            unit={displayCard}
          />
        </Grid>
        <Grid item>
          {props.isMultiStateCard ? (
            <IconButton
              onClick={() => {
                carouselForward();
              }}
              size="large"
            >
              <ChevronRight
                sx={{
                  width: "2em",
                  height: "2em",
                }}
              />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CardView;
