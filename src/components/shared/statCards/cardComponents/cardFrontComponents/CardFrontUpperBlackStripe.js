// React
import React, { useContext } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Typography } from "@mui/material";
// functions and components
import { StateCardContext } from "../../../../../contexts/statCardContext";
import { CARD_PREVIEW } from "../../../../../constants/textsAndMessages";
import { chargeStat, movementStat, skirmishStat } from "../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/StatChangesLogic";

const useStyles = makeStyles({
  unitCardStripe: {
    padding: "10px",
    color: "white",
    backgroundColor: "black",
  },
  centerpadding: {},
});

const CardFrontUpperBlackStripe = () => {
  const classes = useStyles();
  const SC = useContext(StateCardContext);

  return SC.isSingleElement ? (
    <Grid item container justifyContent="space-around" className={classes.unitCardStripe}>
      <Typography variant="h6">{`${movementStat(SC.unit)} ${CARD_PREVIEW.MOVEMENT_POINTS}`}</Typography>
      {SC.unit.controlZone > 1 ? <Typography variant="h6">{`${CARD_PREVIEW.CONTROL_AREA}: ${SC.unit.controlZone}`}</Typography> : null}
    </Grid>
  ) : (
    <Grid item container direction="row" justifyContent="space-around" className={classes.unitCardStripe}>
      <Typography variant="h6" align="center">
        {`${CARD_PREVIEW.MOVE}: ${movementStat(SC.unit)} / ${CARD_PREVIEW.CHARGE}: ${chargeStat(SC.unit)} / ${
          CARD_PREVIEW.SKIRMISH
        }: ${skirmishStat(SC.unit)}`}
      </Typography>
      <Typography variant="h6" align="center">
        {`${SC.unit.hold_maneuvers} ${CARD_PREVIEW.MANEUVER}`}
      </Typography>
    </Grid>
  );
};

export default CardFrontUpperBlackStripe;
