// react
import { useContext } from "react";
// material ui
import { Grid2 as Grid, Switch, FormGroup, FormControlLabel, Typography } from "@mui/material";
// components and functions
import UserLogButton from "../../Login/UserLogButton";
// contexts
import { UserContext } from "../../../contexts/userContext";
import useConfirmationDialogSettings from "../../../customHooks/UseConfirmationDialogSettings";
// constants
import { OPTIONS } from "../../../constants/textsAndMessages";

const UserOptions = () => {
  const UC = useContext(UserContext);

  const dialogSettings = useConfirmationDialogSettings();

  return UC.userLoggedIn ? (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={{
        height: "100%",
      }}
    >
      <Typography variant="h6">{OPTIONS.CONFIRMATION_TITLE}</Typography>
      <Typography variant="body1">{OPTIONS.CONFIRMATION_EXPLAINATION}</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              id="toggleDisplayOverrideDialog" //
              color="error"
              checked={dialogSettings.showOverrideDialog}
              onChange={dialogSettings.setOverrideDialogSetting}
            />
          }
          label={OPTIONS.GLOBAL_OVERRIDE_CONFIRMATION}
        />
        <FormControlLabel
          control={
            <Switch
              id="toggleDisplayDeleteDialog" //
              color="error"
              checked={dialogSettings.showDeletionDialog}
              onChange={dialogSettings.setDeletetionDialogSetting}
            />
          }
          label={OPTIONS.GLOBAL_DELETE_CONFIRMATION}
        />
      </FormGroup>
    </Grid>
  ) : (
    <Grid
      container //
      justifyContent="center"
      alignContent="center"
    >
      <UserLogButton
        iconSize={"large"} //
      />
    </Grid>
  );
};

export default UserOptions;
