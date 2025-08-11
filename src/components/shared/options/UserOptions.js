// react
import { useContext } from "react";
// material ui
import { Grid2 as Grid, Switch, FormGroup, FormControlLabel } from "@mui/material";
// components and functions
import UserLogButton from "../../Login/UserLogButton";
// contexts
import { UserContext } from "../../../contexts/userContext";
import useConfirmationDialogSettings from "../../../customHooks/UseConfirmationDialogSettings";

const UserOptions = () => {
  const UC = useContext(UserContext);

  const dialogSettings = useConfirmationDialogSettings();

  return UC.userLoggedIn ? (
    <Grid
      container
      direction="column"
      sx={{
        height: "100%",
      }}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              id="toggleDisplayOverrideDialog" //
              color="error"
              checked={dialogSettings.showOverrideDialog}
              onChange={dialogSettings.setOverrideDialogSetting}
            />
          } // TODO text file!
          label="Beim Überschreiben von Armeelisten immer um Bestätigung bitten"
        />
        <FormControlLabel
          control={
            <Switch
              id="toggleDisplayDeleteDialog" //
              color="error"
              checked={dialogSettings.showDeletionDialog}
              onChange={dialogSettings.setDeletetionDialogSetting}
            />
          } // TODO text file!
          label="Beim Löschen von Armeelisten immer um Bestätigung bitten"
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
