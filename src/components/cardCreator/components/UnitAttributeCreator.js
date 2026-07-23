// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Grid, Checkbox, FormControlLabel } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
// constants
import { CREATOR } from "../../../constants/textsAndMessages";
import { GIANT, HERO, MAGE, UNIT } from "../../../constants/unitTypes";

const UnitAttributeCreator = () => {
  const CCC = useContext(CardCreationContext);
  const theme = useTheme();

  const changeIsUnique = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].uniqueUnit = !CCC.unitCards[CCC.displayedElement].uniqueUnit;

    CCC.setUnitCards(tempArray);
  };

  const changeIsMounted = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].isMounted = !CCC.unitCards[CCC.displayedElement].isMounted;

    CCC.setUnitCards(tempArray);
  };

  const changeHasShield = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].hasShield = !CCC.unitCards[CCC.displayedElement].hasShield;

    CCC.setUnitCards(tempArray);
  };

  const changeInClosedFormation = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].unitIsClosedOrder = !CCC.unitCards[CCC.displayedElement].unitIsClosedOrder;

    CCC.setUnitCards(tempArray);
  };

  const changeLeaderInClosedFormation = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].leaderIsClosedOrder = !CCC.unitCards[CCC.displayedElement].leaderIsClosedOrder;

    CCC.setUnitCards(tempArray);
  };

  const changeIsLowFLyer = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].isLowFlyer = !CCC.unitCards[CCC.displayedElement].isLowFlyer;

    CCC.setUnitCards(tempArray);
  };

  const changeIsHighFlyer = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].isHighFlyer = !CCC.unitCards[CCC.displayedElement].isHighFlyer;

    CCC.setUnitCards(tempArray);
  };

  const changeCommandStars = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].commandStars = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeMagic = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].magic = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const elements = [
    {
      value: CCC.unitCards[CCC.displayedElement].uniqueUnit,
      action: changeIsUnique,
      name: CREATOR.IS_UNIQUE,
      disable: false,
    },
    {
      value: CCC.unitCards[CCC.displayedElement].isMounted,
      action: changeIsMounted,
      name: CREATOR.IS_CAVALERY,
      disable: false,
    },
    {
      value: CCC.unitCards[CCC.displayedElement].hasShield,
      action: changeHasShield,
      name: CCC.unitCards[CCC.displayedElement].unitType === UNIT ? CREATOR.HAS_SHIELD : CREATOR.HAS_SHIELD_HERO,
      disable: CCC.unitCards[CCC.displayedElement].unitType === GIANT,
    },
    {
      value: CCC.unitCards[CCC.displayedElement].unitIsClosedOrder,
      action: changeInClosedFormation,
      name: CREATOR.CLOSED_FORMATION,
      disable: CCC.unitCards[CCC.displayedElement].unitType !== UNIT,
    },
    {
      value: CCC.unitCards[CCC.displayedElement].leaderIsClosedOrder,
      action: changeLeaderInClosedFormation,
      name: CREATOR.LEADER_CLOSED_FORMATION,
      disable: CCC.unitCards[CCC.displayedElement].unitType !== UNIT || CCC.unitCards[CCC.displayedElement].unitIsClosedOrder,
    },
    {
      value: CCC.unitCards[CCC.displayedElement].isLowFlyer,
      action: changeIsLowFLyer,
      name: CREATOR.IS_LOW_FLYER,
      disable: CCC.unitCards[CCC.displayedElement].isHighFlyer,
    },
    {
      value: CCC.unitCards[CCC.displayedElement].isHighFlyer,
      action: changeIsHighFlyer,
      name: CREATOR.IS_HIGH_FLYER,
      disable: CCC.unitCards[CCC.displayedElement].isLowFlyer,
    },
  ];

  return (
    <Grid
      container
      direction={{ xs: "column" }}
      sx={{
        alignItems: "flex-start", //
        justifyContent: "center",
        ...theme.palette.cardCreator.box,
        backgroundColor: CCC.unitCards[CCC.displayedElement].color,
      }}
    >
      <Grid
        container //
        sx={{
          direction: "row", //
          alignItems: "center",
          justifyContent: "space-around",
          marginBottom: "2em",
        }}
      >
        {CCC.unitCards[CCC.displayedElement].unitType === MAGE || CCC.unitCards[CCC.displayedElement].unitType === HERO ? (
          <CreatorTextInput
            id={"name"} //
            value={CCC.unitCards[CCC.displayedElement].commandStars}
            onChange={changeCommandStars}
            label={"Sterne:"}
            width="7em"
            marginRight="2em"
            type="number"
          />
        ) : null}
        {CCC.unitCards[CCC.displayedElement].unitType === MAGE ? (
          <CreatorTextInput
            id={"name"} //
            value={CCC.magic}
            onChange={changeMagic}
            label={"Magiepunkte:"}
            width="7em"
            type="number"
          />
        ) : null}
      </Grid>
      <Grid
        container
        sx={{
          justifyContent: "center",
        }}
      >
        {elements.map((elmnt, i) => (
          <FormControlLabel
            sx={{
              width: "75%",
            }}
            key={i}
            control={
              <Checkbox
                checked={elmnt.value} //
                onChange={elmnt.action}
                inputprops={{ "aria-label": "controlled" }}
                disabled={elmnt.disable}
                sx={theme.palette.cardCreator.checkbox}
              />
            }
            label={elmnt.name}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default UnitAttributeCreator;
