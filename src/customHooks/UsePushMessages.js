// material ui
import { IconButton } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// notistack
import { useSnackbar } from "notistack";
import { useState } from "react";
import { PUSH_MESSAGE_TYPES } from "../constants/textsAndMessages";

const usePushMessages = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [messageVariant, setMessageVariant] = useState(PUSH_MESSAGE_TYPES.ERROR);

  const showSnackBar = (text, messageType) => {
    switch (messageType) {
      case PUSH_MESSAGE_TYPES.ERROR:
        break;
      case PUSH_MESSAGE_TYPES.INFO:
        setMessageVariant(PUSH_MESSAGE_TYPES.INFO);
        break;
      default:
        throw new Error("Hook received unknown push message type.");
    }

    enqueueSnackbar(text, {
      persist: false,
      autoHideDuration: 3000,
      variant: messageVariant,
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
