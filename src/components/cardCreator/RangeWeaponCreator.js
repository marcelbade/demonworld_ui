// react
import React, { useContext } from "react";
// material ui
import { Grid } from "@mui/material";
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";

const RangeWeaponCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteRangedWeaponName = () => {
    CCC.setRangedWeaponName("");
  };

  const changeRangedWeaponName = (event) => {
    CCC.setRangedWeaponName(event.target.value);
  };

  const deleteRangedAttackStats = () => {
    CCC.setRangedAttackStats("");
  };

  const changeRangedAttackStats = (event) => {
    CCC.setRangedAttackStats(event.target.value);
  };

  return (
    <Grid
      container
      justifyContent="space-around" //
      direction="row"
      sx={{
        width: "max-content",
      }}
    >
      <Grid>
        <CreatorTextInput
          id={"rangedWeaponName"} //
          value={CCC.rangedWeaponName}
          onClick={deleteRangedWeaponName}
          onChange={changeRangedWeaponName}
          adornment={"Fernkampfwaffe:"}
        />
      </Grid>
      <Grid>
        <CreatorTextInput
          id={"rangedAttackStats"} //
          value={CCC.rangedAttackStats}
          onClick={deleteRangedAttackStats}
          onChange={changeRangedAttackStats}
          adornment={"Fernkampfwert:"}
        />
      </Grid>
    </Grid>
  );
};

export default RangeWeaponCreator;
