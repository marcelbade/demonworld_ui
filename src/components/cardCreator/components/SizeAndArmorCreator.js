// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import CreatorTextInput from "./CreatorTextInput";
import { Grid, Typography } from "@mui/material";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
// icons
import rangeArmorIcon from "../../../assets/icons/range-armor.png";
import meleeArmorIcon from "../../../assets/icons/melee-armor.png";
import CustomIcon from "../../shared/CustomIcon";
import { Stack } from "@mui/system";

const SizeAndArmorCreator = () => {
  const theme = useTheme();

  const CCC = useContext(CardCreationContext);

  const changeSize = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].unitSize = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeRangeArmor = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].armourRange = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeMeleeArmor = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].armourMelee = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const inputElements = [
    {
      label: "",
      value: CCC.unitCards[CCC.displayedElement].unitSize,
      onChange: changeSize,
      statName: "Größe:", // TODO
      icon: null,
    },
    {
      label: "",
      value: CCC.unitCards[CCC.displayedElement].armourRange,
      onChange: changeRangeArmor,
      icon: rangeArmorIcon,
    },
    {
      label: "",
      value: CCC.unitCards[CCC.displayedElement].armourMelee,
      onChange: changeMeleeArmor,
      icon: meleeArmorIcon,
    },
  ];

  return (
    <Grid
      container //
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: "space-around",
        ...theme.palette.cardCreator.box,
        backgroundColor: CCC.unitCards[CCC.displayedElement].color,
      }}
    >
      {inputElements.map((input, i) => (
        <Stack
          key={i}
          direction={"row"} //
          sx={{ alignItems: "center" }}
        >
          {input.icon === null ? (
            <Typography
              sx={{ marginRight: "1em" }} //
            >
              {input.statName}
            </Typography>
          ) : (
            <CustomIcon
              icon={input.icon} //
              width={"50%"} //
              height={"50%"} //
            />
          )}
          <CreatorTextInput
            key={i}
            id={input.value.toString()} //
            value={input.value}
            onChange={input.onChange}
            width="5em"
          />
        </Stack>
      ))}
    </Grid>
  );
};

export default SizeAndArmorCreator;
