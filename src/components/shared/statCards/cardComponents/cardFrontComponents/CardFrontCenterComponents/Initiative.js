// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
// components & functions
import { StateCardContext } from "../../../../../../contexts/statCardContext";
import { setStat } from "../../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/StatChangesLogic";
//constants
import { INITIATIVE } from "../../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/StatChangesLogic";
import { CARD_PREVIEW } from "../../../../../../constants/textsAndMessages";

const Initiative = () => {
  const SC = useContext(StateCardContext);

  return (
    <Grid
      container //
      direction="column"
      alignItems="center"
    >
      <Typography variant="h6">{`${CARD_PREVIEW.INITIATIVE}: ${setStat(SC.unit, INITIATIVE)}`}</Typography>
    </Grid>
  );
};

export default Initiative;
