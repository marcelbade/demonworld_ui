// React
import React, { Fragment, useContext } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Typography } from "@mui/material";
// icons
import rangeArmorIcon from "../../../../../../assets/icons/range-armor.png";
import meleeArmorIcon from "../../../../../../assets/icons/melee-armor.png";
import blackBowIcon from "../../../../../../assets/icons/bow2.png";
import blackSwordIcon from "../../../../../../assets/icons/sword2.png";
// components & functions
import { StateCardContext } from "../../../../../../contexts/statCardContext";
import CustomIcon from "../../../CustomIcon";

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
      <Grid item container justifyContent="center">
        <Typography variant="h6">Größe: {SC.unit.unitSize}</Typography>
      </Grid>
      <Grid item container alignItems="center" justifyContent="center">
        <div className={classes.alignIcons}>
          <img alt="FK-Panzerung" src={rangeArmorIcon} className={classes.icon} />
        </div>
        <Typography variant="h6">{SC.unit.armourRange}</Typography>
        <div className={classes.alignIcons}>
          <CustomIcon
            icon={meleeArmorIcon} //
            altText={""}
            height={"1.2em"}
            width={"1.2em"}
          />
        </div>
        <Typography variant="h6">{SC.unit.armourMelee}</Typography>
      </Grid>
      {SC.unit.skillRange === 0 && SC.unit.skillMelee === 0 ? null : (
        <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.skillBox}>
          {SC.unit.skillMelee !== 0 ? (
            <Fragment>
              <div className={classes.alignIcons}>
                <CustomIcon
                  icon={blackSwordIcon} //
                  altText={"NK-Fertigkeit"}
                  height={"1.2em"}
                  width={"1.2em"}
                />
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
