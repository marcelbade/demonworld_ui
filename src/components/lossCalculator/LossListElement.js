// React
import React, { useContext } from "react";
//Material UI
import { Typography, Grid, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { LossCalcContext } from "../../contexts/LossCalculatorContext";
import { ListItem } from "@mui/material";
import ListElementBttns from "./ListElementBttns";
import EquipmentListEntry from "./EquipmentListEntry";
import { uuidGenerator } from "../shared/sharedFunctions";

// clsx
import clsx from "clsx";
// icons

const useStyles = makeStyles((theme) => ({
  listElement: {
    border: "solid 0.1em",
    borderRadius: "4px",

    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      padding: "2em",
      width: "70%",
      height: "10%",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",

      width: "100%",
      height: "35%",
      "@media (orientation:landscape)": {
        flexDirection: "row",
      },
    },
  },
  borderNormal: {
    borderColor: "black",
  },
  borderLost: {
    borderColor: "red",
  },

  typographyFont: {
    textAlign: "center",
    marginTop: "0.5em",
  },
  text: {
    paddingLeft: "1em",
  },
  strikeTroughText: {
    paddingLeft: "1em",
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

const LossListElement = (props) => {
  const classes = useStyles();
  const calcContext = useContext(LossCalcContext);

  const TEXT = "Verlorene Elemente:";

  return (
    <ListItem>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        alignContent="center"
        className={
          props.unit.unitDestroyed ? clsx(classes.listElement, classes.borderLost) : clsx(classes.listElement, classes.borderNormal)
        }
      >
        {/* NAME*/}
        <Grid container item md={4} direction="column">
          <Grid item>
            <Typography
              variant="button"
              className={
                props.unit.unitDestroyed
                  ? clsx(classes.typographyFont, classes.strikeTroughText)
                  : clsx(classes.typographyFont, classes.text)
              }
            >
              {props.unit.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <List>
              {/* ITTEM LIST */}
              {props.unit.equipment !== undefined && props.unit.equipment.length !== 0 ? <span className={classes.line}></span> : null}
              {props.unit.equipment !== undefined && props.unit.equipment.length !== 0
                ? props.unit.equipment.map((e, i) => {
                    return <EquipmentListEntry unit={props.unit} element={e} index={i} key={uuidGenerator()} />;
                  })
                : null}
            </List>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="button" className={clsx(classes.typographyFont, classes.text)}>
            {TEXT}
          </Typography>
        </Grid>
        <Grid item>
          {/*  BUTTONS */}
          <ListElementBttns unit={props.unit} />
        </Grid>
        <Grid item>
          <Typography variant="h6" align="center" className={classes.typographyFont}>
            {calcContext.unitPointsLost}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default LossListElement;
