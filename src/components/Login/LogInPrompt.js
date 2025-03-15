// React
import React, { useContext } from "react";
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
import { LOGIN } from "../../constants/textsAndMessages";
import NaviButton from "../landingPage/NaviButton";
// contexts
import { UserContext } from "../../contexts/userContext";
import { ServerErrorContext } from "../../contexts/serverErrorContext";
import { LOGIN_USER_URL } from "../../constants/URLs";

const LoginPrompt = () => {
  const UC = useContext(UserContext);
  const SC = useContext(ServerErrorContext); 

  const handleClose = () => {
    UC.setDisplayLogInPrompt(false);
  };

  const callLogIn = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const response = await axios.post(
        LOGIN_USER_URL,
        JSON.stringify({
          userName: formData.get("name"),
          password: formData.get("pw"),
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      UC.setUser({
        ...UC.user,
        userName: response?.data?.userName,
        isAdmin: response?.data?.isAdmin,
        isOwner: response?.data?.isOwner,
        token: response?.data?.token,
      });

      

      // TODO user roles. Should be an array, maybe. Add roles to server first.
      const roles = response?.data?.roles;
    } catch (error) {
      if (!error?.response) {
        SC.setServerErrorMessage("no server response");
      }
      if (error?.response && error?.response.status === 400) {
        SC.setServerErrorMessage("missing user name or password");
      }
    }
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
      open={UC.displayLogInPrompt}
      onClose={handleClose}
    >
      <Grid
        container //
        direction={"row"}
        justifyContent={"space-between"}
      >
        <DialogTitle>{LOGIN.LOGIN_PROMPT_TITLE}</DialogTitle>
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
            autoFocus //
            required
            id="name"
            name="name"
            variant="outlined"
            label={LOGIN.LOGIN_USER}
          />
          <TextField
            sx={{ marginTop: "2em" }}
            required
            id="outlined-password-input" //
            name="pw"
            variant="outlined"
            label={LOGIN.LOGIN_PW}
            type="password"
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
          isIconButton={false}
          text={LOGIN.CREATE_NEW_ACCOUNT}
          width={"3em"}
          height={"3em"}
        />

        <Button
          sx={{ margin: "2em" }} //
          variant="outlined"
          type="submit"
        >
          {LOGIN.LOGIN_ACTION}
        </Button>
      </Grid>
    </Dialog>
  );
};

export default LoginPrompt;
