//  material ui
import { Button, Dialog, Grid2 as Grid } from "@mui/material";
// functions and components
// constants
import { PRINTABLE_LIST, PUSH_MESSAGE_TYPES } from "../../../constants/textsAndMessages";
import CustomDialogTitle from "../components/CustomDialogTitle";

/**
 * Functional component renders a dialog asking the user to
 * choose the type of list to print, default or detailed (all cards).
 * NOTE: the createPrintableFile({printDefaultList: true}) props requires
 * an object with the "printDefaultList" property.
 * @param {object} props
 *  - createPrintableFile: function that creates a pdf or txt and displays it in a new browser tab
 *  - showListTypeDialog: boolean, displays the dialog if true
 *  - setShowPrintTypeDialog : setter function, sets showListTypeDialog
 * @returns JSX element
 */
const SelectPrintTypeDialog = (props) => {
  const handleClose = () => {
    props.setShowPrintTypeDialog(false);
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
      open={props.showListTypeDialog} //
      onClose={handleClose}
    >
      <CustomDialogTitle
        title={PRINTABLE_LIST.SELECT_LIST_TYPE}
        handleClose={handleClose}
        displayHelpBttn={true}
        pushMessage={PRINTABLE_LIST.PRINT_CONTEXT_HELP}
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
            props.createPrintableFile({ printDefaultList: true });
            props.setShowPrintTypeDialog(false);
          }}
        >
          {PRINTABLE_LIST.CREATE_DEFAULT_LIST}
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            props.createPrintableFile({ printDefaultList: false });
            props.setShowPrintTypeDialog(false);
          }}
        >
          {PRINTABLE_LIST.CREATE_DETAILED_LIST}
        </Button>
      </Grid>
    </Dialog>
  );
};

export default SelectPrintTypeDialog;
