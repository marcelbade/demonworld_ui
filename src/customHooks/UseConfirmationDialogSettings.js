// context
import { useContext } from "react";
import { MenuContext } from "../contexts/MenuContext";
// custom hooks
import useAxios from "./UseAxios";
// constants
import { SET_OVERRIDE_DIALOG_URL, SET_DELETE_DIALOG_URL } from "../constants/URLs";
import { CONFIRMATION_DIALOG } from "../constants/textsAndMessages";
import { UserContext } from "../contexts/userContext";

const useConfirmationDialogSettings = () => {
 
  const UC = useContext(UserContext);
  const MC = useContext(MenuContext);

  const callAxios = useAxios();

  const setOverrideDialogSetting = () => {
    MC.setblockDialog({
      ...MC.blockDialog,
      showOverrideDialog: !MC.blockDialog.showOverrideDialog,
    });

    storeOverrideDialogSetting();
  };

  const setDeletetionDialogSetting = () => {
    MC.setblockDialog({
      ...MC.blockDialog,
      showDeletionDialog: !MC.blockDialog.showDeletionDialog,
    });

    storeDeletionDialogSetting();
  };

  const storeOverrideDialogSetting = () => {
    callAxios.storeData(
      JSON.stringify({
        userName: UC.user.userName,
        displayOverrideConfirmation: !MC.blockDialog.showOverrideDialog,
      }),
      SET_OVERRIDE_DIALOG_URL,
      null,
      CONFIRMATION_DIALOG.PUSH_MESSAGE
    );
  };

  const storeDeletionDialogSetting = () => {
    callAxios.storeData(
      JSON.stringify({
        userName: UC.user.userName,
        displayDeletionConfirmation: !MC.blockDialog.showDeletionDialog,
      }),
      SET_DELETE_DIALOG_URL,
      null,
      CONFIRMATION_DIALOG.PUSH_MESSAGE
    );
  };

  return {
    showOverrideDialog: MC.blockDialog.showOverrideDialog,
    showDeletionDialog: MC.blockDialog.showDeletionDialog,
    setOverrideDialogSetting: setOverrideDialogSetting,
    setDeletetionDialogSetting: setDeletetionDialogSetting,
  };
};

export default useConfirmationDialogSettings;
