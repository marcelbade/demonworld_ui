// React
import React, { useContext } from "react";
// Material UI
import { IconButton, Tooltip, Typography } from "@mui/material";
// context
import { SelectionContext } from "../../contexts/selectionContext";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// constants
import { TOOLTIPS } from "../../constants/textsAndMessages";

/**
 * Function renders a button that deletes the entire army list.
 * @param {{*}} props
 * @returns JSX
 */
const DeleteArmyListButton = () => {
  const SEC = useContext(SelectionContext);

  return (
    <Tooltip title={<Typography>{TOOLTIPS.DELETE_ARMY_LIST}</Typography>}>
      <IconButton
        variant="outlined"
        onClick={() => {
          SEC.setSelectedUnits([]);
        }}
        size="large"
      >
        <CancelIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteArmyListButton;
