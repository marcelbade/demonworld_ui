import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";

const useStyles = makeStyles({
  button: {
    color: "black",
  },
  blockedLeafNode: {
    fontFamily: "NotMaryKate",
    color: "grey",
  },
  unblockedLeafNode: {
    fontFamily: "NotMaryKate",
    color: "black",
  },
});

/**
 * Generates a layouted label for the unblocked units.
 * @param {unit Object} unit
 * @returns jsx for the label
 */

const NodeLabelGenerator = (unit) => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  return (
    <Grid container alignItems="center" direction="row">
      <Grid item sm={3} md={7}>
        <Typography variant="button" className={classes.unblockedLeafNode}>
          {unit.unitName}
        </Typography>
      </Grid>
      <Grid item xs={2} md={2}>
        <Typography variant="button" className={classes.unblockedLeafNode}>
          {unit.points}
        </Typography>
      </Grid>
      <Grid item xs={1} md={1}>
        <IconButton
          className={classes.button}
          onClick={() => {
            contextArmy.selectUnit(unit);
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default NodeLabelGenerator;
