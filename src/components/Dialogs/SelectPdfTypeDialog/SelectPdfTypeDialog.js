//  material ui
import { Button, Dialog, Grid2 as Grid } from "@mui/material";
// functions and components
// constants
import { PDF, PUSH_MESSAGE_TYPES } from "../../../constants/textsAndMessages";
import CustomDialogTitle from "../components/CustomDialogTitle";

const SelectPdfTypeDialog = (props) => {
  const handleClose = () => {
    props.setShowPdfTypeDialog(false);
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
      open={props.showPdfTypeDialog} //
      onClose={handleClose}
    >
      <CustomDialogTitle
        title={PDF.SELECT_PDF_TYPE}
        handleClose={handleClose}
        displayHelpBttn={true}
        pushMessage={PDF.PDF_CONTEXT_HELP}
        pushMessageType={PUSH_MESSAGE_TYPES.INFO}
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
            props.openPDfInNewTab({ printDefaultList: true });
            props.setShowPdfTypeDialog(false);
          }}
        >
          {PDF.CREATE_DEFAULT_LIST}
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            props.openPDfInNewTab({ printDefaultList: false });
            props.setShowPdfTypeDialog(false);
          }}
        >
          {PDF.CREATE_DETAILED_LIST}
        </Button>
      </Grid>
    </Dialog>
  );
};

export default SelectPdfTypeDialog;
