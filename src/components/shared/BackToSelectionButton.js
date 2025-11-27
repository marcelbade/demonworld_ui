// React
import { useContext, useState } from "react";
// Material UI
import { IconButton, Tooltip } from "@mui/material";
// functions and components
import ConfirmationDialog from "../Dialogs/ConfirmationDialog/ConfirmationDialog";
// context
import { ArmyContext } from "../../contexts/armyContext";
import { SelectionContext } from "../../contexts/selectionContext";
// icons
import ReplayIcon from "@mui/icons-material/Replay";
// constants
import { CONFIRMATION_DIALOG, OPTIONS } from "../../constants/textsAndMessages";
import { NONE } from "../../constants/factions";
// custom hooks
import useConfirmationDialogSettings from "../../customHooks/UseConfirmationDialogSettings";

/**
 * Com
 * @param {{*}} props
 * @returns JSX
 */
const BackToSelectionButton = (props) => {
  const AC = useContext(ArmyContext);
  const SEC = useContext(SelectionContext);

  const dialogSettings = useConfirmationDialogSettings();

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const submit = () => {
    if (SEC.selectedUnits.length !== 0) {
      setShowConfirmationDialog(true);
    } else {
      AC.setSelectedFactionName(NONE);
    }
  };

  const BackToSelectionButton = () => {
    AC.setSelectedFactionName(NONE);
  };

  const closeConfirmationDialog = () => {
    setShowConfirmationDialog(false);
  };

  return (
    <>
      <Tooltip title={OPTIONS.CHANGE_SELECTED_FACTION}>
        <IconButton
          onClick={() => {
            submit();
          }}
        >
          <ReplayIcon sx={{ fontSize: props.iconSize }} />
        </IconButton>
      </Tooltip>
      <ConfirmationDialog
        type={CONFIRMATION_DIALOG.DELETE}
        showConfirmationDialog={showConfirmationDialog} //
        confirmAndExecute={BackToSelectionButton}
        closeDialog={closeConfirmationDialog}
        dialogBoxState={dialogSettings.showDeletionDialog}
        setDialogBoxState={dialogSettings.setDeletetionDialogSetting}
      />
    </>
  );
};

export default BackToSelectionButton;
