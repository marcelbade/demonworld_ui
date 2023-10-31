// React
import React, { useContext, useState } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import SelectionInput from "../../../shared/selectionInput";
import useArmyValidation from "../../../../customHooks/UseArmyValidation";
// constants
import { ARMY_ALTERNATIVES_LIST_MAPPER, NONE } from "../../../../constants/factions";

const useStyles = makeStyles(() => ({
  alternativeListSelector: {
    marginTop: "3em",
    backgroundColor: "red",
    "& .MuiInputBase-input": {
      height: "5.5rem",
    },
  },
}));
const AlternativeArmyListSelector = (props) => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);
  const validation = useArmyValidation();

  const handleInput = (value) => {
    redoSubFactionSet(value);
  };

  const redoSubFactionSet = (value) => {
    const subFactions = AC.subFactions;
    const allOptions = AC.alternateArmyListOptions;

    if (props.firstSelector) {
      AC.setSelectedAlternativeList(value);
      createAlternativeSubFactionList(value, subFactions, allOptions);
      AC.setAltArmyListSelectionComplete(true);
    } else {
      AC.setSecondSelectedAlternativeList(value);
      createListWithSecondChoice(value, subFactions, allOptions);
      AC.setAltArmyListSelectionComplete(true);
    }
  };

  const createAlternativeSubFactionList = (value, subFactions, allOptions) => {
    const notSelectedOptions = allOptions.filter((o) => value !== o);
    const newSubFactionList = subFactions.filter((sF) => !notSelectedOptions.includes(sF));
    AC.setAlternateListSubFactions(newSubFactionList);
  };

  const createListWithSecondChoice = (value, subFactions, allOptions) => {
    const allChoices = [value, AC.selectedAlternativeList];
    const notSelectedOptions = allOptions.filter((o) => !allChoices.includes(o));
    const newSubFactionList = subFactions.filter((sF) => !notSelectedOptions.includes(sF));
    AC.setAlternateListSubFactions(newSubFactionList);
  };

  const setSecondOptionList = () => {
    return AC.alternateArmyListOptions.filter((o) => o !== AC.selectedAlternativeList);
  };

  //TODO
  const ifOptionsIncludeAlly = (value, subFactions, allOptions) => {};

  return (
    <SelectionInput
      className={classes.alternativeListSelector}
      filterFunction={handleInput}
      isArmySelector={true}
      options={
        props.firstSelector //
          ? ARMY_ALTERNATIVES_LIST_MAPPER[AC.selectedFactionName]
          : setSecondOptionList()
      }
      label={<Typography>{AC.alternateArmyListLabelText}</Typography>}
    />
  );
};

export default AlternativeArmyListSelector;
