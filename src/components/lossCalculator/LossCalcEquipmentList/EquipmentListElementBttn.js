// React
import React, { useContext } from "react";
//Material UI
import { IconButton } from "@mui/material";
// components and functions
import { LossCalcContext } from "../../../contexts/LossCalculatorContext";
// icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const EquipmentListElementBttn = (props) => {
  const LC = useContext(LossCalcContext);

  /**
   * Function sets the value of the itemLost flag for one element (item) in the equipment array.
   * @param {unitCard} selectedUnit
   * @param {String} itemName Name of the item the unit was equipped with.
   * @param {boolean} isLost  flag shows whether the element is lost or not.
   */
  const setItemIsLostFlag = (selectedUnit, itemName, isLost) => {
    let tempArray = [...LC.list];

    let unitIndex = tempArray.findIndex((u) => u.uniqueID === selectedUnit.uniqueID);
    tempArray[unitIndex].equipment.forEach((e) => {
      if (e.name === itemName) {
        e.itemLost = isLost;
      }
    });

    LC.setList([...tempArray]);
  };

  return (
    <IconButton
      disabled={props.disableButton}
      onClick={() => {
        setItemIsLostFlag(props.unit, props.itemName, !props.isItemLost);
      }}
    >
      {props.isItemLost ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
    </IconButton>
  );
};

export default EquipmentListElementBttn;
