// react
import React, { useContext } from "react";
// material ui
import { IconButton } from "@mui/material";
// functions and components
import CustomIcon from "../../shared/CustomIcon";
import { LossCalcContext } from "../../../contexts/LossCalculatorContext";
// icons
import skullsIcon from "../../../assets/icons/skulls.png";

const TotalLossButton = (props) => {
  const LC = useContext(LossCalcContext);

  /**
   * Function immediately sets the number of lost elements or hitpoints to the maximum number possible.
   */
  const unitDestroyed = () => {
    let tempArray = [...LC.list];

    let unitIndex = tempArray.findIndex((u) => u.uniqueID === props.unit.uniqueID);
    tempArray[unitIndex].lossCounter = props.unit.maxHitpointCounter;
    tempArray[unitIndex].unitDestroyed = true;

    LC.setList([...tempArray]);
  };

  /**
   * Function marks all items as lost by setting all flags to true.
   */
  const allItemsMarkedLost = () => {
    props.unit.equipment.forEach((e) => (e.itemLost = true));
  };

  return (
    <IconButton
      sx={{ height: "100%", width: "100%" }}
      onClick={() => {
        unitDestroyed();
        allItemsMarkedLost();
      }}
    >
      <CustomIcon
        icon={skullsIcon} //
        boxHeight={60}
        boxWidth={60}
        height={40}
        width={40}
      />
    </IconButton>
  );
};

export default TotalLossButton;
