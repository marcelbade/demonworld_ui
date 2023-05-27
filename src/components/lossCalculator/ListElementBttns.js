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
// constants
import { GIANT, HERO, MAGE } from "../../constants/unitTypes";
// components and functions
import { LossCalcContext } from "../../contexts/LossCalculatorContext";

const useStyles = makeStyles((theme) => ({
  bttns: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",

      "@media (orientation:landscape)": {
        flexDirection: "row",
      },
    },
  },

  typographyFont: {
    fontFamily: "NotMaryKate",
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
    fontFamily: "NotMaryKate",
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

  /**
   * Function lets the user subtract lost elements.
   */
  const subtractLoss = () => {
    let tempArray = [...calcContext.list];

    let unitIndex = tempArray.findIndex((u) => u.uniqueID === props.unit.uniqueID);
    --tempArray[unitIndex].lossCounter;

    calcContext.setList([...tempArray]);
  };

  /**
   * Function immediately sets the number of lost elements to the maximum number possible.
   */
  const unitDestroyed = () => {
    let tempArray = [...calcContext.list];

    let unitIndex = tempArray.findIndex((u) => u.uniqueID === props.unit.uniqueID);
    tempArray[unitIndex].lossCounter = props.unit.numberOfElements;
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
   * Function prevents the user from choosing a number of lost elements larger than the number of elements the unit has.
   * @returns boolean flag
   */
  const notOverNumberOfElements = () => {
    return props.unit.lossCounter === props.unit.numberOfElements;
  };

  /**
   * Function prevents the user from choosing a negative number of lost elements.
   * @returns  boolean flag
   */
  const notUnderZero = () => {
    return props.unit.lossCounter === 0;
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

  return (
    <Stack direction="row" spacing={2}>
      {/* units that have only a single element do not need these buttons */}

      <ButtonGroup variant="contained">
        <Button
          onClick={() => {
            subtractLoss();
          }}
          disabled={notUnderZero()}
          className={classes.bttn}
        >
          <ChevronLeftIcon />
        </Button>
        <Typography variant="h6" className={classes.typographyFont}>
          {props.unit.lossCounter}
        </Typography>
        <Button
          onClick={() => {
            addLoss();
          }}
          disabled={notOverNumberOfElements()}
          className={classes.bttn}
        >
          <ChevronRightIcon />
        </Button>
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
