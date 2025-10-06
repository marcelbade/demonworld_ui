// React
import { useContext, useState } from "react";
// Material UI
import { IconButton, Tooltip } from "@mui/material";
// context
import { SelectionContext } from "../../../../../../contexts/selectionContext";
// icons
import deleteListIcon from "../../../../../../assets/icons/deleteListIcon.svg";
// constants
import { CONFIRMATION_DIALOG, TOOLTIPS } from "../../../../../../constants/textsAndMessages";
// functions and components
import CustomIcon from "../../../../../shared/CustomIcon";
import ConfirmationDialog from "../../../../../Dialogs/ConfirmationDialog/ConfirmationDialog";
// custom hooks
import useArmyValidation from "../../../../../../customHooks/UseArmyValidation";
import useConfirmationDialogSettings from "../../../../../../customHooks/UseConfirmationDialogSettings";

/**
 * Function renders a button that deletes the entire army list.
 * @returns JSX
 */
const DeleteArmyListButton = () => {
  const SEC = useContext(SelectionContext);
  const validation = useArmyValidation();

  const dialogSettings = useConfirmationDialogSettings();

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const submit = () => {
    setShowConfirmationDialog(true);
  };

  const deleteList = () => {
    SEC.setSelectedUnits([]);
    // pass emtpy array since all units are removed from the list
    const validationResult = validation.testArmySelectionAndRunValidation([], SEC.maxPointsAllowance);

    validation.testForDisabledSubFaction(validationResult.unitsBlockedbyRules);
  };

  const closeConfirmationDialog = () => {
    setShowConfirmationDialog(false);
  };

  return (
    <>
      <Tooltip title={TOOLTIPS.DELETE_ARMY_LIST}>
        <IconButton
          onClick={() => submit()} //
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
      <ConfirmationDialog
        type={CONFIRMATION_DIALOG.DELETE}
        showConfirmationDialog={showConfirmationDialog} //
        confirmAndExecute={deleteList}
        closeDialog={closeConfirmationDialog}
        dialogBoxState={dialogSettings.showDeletionDialog}
        setDialogBoxState={dialogSettings.setDeletetionDialogSetting}
      />
    </>
  );
};

export default DeleteArmyListButton;
