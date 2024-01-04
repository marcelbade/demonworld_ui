// React
import React, { Fragment, useContext } from "react";
//Material UI
import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
// constants
import { LOSS_CALCULATOR } from "../../../constants/textsAndMessages";
// components and functions
import { LossCalcContext } from "../../../contexts/LossCalculatorContext";
import UnitLossCalculatorButton from "./UnitLossCalculatorButton";
import TotalLossButton from "./TotalLossButton";

const useStyles = makeStyles(() => ({}));

const UnitLossCalcBttnGroup = (props) => {
  const classes = useStyles();
  const calcContext = useContext(LossCalcContext);

  /**
   * Function lets the user add lost elements.
   */
  const addLoss = () => {
    let tempArray = [...calcContext.list];

    let unitIndex = tempArray.findIndex((u) => u.uniqueID === props.unit.uniqueID);
    ++tempArray[unitIndex].lossCounter;

    calcContext.setList([...tempArray]);
  };

  const addFullUnit = () => {
    for (let i = 0; i < props.unit.hitpoints; i++) {
      addLoss();
    }
  };

  /**
   * Function lets the user subtract lost elements.
   */
  const subtractLoss = () => {
    let tempArray = [...calcContext.list];

    let unitIndex = tempArray.findIndex((u) => u.uniqueID === props.unit.uniqueID);
    --tempArray[unitIndex].lossCounter;

    calcContext.setList([...tempArray]);
  };

  const subtractFullUnit = () => {
    for (let i = 0; i < props.unit.hitpoints; i++) {
      subtractLoss();
    }
  };

  /**
   * Function prevents the user from choosing a number of lost elements larger than the number of elements or hitpoints the unit has.
   * @returns boolean flag
   */
  const notGreaterThanNumberOfIncrements = () => {
    return props.unit.lossCounter === props.unit.maxCounter;
  };
  const notGreaterThanNumberOfHitpoints = () => {
    return props.unit.lossCounter + props.unit.hitpoints > props.unit.maxCounter;
  };

  /**
   * Function prevents the user from choosing a negative number of lost elements.
   * @returns  boolean flag
   */
  const notLessThanZero = () => {
    return props.unit.lossCounter === 0;
  };
  const notLessThanOneUnit = () => {
    return props.unit.lossCounter < props.unit.hitpoints;
  };

  /**
   * Function checks, if a unit has more than 1 element and more than 1 HP per element.
   * If so, 2 additional buttons are displayed that allow the user to add or substract
   * all 1 entire element (with multiple HP) with one click.
   * @returns true, if the unit has multiple elements and HP.
   */
  const morethanOneElementAndMultipleHP = () => {
    return props.unit.hitpoints > 1 && props.unit.numberOfElements > 1;
  };

  return (
    <Fragment>
      <UnitLossCalculatorButton
        tooltipText={LOSS_CALCULATOR.MINUS_1_ELEMENT}
        display={morethanOneElementAndMultipleHP()}
        action={subtractFullUnit}
        disableBttn={notLessThanZero() || notLessThanOneUnit()}
        icon={<KeyboardDoubleArrowLeftIcon />}
      />

      <UnitLossCalculatorButton
        tooltipText={props.unit.hitpoints > 1 ? LOSS_CALCULATOR.MINUS_1_HP : LOSS_CALCULATOR.MINUS_1_ELEMENT}
        display={true}
        action={subtractLoss}
        disableBttn={notLessThanZero()}
        icon={<ChevronLeftIcon />}
      />

      <Typography variant="h6">{props.unit.lossCounter}</Typography>

      <UnitLossCalculatorButton
        tooltipText={props.unit.hitpoints > 1 ? LOSS_CALCULATOR.PLUS_1_HP : LOSS_CALCULATOR.PLUS_1_ELEMENT}
        display={true}
        action={addLoss}
        disableBttn={notGreaterThanNumberOfIncrements()}
        icon={<ChevronRightIcon />}
      />

      <UnitLossCalculatorButton
        tooltipText={LOSS_CALCULATOR.PLUS_1_ELEMENT}
        display={morethanOneElementAndMultipleHP()}
        action={addFullUnit}
        disableBttn={notGreaterThanNumberOfIncrements() || notGreaterThanNumberOfHitpoints()}
        icon={<KeyboardDoubleArrowRightIcon />}
      />
    </Fragment>
  );
};

export default UnitLossCalcBttnGroup;
