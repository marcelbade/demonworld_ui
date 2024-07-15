// React
import React, { Fragment, useContext } from "react";
import { Grid, Typography } from "@mui/material";
// Material UI
import { useTheme } from "@emotion/react";
// icons
import rangeArmorIcon from "../../../../../../assets/icons/range-armor.png";
import meleeArmorIcon from "../../../../../../assets/icons/melee-armor.png";
import blackBowIcon from "../../../../../../assets/icons/bow2.png";
import blackSwordIcon from "../../../../../../assets/icons/sword2.png";
// components & functions
import { StateCardContext } from "../../../../../../contexts/statCardContext";
import { ARMOUR_RANGE, ARMOUR_MELEE, SKILL_MELEE, SKILL_RANGE } from "../../../../../../constants/stats";

// constants
import { ALTTEXT, CARD_TEXT } from "../../../../../../constants/textsAndMessages";
import StatCardIcon from "./StatCardIcon";

const SizeArmorSkills = () => {
  const SC = useContext(StateCardContext);
  const theme = useTheme();

  return (
    <Grid
      item //
      container
      alignItems="center"
      direction="row"
      sx={{ ...theme.palette.statCards.backGround, flexWrap: "nowrap" }}
    >
      <Grid item container justifyContent="center">
        <Typography variant="h6">
          {CARD_TEXT.SIZE} {SC.unit.unitSize}
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
 

      >
        <StatCardIcon
          icon={rangeArmorIcon} //
          altText={ALTTEXT.RANGE_ARMOR}
          stat={ARMOUR_RANGE}
          unit={SC.unit}
        />
        <StatCardIcon
          icon={meleeArmorIcon} //
          altText={ALTTEXT.MELEE_ARMOR}
          stat={ARMOUR_MELEE}
          unit={SC.unit}
        />
      </Grid>
      {SC.unit.skillRange === 0 && SC.unit.skillMelee === 0 ? null : (
        <Grid
          container
          justifyContent="center"
          direction="row" //
          alignItems="center"
        >
          {SC.unit.skillMelee !== 0 ? (
            <Fragment>
              <StatCardIcon
                icon={blackSwordIcon} //
                altText={ALTTEXT.MELEE_SKILL}
                stat={SKILL_MELEE}
                unit={SC.unit}
              />
            </Fragment>
          ) : null}
          {SC.unit.skillRange !== 0 ? (
            <Fragment>
              <StatCardIcon
                icon={blackBowIcon} //
                altText={ALTTEXT.RANGE_SKILL}
                stat={SKILL_RANGE}
                unit={SC.unit}
              />
            </Fragment>
          ) : null}
        </Grid>
      )}
    </Grid>
  );
};

export default SizeArmorSkills;
