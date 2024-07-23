// React
import React, { useContext } from "react";
// Material UI
import { IconButton, Tooltip, Typography } from "@mui/material";
// context
import { ArmyContext } from "../../contexts/armyContext";
// icons
import ReplayIcon from "@mui/icons-material/Replay";
// constants
import { OPTIONS } from "../../constants/textsAndMessages";
import { NONE } from "../../constants/factions";

/**
 * Com
 * @param {{*}} props
 * @returns JSX
 */
const BackToSelectionButton = (props) => {
  const AC = useContext(ArmyContext);

  return (
    <Tooltip title={<Typography>{OPTIONS.CHANGE_SELECTED_FACTION}</Typography>}>
      <IconButton
        onClick={() => {
          AC.setSelectedFactionName(NONE);
        }}
      >
        <ReplayIcon />
      </IconButton>
    </Tooltip>
  );
};

export default BackToSelectionButton;
