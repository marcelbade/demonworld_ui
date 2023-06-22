// React
import React, { useContext } from "react";
//Material UI
import { Typography, ButtonGroup, Button, Tooltip, IconButton } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
// icons
import skullsIcon from "../../icons/skulls.png";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
// constants
import { GIANT, HERO, MAGE } from "../../constants/unitTypes";
// components and functions
import { LossCalcContext } from "../../contexts/LossCalculatorContext";
import LossCalculatorButton from "./LossCalculatorButton";

const useStyles = makeStyles((theme) => ({
 
  typographyFont: {
    textAlign: "center",
    marginTop: "0.5em",
  },
  text: {
    paddingLeft: "1em",
  },
  bttn: {
    width: "1em",
    height: "4em",
  },
  tooltipText: {
    fontSize: "20px",
  },
}));

const ListElementBttns = (props) => {
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

  const displayToolTip = () => {
    let message;

    if (props.unit.unitType === HERO) {
      message = "Held verloren";
    } else if (props.unit.unitType === MAGE) {
      message = "Magier verloren";
    } else if (props.unit.unitType === GIANT) {
      message = "Großelement verloren";
    } else {
      message = "Einheit aufgerieben";
    }

    return message;
  };

  /**
   * Function checks, if a unit has more than 1 element and more than 1 HP per element.
   * @returns true, if the unit has multiple elements and HP.
   */
  const morethanOneElementAndMultipleHP = () => {
    return props.unit.hitpoints > 1 && props.unit.numberOfElements > 1;
  };

  return (
    <Stack direction="row"  spacing={2}>
      <ButtonGroup variant="contained">
        <LossCalculatorButton
          displayButton={morethanOneElementAndMultipleHP()}
          function={subtractFullUnit}
          disablerExpression={notLessThanZero() || notLessThanOneUnit()}
          icon={<KeyboardDoubleArrowLeftIcon />}
        />
        <LossCalculatorButton
          displayButton={true}
          function={subtractLoss}
          disablerExpression={notLessThanZero()}
          icon={<ChevronLeftIcon />}
        />
        <Typography variant="h6" className={classes.typographyFont}>
          {props.unit.lossCounter}
        </Typography>
        <LossCalculatorButton
          displayButton={true}
          function={addLoss}
          disablerExpression={notGreaterThanNumberOfIncrements()}
          icon={<ChevronRightIcon />}
        />
        <LossCalculatorButton
          displayButton={morethanOneElementAndMultipleHP()}
          function={addFullUnit}
          disablerExpression={notGreaterThanNumberOfIncrements() || noGreaterThanNumberOfHitpoints()}
          icon={<KeyboardDoubleArrowRightIcon />}
        />
      </ButtonGroup>

      <Tooltip title={<Typography className={classes.tooltipText}>{displayToolTip()}</Typography>}>
        <IconButton
          variant="contained"
          component={Button}
          onClick={() => {
            unitDestroyed();
            allItemsMarkedLost();
          }}
          className={classes.bttn}
        >
          <img src={skullsIcon} alt="Einheit aufgerieben" height={40} width={40} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default ListElementBttns;
