// React
import React, { Fragment } from "react";
// functions and modules
import CardFrontTitle from "./cardFrontComponents/CardFrontTitle";
import CardFrontUpperBlackStripe from "./cardFrontComponents/CardFrontUpperBlackStripe";
import CardFrontCenter from "./cardFrontComponents/CardFrontCenter";
import CardFrontLowerBlackStripe from "./cardFrontComponents/CardFrontLowerBlackStripe";
import CardFrontFooter from "./cardFrontComponents/CardFrontFooter";

const CardFront = () => {
  return (
    <Fragment>
      <CardFrontTitle />
      <CardFrontUpperBlackStripe />
      <CardFrontCenter />
      <CardFrontLowerBlackStripe />
      <CardFrontFooter />
    </Fragment>
  );
};

export default CardFront;
