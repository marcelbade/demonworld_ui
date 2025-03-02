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
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// functions and components
import { LOGIN } from "../../constants/textsAndMessages";
// contexts
import { UserContext } from "../../contexts/userContext";
import NaviButton from "../landingPage/NaviButton";

const LoginPrompt = () => {
  const UC = useContext(UserContext);

  const handleClose = () => {
    UC.setDisplayLogInPrompt(false);
  };

  return (
    <Dialog
      component={"form"}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData);
        // const email = formJson.email;
        console.log(formJson);
        handleClose();
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
