// react
import React, { useContext } from "react";
// material ui
import { Grid, Checkbox, FormControlLabel } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
// constants
import { CREATOR } from "../../constants/textsAndMessages";
import { GIANT, HERO, MAGE, UNIT } from "../../constants/unitTypes";

const UnitAttributeCreator = () => {
  const CCC = useContext(CardCreationContext);

  const changeIsUnique = () => {
    CCC.setUnit({ ...CCC.unit, uniqueUnit: !CCC.unit.uniqueUnit });
  };

  const changeIsMounted = () => {
    CCC.setUnit({ ...CCC.unit, isMounted: !CCC.unit.isMounted });
  };

  const changeHasShield = () => {
    CCC.setUnit({ ...CCC.unit, hasShield: !CCC.unit.hasShield });
  };

  const changeInClosedFormation = () => {
    CCC.setUnit({ ...CCC.unit, unitIsClosedOrder: !CCC.unit.unitIsClosedOrder });
  };

  const changeLeaderInClosedFormation = () => {
    CCC.setUnit({ ...CCC.unit, leaderIsClosedOrderUnit: !CCC.unit.leaderIsClosedOrder });
  };

  const changeIsLowFLyer = () => {
    CCC.setUnit({ ...CCC.unit, isLowFlyer: !CCC.unit.isLowFlyer });
  };

  const changeIsHighFlyer = () => {
    CCC.setUnit({ ...CCC.unit, isHighFlyer: !CCC.unit.isHighFlyer });
  };

  const changeCommandStars = (event) => {
    CCC.setUnit({ ...CCC.unit, commandStars: event.target.value });
  };

  const changeMagic = (event) => {
    CCC.setUnit({ ...CCC.unit, magic: event.target.value });
  };

  const elements = [
    {
      value: CCC.unit.uniqueUnit, //
      action: changeIsUnique,
      name: CREATOR.IS_UNIQUE,
      display: true,
    },
    {
      value: CCC.unit.isMounted, //
      action: changeIsMounted,
      name: CREATOR.IS_CAVALERY,
      display: true,
    },
    {
      value: CCC.unit.hasShield, //
      action: changeHasShield,
      name: CCC.unit.unitType === UNIT ? CREATOR.HAS_SHIELD : CREATOR.HAS_SHIELD_HERO,
      display: CCC.unit.unitType !== GIANT,
    },
    {
      value: CCC.unit.unitIsClosedOrder, //
      action: changeInClosedFormation,
      name: CREATOR.CLOSED_FORMATION,
      display: true,
    },
    {
      value: CCC.unit.leaderIsClosedOrder, //
      action: changeLeaderInClosedFormation,
      name: CREATOR.LEADER_CLOSED_FORMATION,
      display: CCC.unit.unitType === UNIT,
    },
    {
      value: CCC.unit.isLowFlyer, //
      action: changeIsLowFLyer,
      name: CREATOR.IS_LOW_FLYER,
      display: !CCC.unit.isHighFlyer,
    },
    {
      value: CCC.unit.isHighFlyer, //
      action: changeIsHighFlyer,
      name: CREATOR.IS_HIGH_FLYER,
      display: !CCC.unit.isLowFlyer,
    },
  ];

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start" //
      justifyContent="center"
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
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        marginBottom="2em"
      >
        {CCC.unit.unitType === MAGE || CCC.unit.unitType === HERO ? (
          <CreatorTextInput
            id={"name"} //
            value={CCC.unit.commandStars}
            onChange={changeCommandStars}
            label={"Sterne:"}
            width="7em"
            marginRight="2em"
            type="number"
          />
        ) : null}
        {CCC.unit.unitType === MAGE ? (
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
      {elements
        .filter((elmnt) => elmnt.display)
        .map((elmnt, i) => (
          <Grid key={i}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={elmnt.value} //
                  onChange={elmnt.action}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={elmnt.name}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default UnitAttributeCreator;
