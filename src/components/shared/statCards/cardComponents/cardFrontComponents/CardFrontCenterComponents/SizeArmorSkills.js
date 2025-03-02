// React
import React, { Fragment } from "react";
import { Grid2 as Grid, Typography } from "@mui/material";
// Material UI
import { useTheme } from "@emotion/react";
// icons
import rangeArmorIcon from "../../../../../../assets/icons/range-armor.png";
import meleeArmorIcon from "../../../../../../assets/icons/melee-armor.png";
import blackBowIcon from "../../../../../../assets/icons/bow2.png";
import blackSwordIcon from "../../../../../../assets/icons/sword2.png";
// components & functions
import { ARMOUR_RANGE, ARMOUR_MELEE, SKILL_MELEE, SKILL_RANGE } from "../../../../../../constants/stats";

// constants
import { ALTTEXT, CARD_TEXT } from "../../../../../../constants/textsAndMessages";
import StatCardIcon from "./StatCardIcon";

const SizeArmorSkills = (props) => {
  const theme = useTheme();

  const unitHasNoSkills = props.unit.skillRange === 0 && props.unit.skillMelee === 0;

  return (
    <Grid //
      container
      alignItems="center"
      direction="row"
      sx={{ ...theme.palette.statCards.backGround, flexWrap: "nowrap" }}
    >
      <Grid //
        container
        justifyContent="center"
      >
        <Typography variant="h6">
          {CARD_TEXT.SIZE} {props.unit.unitSize}
        </Typography>
      </Grid>
      <Grid //
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <StatCardIcon
          icon={rangeArmorIcon} //
          altText={ALTTEXT.RANGE_ARMOR}
          stat={ARMOUR_RANGE}
          unit={props.unit}
        />
        <StatCardIcon
          icon={meleeArmorIcon} //
          altText={ALTTEXT.MELEE_ARMOR}
          stat={ARMOUR_MELEE}
          unit={props.unit}
        />
      </Grid>
      {unitHasNoSkills ? null : (
        <Grid //
          container
          justifyContent="center"
          direction="row" //
          alignItems="center"
        >
          {props.unit.skillMelee !== 0 ? (
            <Fragment>
              <StatCardIcon
                icon={blackSwordIcon} //
                altText={ALTTEXT.MELEE_SKILL}
                stat={SKILL_MELEE}
                unit={props.unit}
              />
            </Fragment>
          ) : null}
          {props.unit.skillRange !== 0 ? (
            <Fragment>
              <StatCardIcon
                icon={blackBowIcon} //
                altText={ALTTEXT.RANGE_SKILL}
                stat={SKILL_RANGE}
                unit={props.unit}
              />
            </Fragment>
          ) : null}
        </Grid>
      )}
    </Grid>
  );
};

export default SizeArmorSkills;
