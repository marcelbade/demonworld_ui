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

  const changeSize = (event) => {
    CCC.setUnit({ ...CCC.unit, unitSize: parseInt(event.target.value) });
  };

  const changeRangeArmor = (event) => {
    CCC.setUnit({ ...CCC.unit, armourRange: parseInt(event.target.value) });
  };

  const changeMeleeArmor = (event) => {
    CCC.setUnit({ ...CCC.unit, armourMelee: parseInt(event.target.value) });
  };

  const inputElements = [
    {
      label: "",
      value: CCC.unit.unitSize,
      onChange: changeSize,
      statName: "Größe:",
    },
    {
      label: "",
      value: CCC.unit.armourRange,
      onChange: changeRangeArmor,
      icon: rangeArmorIcon,
    },
    {
      label: "",
      value: CCC.unit.armourMelee,
      onChange: changeMeleeArmor,
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
          id={i} //
          value={input.value}
          onChange={input.onChange}
          label={input.statName}
          statIcon={input.icon}
          width="5em"
        />
      ))}
    </Grid>
  );
};

export default SizeAndSkillCreator;
