// React
import React, { useContext } from "react";
//Material UI
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { LossCalcContext } from "../../contexts/LossCalculatorContext";
import { ListItem } from "@mui/material";
import ListElementBttns from "./LossCalcInputButtons/UnitLossCalcBttnGroup";

// clsx
import clsx from "clsx";
import EquipmentList from "./LossCalcEquipmentList/EquipmentList";
// icons

const useStyles = makeStyles((theme) => ({
  listElement: {
    border: "solid 0.1em",
    borderRadius: "4px",

    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      padding: "2em",
      width: "190%",
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

const LossCalcUnitElement = (props) => {
  const classes = useStyles();
  const calcContext = useContext(LossCalcContext);

  const TEXT_UNITS = "Verlorene Elemente:";
  const TEXT_SINGLE_ELEMENTS = "Verlorene Lebenspunkte:";

  return (
    <ListItem>
      <Grid
        container
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
            <EquipmentList unit={props.unit} />
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="button" className={clsx(classes.typographyFont, classes.text)}>
            {calcContext.isHeroMageOrGiantElement(props.unit) ? TEXT_SINGLE_ELEMENTS : TEXT_UNITS}
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

export default LossCalcUnitElement;