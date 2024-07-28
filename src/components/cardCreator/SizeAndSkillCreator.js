// react
import React, { useContext } from "react";
// material ui
import CreatorTextInput from "./CreatorTextInput";
import { Grid } from "@mui/material";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
// icons
import rangeArmorIcon from "../../assets/icons/range-armor.png";
import meleeArmorIcon from "../../assets/icons/melee-armor.png";
import blackBowIcon from "../../assets/icons/bow2.png";
import blackSwordIcon from "../../assets/icons/sword2.png";

const SizeAndSkillCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteSize = () => {
    CCC.setSize("");
  };

  const changeSize = (event) => {
    CCC.setSize(event.target.value);
  };
  const deleteRangeArmor = () => {
    CCC.setRangeArmor("");
  };

  const changeRangeArmor = (event) => {
    CCC.setRangeArmor(event.target.value);
  };
  const deleteMeleeArmor = () => {
    CCC.setMeleeArmor("");
  };

  const changeMeleeArmor = (event) => {
    CCC.setMeleeArmor(event.target.value);
  };

  const deleteRangeSkill = () => {
    CCC.setRangeSkill("");
  };

  const changeRangeSkill = (event) => {
    CCC.setRangeSkill(event.target.value);
  };
  const deleteMeleeSkill = () => {
    CCC.setMeleeSkill("");
  };

  const changeMeleeSkill = (event) => {
    CCC.setMeleeSkill(event.target.value);
  };

  const inputElements = [
    {
      id: "Size", //
      label: "",
      value: CCC.size,
      onClick: deleteSize,
      onChange: changeSize,
      statName: "Größe:",
    },
    {
      id: "skirmish", //
      label: "",
      value: CCC.rangeArmor,
      onClick: deleteRangeArmor,
      onChange: changeRangeArmor,
      statName: "Fernkampfrüstung:",
      icon: rangeArmorIcon,
    },
    {
      id: "charge", //
      label: "",
      value: CCC.meleeArmor,
      onClick: deleteMeleeArmor,
      onChange: changeMeleeArmor,
      statName: "NahkampfRüstung:",
      icon: meleeArmorIcon,
    },
    {
      id: "Size", //
      label: "",
      value: CCC.rangeSkill,
      onClick: deleteRangeSkill,
      onChange: changeRangeSkill,
      statName: "FK-Fähigkeit:",
      icon: blackBowIcon,
    },
    {
      id: "Size", //
      label: "",
      value: CCC.meleeSkill,
      onClick: deleteMeleeSkill,
      onChange: changeMeleeSkill,
      statName: "NK-Fähigkeit:",
      icon: blackSwordIcon,
    },
  ];

  return (
    <Grid
      container //
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "max-content",
      }}
    >
      {inputElements.map((input, i) => (
        <CreatorTextInput
          key={i}
          id={input.id} //
          value={input.value}
          onClick={input.onClick}
          onChange={input.onChange}
          adornment={input.statName}
          statIcon={input.icon}
          width="5em"
        />
      ))}
    </Grid>
  );
};

export default SizeAndSkillCreator;
