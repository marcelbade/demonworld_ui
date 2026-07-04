// react
import { useTheme } from "@emotion/react";
// Material UI
import { Grid, Typography, Divider } from "@mui/material";
// components and functions
import ListDisplaySwitch from "../ListDisplaySwitch";
// constants
import { OPTIONS } from "../../../constants/textsAndMessages";
import TournamentSettings from "./TournamentSettings";

const GameSettings = () => {
  const theme = useTheme();

  return (
    <Grid
      container //
      direction="column"
      alignContent="flex-start"
      spacing={2}
    >
      <Typography
        variant="h6"
        sx={theme.palette.options.title} //
      >
        {OPTIONS.TOURNAMENT_RULES_TITLE}
      </Typography>
      <Typography variant="body1">{OPTIONS.EXPLAINATION_TOURNAMENT_RULES}</Typography>
      <TournamentSettings />
      <Divider sx={{ marginTop: "5em", width: "100%" }} />
      <Typography variant="h6">{OPTIONS.LIST_TOGGLE_TITLE}</Typography>
      <Typography variant="body1">{OPTIONS.EXPLAINATION_LIST_TOGGLE}</Typography>
      <ListDisplaySwitch bttnSize="medium" />
    </Grid>
  );
};

export default GameSettings;
