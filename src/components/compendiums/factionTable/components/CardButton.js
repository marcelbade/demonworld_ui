// react
import React from "react";
// material ui
import { IconButton } from "@mui/material";
// icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";

const CardButton = (props) => {
  return (
    <IconButton
      onClick={() => {
        props.toggleUnitCard(props.unit);
      }}
      size="large"
    >
      {props.selectedStatCards.includes(props.unit.faction + props.unit.unitName) ? <CloseIcon /> : <ArrowForwardIosIcon />}
    </IconButton>
  );
};

export default CardButton;
