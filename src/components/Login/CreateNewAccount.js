// React
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// Material UI
import { TextField, Typography, Grid2 as Grid, Button, Box, IconButton } from "@mui/material";
// functions and components
import { isThePasswordValid } from "./PasswordCriteriaCheck";
import CollapsableTopMenuDrawer from "../shared/CollapsableTopMenuDrawer";
import ContextHelpButton from "../shared/ContextHelpButton";

import TopDrawerButton from "../shared/TopDrawerButton";
// constants
import { PASSWORDS, PUSH_MESSAGE_TYPES, USER_AUTH } from "../../constants/textsAndMessages";
import { ALL_USER_NAMES_URL, REGISTER_USER_URL } from "../../constants/URLs";
// custom hooks
import useAxios from "../../customHooks/UseAxios";
// icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CreateNewAccount = () => {
  const MARGIN = "2em";
  const INPUT_WIDTH = "30em";

  const callAxios = useAxios();
  const history = useHistory();

  const [allUserNames, setAllUserNames] = useState([]);
  const [isUserTaken, setIsUserTaken] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [passwordsNotIdentical, setPasswordsNotIdentical] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUserNames();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUserNames = async () => {
    callAxios.fetchData(setAllUserNames, ALL_USER_NAMES_URL);
  };

  /**
   * Function evaluates the user input while typing
   * - makes sure that userName is not already taken
   * - makes sure that passwords equals or exceeds the password requirements
   */
  const validateInput = (event) => {
    const formData = new FormData(event.currentTarget);
    const userName = formData.get("userName");
    const pw = formData.get("pw");
    const pwRepeated = formData.get("pwRepeated");

    setIsUserTaken(
      allUserNames //
        .map((name) => name.toLowerCase())
        .includes(event.target.value) && userName.length !== 0
    );

    setIsPasswordInvalid(!isThePasswordValid(event.target.value) && pw.length !== 0);

    setPasswordsNotIdentical(pw !== pwRepeated && pw.length !== 0 && pwRepeated.length !== 0);
  };

  const registerUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    callAxios.storeData(
      JSON.stringify({
        userName: formData.get("userName"),
        emailAddress: formData.get("email"),
        password: formData.get("pw"),
      }),
      REGISTER_USER_URL,
      null,
      USER_AUTH.ACCOUNT_CREATED
    );
    history.push({
      pathname: "/",
      state: {
        lastPage: "landingPage",
      },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
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
        container
        direction="column"
        alignItems="center"
        sx={{
          marginBottom: "1em",
        }}
      >
        <CollapsableTopMenuDrawer
          displayPageTitle={false}
          title={""} //
          displayNaviBttn={true}
          displayListBttns={true}
        />
        <TopDrawerButton />
      </Grid>
      <Grid
        container //
        alignContent="space-between"
        justifyContent="space-between"
        sx={{
          width: "100%",
        }}
      ></Grid>
      <Typography variant="h3">{USER_AUTH.LOGIN_PROMPT_TITLE}</Typography>
      <Box
        component="form"
        onChange={validateInput}
        onSubmit={(event) => {
          registerUser(event);
        }}
        sx={{
          width: "100%",
          display: "flex", //
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container //
          direction={"column"}
          sx={{
            marginLeft: "6em",
          }}
        >
          <TextField
            sx={{ width: INPUT_WIDTH, marginTop: MARGIN }}
            autoFocus //
            required
            id="userName"
            name="userName"
            variant="outlined"
            label={USER_AUTH.LOGIN_USER}
            error={isUserTaken}
            helperText={isUserTaken ? PASSWORDS.USER_NAME_ALREADY_TAKEN : null}
          />
          <Grid
            container //
            spacing={3}
            direction="row"
            alignItems="baseline"
          >
            <TextField
              sx={{ width: INPUT_WIDTH, marginTop: MARGIN }}
              autoFocus //
              required
              id="email"
              name="email"
              variant="outlined"
              label={USER_AUTH.EMAIL_USER}
              error={null}
              helperText={null}
            />
            <ContextHelpButton
              isVisible={true}
              message={USER_AUTH.EMAIL_HELP_TEXT} //
              type={PUSH_MESSAGE_TYPES.INFO}
            />
          </Grid>
          <Grid
            container //
            spacing={3}
            direction="row"
            alignItems="baseline"
          >
            <TextField
              sx={{ width: INPUT_WIDTH, marginTop: MARGIN }}
              required
              id="pw"
              name="pw"
              variant="outlined"
              label={USER_AUTH.LOGIN_PW}
              type={showPassword ? "text" : "password"}
              error={isPasswordInvalid}
              helperText={isPasswordInvalid ? PASSWORDS.PASSWORD_GUIDELINES_VIOLATED : null}
            />
            <IconButton
              sx={{
                width: "2em", //
                height: "2em",
              }}
              onClick={togglePasswordVisibility} //
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Grid>

          <Grid
            container //
            spacing={3}
            direction="row"
            alignItems="baseline"
          >
            <TextField
              sx={{ width: INPUT_WIDTH, marginTop: MARGIN }}
              required
              id="pwRepeated"
              name="pwRepeated"
              variant="outlined"
              label={USER_AUTH.REPEAT_LOGIN_PW}
              type={showPassword ? "text" : "password"}
              error={passwordsNotIdentical}
              helperText={passwordsNotIdentical ? PASSWORDS.PASSWORDS_DONT_MATCH : null}
            />
            <IconButton
              sx={{
                width: "2em", //
                height: "2em",
              }}
              onClick={togglePasswordVisibility} //
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Grid>
        </Grid>
        <Button
          type="submit"
          disabled={isUserTaken || isPasswordInvalid || passwordsNotIdentical}
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

export default CreateNewAccount;
