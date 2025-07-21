// react
import { useContext, useState } from "react";
// material ui
import { Dialog, Grid2 as Grid, TextField } from "@mui/material";
// constants
import { USER_AUTH } from "../../../constants/textsAndMessages";
// contexts
import { UserContext } from "../../../contexts/userContext";

const ChangePasswordsDialog = (props) => {
  const UC = useContext(UserContext);

  const [passwordsNotIdentical, setPasswordsNotIdentical] = useState(false);

  const inputs = [
    {
      label: USER_AUTH.OLD_PW,
      onChangeFunction: null,
      name: oldPW,
      error: null,
      helperText: null,
    },
    {
      label: USER_AUTH.NEW_PW,
      onChangeFunction: null,
      name: newPW,
      error: null,
      helperText: null,
    },
    {
      label: USER_AUTH.REPEAT_LOGIN_PW,
      onChangeFunction: null,
      name: repeatedNewPW,
      error: null,
      helperText: null,
    },
  ];

  const validateInput = (event) => {
    const formData = new FormData(event.currentTarget);
    const oldPassword = formData.get("oldPW");
    const pw = formData.get("newPW");
    const pwRepeated = formData.get("repeatedNewPW");

    // setIsOldPasswordWrong( UC.user.);

    setIsPasswordInvalid(!isThePasswordValid(event.target.value) && pw.length !== 0);

    setPasswordsNotIdentical(pw !== pwRepeated && pw.length !== 0 && pwRepeated.length !== 0);
  };

  return (
    <Dialog>
      <Grid direction="column" spacing={4}>
        {inputs.map((i) => (
          <TextField
            onChange={i.onChangeFunction}
            type="password"
            required
            id={i.name}
            name={i.name}
            variant="outlined"
            label={i.label}
            error={i.error}
            helperText={inputUserNameError ? i.helperText : null}
          />
        ))}
      </Grid>
    </Dialog>
  );
};

export default ChangePasswordsDialog;
