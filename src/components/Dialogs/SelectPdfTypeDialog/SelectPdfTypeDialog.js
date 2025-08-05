//  material ui
import { Button, Dialog, DialogTitle, Grid2 as Grid, IconButton, useTheme } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
// functions and components
import ContextHelpButton from "../../shared/ContextHelpButton";
// constants
import { PDF, PUSH_MESSAGE_TYPES } from "../../../constants/textsAndMessages";

const SelectPdfTypeDialog = (props) => {
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
      <Grid
        container //
        justifyContent="center"
        sx={theme.palette.dialogs.title}
      >
        <DialogTitle>{PDF.SELECT_PDF_TYPE}</DialogTitle>
        <ContextHelpButton
          isVisible={true}
          message={PDF.PDF_CONTEXT_HELP} //
          type={PUSH_MESSAGE_TYPES.INFO}
        />
        <IconButton
          onClick={handleClose} //
        >
          <CancelIcon color="error" />
        </IconButton>
      </Grid>
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
            props.setShowPdfTypePrompt(false);
          }}
        >
          {PDF.CREATE_DEFAULT_LIST}
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            props.openPDfInNewTab({ printDefaultList: false });
            props.setShowPdfTypePrompt(false);
          }}
        >
          {PDF.CREATE_DETAILED_LIST}
        </Button>
      </Grid>
    </Dialog>
  );
};

export default SelectPdfTypeDialog;
