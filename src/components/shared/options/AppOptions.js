import { Divider, Grid2 as Grid, Typography } from "@mui/material";
import CompendiumTableColOptions from "./CompendiumTableColOptions";
import LightSwitch from "../LightSwitch";
import { OPTIONS } from "../../../constants/textsAndMessages";

const AppOptions = () => {
  return (
    <Grid
      container
      direction="column"
      sx={{
        height: "100%",
      }}
    >
      <Typography variant="h6">{OPTIONS.TOURNAMENT_RULES_TITLE}</Typography>
      <Typography variant="body1">{OPTIONS.EXPLAINATION_TOURNAMENT_RULES}</Typography>
      <CompendiumTableColOptions />
      <Divider sx={{ marginBottom: "2em" }} />
      <Typography variant="h6">{OPTIONS.COMPENDIUM_ROWS_TITLE}</Typography> 
      <Typography variant="body1">{OPTIONS.EXPLAINATION_COMPENDIUM_ROWS}</Typography>
      <LightSwitch bttnSize="medium" />
    </Grid>
  );
};

export default AppOptions;
