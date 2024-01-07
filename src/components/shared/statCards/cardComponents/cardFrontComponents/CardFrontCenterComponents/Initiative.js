// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
// components & functions
import { StateCardContext } from "../../../../../../contexts/statCardContext";
import { initiativeStat } from "../../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/StatChangesLogic";
import { CARD_PREVIEW } from "../../../../../../constants/textsAndMessages";

const Initiative = () => {
  const SC = useContext(StateCardContext);

  return (
    <Grid
      container //
      direction="column"
      alignItems="center"
    >
      <Typography variant="h6">{`${CARD_PREVIEW.INITIATIVE}: ${initiativeStat(SC.unit)}`}</Typography>
    </Grid>
  );
};

export default Initiative;
