// React
import React, { Fragment, useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
// icons
import rangeArmorIcon from "../../../../../../icons/range-armor.png";
import meleeArmorIcon from "../../../../../../icons/melee-armor.png";
import blackBowIcon from "../../../../../../icons/bow2.png";
import blackSwordIcon from "../../../../../../icons/sword2.png";
// components & functions
import { StateCardContext } from "../../../../../../contexts/statCardContext";
// constants

const useStyles = makeStyles({
  icon: {
    height: "1.2em",
    width: "1.2em",
  },

  alignIcons: {
    display: "flex",
    alignItems: "center",
    marginLeft: "1em",
    marginBottom: "0.4em",
  },

  noWrap: {
    flexWrap: "nowrap",
  },
});

const SizeArmorSkills = () => {
  const classes = useStyles();

  const SC = useContext(StateCardContext);

  return (
    <Grid item container alignItems="center" direction="row" className={classes.noWrap}>
      <Grid item container justify="center">
        <Typography variant="h6">Größe: {SC.unit.unitSize}</Typography>
      </Grid>
      <Grid item container alignItems="center" justify="center">
        <div className={classes.alignIcons}>
          <img alt="FK-Panzerung" src={rangeArmorIcon} className={classes.icon} />
        </div>
        <Typography variant="h6">{SC.unit.armourRange}</Typography>
        <div className={classes.alignIcons}>
          <img alt="NK-Panzerung" src={meleeArmorIcon} className={classes.icon} />
        </div>
        <Typography variant="h6">{SC.unit.armourMelee}</Typography>
      </Grid>
      {SC.unit.skillRange === 0 && SC.unit.skillMelee === 0 ? null : (
        <Grid container direction="row" justify="center" alignItems="center" className={classes.skillBox}>
          {SC.unit.skillMelee !== 0 ? (
            <Fragment>
              <div className={classes.alignIcons}>
                <img alt="NK-Fertigkeit" src={blackSwordIcon} className={classes.icon} />
              </div>
              <Typography variant="h6"> {SC.unit.skillMelee} </Typography>
            </Fragment>
          ) : null}
          {SC.unit.skillRange !== 0 ? (
            <Fragment>
              <div className={classes.alignIcons}>
                <img alt="Fernkampffertigkeit" src={blackBowIcon} className={classes.icon} />
              </div>
              <Typography variant="h6"> {SC.unit.skillRange} </Typography>
            </Fragment>
          ) : null}
        </Grid>
      )}
    </Grid>
  );
};

export default SizeArmorSkills;
