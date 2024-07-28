// react
import React, { Fragment, useContext } from "react";
// material ui
import { Grid } from "@mui/material";
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

  return (
    <Grid
      container
      justifyContent="space-around" //
      direction="row"
      sx={{
        width: "max-content",
      }}
    >
      {CCC.newFaction ? (
        <Fragment>
          <CreatorTextInput
            id={"factionName"} //
            value={CCC.factionName}
            onClick={deleteFactionName}
            onChange={changeFactionName}
            adornment={"Fraktion:"}
          />

          <CreatorTextInput
            id={"subFactionName"} //
            value={CCC.subFactionName}
            onClick={deleteSubFactionName}
            onChange={changeSubFactionName}
            adornment={"Teilfraktion:"}
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
  );
};

export default FactionNameCreator;
