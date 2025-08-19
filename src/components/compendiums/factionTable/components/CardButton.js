// react
import { useContext } from "react";
// material ui
import { IconButton } from "@mui/material";
// components & functions
import { CompendiumContext } from "../../../../contexts/compendiumContext";
// icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
// custom hooks
import useCompendiumTableControl from "../../../../customHooks/UseCompendiumTableControl";

const CardButton = (props) => {
  const CC = useContext(CompendiumContext);
  const compendiumTableControl = useCompendiumTableControl();

  return (
    <IconButton
      onClick={() => {
        compendiumTableControl.toggleUnitCard(props.unit);
      }}
      size="large"
    >
      {CC.selectedStatCards.includes(props.unit.faction + props.unit.unitName) ? <CloseIcon /> : <ArrowForwardIosIcon />}
    </IconButton>
  );
};

export default CardButton;
