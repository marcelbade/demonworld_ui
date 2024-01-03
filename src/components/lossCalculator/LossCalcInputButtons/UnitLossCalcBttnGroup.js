// React
import React, { useContext } from "react";
//Material UI
import { Typography, Button, Tooltip, IconButton, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import makeStyles from "@mui/styles/makeStyles";
// icons
import skullsIcon from "../../../assets/icons/skulls.png";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
// constants
import { GIANT, HERO, MAGE } from "../../../constants/unitTypes";
import { LOSS_CALCULATOR } from "../../../constants/textsAndMessages";
// components and functions
import { LossCalcContext } from "../../../contexts/LossCalculatorContext";
import UnitLossCalculatorButton from "./UnitLossCalculatorButton";
import CustomIcon from "../../shared/statCards/CustomIcon";

const useStyles = makeStyles((theme) => ({
  typographyFont: {
    textAlign: "center",
    marginTop: "0.5em",
  },
  text: {
    paddingLeft: "1em",
  },
  test1: {
    padding: "2em",
  },
}));

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
   * Function immediately sets the number of lost elements or hitpoints to the maximum number possible.
   */
  const unitDestroyed = () => {
    let tempArray = [...calcContext.list];

    let unitIndex = tempArray.findIndex((u) => u.uniqueID === props.unit.uniqueID);
    tempArray[unitIndex].lossCounter = props.unit.maxCounter;
    tempArray[unitIndex].unitDestroyed = true;

    calcContext.setList([...tempArray]);
  };

  /**
   * Function marks all items as lost by setting all flags to true.
   */
  const allItemsMarkedLost = () => {
    props.unit.equipment.forEach((e) => (e.itemLost = true));
  };

  /**
   * Function prevents the user from choosing a number of lost elements larger than the number of elements or hitpoints the unit has.
   * @returns boolean flag
   */
  const notGreaterThanNumberOfIncrements = () => {
    return props.unit.lossCounter === props.unit.maxCounter;
  };
  const noGreaterThanNumberOfHitpoints = () => {
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

  const displayToolTipUnitLost = () => {
    let message;

    if (props.unit.unitType === HERO) {
      message = LOSS_CALCULATOR.LOST_HERO;
    } else if (props.unit.unitType === MAGE) {
      message = LOSS_CALCULATOR.LOST_MAGE;
    } else if (props.unit.unitType === GIANT) {
      message = LOSS_CALCULATOR.LOST_GIANT;
    } else {
      message = LOSS_CALCULATOR.UNIT_ROUTED;
    }

    return message;
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
    <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.test1} spacing={2}>
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

      <Typography variant="h6" className={classes.typographyFont}>
        {props.unit.lossCounter}
      </Typography>

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
        disableBttn={notGreaterThanNumberOfIncrements() || noGreaterThanNumberOfHitpoints()}
        icon={<KeyboardDoubleArrowRightIcon />}
      />

      <Tooltip title={<Typography variant="h6">{displayToolTipUnitLost()}</Typography>}>
        <IconButton
          onClick={() => {
            unitDestroyed();
            allItemsMarkedLost();
          }}
        >
          <CustomIcon
            icon={skullsIcon} //
            altText={LOSS_CALCULATOR.UNIT_ROUTED}
            height={40}
            width={40}
          />
        </IconButton>
      </Tooltip>
    </Grid>
  );
};

export default UnitLossCalcBttnGroup;
