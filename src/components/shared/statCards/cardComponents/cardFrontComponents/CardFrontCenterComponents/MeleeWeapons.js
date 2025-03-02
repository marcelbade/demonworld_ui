// React
import React from "react";
// Material UI
import { Grid2 as Grid, Typography } from "@mui/material";
// components & functions
import { setUnitStat } from "../../../../../../gameLogic/unitStatChangeLogic/unitStatChangesLogic";
import { WEAPON_1 } from "../../../../../../constants/stats";

const MeleeWeapons = (props) => {
  const weapon1Stat = setUnitStat(props.unit, WEAPON_1);

  const weapons = [
    {
      // weapon one can be replaced by a magical item
      weaponString:
        props.unit.weapon1 === 0 //
          ? null
          : `${weapon1Stat.name}: ${weapon1Stat.value}`,
    },
    {
      weaponString:
        props.unit.weapon2 === 0 //
          ? null
          : `${props.unit.weapon2Name}: ${props.unit.weapon2}`,
    },
    {
      weaponString:
        props.unit.weapon3 === 0 //
          ? null
          : `${props.unit.weapon3Name}: ${props.unit.weapon3}`,
    },
  ];

  return (
    <Grid //
      container
      direction="column"
    >
      {weapons.map((w, i) => {
        return (
          <Grid //
            container
            justifyContent="center"
            key={i}
          >
            <Typography variant="h6">{w.weaponString}</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MeleeWeapons;
