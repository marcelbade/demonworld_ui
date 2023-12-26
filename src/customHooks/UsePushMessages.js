// material ui
import { IconButton } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// notistack
import { useSnackbar } from "notistack";

const usePushMessages = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showSnackBar = (text) => {
    enqueueSnackbar(text, {
      persist: false,
      autoHideDuration: 3000,
      variant: "error",
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

  return { showSnackBar: showSnackBar };
};

export default usePushMessages;
