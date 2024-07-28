// react
import React, { useContext } from "react";
// material ui
import CreatorTextInput from "./CreatorTextInput";
import { Grid } from "@mui/material";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";

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
    },
    {
      id: "charge", //
      label: "",
      value: CCC.meleeArmor,
      onClick: deleteMeleeArmor,
      onChange: changeMeleeArmor,
      statName: "NahkampfRüstung:",
    },
    {
      id: "Size", //
      label: "",
      value: CCC.rangeSkill,
      onClick: deleteRangeSkill,
      onChange: changeRangeSkill,
      statName: "FK-Fähigkeit:",
    },
    {
      id: "Size", //
      label: "",
      value: CCC.meleeSkill,
      onClick: deleteMeleeSkill,
      onChange: changeMeleeSkill,
      statName: "NK-Fähigkeit:",
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
          width="10em"
        />
      ))}
    </Grid>
  );
};

export default SizeAndSkillCreator;
