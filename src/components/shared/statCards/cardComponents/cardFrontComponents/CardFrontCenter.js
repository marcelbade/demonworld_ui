// React
import React, { Fragment, useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// icons
import rangeArmorIcon from "../../../../../icons/range-armor.png";
import meleeArmorIcon from "../../../../../icons/melee-armor.png";
// components & functions
import { RenderSkillValues } from "../../../../../components/compendiums/factionTable/depencies/factionTableFunctions";
import { Grid, Typography } from "@material-ui/core";
import { NO_RANGE_WEAPON } from "../../../../../constants/textsAndMessages";
import { StateCardContext } from "../../../../../contexts/statCardContext";

const useStyles = makeStyles({
  Icon: {
    height: "1.2em",
    width: "1.2em",
  },
  alignIcons: {
    display: "flex",
    alignItems: "center",
    marginLeft: "1em",
  },

  noWrap: {
    flexWrap: "nowrap",
  },
});

const CardFrontCenter = () => {
  const classes = useStyles();

  const SC = useContext(StateCardContext);

  return (
    <Fragment>
      {/* 1st Row - title*/}
      <Grid item container justify="center">
        {/* 3rd Row - RANGED WEAPONS  */}
        {SC.unit.rangedWeapon !== NO_RANGE_WEAPON ? (
          <Typography variant="h6" align="right">
            {SC.unit.rangedWeapon} {SC.unit.rangedAttackStats}
          </Typography>
        ) : null}
      </Grid>{" "}
      {/* 4th & 5th Row - WEAPONS  */}
      <Grid item container direction="column">
        <Grid item container justify="center">
          <Typography variant="h6">Waffe 1: {SC.unit.weapon1}</Typography>
        </Grid>
        <Grid item container justify="center">
          <Typography variant="h6">{SC.unit.weapon2 === 0 ? null : "Waffe 2: " + SC.unit.weapon2}</Typography>
        </Grid>
      </Grid>
      {/* 6th Row - SIZE, ARMOR, SKILLS*/}
      <Grid item container alignItems="center" direction="row" className={classes.noWrap}>
        <Grid item container justify="center">
          <Typography variant="h6">Größe: {SC.unit.unitSize}</Typography>
        </Grid>
        <Grid item container alignItems="center" justify="center">
          <div className={classes.alignIcons}>
            <img alt="FK-Panzerung" src={rangeArmorIcon} className={classes.Icon} />
          </div>
          <Typography variant="h6">{SC.unit.armourRange}</Typography>
          <div className={classes.alignIcons}>
            <img alt="NK-Panzerung" src={meleeArmorIcon} className={classes.Icon} />
          </div>
          <Typography variant="h6">{SC.unit.armourMelee}</Typography>
        </Grid>
        <Grid item container direction="row" justify="center" className={classes.noWrap}>
          {RenderSkillValues(SC.unit.skillRange, SC.unit.skillMelee)}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CardFrontCenter;
