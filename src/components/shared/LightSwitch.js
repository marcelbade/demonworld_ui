// React
import { useContext } from "react";
// Material UI
import { Grid2 as Grid, FormGroup, FormControlLabel, Switch } from "@mui/material";
// components and functions
import { LightSwitchContext } from "../../contexts/lightSwitchContext";
// icons
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import Brightness4Icon from "@mui/icons-material/Brightness4";
// constants
// import { OPTIONS } from "../../constants/textsAndMessages";

const LightSwitch = (props) => {
  const LC = useContext(LightSwitchContext);

  const style_light = { marginTop: "0.3em", color: "black" };
  const style_dark = { marginTop: "0.3em", color: "white" };

  const toggleDarkMode = () => {
    LC.setDarkModeOff((prevState) => !prevState);
  };

  return (
    <Grid
      container //
      direction="row"
      alignContent="center"
    >
      {/* TODO turn the tool tip into normal text */}
      {/* <Tooltip title={<Typography>{OPTIONS.LIGHT_SWITCH}</Typography>}>  */}

      <FormGroup>
        <FormControlLabel
          control={
            <Switch //
              id="toggleAllButtons"
              color="error"
              checked={LC.darkModeOff}
              onChange={toggleDarkMode}
            />
          }
        />
      </FormGroup>

      {LC.darkModeOff ? (
        <Brightness4Icon
          fontSize={props.iconSize} //
          sx={style_light}
        />
      ) : (
        <BrightnessHighIcon
          fontSize={props.iconSize} //
          sx={style_dark}
        />
      )}
    </Grid>
  );
};

export default LightSwitch;
