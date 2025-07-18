// mui
import {
  Button,
  Dialog, //
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { LOAD_ARMY_LIST_DIALOG } from "../../../constants/textsAndMessages";

const DeleteConfirmationDialog = (props) => {
  return (
    <Dialog
      open={props.showConfirmationDialog}
      onClose={props.closeAndConfirmationDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title" //
      >
        {LOAD_ARMY_LIST_DIALOG.ConfirmationDialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description" //
        >
          {LOAD_ARMY_LIST_DIALOG.ConfirmationDialogText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.confirmAndDeleteList} //
        >
          {LOAD_ARMY_LIST_DIALOG.ConfirmationDialogButtonConfirm}
        </Button>
        <Button
          onClick={props.closeAndConfirmationDialog} //
          autoFocus
        >
          {LOAD_ARMY_LIST_DIALOG.ConfirmationDialogButtonCancel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
