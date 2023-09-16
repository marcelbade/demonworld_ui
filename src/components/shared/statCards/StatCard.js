// React
import React from "react";
// Material UI
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardBack from "./cardComponents/CardBack";
import CardFront from "./cardComponents/CardFront";
import StatCardProvider from "../../../contexts/statCardContext";
// components

const useStyles = makeStyles({
  cardBox: {
    width: "120%",
    marginRight: "2em",
    marginTop: "2em",
    backgroundColor: "lightgrey",
  },
});
/**
 * Wrapper Element. Allows for vertical or horizontal layout of the cards.
 * @param {String} props A value for the alignment property of the MUI grid element.
 * @returns jsx
 */
const StatCard = (props) => {
  const classes = useStyles();

  

  return (
    <StatCardProvider
      value={{
        isSingleElement: props.isSingleElement,
        unit: props.unit,
      }}
    >
      <Grid container direction={props.alignment}>
        <Grid item className={classes.cardBox}>
          <CardFront />
        </Grid>
        <Grid item className={classes.cardBox}>
          <CardBack />
        </Grid>
      </Grid>
    </StatCardProvider>
  );
};

export default StatCard;
