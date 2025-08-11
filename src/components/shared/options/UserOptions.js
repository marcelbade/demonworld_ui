// react
import { useContext } from "react";
// material ui
import { Grid2 as Grid, Switch, FormGroup, FormControlLabel } from "@mui/material";
// components and functions
import UserLogButton from "../../Login/UserLogButton";
// contexts
import { UserContext } from "../../../contexts/userContext";

const UserOptions = () => {
  const UC = useContext(UserContext);

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
              id="toggleAllButtons" //
              color="error"
              checked={null} // TODO add !
              onChange={null} // TODO add !
            />
          } // TODO text file!
          label="Beim Überschreiben von Armeelisten immer um Bestätigung bitten"
        />
        <FormControlLabel
          control={
            <Switch
              id="toggleAllButtons" //
              color="error"
              checked={null}
              onChange={null} // TODO add !
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
