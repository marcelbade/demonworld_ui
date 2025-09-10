// React
import { useContext } from "react";
// Material UI
import { IconButton, Tooltip, Typography } from "@mui/material";
// context
import { SelectionContext } from "../../../../../../contexts/selectionContext";
// icons
import deleteListIcon from "../../../../../../assets/icons/deleteListIcon.svg";

// constants
import { TOOLTIPS } from "../../../../../../constants/textsAndMessages";
// custom hooks
import useArmyValidation from "../../../../../../customHooks/UseArmyValidation";
import CustomIcon from "../../../../../shared/CustomIcon";

/**
 * Function renders a button that deletes the entire army list.
 * @param {{*}} props
 * @returns JSX
 */
const DeleteArmyListButton = (props) => {
  const SEC = useContext(SelectionContext);
  const validation = useArmyValidation();

  const deleteList = () => {
    SEC.setSelectedUnits([]);
    // pass emtpy array since all units are removed from the list
    const validationResult = validation.testArmySelectionAndRunValidation([], SEC.maxPointsAllowance);

    validation.testForDisabledSubFaction(validationResult.unitsBlockedbyRules);
  };

  return (
    <Tooltip title={<Typography>{TOOLTIPS.DELETE_ARMY_LIST}</Typography>}>
      <IconButton
        onClick={() => deleteList()} //
        size="large"
      >
        <CustomIcon
          icon={deleteListIcon} //
          altText={TOOLTIPS.DELETE_ARMY_LIST}
          height={"60px"}
          width={"60px"}
          boxHeight={"65px"}
          boxWidth={"65px"}
        />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteArmyListButton;
