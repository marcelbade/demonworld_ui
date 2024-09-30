// react
import React, { useContext } from "react";
// material ui
import { Grid, Checkbox } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
import CustomIcon from "../shared/statCards/CustomIcon";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
// Icons
import blackSwordIcon from "../../assets/icons/sword2.png";
import { CREATOR } from "../../constants/textsAndMessages";

const MeleeWeaponCreator = () => {
  const ICON_SIZE = "20em";

  const CCC = useContext(CardCreationContext);

  const changeMeleeWeaponName1 = (event) => {
    CCC.setMeleeWeaponName1(event.target.value);
  };

  const changeMeleeValue1 = (event) => {
    CCC.setMeleeValue1(parseInt(event.target.value));
  };
  const changeMeleeWeaponName2 = (event) => {
    CCC.setMeleeWeaponName2(event.target.value);
  };

  const changeMeleeValue2 = (event) => {
    CCC.setMeleeValue2(parseInt(event.target.value));
  };
  const changeMeleeWeaponName3 = (event) => {
    CCC.setMeleeWeaponName3(event.target.value);
  };

  const changeMeleeValue3 = (event) => {
    CCC.setMeleeValue3(parseInt(event.target.value));
  };

  const unitHasMeleeSkill = () => {
    CCC.setHasMeleeSkill((prevState) => !prevState);
  };

  const changeMeleeSkill = (event) => {
    CCC.setMeleeSkill(event.target.value);
  };

  const changeChargeBonus = (event) => {
    CCC.setChargeBonus(event.target.value);
  };

  const changeInitiative = (event) => {
    CCC.setInitiative(event.target.value);
  };

  return (
    <Grid
      container
      direction="column"
      sx={{
        marginTop: "1em",
        padding: "1em",
        width: "50em",
        border: " solid 2px black",
        borderRadius: "10px",
      }}
    >
      <Grid
        container //
        item
        direction="row"
        sx={{
          marginBottom: "3em",
        }}
      >
        <CreatorTextInput
          id={CREATOR.INITIATIVE} //
          value={CCC.initiative}
          onChange={changeInitiative}
          label={CREATOR.INITIATIVE}
        />
        <CreatorTextInput
          id={CREATOR.CHARGE_BONUS} //
          value={CCC.chargeBonus}
          onChange={changeChargeBonus}
          label={CREATOR.CHARGE_BONUS}
        />
      </Grid>

      <Grid
        container //
        item
        direction="row"
      >
        <CreatorTextInput
          id={CREATOR.MELEE_WEAPON_1} //
          value={CCC.meleeWeaponName1}
          onChange={changeMeleeWeaponName1}
          label={CREATOR.MELEE_WEAPON_1}
        />
        <CreatorTextInput
          id={CREATOR.MELEE_VALUE_1} //
          value={CCC.meleeValue1}
          onChange={changeMeleeValue1}
          label={CREATOR.MELEE_VALUE_1}
        />
      </Grid>
      <Grid
        container //
        item
        direction="row"
      >
        <CreatorTextInput
          id={CREATOR.MELEE_WEAPON_2} //
          value={CCC.meleeWeaponName2}
          onChange={changeMeleeWeaponName2}
          label={CREATOR.MELEE_WEAPON_2}
        />
        <CreatorTextInput
          id={CREATOR.MELEE_VALUE_2} //
          value={CCC.meleeValue2}
          onChange={changeMeleeValue2}
          label={CREATOR.MELEE_VALUE_2}
        />
      </Grid>
      <Grid
        container //
        item
        direction="row"
      >
        <CreatorTextInput
          id={CREATOR.MELEE_WEAPON_3} //
          value={CCC.meleeWeaponName3}
          onChange={changeMeleeWeaponName3}
          label={CREATOR.MELEE_WEAPON_3}
        />
        <CreatorTextInput
          id={CCC.MELEE_VALUE_3} //
          value={CCC.meleeValue3}
          onChange={changeMeleeValue3}
          label={CREATOR.MELEE_VALUE_3}
        />
      </Grid>
      <Grid //
        item
        container
        direction="row"
        sx={{
          marginTop: "1em",
        }}
      >
        <Checkbox
          checked={!CCC.hasMeleeSkill} //
          onChange={unitHasMeleeSkill}
          inputProps={{ "aria-label": "controlled" }}
          sx={{
            marginTop: "0.5em",
          }}
          icon={
            <CustomIcon
              icon={blackSwordIcon} //
              altText={CREATOR.HAS_MELEE_SKILL}
              height={ICON_SIZE}
              width={ICON_SIZE}
            />
          }
          checkedIcon={
            <CustomIcon
              icon={blackSwordIcon} //
              altText={CREATOR.SQUARE_FORMATION}
              height={ICON_SIZE}
              width={ICON_SIZE}
              checkedBoxIcon={true}
            />
          }
        />

        <CreatorTextInput
          id={CCC.meleeSkill} //
          value={CCC.meleeSkill}
          onChange={changeMeleeSkill}
          disabled={!CCC.hasMeleeSkill}
          width="3em"
        />
      </Grid>
    </Grid>
  );
};

export default MeleeWeaponCreator;
