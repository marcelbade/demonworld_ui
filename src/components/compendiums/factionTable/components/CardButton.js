// react
import React, { useContext } from "react";
// material ui
import { IconButton } from "@mui/material";
// components & functions
import { TableContext } from "../../../../contexts/tableContext";
// icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";

const CardButton = (props) => {
  const TC = useContext(TableContext);

  return (
    <IconButton
      onClick={() => {
        TC.toggleUnitCard(props.unit);
      }}
      size="large"
    >
      {TC.selectedStatCards.includes(props.unit.faction + props.unit.unitName) ? <CloseIcon /> : <ArrowForwardIosIcon />}
    </IconButton>
  );
};

export default CardButton;
