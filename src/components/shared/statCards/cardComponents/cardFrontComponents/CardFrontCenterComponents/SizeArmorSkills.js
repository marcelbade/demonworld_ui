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
import {
  meleeArmorStat,
  meleeSkillStat,
  rangeArmorStat,
  rangeSkillStat,
} from "../../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/StatChangesLogic";
// constants
import { CARD_PREVIEW } from "../../../../../../constants/textsAndMessages";

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
    <Grid
      item //
      container
      alignItems="center"
      direction="row"
      className={classes.noWrap}
    >
      <Grid item container justifyContent="center">
        <Typography variant="h6">
          {CARD_PREVIEW.SIZE} {SC.unit.unitSize}
        </Typography>
      </Grid>
      <Grid item container alignItems="center" justifyContent="center">
        <div className={classes.alignIcons}>
          <CustomIcon
            icon={rangeArmorIcon} //
            altText={"Fernkampfpanzerung"}
            height={"25"}
            width={"25"}
          />
        </div>
        <Typography variant="h6">{rangeArmorStat(SC.unit)}</Typography>
        <div className={classes.alignIcons}>
          <CustomIcon
            icon={meleeArmorIcon} //
            altText={"Nahkampfpanzerung"}
            height={"25"}
            width={"25"}
          />
        </div>
        <Typography variant="h6">{meleeArmorStat(SC.unit)}</Typography>
      </Grid>
      {SC.unit.skillRange === 0 && SC.unit.skillMelee === 0 ? null : (
        <Grid
          container
          direction="row" //
          justifyContent="center"
          alignItems="center"
          className={classes.skillBox}
        >
          {SC.unit.skillMelee !== 0 ? (
            <Fragment>
              <div className={classes.alignIcons}>
                <CustomIcon
                  icon={blackSwordIcon} //
                  altText={"Nahkampffertigkeit"}
                  height={"25"}
                  width={"25"}
                />
              </div>
              <Typography variant="h6"> {meleeSkillStat(SC.unit)} </Typography>
            </Fragment>
          ) : null}
          {SC.unit.skillRange !== 0 ? (
            <Fragment>
              <div className={classes.alignIcons}>
                <CustomIcon
                  icon={blackBowIcon} //
                  altText={"Fernkampffertigkeit"}
                  height={"25"}
                  width={"25"}
                />
              </div>
              <Typography variant="h6"> {rangeSkillStat(SC.unit)} </Typography>
            </Fragment>
          ) : null}
        </Grid>
      )}
    </Grid>
  );
};

export default SizeArmorSkills;
