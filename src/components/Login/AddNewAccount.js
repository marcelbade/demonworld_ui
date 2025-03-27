// React
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
//  axios
import axios from "axios";
// Material UI
import { TextField, Typography, Grid2 as Grid, Button, Box } from "@mui/material";
// icons
import { ChevronLeft } from "@mui/icons-material";
// functions and components
import NaviButton from "../landingPage/NaviButton";
import usePushMessages from "../../customHooks/UsePushMessages";

// contexts
import LightSwitch from "../shared/LightSwitch";
import { ServerErrorContext } from "../../contexts/serverErrorContext";
// constants
import { LANDINGPAGE, PASSWORDS, PUSH_MESSAGE_TYPES, USER_AUTH } from "../../constants/textsAndMessages";
import { ALL_USER_NAMES_URL, REGISTER_USER_URL } from "../../constants/URLs";

const AddNewAccount = () => {
  const MARGIN = "2em";
  const INPUT_WIDTH = "30em";

  const SC = useContext(ServerErrorContext);
  const pushMessages = usePushMessages();

  const history = useHistory();

  const [allUserNames, setAllUserNames] = useState([]);
  const [isUserTaken, setIsUserTaken] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [passwordsNotIdentical, setPasswordsNotIdentical] = useState(false);
  const [disableSubmission, setDisableSubmission] = useState(true);

  useEffect(() => {
    fetchUserNames();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUserNames = async () => {
    const result = await axios(ALL_USER_NAMES_URL);
    setAllUserNames(result.data);
  };

  // TODO finish this!
  /**
   * Function evaluates the user input while typing
   * - makes sure that userName is not already taken
   * - makes sure that passwords equals or exceeds the password requirements
   */
  const validateInput = (event) => {
    const formData = new FormData(event.currentTarget);
    const userName = formData.get("name");
    const pw = formData.get("pw");
    const pwRepeated = formData.get("pwRepeated");
    const passwordRegEx = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

    setIsUserTaken(allUserNames.includes(event.target.value) && userName.length !== 0);

    setIsPasswordInvalid(!passwordRegEx.test(event.target.value) && pw.length !== 0);

    setPasswordsNotIdentical(pw !== pwRepeated && pw.length !== 0 && pwRepeated.length !== 0);
  };

  const registerUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await axios
      .post(
        REGISTER_USER_URL,
        JSON.stringify({
          userName: formData.get("name"),
          password: formData.get("pw"),
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      )
      .then((response) => {
        // return to the landing page and display push message

        history.push({
          pathname: "/",
          state: {
            lastPage: "landingPage",
          },
        });

        if (response.data.userName === formData.get("name")) {
          pushMessages.showSnackBar(USER_AUTH.ACCOUNT_CREATED, PUSH_MESSAGE_TYPES.SUCCESS);
        }
      })
      .catch((error) => {
        if (!error?.response) {
          SC.setServerErrorMessage("no server response");
        }
      });
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
        onChange={validateInput}
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
          error={isUserTaken}
          helperText={isUserTaken ? PASSWORDS.USER_NAME_ALREADY_TAKEN : null}
        />
        <TextField
          sx={{ width: INPUT_WIDTH, marginTop: MARGIN }}
          required
          id="pw"
          name="pw"
          variant="outlined"
          label={USER_AUTH.LOGIN_PW}
          type="password"
          error={isPasswordInvalid}
          helperText={isPasswordInvalid ? PASSWORDS.PASSWORD_GUIDELINES_VIOLATED : null}
        />
        <TextField
          sx={{ width: INPUT_WIDTH, marginTop: MARGIN }}
          required
          id="pwRepeated"
          name="pwRepeated"
          variant="outlined"
          label={USER_AUTH.REPEAT_LOGIN_PW}
          type="password"
          error={passwordsNotIdentical}
          helperText={passwordsNotIdentical ? PASSWORDS.PASSWORDS_DONT_MATCH : null}
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
