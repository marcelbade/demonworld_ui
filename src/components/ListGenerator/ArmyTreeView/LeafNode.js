import React, { Fragment, useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import { ListItemButton, Stack } from "@mui/material";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";

// Icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles({
  unblockedBttn: {
    alignContent: "center",
    color: "black",
  },
  blockedBttn: {
    alignContent: "center",
    color: "grey",
  },
  textBlock: {
    width: "25em",
  },
  blockedLeafNode: {
    paddingRight: "0.5em",
    width: "15em",
    fontFamily: "NotMaryKate",
    color: "grey",
  },
  unblockedLeafNode: {
    paddingRight: "0.5em",

    fontFamily: "NotMaryKate",
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
    <List component={Stack} direction="row" alignItems="center">
      <ListItemText
        className={classes.text}
        primary={
          <Fragment>
            <Typography variant="button" className={displayLeaf(props.isBlocked)}>
              {props.unit.unitName}
            </Typography>
          </Fragment>
        }
        secondary={
          <Fragment>
            <Typography variant="button" className={displayLeaf(props.isBlocked)}>
              {props.unit.points}
            </Typography>
          </Fragment>
        }
      />
      <ListItemButton
        onClick={() => {
          contextArmy.selectUnit(props.unit);
        }}
        disabled={props.isBlocked}
        className={displayBttn(props.isBlocked)}
      >
        <ListItemIcon>
          <AddCircleOutlineIcon />
        </ListItemIcon>
      </ListItemButton>
    </List>
  );
};
export default LeafNode;
