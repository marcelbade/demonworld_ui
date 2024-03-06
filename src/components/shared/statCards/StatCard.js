// React
import React from "react";
// Material UI
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CardBack from "./cardComponents/CardBack";
import CardFront from "./cardComponents/CardFront";
import StatCardProvider from "../../../contexts/statCardContext";

const useStyles = makeStyles((theme) => ({
  cardBox: {
    width: "30em",
    marginTop: "2em",
    backgroundColor: theme.palette.statCardBackGround,
    border: "1px black solid",
    marginLeft: "0.75em",
    marginRight: "0.75em",
  },
}));

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
