// React
import React, { useContext } from "react";
//Material UI
import { ListItemIcon } from "@material-ui/core";
// components and functions
import { LossCalcContext } from "../../../contexts/LossCalculatorContext";
// icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { ListItemButton } from "@mui/material";

const EquipmentListElementBttn = (props) => {
  const calcContext = useContext(LossCalcContext);

  /**
   * Function displays the correct icon depending on a Boolean flag.
   * @returns an html icon element from the Materail UI framework.
   */
  const iconToDisplay = () => {
    return props.isItemLost ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />;
  };

  return (
    <ListItemButton
    disabled={props.disableButton}
      onClick={() => {
        calcContext.setItemIsLostFlag(props.unit, props.itemName, !props.isItemLost);
      }}
    >
      <ListItemIcon>{iconToDisplay()}</ListItemIcon>
    </ListItemButton>
  );
};

export default EquipmentListElementBttn;
