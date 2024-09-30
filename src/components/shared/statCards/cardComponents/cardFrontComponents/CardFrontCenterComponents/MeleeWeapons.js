// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
// components & functions
import { StateCardContext } from "../../../../../../contexts/statCardContext";
import { weapon1Stats } from "../../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/unitStatChangesLogic";

const MeleeWeapons = () => {
  const SC = useContext(StateCardContext);

  const weaponOneProperties = weapon1Stats(SC.unit);

  const weapons = [
    {
      // weapon one can be replaced by a magical item
      weaponString:
        SC.unit.weapon1 === 0 //
          ? null
          : `${weaponOneProperties.name}: ${weaponOneProperties.value}`,
    },
    {
      weaponString:
        SC.unit.weapon2 === 0 //
          ? null
          : `${SC.unit.weapon2Name}: ${SC.unit.weapon2}`,
    },
    {
      weaponString:
        SC.unit.weapon3 === 0 //
          ? null
          : `${SC.unit.weapon3Name}: ${SC.unit.weapon3}`,
    },
  ];

  return (
    <Grid
      item //
      container
      direction="column"
    >
      {weapons.map((w, i) => {
        return (
          <Grid
            item //
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
