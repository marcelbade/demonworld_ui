// React
import React from "react";
// material ui
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import { CARD_TEXT } from "../../../../../constants/textsAndMessages";
import { setUnitStat } from "../../../../../gameLogic/unitStatChangeLogic/unitStatChangesLogic";
import { isSingleElementCard } from "../../../../../util/utilityFunctions";
// constants
import { FEAR, MORAL1, MORAL2 } from "../../../../../constants/stats";

const CardFrontLowerBlackStripe = (props) => {
  const theme = useTheme();

  const fearStat = setUnitStat(props.unit, FEAR);
  const moral1Stat = setUnitStat(props.unit, MORAL1);
  const moral2Stat = setUnitStat(props.unit, MORAL2);

  const fearText = `${CARD_TEXT.FEAR}: ${fearStat.value}`;

  const moralText = `${CARD_TEXT.MORAL} ${
    props.unit.moral1 !== 0 //
      ? moral1Stat.value
      : "-"
  } / ${
    props.unit.moral2 !== 0 //
      ? moral2Stat.value
      : "-"
  }`;

  return isSingleElementCard(props.unit) ? (
    <Grid item>
      <Typography
        variant="h6" //
        align="center"
        sx={theme.palette.statCards.blackStripe}
      >
        {fearText}
      </Typography>
    </Grid>
  ) : (
    <Grid
      container //
      direction="row"
      justifyContent="space-around"
      sx={theme.palette.statCards.blackStripe}
    >
      <Typography variant="h6"> {fearText}</Typography>
      <Typography variant="h6">{moralText}</Typography>
    </Grid>
  );
};

export default CardFrontLowerBlackStripe;
