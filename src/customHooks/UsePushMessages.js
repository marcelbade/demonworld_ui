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

  const [messageVariant, setMessageVariant] = useState({
    type: PUSH_MESSAGE_TYPES.ERROR, //
    mustPersist: false,
  });

  const showSnackBar = (text, messageType) => {
    switch (messageType) {
      case PUSH_MESSAGE_TYPES.ERROR:
        break;
      case PUSH_MESSAGE_TYPES.INFO:
        setMessageVariant({
          ...messageVariant,
          type: PUSH_MESSAGE_TYPES.INFO, //
          mustPersist: true,
        });
        break;
      default:
        throw new Error("Hook received unknown push message type.");
    }

    console.log("messageVariant");
    console.log(messageVariant);

    enqueueSnackbar(text, {
      persist: messageVariant.mustPersist,
      autoHideDuration: 3000,
      variant: messageVariant.type,
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
