// react
import { useContext, useState } from "react";
// material ui
import { Dialog,   Stack, TextField } from "@mui/material";
// constants
import { USER_AUTH } from "../../../constants/textsAndMessages";
// contexts
import { UserContext } from "../../../contexts/userContext";

const ChangePasswordsDialog = () => {
  const UC = useContext(UserContext);

  const [passwordsNotIdentical, setPasswordsNotIdentical] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [oldPW, setOldPW] = useState(""); // TODO
  const [newPW, setNewPW] = useState("");
  const [repeatedNewPW, setRepeatedNewPW] = useState("");
  const [inputUserNameError, setInputUserNameError] = useState(""); // TODO

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

    setIsPasswordValid(!isPasswordValid(event.target.value) && pw.length !== 0);

    setPasswordsNotIdentical(pw !== pwRepeated && pw.length !== 0 && pwRepeated.length !== 0);
  };

  const handleClose = () => {
    UC.setShowPasswordChangeDialog(false);
  };

  return (
    <Dialog
      open={UC.showPasswordChangeDialog} //
      onClose={handleClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            minWidth: "50em",
            height: "25em",
          },
        },
      }}
    >
      <Stack direction="column" alignItems="center">
        {inputs.map((i) => (
          <TextField
            sx={{
              paddingTop: "4em",
              width: "25em",
            }}
            key={i}
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
      </Stack>
    </Dialog>
  );
};

export default ChangePasswordsDialog;
