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
    CCC.setIsunique((prevState) => !prevState);
  };

  const changeIsCavalery = () => {
    CCC.setIsCavalery((prevState) => !prevState);
  };

  const changeHasShield = () => {
    CCC.setHasShield((prevState) => !prevState);
  };

  const changeInClosedFormation = () => {
    CCC.setClosedFormation((prevState) => !prevState);
  };

  const changeLeaderInClosedFormation = () => {
    CCC.setLeaderClosedFormation((prevState) => !prevState);
  };

  const changeIsLowFLyer = () => {
    CCC.setIsLowFlyer((prevState) => !prevState);
  };

  const changeIsHighFlyer = () => {
    CCC.setIsHighFlyer((prevState) => !prevState);
  };

  const changeCommandStars = (event) => {
    CCC.setCommandStars(event.target.value);
  };

  const changeMagic = (event) => {
    CCC.setMagic(event.target.value);
  };

  const elements = [
    {
      value: CCC.isunique, //
      action: changeIsUnique,
      name: CREATOR.IS_UNIQUE,
      display: true,
    },
    {
      value: CCC.isCavalery, //
      action: changeIsCavalery,
      name: CREATOR.IS_CAVALERY,
      display: true,
    },
    {
      value: CCC.hasShield, //
      action: changeHasShield,
      name: CREATOR.HAS_SHIELD,
      display: CCC.unitType !== GIANT,
    },
    {
      value: CCC.closedFormation, //
      action: changeInClosedFormation,
      name: CREATOR.CLOSED_FORMATION,
      display: true,
    },
    {
      value: CCC.leaderClosedFormation, //
      action: changeLeaderInClosedFormation,
      name: CREATOR.LEADER_CLOSED_FORMATION,
      display: CCC.unitType === UNIT,
    },
    {
      value: CCC.isLowFlyer, //
      action: changeIsLowFLyer,
      name: CREATOR.IS_LOW_FLYER,
      display: !CCC.isHighFlyer,
    },
    {
      value: CCC.isHighFlyer, //
      action: changeIsHighFlyer,
      name: CREATOR.IS_HIGH_FLYER,
      display: !CCC.isLowFlyer,
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
        {CCC.unitType === MAGE || CCC.unitType === HERO ? (
          <CreatorTextInput
            id={"name"} //
            value={CCC.commandStars}
            onChange={changeCommandStars}
            label={"Sterne:"}
            width="7em"
            marginRight="2em"
            type="number"
          />
        ) : null}
        {CCC.unitType === MAGE ? (
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
        .map((elmnt) => (
          <Grid>
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
