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
  Grid2 as Grid,
} from "@mui/material";
//axios
import axios from "axios";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// functions and components
import NaviButton from "../landingPage/NaviButton";
// contexts
import { UserContext } from "../../contexts/userContext";
import { ServerErrorContext } from "../../contexts/serverErrorContext";
import { LOGIN_USER_URL } from "../../constants/URLs";
//  constants
import { USER_AUTH } from "../../constants/textsAndMessages";

const LoginDialog = () => {
  const UC = useContext(UserContext);
  const SC = useContext(ServerErrorContext);

  const [inputUserNameError, setInputUserNameError] = useState(false);
  const [inputPasswordError, setInputPasswordError] = useState(false);

  const handleClose = () => {
    UC.setDisplayLogInPrompt(false);
  };

  const callLogIn = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    axios
      .post(
        LOGIN_USER_URL,
        JSON.stringify({
          userName: formData.get("name"),
          password: formData.get("pw"),
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        UC.setUser({
          ...UC.user,
          userName: response?.data?.userName,
          isAdmin: response?.data?.isAdmin,
          isOwner: response?.data?.isOwner,
          token: response?.data?.token,
        });

        UC.setDisplayLogInPrompt(false);
        UC.setUserLoggedIn(true);

        // TODO user roles. Should be an array, maybe. Add roles to server first.
        //   const roles = response?.data?.roles;
      })
      .catch((error) => {
        if (!error?.response) {
          SC.setServerErrorMessage("no server response");
        }
        if (error.response.data.message === "Unknown user") {
          setInputUserNameError(true);
        }
        if (error.response.data.message === "Invalid password") {
          setInputPasswordError(true);
        }
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
            height: "30em",
            padding: "1em",
          },
        },
      }}
      open={UC.displayLogInPrompt}
      onClose={handleClose}
    >
      <Grid
        container //
        direction={"row"}
        justifyContent={"space-between"}
      >
        <DialogTitle>{USER_AUTH.LOGIN_PROMPT_TITLE}</DialogTitle>
        <IconButton
          sx={{ marginRight: "1em" }} //
          onClick={handleClose}
        >
          <CancelIcon />
        </IconButton>
      </Grid>
      <DialogContent>
        <Grid //
          container
          direction={"column"}
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
        alignItems="center"
        justifyContent="space-between"
      >
        <NaviButton
          relativeURL={"/addNewAccount"} //
          variant={"outlined"}
          isIconButton={false}
          text={USER_AUTH.CREATE_NEW_ACCOUNT}
          width={"3em"}
          height={"3em"}
        />

        <Button
          sx={{ margin: "2em" }} //
          variant="outlined"
          type="submit"
        >
          {USER_AUTH.LOGIN_ACTION}
        </Button>
      </Grid>
    </Dialog>
  );
};

export default LoginDialog;
