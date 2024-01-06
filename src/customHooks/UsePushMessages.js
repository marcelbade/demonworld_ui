// material ui
import { IconButton } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// notistack
import { useSnackbar } from "notistack";
import { PUSH_MESSAGE_TYPES } from "../constants/textsAndMessages";

const usePushMessages = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showSnackBar = (text, messageType) => {
    enqueueSnackbar(text, {
      persist: messageType === PUSH_MESSAGE_TYPES.ERROR ? false : true,
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
