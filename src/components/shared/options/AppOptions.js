import { Divider, Grid2 as Grid } from "@mui/material";
import CompendiumTableColOptions from "./CompendiumTableColOptions";
import LightSwitch from "../LightSwitch";

const AppOptions = () => {
  return (
    <Grid
      container
      direction="column"
      sx={{
        height: "100%",
      }}
    >
      <CompendiumTableColOptions />
      <Divider sx={{ marginBottom: "2em" }} />
      <LightSwitch bttnSize="medium" />
    </Grid>
  );
};

export default AppOptions;
