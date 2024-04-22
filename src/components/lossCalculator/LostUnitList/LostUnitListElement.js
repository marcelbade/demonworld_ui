// React
import React, { useContext } from "react";
//Material UI
import { Typography, Grid } from "@mui/material";
// components and functions
import { LossCalcContext } from "../../../contexts/LossCalculatorContext";
import { ListItem } from "@mui/material";
import UnitLossCalcBttnGroup from "../LossCalcInputButtons/UnitLossCalcBttnGroup";
import EquipmentList from "../LossCalcEquipmentList/EquipmentList";
import ListElementName from "./ListElementName";
import TotalLossButton from "../LossCalcInputButtons/TotalLossButton";
// constants
import { LOSS_CALCULATOR } from "../../../constants/textsAndMessages";

const LostUnitListElement = (props) => {
  const calcContext = useContext(LossCalcContext);

  const STYLES = {
    border: "solid 0.1em",
    borderColor: "black",
    borderRadius: "4px",
  };

  const setStyles = () => {
    return props.unitDestroyed
      ? {
          ...STYLES,
          borderColor: "red",
        }
      : STYLES;
  };

  /**
   * Function determines if a unit has more than 1 hit point, i.e, if it is a hero, giant, mage or a unit with multiple hit points per element.
   * @param {*} unit
   * @returns true if the unit is a hero, mage, giant, or unit with more than 1 HP per element.
   */
  const isHeroMageOrGiantElement = (unit) => {
    return unit.hitpoints > 1;
  };

  return (
    <ListItem>
      <Grid
        container //
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={setStyles()}
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
        <Grid item xs={1}>
          <Typography variant="button">
            {isHeroMageOrGiantElement(props.unit) //
              ? LOSS_CALCULATOR.TEXT_SINGLE_ELEMENTS
              : LOSS_CALCULATOR.TEXT_UNITS}
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={2}
          direction="row" //
          alignItems="center"
          justifyContent="center"
        >
          <UnitLossCalcBttnGroup unit={props.unit} />
        </Grid>
        <Grid
          item
          container
          xs={2} //
          alignItems="center"
          justifyContent="center"
        >
          <TotalLossButton unit={props.unit} />
        </Grid>

        <Grid item xs={1}>
          <Typography variant="h6" align="center">
            {calcContext.unitPointsLost}
          </Typography>
        </Grid>
        <Grid
          xs={1}
          item //
          direction="column"
          container
          justifyContent="flex-end"
          alignItems="flex-end"
        ></Grid>
      </Grid>
    </ListItem>
  );
};

export default LostUnitListElement;
