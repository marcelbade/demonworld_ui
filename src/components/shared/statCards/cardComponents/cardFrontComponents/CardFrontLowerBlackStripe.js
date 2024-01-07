// React
import React, { useContext } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Typography } from "@mui/material";
// components & functions
import { StateCardContext } from "../../../../../contexts/statCardContext";
import { CARD_PREVIEW } from "../../../../../constants/textsAndMessages";
import { fearStat, moral1Stat, moral2Stat } from "../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/StatChangesLogic";

const useStyles = makeStyles({
  unitCardStripe: {
    padding: "10px",
    color: "white",
    backgroundColor: "black",
  },
});

const CardFrontLowerBlackStripe = () => {
  const classes = useStyles();

  const SC = useContext(StateCardContext);

  return SC.isSingleElement ? (
    <Grid item>
      <Typography
        variant="h6" //
        align="center"
        className={classes.unitCardStripe}
      >
        {`${CARD_PREVIEW.FEAR}: ${fearStat(SC.unit)}`}
      </Typography>
    </Grid>
  ) : (
    <Grid
      container //
      direction="row"
      justifyContent="space-around"
      className={classes.unitCardStripe}
    >
      <Typography variant="h6"> {`${CARD_PREVIEW.FEAR}: ${fearStat(SC.unit)}`}</Typography>
      <Typography variant="h6">
        {`${CARD_PREVIEW.MORAL}: ${SC.unit.moral1 ? moral1Stat(SC.unit) : "-"} / ${SC.unit.moral2 ? moral2Stat(SC.unit) : "-"}`}
      </Typography>
    </Grid>
  );
};

export default CardFrontLowerBlackStripe;
