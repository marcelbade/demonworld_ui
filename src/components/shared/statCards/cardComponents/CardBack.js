// React
import React, { Fragment } from "react";
// functions and modules
import CardBackCenter from "./cardBackComponents/CardBackCenter";
import CardBackTitle from "./cardBackComponents/CardBackTitle";
import CardBackLowerBlackStripe from "./cardBackComponents/CardBackLowerBlackStripe";
import CardFrontUpperBlackStripe from "./cardFrontComponents/CardFrontUpperBlackStripe";

const CardBack = () => {
  return (
    <Fragment>
      <CardBackTitle />
      <CardFrontUpperBlackStripe />
      <CardBackCenter />
      <CardBackLowerBlackStripe />
    </Fragment>
  );
};

export default CardBack;
