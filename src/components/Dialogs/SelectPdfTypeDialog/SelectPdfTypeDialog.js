//  material ui
import { Button, Dialog, DialogTitle, Grid2 as Grid, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
// functions and components
import ContextHelpButton from "../../shared/ContextHelpButton";
// constants
import { PDF, PUSH_MESSAGE_TYPES } from "../../../constants/textsAndMessages";

const SelectPdfTypeDialog = (props) => {
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
        justifyItems="center"
        justifyContent="center"
      >
        <Grid
          container //
          item
          size={12}
          justifyContent="flex-end"
        >
          <IconButton
            onClick={handleClose} //
          >
            <CancelIcon />
          </IconButton>
        </Grid>
        <Grid
          container //
          item
          size={12}
          flexDirection="row"
          justifyContent="center"
        >
          <DialogTitle>{PDF.SELECT_PDF_TYPE}</DialogTitle>

          <ContextHelpButton
            isVisible={true}
            message={PDF.PDF_CONTEXT_HELP} //
            type={PUSH_MESSAGE_TYPES.INFO}
          />
        </Grid>
        <Grid
          container //
          item
          justifyContent="space-between"
          sx={{
            width: "90%",
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
      </Grid>
    </Dialog>
  );
};

export default SelectPdfTypeDialog;
