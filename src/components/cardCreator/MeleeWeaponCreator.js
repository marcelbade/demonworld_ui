// react
import React, { useContext } from "react";
// material ui
import { Grid } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";

const MeleeWeaponCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteMeleeWeaponName = () => {
    CCC.setMeleeWeaponName("");
  };

  const changeMeleeWeaponName = (event) => {
    CCC.setMeleeWeaponName(event.target.value);
  };

  const deleteMeleeValue = () => {
    CCC.setMeleeValue("");
  };

  const changeMeleeValue = (event) => {
    CCC.setMeleeValue(event.target.value);
  };

  return Array(CCC.lineNumber)
    .fill()
    .map((i) => {
      return (
        <Grid
          container
          justifyContent="space-around" //
          direction="row"
          sx={{
            width: "max-content",
          }}
        >
          <CreatorTextInput
            id={"MeleeWeaponName"} //
            value={CCC.meleeWeaponName}
            onClick={deleteMeleeWeaponName}
            onChange={changeMeleeWeaponName}
            adornment={"Nahkampfwaffe:"}
          />

          <CreatorTextInput
            id={"MeleeAttackStats"} //
            value={CCC.meleeValue}
            onClick={deleteMeleeValue}
            onChange={changeMeleeValue}
            adornment={"Nahkampfwert:"}
          />
        </Grid>
      );
    });
};

export default MeleeWeaponCreator;
