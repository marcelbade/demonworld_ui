// mui
import {
  Button,
  Dialog, //
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

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
        {props.type.CONFIRM_TITLE}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description" //
        >
          {props.type.CONFIRM_TEXT}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={props.confirmAndExecute} //
        >
          {props.type.CONFIRM}
        </Button>
        <Button
          variant="text"
          onClick={props.closeDialog} //
          autoFocus
        >
          {props.type.CANCEL}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
