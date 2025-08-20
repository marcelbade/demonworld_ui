// react
import { useTheme } from "@emotion/react";
// material ui
import { Grid2 as Grid, Typography } from "@mui/material";
import CompendiumTableColOptions from "./CompendiumTableColOptions";
// constants
import { OPTIONS } from "../../../constants/textsAndMessages";

const CompendiumSettings = () => {
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
        {OPTIONS.COMPENDIUM_ROWS_TITLE}
      </Typography>
      <Typography variant="body1">{OPTIONS.COMPENDIUM_EXPLAINATION}</Typography>
      <CompendiumTableColOptions />
    </Grid>
  );
};

export default CompendiumSettings;
