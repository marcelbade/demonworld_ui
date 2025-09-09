// material ui
import { IconButton } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// notistack
import { useSnackbar } from "notistack";
import { PUSH_MESSAGE_TYPES } from "../constants/textsAndMessages";

const usePushMessages = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  /**
   * Function invokes a toast message (push message) when called. 
   * The Message will display the passed text and have the color 
   * of the passed message type:
   * - ERROR: red
   * - INFO: blue
   * - SUCCESS: green
   * @param {String} text - any message as String
   * @param {String} messageType - one of the three enums 
   */
  const showSnackBar = (text, messageType) => {
    enqueueSnackbar(text, {
      persist: false,
      autoHideDuration: 3000,
      variant: messageType,
      action: () => (
        <IconButton
          size="small" //
          onClick={() => closeSnackbar()}
        >
          <CancelIcon />
        </IconButton>
      ),
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  return {
    showSnackBar: showSnackBar,
  };
};

export default usePushMessages;
