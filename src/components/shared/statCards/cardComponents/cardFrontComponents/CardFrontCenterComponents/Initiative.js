// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import { StateCardContext } from "../../../../../../contexts/statCardContext";
import { setUnitStat } from "../../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/unitStatChangesLogic";
//constants
import { INITIATIVE } from "../../../../../../constants/stats";  
import { CARD_TEXT } from "../../../../../../constants/textsAndMessages";

const Initiative = () => {
  const theme = useTheme();
  const SC = useContext(StateCardContext);

  return (
    <Grid
      container //
      direction="column"
      alignItems="center"
      sx={theme.palette.statCards.backGround}
    >
      <Typography variant="h6">{`${CARD_TEXT.INITIATIVE}: ${setUnitStat(SC.unit, INITIATIVE)}`}</Typography>
    </Grid>
  );
};

export default Initiative;
