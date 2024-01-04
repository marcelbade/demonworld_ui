// React
import React, { useContext } from "react";
//Material UI
import { Typography, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// components and functions
import { LossCalcContext } from "../../../contexts/LossCalculatorContext";
import { ListItem } from "@mui/material";
import UnitLossCalcBttnGroup from "../LossCalcInputButtons/UnitLossCalcBttnGroup";
import EquipmentList from "../LossCalcEquipmentList/EquipmentList";
import ListElementName from "./ListElementName";
import TotalLossButton from "../LossCalcInputButtons/TotalLossButton";
// constants
import { LOSS_CALCULATOR } from "../../../constants/textsAndMessages";

const useStyles = makeStyles(() => ({
  borderNormal: {
    borderColor: "black",
    border: "solid 0.1em",
    borderRadius: "4px",
  },
  borderLost: {
    borderColor: "red",
    border: "solid 0.1em",
    borderRadius: "4px",
  },
}));

const LostUnitListElement = (props) => {
  const classes = useStyles();
  const calcContext = useContext(LossCalcContext);

  return (
    <ListItem>
      <Grid
        container
        direction="row"
        alignItems="center"
        alignContent="center"
        justifyContent="center"
        className={props.unit.unitDestroyed ? classes.borderLost : classes.borderNormal}
      >
        <Grid container item xs={5} direction="column">
          <Grid item>
            <ListElementName //
              unitName={props.unit.unitName}
              unitDestroyed={props.unit.unitDestroyed}
            />
          </Grid>
          <Grid item>
            <EquipmentList unit={props.unit} />
          </Grid>
        </Grid>
        <Grid item xs={1} sx={{ backgroundColor: "green" }}>
          <Typography variant="button">
            {calcContext.isHeroMageOrGiantElement(props.unit) ? LOSS_CALCULATOR.TEXT_SINGLE_ELEMENTS : LOSS_CALCULATOR.TEXT_UNITS}
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="row" //
          alignItems="center"
          justifyContent="center"
          xs={2}
          sx={{ backgroundColor: "yellow" }}
        >
          <UnitLossCalcBttnGroup unit={props.unit} />
        </Grid>
        <Grid item xs={1}>
          <TotalLossButton unit={props.unit} />
        </Grid>

        <Grid item xs={1}>
          <Typography variant="h6" align="center">
            {/* //TODO   */}
            {calcContext.unitPointsLost}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default LostUnitListElement;
