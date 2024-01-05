// react
import React, { useContext } from "react";
// material ui
import { Tooltip, IconButton, Typography } from "@material-ui/core";
// functions and components
import CustomIcon from "../../shared/statCards/CustomIcon";
import { LossCalcContext } from "../../../contexts/LossCalculatorContext";
// icons
import skullsIcon from "../../../assets/icons/skulls.png";
// constants
import { LOSS_CALCULATOR } from "../../../constants/textsAndMessages";
import { GIANT, HERO, MAGE } from "../../../constants/unitTypes";

const TotalLossButton = (props) => {
  const calcContext = useContext(LossCalcContext);

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
   * Functions selects the correct message to be displayed as tool tip if the
   * unit has been completely destroyed.
   * @returns the correct message from the text file.
   */
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

  return (
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
  );
};

export default TotalLossButton;
