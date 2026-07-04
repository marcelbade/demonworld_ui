// React
import { useContext, useState } from "react";
// Material UI
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle, //
  TextField,
  IconButton,
  Grid,
  useTheme,
} from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// functions and components
import NavigationButton from "../../shared/navigation/NavigationButton";
// contexts
import { UserContext } from "../../../contexts/userContext";
import { MenuContext } from "../../../contexts/MenuContext";
//  constants
import { LOGIN_USER_URL } from "../../../constants/URLs";
import { USER_AUTH } from "../../../constants/textsAndMessages";
//  custom hooks
import useAxios from "../../../customHooks/UseAxios";

const LoginDialog = () => {
  const UC = useContext(UserContext);
  const MC = useContext(MenuContext);

  const theme = useTheme();
  const callAxios = useAxios();

  const [inputUserNameError, setInputUserNameError] = useState(false);
  const [inputPasswordError, setInputPasswordError] = useState(false);

  const handleClose = () => {
    UC.setDisplayLogInDialog(false);
  };

  const callLogIn = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    callAxios.sendData(
      JSON.stringify({
        userName: formData.get("name"),
        password: formData.get("pw"),
      }),
      LOGIN_USER_URL,
      loginUser,
      null,
      USER_AUTH.LOGIN_SUCCESSFULL,
    );
  };

  const loginUser = (data) => {
    UC.setUser({
      ...UC.user,
      userName: data?.userName,
      isAdmin: data?.isAdmin,
      isOwner: data?.isOwner,
      token: data?.token,
    });

    UC.setDisplayLogInDialog(false);
    MC.setOpenMenu(false);
    UC.setUserLoggedIn(true);
    MC.setblockDialog({
      ...MC.blockDialog,
      showOverrideDialog: data?.displayOverrideConfirmation,
      showDeletionDialog: data?.displayDeleteConfirmation,
    });
  };

  const resetInputUserError = () => {
    setInputUserNameError(false);
  };

  const resetInputPasswordError = () => {
    setInputPasswordError(false);
  };

  return (
    <Dialog
      component={"form"}
      onSubmit={(event) => {
        callLogIn(event);
      }}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            minWidth: "50em",
            height: "25em",
          },
        },
      }}
      open={UC.displayLogInDialog}
      onClose={handleClose}
    >
      <Grid
        container //
        direction={"row"}
        sx={{justifyContent:"space-between", ...theme.palette.dialogs.title}}
      >
        <DialogTitle>{USER_AUTH.LOGIN_DIALOG_TITLE}</DialogTitle>
        <IconButton
          sx={{ marginRight: "1em" }} //
          onClick={handleClose}
        >
          <CancelIcon color="error" />
        </IconButton>
      </Grid>
      <DialogContent>
        <Grid //
          container
          sx={{  direction:"column"}}
        >
          <TextField
            onChange={() => {
              resetInputUserError();
            }}
            autoFocus //
            required
            id="name"
            name="name"
            variant="outlined"
            label={USER_AUTH.LOGIN_USER}
            error={inputUserNameError}
            helperText={inputUserNameError ? USER_AUTH.UNKNOWN_USER : null}
          />
          <TextField
            sx={{ marginTop: "2em" }}
            onChange={() => {
              resetInputPasswordError();
            }}
            required
            id="outlined-password-input" //
            name="pw"
            variant="outlined"
            label={USER_AUTH.LOGIN_PW}
            type="password"
            error={inputPasswordError}
            helperText={inputUserNameError ? USER_AUTH.INVALID_PW : null}
          />
        </Grid>
      </DialogContent>
      <Grid //
        container
   
    
        sx={{       alignContent:"center",  justifyContent:"space-around", marginBottom: "1em" }}
      >
        <NavigationButton
          displayNavigatonBttn={true}
          relativeURL={"/addNewAccount"} //
          textButtonVariant={"outlined"}
          isIconButton={false}
          toolTipText={USER_AUTH.CREATE_NEW_ACCOUNT}
          openMenu={UC.setDisplayLogInDialog}
          closingFunction={UC.setDisplayLogInDialog}
        />

        <Button
          variant="outlined" //
          type="submit"
        >
          {USER_AUTH.LOGIN_ACTION}
        </Button>
      </Grid>
    </Dialog>
  );
};

export default LoginDialog;
