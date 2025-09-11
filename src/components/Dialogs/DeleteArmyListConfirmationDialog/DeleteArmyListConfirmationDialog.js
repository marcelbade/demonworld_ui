//  material ui
import { Button, Dialog, Grid2 as Grid, useTheme } from "@mui/material";
// constants
import { DELETE_ARMY_DIALOG } from "../../../constants/textsAndMessages";
import CustomDialogTitle from "../components/CustomDialogTitle";

const DeleteArmyListConfirmationDialog = (props) => {
  const theme = useTheme();

  const handleClose = () => {
    props.setShowPdfTypePrompt(false);
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            minWidth: "30em",
            height: "15em",
            borderRadius: "1em",
          },
        },
      }}
      open={props.showPdfTypePrompt} //
      onClose={handleClose}
    >
      <CustomDialogTitle
        displayHelpBttn={false} //
        title={DELETE_ARMY_DIALOG.DIALOG_TITLE}
        handleClose={handleClose}
      />
      <Grid
        container //
        alignContent="center"
        justifyContent="space-around"
        sx={{
          marginTop: "2em",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            //  TODO
          }}
        >
          {DELETE_ARMY_DIALOG.CONFIRMATION}
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            //  TODO
          }}
        >
          {DELETE_ARMY_DIALOG.CANCEL}
        </Button>
      </Grid>
    </Dialog>
  );
};

export default DeleteArmyListConfirmationDialog;
