import { Grid2 as Grid, Typography } from "@mui/material";
import LightSwitch from "../LightSwitch";
import { OPTIONS } from "../../../constants/textsAndMessages";

const AppOptions = () => {
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={{
        height: "100%",
      }}
    >
      <Typography variant="h6">{OPTIONS.THEME_TITLE}</Typography>
      <Typography variant="body1">{OPTIONS.LIGHT_SWITCH}</Typography>
      <LightSwitch bttnSize="medium" />
    </Grid>
  );
};

export default AppOptions;
