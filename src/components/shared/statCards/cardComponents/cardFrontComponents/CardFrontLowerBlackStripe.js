// React
import React, { useContext } from "react";
// material ui
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import { StateCardContext } from "../../../../../contexts/statCardContext";
import { CARD_PREVIEW } from "../../../../../constants/textsAndMessages";
import { setUnitStat } from "../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/unitStatChangesLogic";
// constants
import { FEAR, MORAL1, MORAL2 } from "../../../../../constants/stats";

const CardFrontLowerBlackStripe = () => {
  const SC = useContext(StateCardContext);
  const theme = useTheme();

  const fear = `${CARD_PREVIEW.FEAR}: ${setUnitStat(SC.unit, FEAR)}`;
  const moral = `${CARD_PREVIEW.MORAL}: ${
    SC.unit.moral1 //
      ? setUnitStat(SC.unit, MORAL1)
      : "-"
  } / ${SC.unit.moral2 ? setUnitStat(SC.unit, MORAL2) : "-"}`;

  return SC.isSingleElement ? (
    <Grid item>
      <Typography
        variant="h6" //
        align="center"
        sx={theme.palette.statCards.blackStripe}
      >
        {fear}
      </Typography>
    </Grid>
  ) : (
    <Grid
      container //
      direction="row"
      justifyContent="space-around"
      sx={theme.palette.statCards.blackStripe}
    >
      <Typography variant="h6"> {fear}</Typography>
      <Typography variant="h6">{moral}</Typography>
    </Grid>
  );
};

export default CardFrontLowerBlackStripe;
