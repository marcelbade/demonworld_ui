// React
import React, { Fragment } from "react";
// functions and modules
import CardBackCenter from "./cardBackComponents/CardBackCenter";
import CardBackTitle from "./cardBackComponents/CardBackTitle";
import CardBackLowerBlackStripe from "./cardBackComponents/CardBackLowerBlackStripe";
import CardBackUpperBlackStripe from "./cardBackComponents/CardBackUpperBlackStripe";

const CardBack = () => {
  return (
    <Fragment>
      <CardBackTitle />
      <CardBackUpperBlackStripe />
      <CardBackCenter />
      <CardBackLowerBlackStripe />
    </Fragment>
  );
};

export default CardBack;
