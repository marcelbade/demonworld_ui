// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import { StateCardContext } from "../../../../../../contexts/statCardContext";
import { setUnitStat } from "../../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/unitStatChangesLogic";
//constants
import { CHARGE_BONUS } from "../../../../../../constants/stats";
import { CARD_TEXT } from "../../../../../../constants/textsAndMessages";

const ChargeBonus = () => {
  const theme = useTheme();
  const SC = useContext(StateCardContext);

  return SC.unit.chargeBonus > 0 ? (
    <Grid
      container //
      direction="column"
      alignItems="center"
      sx={theme.palette.statCards.backGround}
    >
      <Typography variant="h6">{`${CARD_TEXT.CHARGE_BONUS}: ${setUnitStat(SC.unit, CHARGE_BONUS)}`}</Typography>
    </Grid>
  ) : null;
};

export default ChargeBonus;
