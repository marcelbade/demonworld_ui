// react
import React, { Fragment, useContext } from "react";
// material ui
import { FormGroup, Grid, FormControlLabel, Checkbox } from "@mui/material";

import SelectionInput from "../shared/selectionInput";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { ArmyContext } from "../../contexts/armyContext";
import { CardCreationContext } from "../../contexts/cardCreationContext";
// constants
import { ALL_FACTIONS_ARRAY, NONE } from "../../constants/factions";

const FactionNameCreator = () => {
  const AC = useContext(ArmyContext);
  const CCC = useContext(CardCreationContext);

  const handleFactionInput = (name) => {
    CCC.setFactionName(name);
  };

  const clearFactionName = () => {
    return ALL_FACTIONS_ARRAY.filter((f) => f !== CCC.factionName);
  };

  const setFactionList = () => {
    const resultingList =
      CCC.factionName !== NONE //
        ? ALL_FACTIONS_ARRAY.filter((f) => f !== CCC.factionName)
        : ALL_FACTIONS_ARRAY;

    return resultingList;
  };

  const handleSubFactionInput = (name) => {
    CCC.setSubFactionName(name);
  };

  const clearSubFactionName = () => {
    const faction = AC.fetchedFactions.filter((f) => f.factionName === CCC.factionName);
    return faction.subFactions.map((sF) => sF.name);
  };

  const setSubFactionList = () => {
    if (CCC.factionName !== "") {
      return AC.fetchedFactions
        .find((f) => f.factionName === CCC.factionName) // find army obj
        .subFactions.map((sF) => sF.name) // return array of sub faction names
        .filter((sf) => sf !== CCC.subFactionName); // do not show current selection in the dropdown list
    } else {
      return [];
    }
  };

  const deleteFactionName = () => {
    CCC.setFactionName("");
  };

  const changeFactionName = (event) => {
    CCC.setFactionName(event.target.value);
  };

  const deleteSubFactionName = () => {
    CCC.setSubFactionName("");
  };

  const changeSubFactionName = (event) => {
    CCC.setSubFactionName(event.target.value);
  };

  const isNewFaction = () => {
    CCC.setNewFaction((prevState) => !prevState);
  };

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      sx={{
        width: "max-content",
        border: " solid 2px black",
        borderRadius: "10px",
      }}
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
              />
            }
            label={"Neue Fraktion Erstellen"}
            labelPlacement="start"
          />
        </FormGroup>
      </Grid>
      <Grid
        item //
        container
        direction="row"
        width="50em"
      >
        {CCC.newFaction ? (
          <Fragment>
            <CreatorTextInput
              id={"factionName"} //
              value={CCC.factionName}
              onClick={deleteFactionName}
              onChange={changeFactionName}
              label={"Fraktion:"}
            />

            <CreatorTextInput
              id={"subFactionName"} //
              value={CCC.subFactionName}
              onClick={deleteSubFactionName}
              onChange={changeSubFactionName}
              label={"Teilfraktion:"}
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
                label={"Fraktion:"}
                width={"20em"}
              />
            </Grid>
            <Grid>
              <SelectionInput
                isArmySelector={false}
                filterFunction={handleSubFactionInput}
                clearFunction={clearSubFactionName}
                alternatives={setSubFactionList()}
                label={"Teilfraktion:"}
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
