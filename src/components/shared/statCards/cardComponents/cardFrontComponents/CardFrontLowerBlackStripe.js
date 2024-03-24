// React
import React, { useContext } from "react";
// material ui
import { Grid, Typography } from "@mui/material";
// components & functions
import { StateCardContext } from "../../../../../contexts/statCardContext";
import { CARD_PREVIEW } from "../../../../../constants/textsAndMessages";
import { setStat } from "../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/StatChangesLogic";
// constants
import { FEAR, MORAL1, MORAL2 } from "../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/StatChangesLogic";

const CSS = { padding: "10px", color: "white", backgroundColor: "black" };

const CardFrontLowerBlackStripe = () => {
  const SC = useContext(StateCardContext);

  return SC.isSingleElement ? (
    <Grid item>
      <Typography
        variant="h6" //
        align="center"
        sx={CSS}
      >
        {`${CARD_PREVIEW.FEAR}: ${setStat(SC.unit, FEAR)}`}
      </Typography>
    </Grid>
  ) : (
    <Grid
      container //
      direction="row"
      justifyContent="space-around"
      sx={CSS}
    >
      <Typography variant="h6"> {`${CARD_PREVIEW.FEAR}: ${setStat(SC.unit, FEAR)}`}</Typography>
      <Typography variant="h6">
        {`${CARD_PREVIEW.MORAL}: ${SC.unit.moral1 ? setStat(SC.unit, MORAL1) : "-"} / ${SC.unit.moral2 ? setStat(SC.unit, MORAL2) : "-"}`}
      </Typography>
    </Grid>
  );
};

export default CardFrontLowerBlackStripe;
