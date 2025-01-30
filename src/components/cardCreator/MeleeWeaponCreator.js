// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
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

  
    const theme = useTheme();

  const ICON_SIZE = "20em";

  const CCC = useContext(CardCreationContext);

  const changeMeleeWeapon1Name = (event) => {
    CCC.setUnit({ ...CCC.unit, weapon1Name: event.target.value });
  };

  const changeWeapon1 = (event) => {
    CCC.setUnit({ ...CCC.unit, weapon1: event.target.value });
  };

  const changeMeleeWeapon2Name = (event) => {
    CCC.setUnit({ ...CCC.unit, weapon2Name: event.target.value });
  };

  const changeWeapon2 = (event) => {
    CCC.setUnit({ ...CCC.unit, weapon2: event.target.value });
  };
  const changeMeleeWeapon3Name = (event) => {
    CCC.setUnit({ ...CCC.unit, weapon3Name: event.target.value });
  };

  const changeWeapon3 = (event) => {
    CCC.setUnit({ ...CCC.unit, weapon3: event.target.value });
  };

  const unitHasMeleeSkill = () => {
    CCC.setHasMeleeSkill((prevState) => !prevState);
  };

  const changeSkillMelee = (event) => {
    CCC.setUnit({ ...CCC.unit, skillMelee: event.target.value });
  };

  const changeChargeBonus = (event) => {
    CCC.setUnit({ ...CCC.unit, chargeBonus: event.target.value });
  };

  const changeInitiative = (event) => {
    CCC.setUnit({ ...CCC.unit, initiative: event.target.value });
  };

  const elmnts = [
    {
      direction: "row",
      nameTitle: CREATOR.MELEE_WEAPON_1,
      valueTitle: CREATOR.MELEE_VALUE_1,
      name: CCC.unit.weapon1Name,
      value: CCC.unit.weapon1,
      nameFunc: changeMeleeWeapon1Name,
      valueFunc: changeWeapon1,
    },

    {
      direction: "row",
      nameTitle: CREATOR.MELEE_WEAPON_2,
      valueTitle: CREATOR.MELEE_VALUE_2,
      name: CCC.unit.weapon2Name,
      value: CCC.unit.weapon2,
      nameFunc: changeMeleeWeapon2Name,
      valueFunc: changeWeapon2,
    },
    {
      direction: "row",
      nameTitle: CREATOR.MELEE_WEAPON_3,
      valueTitle: CREATOR.MELEE_VALUE_3,
      name: CCC.unit.weapon3Name,
      value: CCC.unit.weapon3,
      nameFunc: changeMeleeWeapon3Name,
      valueFunc: changeWeapon3,
    },
  ];

  return (
    <Grid
      container
      direction="column"
      sx={theme.palette.cardCreator.box}
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
          value={CCC.unit.initiative}
          onChange={changeInitiative}
          label={CREATOR.INITIATIVE}
        />
        <CreatorTextInput
          id={CREATOR.CHARGE_BONUS} //
          value={CCC.unit.chargeBonus}
          onChange={changeChargeBonus}
          label={CREATOR.CHARGE_BONUS}
        />
      </Grid>

      {elmnts.map((e, i) => (
        <Grid
          container //
          item
          direction={e.direction}
          key={i}
        >
          <CreatorTextInput
            id={e.nameTitle} //
            value={e.name}
            onChange={e.nameFunc}
            label={e.nameTitle}
          />
          <CreatorTextInput
            id={e.valueTitle} //
            value={e.value}
            onChange={e.valueFunc}
            label={e.valueTitle}
          />
        </Grid>
      ))}

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
          id={CCC.unit.skillMelee.toString()} //
          value={CCC.unit.skillMelee}
          onChange={changeSkillMelee}
          disabled={!CCC.hasMeleeSkill}
          width="3em"
        />
      </Grid>
    </Grid>
  );
};

export default MeleeWeaponCreator;
