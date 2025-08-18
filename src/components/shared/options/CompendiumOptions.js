import { Grid2 as Grid, Typography } from "@mui/material";
import CompendiumTableColOptions from "./CompendiumTableColOptions";
import { OPTIONS } from "../../../constants/textsAndMessages";

const CompendiumOptions = () => {
  return (
    <Grid
      container
      direction="column"
        spacing={2}
      sx={{
        height: "100%",
      }}
    >
      <Typography variant="h6">{OPTIONS.COMPENDIUM_ROWS_TITLE}</Typography>
      <Typography variant="body1">{OPTIONS.COMPENDIUM_EXPLAINATION}</Typography>
      <CompendiumTableColOptions />
    </Grid>
  );
};

export default CompendiumOptions;
