// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Grid, Checkbox, FormControlLabel } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
// constants
import { CREATOR } from "../../constants/textsAndMessages";
import { GIANT, HERO, MAGE, UNIT } from "../../constants/unitTypes";

const UnitAttributeCreator = () => {
  const theme = useTheme();
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
    CCC.setUnit({ ...CCC.unit, leaderIsClosedOrder: !CCC.unit.leaderIsClosedOrder });
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
      value: CCC.unit.uniqueUnit,
      action: changeIsUnique,
      name: CREATOR.IS_UNIQUE,
      disable: false,
    },
    {
      value: CCC.unit.isMounted,
      action: changeIsMounted,
      name: CREATOR.IS_CAVALERY,
      disable: false,
    },
    {
      value: CCC.unit.hasShield,
      action: changeHasShield,
      name: CCC.unit.unitType === UNIT ? CREATOR.HAS_SHIELD : CREATOR.HAS_SHIELD_HERO,
      disable: CCC.unit.unitType === GIANT,
    },
    {
      value: CCC.unit.unitIsClosedOrder,
      action: changeInClosedFormation,
      name: CREATOR.CLOSED_FORMATION,
      disable: false,
    },
    {
      value: CCC.unit.leaderIsClosedOrder,
      action: changeLeaderInClosedFormation,
      name: CREATOR.LEADER_CLOSED_FORMATION,
      disable: CCC.unit.unitType !== UNIT || CCC.unit.unitIsClosedOrder,
    },
    {
      value: CCC.unit.isLowFlyer,
      action: changeIsLowFLyer,
      name: CREATOR.IS_LOW_FLYER,
      disable: CCC.unit.isHighFlyer,
    },
    {
      value: CCC.unit.isHighFlyer,
      action: changeIsHighFlyer,
      name: CREATOR.IS_HIGH_FLYER,
      disable: CCC.unit.isLowFlyer,
    },
  ];

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start" //
      justifyContent="center"
      sx={theme.palette.cardCreator.box}
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
      {elements.map((elmnt, i) => (
        <Grid key={i}>
          <FormControlLabel
            control={
              <Checkbox
                checked={elmnt.value} //
                onChange={elmnt.action}
                inputProps={{ "aria-label": "controlled" }}
                disabled={elmnt.disable}
                sx={theme.palette.cardCreator.checkbox}
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
