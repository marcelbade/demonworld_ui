// react
import React, { Fragment, useContext } from "react";
// material ui
import { FormGroup, Grid, FormControlLabel, Checkbox } from "@mui/material";
import { useTheme } from "@emotion/react";
// components and functions
import SelectionInput from "../shared/selectionInput";
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { ArmyContext } from "../../contexts/armyContext";
import { CardCreationContext } from "../../contexts/cardCreationContext";
// constants
import { ALL_FACTIONS_ARRAY, NONE } from "../../constants/factions";
import { CREATOR } from "../../constants/textsAndMessages";

const FactionNameCreator = () => {
  const theme = useTheme();

  const AC = useContext(ArmyContext);
  const CCC = useContext(CardCreationContext);

  const handleFactionInput = (name) => {
    CCC.setUnit({ ...CCC.unit, faction: name });
  };

  const clearFactionName = () => {
    return ALL_FACTIONS_ARRAY.filter((f) => f !== CCC.factionName);
  };

  const setFactionList = () => {
    const resultingList =
      CCC.factionName !== NONE //
        ? ALL_FACTIONS_ARRAY.filter((f) => f !== CCC.unit.faction)
        : ALL_FACTIONS_ARRAY;

    return resultingList;
  };

  const handleSubFactionInput = (name) => {
    CCC.setUnit({ ...CCC.unit, subFaction: name });
  };

  const clearSubFactionName = () => {
    const faction = AC.fetchedFactions.filter((f) => f.factionName === CCC.unit.faction);
    return faction.subFactions.map((sF) => sF.name);
  };

  const setSubFactionList = () => {
    if (CCC.unit.faction !== "") {
      return AC.fetchedFactions
        .find((f) => f.factionName === CCC.unit.faction) // find army obj
        .subFactions.map((sF) => sF.name) // return array of sub faction names
        .filter((sf) => sf !== CCC.unit.subFaction); // do not show current selection in the dropdown list
    } else {
      return [];
    }
  };

  const deleteFactionName = () => {
    CCC.setUnit({ ...CCC.unit, faction: "" });
  };

  const changeFactionName = (event) => {
    CCC.setUnit({ ...CCC.unit, faction: event.target.value });
  };

  const deleteSubFactionName = () => {
    CCC.setUnit({ ...CCC.unit, subFaction: "" });
  };

  const changeSubFactionName = (event) => {
    CCC.setUnit({ ...CCC.unit, subFaction: event.target.value });
  };

  const isNewFaction = () => {
    CCC.setNewFaction((prevState) => !prevState);
  };

  return (
    <Grid
      container //
      alignItems="center"
      direction="column"
      sx={theme.palette.cardCreator.name}
    >
      <Grid
        container //
        item
        justifyContent="flex-start"
        sx={{ width: "100%" }}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={CCC.newFaction} //
                onChange={isNewFaction}
                sx={theme.palette.cardCreator.checkbox}
              />
            }
            label={CREATOR.NEW_FACTION}
            labelPlacement="start"
          />
        </FormGroup>
      </Grid>
      <Grid
        item //
        container
        direction="row"
        width="50em"
        justifyContent="center"
      >
        {CCC.newFaction ? (
          <Fragment>
            <CreatorTextInput
              id={"factionName"} //
              value={CCC.unit.factionName}
              onClick={deleteFactionName}
              onChange={changeFactionName}
              label={CREATOR.FACTION_NAME}
              marginSides="1em"
            />

            <CreatorTextInput
              id={"subFactionName"} //
              value={CCC.unit.subFactionName}
              onClick={deleteSubFactionName}
              onChange={changeSubFactionName}
              label={CREATOR.SUBFACTION_NAME}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Grid>
              <SelectionInput
                isArmySelector={false}
                filterFunction={handleFactionInput}
                clearFunction={clearFactionName}
                alternatives={setFactionList()}
                label={CREATOR.FACTION_NAME}
                width={"20em"}
              />
            </Grid>
            <Grid>
              <SelectionInput
                isArmySelector={false}
                filterFunction={handleSubFactionInput}
                clearFunction={clearSubFactionName}
                alternatives={setSubFactionList()}
                label={CREATOR.SUBFACTION_NAME}
                width={"20em"}
              />
            </Grid>
          </Fragment>
        )}
      </Grid>
    </Grid>
  );
};

export default FactionNameCreator;
