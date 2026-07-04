// mui
import { Cancel } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Dialog, //
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";

const ConfirmationDialog = (props) => {
  const theme = useTheme();

  return (
    <Dialog
      open={props.showConfirmationDialog}
      onClose={props.closeAndConfirmationDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Grid
        container //
        justifyContent="space-between"
        sx={theme.palette.dialogs.title}
      >
        <DialogTitle
          id="alert-dialog-title" //
        >
          {props.type.CONFIRM_TITLE}
        </DialogTitle>
        <IconButton
          sx={{ marginRight: "0.5em" }}
          onClick={() => {
            props.closeDialog();
          }} //
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
          onClick={() => {
            props.confirmAndExecute();
            props.closeDialog();
          }} //
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
        alignContent="center"
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
            marginBottom: "0.1em",
          }}
        />
        <DialogContentText
          id="alert-dialog-description" //
          alignContent="center"
        >
          {props.type.DONT_SHOW_Dialog}
        </DialogContentText>
      </Grid>
    </Dialog>
  );
};

export default ConfirmationDialog;
