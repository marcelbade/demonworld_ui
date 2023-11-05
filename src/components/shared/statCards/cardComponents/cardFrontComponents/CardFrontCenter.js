// React
import React, { Fragment, useContext } from "react";
// Material UI
import { Grid } from "@material-ui/core";
// icons

// components & functions
import { StateCardContext } from "../../../../../contexts/statCardContext";
import RangedWeapon from "./CardFrontCenterComponents/RangedWeapon";
import MeleeWeapons from "./CardFrontCenterComponents/MeleeWeapons";
import SizeArmorSkills from "./CardFrontCenterComponents/SizeArmorSkills";
// constants
import { NO_RANGE_WEAPON } from "../../../../../constants/textsAndMessages";

const CardFrontCenter = () => {
  const SC = useContext(StateCardContext);

  return (
    <Fragment>
      <Grid item container justifyContent="center">
        {SC.unit.rangedWeapon !== NO_RANGE_WEAPON ? ( //
          <RangedWeapon />
        ) : null}
      </Grid>
      <Grid item container direction="column">
        <MeleeWeapons />
      </Grid>
      <SizeArmorSkills />
    </Fragment>
  );
};

export default CardFrontCenter;
