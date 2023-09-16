// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { StateCardContext } from "../../../../../contexts/statCardContext";

const useStyles = makeStyles({
  blackStripe: {
    fontFamily: "Beryliumbold",
    fontWeight: "bold",
    padding: "10px",
    color: "white",
    backgroundColor: "black",
  },
});

const CardBackUpperBlackStripe = () => {
  const classes = useStyles();
  const SC = useContext(StateCardContext);

  return (
    <Grid item>
      <Typography variant="h6" align="center" className={classes.blackStripe}>
        {SC.unit.numberOfElements} {SC.unit.numberOfElements === 1 ? "Element" : "Elemente"}
      </Typography>
    </Grid>
  );
};

export default CardBackUpperBlackStripe;
