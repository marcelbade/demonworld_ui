import { useTheme } from "@emotion/react";
// Material UI
import { Grid2 as Grid, Typography, Divider } from "@mui/material";
// components and functions
import ListDisplaySwitch from "../ListDisplaySwitch";
// constants
import { OPTIONS } from "../../../constants/textsAndMessages";
import TournamentRules from "./TournamentRules";

const GameOptions = () => {
  const theme = useTheme();

  return (
    <Grid
      container //
      direction="column"
      alignContent="flex-start"
      spacing={2}
    >
      <Typography variant="h6">{OPTIONS.TOURNAMENT_RULES_TITLE}</Typography>
      <Typography variant="body1">{OPTIONS.EXPLAINATION_TOURNAMENT_RULES}</Typography>
      <TournamentRules />
      <Divider sx={{ marginTop: "5em", width: "100%" }} />
      <Typography variant="h6">{OPTIONS.TITLE_LIST_TOGGLE}</Typography>
      <Typography variant="body1">{OPTIONS.EXPLAINATION_LIST_TOGGLE}</Typography>
      <ListDisplaySwitch bttnSize="medium" />
    </Grid>
  );
};

export default GameOptions;
