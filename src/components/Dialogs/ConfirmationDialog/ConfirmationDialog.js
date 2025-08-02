// mui
import { Cancel, CheckBox } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Dialog, //
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2 as Grid,
  IconButton,
} from "@mui/material";

const ConfirmationDialog = (props) => {
  console.log("props.dialogBoxState >>>>", props.dialogBoxState);

  return (
    <Dialog
      open={props.showConfirmationDialog}
      onClose={props.closeAndConfirmationDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Grid
        container
        justifyContent="space-between"
        sx={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <DialogTitle
          id="alert-dialog-title" //
        >
          {props.type.CONFIRM_TITLE}
        </DialogTitle>
        <IconButton
          sx={{ marginRight: "0.5em" }}
          onClick={props.closeDialog} //
        >
          <Cancel color="error" />
        </IconButton>
      </Grid>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description" //
        >
          {props.type.CONFIRM_TEXT}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={props.confirmAndExecute} //
        >
          {props.type.CONFIRM}
        </Button>
        <Button
          variant="outlined"
          onClick={props.closeDialog} //
          autoFocus
        >
          {props.type.CANCEL}
        </Button>
      </DialogActions>
      <Grid
        container
        sx={{
          marginTop: "2em",
          marginBottom: "0.5em",
        }}
      >
        <Checkbox
          checked={props.dialogBoxState}
          onClick={props.setDialogBoxState}
          sx={{
            marginLeft: "1em",
            marginRight: "0.5em",
          }}
        />
        <DialogContentText
          id="alert-dialog-description" //
        >
          {props.type.DONT_SHOW_Dialog}
        </DialogContentText>
      </Grid>
    </Dialog>
  );
};

export default ConfirmationDialog;
