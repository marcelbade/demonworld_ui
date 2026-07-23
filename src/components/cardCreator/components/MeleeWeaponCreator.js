// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Grid, Checkbox } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
import CustomIcon from "../../shared/CustomIcon";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
// Icons
import blackSwordIcon from "../../../assets/icons/sword2.png";
import { CREATOR } from "../../../constants/textsAndMessages";

const MeleeWeaponCreator = () => {
  const theme = useTheme();

  const ICON_SIZE = "100%";

  const CCC = useContext(CardCreationContext);

  const changeMeleeWeapon1Name = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].weapon1Name = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeWeapon1 = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].weapon1 = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeMeleeWeapon2Name = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].weapon2Name = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeWeapon2 = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].weapon2 = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeMeleeWeapon3Name = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].weapon3Name = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeWeapon3 = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].weapon3 = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const unitHasMeleeSkill = () => {
    CCC.setHasMeleeSkill((prevState) => !prevState);
  };

  const changeSkillMelee = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].skillMelee = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeChargeBonus = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].chargeBonus = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeInitiative = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].initiative = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const elmnts = [
    {
      nameTitle: CREATOR.MELEE_WEAPON_1,
      valueTitle: CREATOR.MELEE_VALUE_1,
      name: CCC.unitCards[CCC.displayedElement].weapon1Name,
      value: CCC.unitCards[CCC.displayedElement].weapon1,
      nameFunc: changeMeleeWeapon1Name,
      valueFunc: changeWeapon1,
    },

    {
      nameTitle: CREATOR.MELEE_WEAPON_2,
      valueTitle: CREATOR.MELEE_VALUE_2,
      name: CCC.unitCards[CCC.displayedElement].weapon2Name,
      value: CCC.unitCards[CCC.displayedElement].weapon2,
      nameFunc: changeMeleeWeapon2Name,
      valueFunc: changeWeapon2,
    },
    {
      nameTitle: CREATOR.MELEE_WEAPON_3,
      valueTitle: CREATOR.MELEE_VALUE_3,
      name: CCC.unitCards[CCC.displayedElement].weapon3Name,
      value: CCC.unitCards[CCC.displayedElement].weapon3,
      nameFunc: changeMeleeWeapon3Name,
      valueFunc: changeWeapon3,
    },
  ];

  return (
    <Grid
      container //
      direction={{ xs: "column" }}
      sx={{
        ...theme.palette.cardCreator.box, //
        backgroundColor: CCC.unitCards[CCC.displayedElement].color,
      }}
    >
      <Grid
        container //
        direction={{ xs: "row" }}
        sx={{
          marginBottom: "3em",
        }}
      >
        <CreatorTextInput
          id={CREATOR.INITIATIVE} //
          value={CCC.unitCards[CCC.displayedElement].initiative}
          onChange={changeInitiative}
          label={CREATOR.INITIATIVE}
        />
        <CreatorTextInput
          id={CREATOR.CHARGE_BONUS} //
          value={CCC.unitCards[CCC.displayedElement].chargeBonus}
          onChange={changeChargeBonus}
          label={CREATOR.CHARGE_BONUS}
        />
      </Grid>

      {elmnts.map((e, i) => (
        <Grid
          container //
          direction={{ xs: "row" }}
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
        container
        direction={{ xs: "row" }}
        sx={{
          alignItems: "center",
          marginTop: "1em",
        }}
      >
        <Checkbox
          checked={!CCC.hasMeleeSkill} //
          onChange={unitHasMeleeSkill}
          inputprops={{ "aria-label": "controlled" }}
          sx={{
            marginTop: "1.5em",
            marginRight: "1em",
            height: "3em",
            width: "3em",
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
          id={CCC.unitCards[CCC.displayedElement].skillMelee.toString()} //
          value={CCC.unitCards[CCC.displayedElement].skillMelee}
          onChange={changeSkillMelee}
          disabled={!CCC.hasMeleeSkill}
          width="3em"
        />
      </Grid>
    </Grid>
  );
};

export default MeleeWeaponCreator;
