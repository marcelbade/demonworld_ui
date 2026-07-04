//  material ui
import { DialogTitle, Grid, IconButton, useTheme } from "@mui/material";
// functions and components
import ContextHelpButton from "../../shared/ContextHelpButton";
// icon
import CancelIcon from "@mui/icons-material/Cancel";

const CustomDialogTitle = (props) => {
  const theme = useTheme();

  return (
    <Grid
      container //
      justifyContent="center"
      sx={theme.palette.dialogs.title}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <ContextHelpButton
        isVisible={props.displayHelpBttn}
        message={props.pushMessage} //
        type={props.pushMessageType}
      />
      <IconButton
        onClick={props.handleClose} //
      >
        <CancelIcon color="error" />
      </IconButton>
    </Grid>
  );
};

export default CustomDialogTitle;
