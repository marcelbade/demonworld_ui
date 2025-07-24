// mui
import {
  Button,
  Dialog, //
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { CONFIRMATION_DIALOG } from "../../../constants/textsAndMessages";

const ConfirmationDialog = (props) => {
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
        {CONFIRMATION_DIALOG[props.type].CONFIRM_TITLE}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description" //
        >
          {CONFIRMATION_DIALOG[props.type].CONFIRM_TEXT}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.confirmAndExecute} //
        >
          {CONFIRMATION_DIALOG[props.type].CONFIRM}
        </Button>
        <Button
          onClick={props.closeDialog} //
          autoFocus
        >
          {CONFIRMATION_DIALOG[props.type].CANCEL}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
