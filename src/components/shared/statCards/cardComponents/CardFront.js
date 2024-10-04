// React
import React, { Fragment} from "react";
// functions and modules
import CardFrontTitle from "./cardFrontComponents/CardFrontTitle";
import CardFrontUpperBlackStripe from "./cardFrontComponents/CardFrontUpperBlackStripe";
import CardFrontCenter from "./cardFrontComponents/CardFrontCenter";
import CardFrontLowerBlackStripe from "./cardFrontComponents/CardFrontLowerBlackStripe";
import CardFrontFooter from "./cardFrontComponents/CardFrontFooter";
 
const CardFront = (props) => {
  return (
    <Fragment>
      <CardFrontTitle unit = {props.unit} />
      <CardFrontUpperBlackStripe unit = {props.unit} />
      <CardFrontCenter unit = {props.unit} />
      <CardFrontLowerBlackStripe unit = {props.unit} />
      <CardFrontFooter unit = {props.unit} />
    </Fragment>
  );
};

export default CardFront;
