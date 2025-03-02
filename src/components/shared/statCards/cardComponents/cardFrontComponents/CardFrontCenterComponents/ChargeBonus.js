// React
import React from "react";
// Material UI
import { Grid2 as Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import { setUnitStat } from "../../../../../../gameLogic/unitStatChangeLogic/unitStatChangesLogic";
//constants
import { CHARGE_BONUS } from "../../../../../../constants/stats";
import { CARD_TEXT } from "../../../../../../constants/textsAndMessages";

const ChargeBonus = (props) => {
  const theme = useTheme();

  const chargeBonusStat = setUnitStat(props.unit, CHARGE_BONUS);

  return props.unit.chargeBonus > 0 ? (
    <Grid
      container //
      direction="column"
      alignItems="center"
      sx={theme.palette.statCards.backGround}
    >
      <Typography variant="h6">{`${CARD_TEXT.CHARGE_BONUS}: ${chargeBonusStat.value}`}</Typography>
    </Grid>
  ) : null;
};

export default ChargeBonus;
