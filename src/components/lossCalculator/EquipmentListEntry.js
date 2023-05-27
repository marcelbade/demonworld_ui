// React
import React, { useContext } from "react";
//Material UI
import { Typography, Grid, ListItem, ListItemIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { uuidGenerator } from "../shared/sharedFunctions";
import { LossCalcContext } from "../../contexts/LossCalculatorContext";
// clsx
import clsx from "clsx";
// icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { ListItemButton } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  entry: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",

      "@media (orientation:landscape)": {
        flexDirection: "row",
        // justifyContent: "space-between",
      },
    },
  },
  typographyFont: {
    fontFamily: "NotMaryKate",
    textAlign: "left",
    marginTop: "0.5em",
  },
  strikeTroughText: {
    fontFamily: "NotMaryKate",
    textAlign: "left",
    marginTop: "0.5em",
    color: "red",
    textDecorationLine: "line-through",
    textDecorationThickness: "0.2em",
  },
  line: {
    marginTop: "0.5em",
    marginBottom: "0.5em",
    borderBottom: "solid black 0.1em",
    display: "block",
  },
}));

const EquipmentListEntry = (props) => {
  const classes = useStyles();
  const calcContext = useContext(LossCalcContext);

  return (
    <ListItem className={classes.entry} key={uuidGenerator()}>
      {props.element.itemLost ? (
        <ListItemButton
          className={clsx(classes.deleteBttn, classes.textMargin)}
          onClick={() => {
            calcContext.setItemIsLostFlag(props.unit, props.element.name, false);
          }}
        >
          <ListItemIcon>
            <RemoveCircleOutlineIcon />
          </ListItemIcon>
        </ListItemButton>
      ) : (
        <ListItemButton
          className={clsx(classes.deleteBttn, classes.textMargin)}
          onClick={() => {
            calcContext.setItemIsLostFlag(props.unit, props.element.name, true);
          }}
        >
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
        </ListItemButton>
      )}

      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="button" className={props.element.itemLost ? classes.strikeTroughText : classes.typographyFont}>
            {props.element.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="button" className={props.element.itemLost ? classes.strikeTroughText : classes.typographyFont}>
            {props.element.points}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default EquipmentListEntry;
