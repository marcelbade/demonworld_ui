// react
import React, { useContext } from "react";
// material ui
import { IconButton } from "@material-ui/core";
// functions and components
import CustomIcon from "../../shared/statCards/CustomIcon";
import { LossCalcContext } from "../../../contexts/LossCalculatorContext";
// icons
import skullsIcon from "../../../assets/icons/skulls.png";
// constants
import { LOSS_CALCULATOR } from "../../../constants/textsAndMessages";
 
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
