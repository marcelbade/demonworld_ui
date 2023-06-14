import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, IconButton } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
// Icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles({
  textBlock: {
    width: "25em",
  },
  blockedLeafNode: {
    paddingRight: "0.5em",
    
    color: "grey",
  },
  unblockedLeafNode: {
    paddingRight: "0.5em",
    
  },
  points: {
    
    color: "grey",
  },

  unblockedBttn: {
    alignContent: "center",
    color: "black",
  },
  blockedBttn: {
    paddingLeft: "1em",
  },
});

const LeafNode = (props) => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  const displayLeaf = (isBlocked) => {
    return isBlocked ? classes.blockedLeafNode : classes.unblockedLeafNode;
  };
  const displayBttn = (isBlocked) => {
    return isBlocked ? classes.blockedBttn : classes.unblockedBttn;
  };

  return (
    <Grid container direction="row" alignItems="center" justify="space-around">
      <Grid xs={6} item container direction="column">
        <Typography variant="button" className={displayLeaf(props.isBlocked)}>
          {props.unit.unitName}
        </Typography>

        <Typography variant="button" className={classes.points}>
          {props.unit.points}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <IconButton
          onClick={() => {
            contextArmy.selectUnit(props.unit);
          }}
          disabled={props.isBlocked}
          className={displayBttn(props.isBlocked)}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
export default LeafNode;