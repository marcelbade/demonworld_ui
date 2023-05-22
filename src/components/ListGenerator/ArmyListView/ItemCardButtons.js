// React
import React, { useContext } from "react";
// Material UI
import { Button, Grid, makeStyles } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";

const useStyles = makeStyles({
  buttons: {
    fontFamily: "NotMaryKate",
    marginRight: "1em",
    "&:hover": {
      backgroundColor: "grey",
      color: "red",
    },
  },
});

const ItemCardButtons = (props) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  return (
    <Grid item xs={5} direction="row">
      <Button
        className={classes.buttons}
        variant="outlined"
        onClick={() => {
          contextArmy.setUnitSelectedForShop(props.u);
          contextArmy.toggleBetweenItemShops(props.u);
        }}
      >
        Gegenstände
      </Button>
      <Button
        className={classes.buttons}
        variant="outlined"
        onClick={() => {
          contextArmy.toggleBetweenCards(props.u);
        }}
      >
        Kartenvorschau
      </Button>
    </Grid>
  );
};

export default ItemCardButtons;
