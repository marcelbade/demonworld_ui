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
      value: CCC.meleeArmor + CCC.size,
      onClick: deleteMeleeArmor,
      onChange: changeMeleeArmor,
      statName: "NahkampfRüstung:",
      icon: meleeArmorIcon,
    },
  ];

  return (
    <Grid
      container //
      direction="row"
      alignItems="center"
      justifyContent="space-around"
      sx={{
        marginTop: "1em",
        padding: "1em",
        width: "50em",
        border: " solid 2px black",
        borderRadius: "10px",
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
