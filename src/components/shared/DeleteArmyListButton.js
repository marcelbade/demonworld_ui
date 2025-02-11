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
// custom hooks
import useArmyValidation from "../../customHooks/UseArmyValidation";

/**
 * Function renders a button that deletes the entire army list.
 * @param {{*}} props
 * @returns JSX
 */
const DeleteArmyListButton = () => {
  const SEC = useContext(SelectionContext);
  const validation = useArmyValidation();

  return (
    <Tooltip title={<Typography>{TOOLTIPS.DELETE_ARMY_LIST}</Typography>}>
      <IconButton
        variant="outlined"
        onClick={() => {
          SEC.setSelectedUnits([]);
          // pass emtpy array since all units are removed from the list
          const validationResult = validation.validateList([], SEC.maxPointsAllowance);

          validation.testForDisabledSubFaction(validationResult.unitsBlockedbyRules);
        }}
        size="large"
      >
        <CancelIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteArmyListButton;
