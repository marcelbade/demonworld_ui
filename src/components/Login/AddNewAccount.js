// React
import React, { useContext, useState, useEffect } from "react";
//  axios
import axios from "axios";
// Material UI
import { TextField, Typography, Grid2 as Grid, Button, Box } from "@mui/material";
// icons
import { ChevronLeft } from "@mui/icons-material";
// functions and components
import NaviButton from "../landingPage/NaviButton";
// contexts
import { UserContext } from "../../contexts/userContext";
import LightSwitch from "../shared/LightSwitch";
// constants
import { LANDINGPAGE, PASSWORDS, USER_AUTH } from "../../constants/textsAndMessages";
import { ALL_USER_NAMES } from "../../constants/URLs";

const AddNewAccount = () => {
  const UC = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [allUserNames, setAllUserNames] = useState([]);

  useEffect(() => {
    fetchUserNames();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUserNames = async () => {
    const result = await axios(ALL_USER_NAMES);
    setAllUserNames(result.data);
  };

  const MARGIN = "2em";
  const INPUT_WIDTH = "30em";

  // TODO finish this!
  /**
   * Function evaluates the user input while typing
   * - makes sure that userName is not already taken
   * - makes sure that passwords equals or exceeds the password requirements
   */
  const showProgress = (event) => {
    console.log(event.target.value);

    // is userName already taken?

  //  if(allUserNames.includes(event.getValue())  )

  };

  const registerUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const userName = formData.get("name");
    const pw = formData.get("pw");
    const pwRepeated = formData.get("pwRepeated");

    if (pw !== pwRepeated) {
      setErrorMessage(PASSWORDS.PASSWORDS_DONT_MATCH);
      return;
    }

    let isValid = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).test(event.target.value);
    isValid ? setErrorMessage("") : setErrorMessage(PASSWORDS.PASSWORD_GUIDELINES_VIOLATED);
  };

  return (
    <Grid
      container //
      direction="column"
      alignContent="center"
      alignItems="center"
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Grid
        container //
        alignContent="space-between"
        justifyContent="space-between"
        sx={{
          width: "100%",
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

      <Typography variant="h3">{USER_AUTH.LOGIN_PROMPT_TITLE}</Typography>

      <Box
        component="form"
        onChange={() => {
          showProgress();
        }}
        onSubmit={(event) => {
          registerUser(event);
        }}
        sx={{
          display: "flex", //
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          sx={{ width: INPUT_WIDTH, marginTop: MARGIN }}
          autoFocus //
          required
          id="name"
          name="name"
          variant="outlined"
          label={USER_AUTH.LOGIN_USER}
        />

        <TextField
          sx={{ width: INPUT_WIDTH, marginTop: MARGIN }}
          required
          id="pw"
          name="pw"
          variant="outlined"
          label={USER_AUTH.LOGIN_PW}
          type="password"
        />
        <TextField
          sx={{ width: INPUT_WIDTH, marginTop: MARGIN }}
          required
          id="pwRepeated"
          name="pwRepeated"
          variant="outlined"
          label={USER_AUTH.REPEAT_LOGIN_PW}
          type="password"
        />

        <Button
          type="submit"
          sx={{
            marginTop: "4em",
          }}
        >
          {USER_AUTH.CREATE_NEW_ACCOUNT}
        </Button>
      </Box>
    </Grid>
  );
};

export default AddNewAccount;
