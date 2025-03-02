// React
import React from "react";
// Material UI
import { Grid2 as Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import { setUnitStat } from "../../../../../../gameLogic/unitStatChangeLogic/unitStatChangesLogic";
//constants
import { INITIATIVE } from "../../../../../../constants/stats";
import { CARD_TEXT } from "../../../../../../constants/textsAndMessages";

const Initiative = (props) => {
  const theme = useTheme();

  const iniStat = setUnitStat(props.unit, INITIATIVE);

  return (
    <Grid
      container //
      direction="column"
      alignItems="center"
      sx={theme.palette.statCards.backGround}
    >
      <Typography variant="h6">{`${CARD_TEXT.INITIATIVE}: ${iniStat.value}`}</Typography>
    </Grid>
  );
};

export default Initiative;
