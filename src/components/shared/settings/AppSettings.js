// react
import { useTheme } from "@emotion/react";
// material ui
import { Grid2 as Grid, Typography } from "@mui/material";
// components and functions
import LightSwitch from "../LightSwitch";
// constants
import { OPTIONS } from "../../../constants/textsAndMessages";

const AppSettings = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={{
        height: "100%",
      }}
    >
      <Typography sx={theme.palette.options.title} variant="h6">
        {OPTIONS.THEME_TITLE}
      </Typography>
      <Typography variant="body1">{OPTIONS.LIGHT_SWITCH}</Typography>
      <LightSwitch bttnSize="medium" />
    </Grid>
  );
};

export default AppSettings;
