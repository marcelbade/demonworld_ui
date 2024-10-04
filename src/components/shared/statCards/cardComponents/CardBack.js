// React
import React, { Fragment } from "react";
// functions and modules
import CardBackCenter from "./cardBackComponents/CardBackCenter";
import CardBackTitle from "./cardBackComponents/CardBackTitle";
import CardBackLowerBlackStripe from "./cardBackComponents/CardBackLowerBlackStripe";
import CardBackUpperBlackStripe from "./cardBackComponents/CardBackUpperBlackStripe";

const CardBack = (props) => {
  return (
    <Fragment>
      <CardBackTitle unit={props.unit} />
      <CardBackUpperBlackStripe unit={props.unit} />
      <CardBackCenter unit={props.unit} />
      <CardBackLowerBlackStripe unit={props.unit} />
    </Fragment>
  );
};

export default CardBack;
