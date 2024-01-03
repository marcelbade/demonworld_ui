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
  const calcContext = useContext(LossCalcContext);

  return (
    <IconButton
      disabled={props.disableButton}
      onClick={() => {
        calcContext.setItemIsLostFlag(props.unit, props.itemName, !props.isItemLost);
      }}
    >
      {props.isItemLost ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
    </IconButton>
  );
};

export default EquipmentListElementBttn;
