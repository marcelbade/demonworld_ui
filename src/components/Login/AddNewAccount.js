// React
import React, { useContext } from "react";
// Material UI
import { TextField, Typography, Grid2 as Grid, Button } from "@mui/material";
// icons
import { ChevronLeft } from "@mui/icons-material";
// functions and components
import { LANDINGPAGE, LOGIN } from "../../constants/textsAndMessages";
import NaviButton from "../landingPage/NaviButton";
// contexts
import { UserContext } from "../../contexts/userContext";
import LightSwitch from "../shared/LightSwitch";

const AddNewAccount = () => {
  const UC = useContext(UserContext);

  const MARGIN = "2em";
  const INPUT_WIDTH = "30em";

  return (
    <Grid
      container //
      direction="column"
      alignContent="center"
      alignItems="center"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Grid
        container //
        alignContent="space-between"
        justifyContent="space-between"
        sx={{
          width: "100%",
          height: "100%",
         }}
      >
        <NaviButton
          relativeURL={"/"} //
          isIconButton={true}
          isCustomIcon={false}
          icon={ChevronLeft}
          altText={LANDINGPAGE.BACK_TO_LANDINGPAGE}
          width={"3em"}
          height={"3em"}
        />

        <LightSwitch />
      </Grid>

      <Typography variant="h3">{LOGIN.LOGIN_PROMPT_TITLE}</Typography>

      <TextField
        sx={{ width: INPUT_WIDTH, marginTop: MARGIN }}
        autoFocus //
        required
        id="name"
        name="name"
        variant="outlined"
        label={LOGIN.LOGIN_USER}
      />

      <TextField
        sx={{ width: INPUT_WIDTH, marginTop: MARGIN }}
        required
        id="outlined-password-input" //
        variant="outlined"
        label={LOGIN.LOGIN_PW}
        type="password"
      />
      <TextField
        sx={{ width: INPUT_WIDTH, marginTop: MARGIN }}
        required
        id="outlined-password-input" //
        variant="outlined"
        label={LOGIN.REPEAT_LOGIN_PW}
        type="password"
      />

      <Button
        sx={{
          marginTop: "4em",
        }}
      >
        {LOGIN.CREATE_NEW_ACCOUNT}
      </Button>
    </Grid>
  );
};

export default AddNewAccount;
