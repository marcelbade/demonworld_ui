// React
import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import SelectionInput from "../../../shared/selectionInput";
// import useArmyValidation from "../../../../customHooks/UseArmyValidation";
// constants
import { ARMY_ALTERNATIVES_LIST_MAPPER } from "../../../../constants/factions";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";

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
  const ALC = useContext(AlternativeListContext);
  // const validation = useArmyValidation();

  const handleInput = (value) => {
    redoSubFactionSet(value);
  };

  const redoSubFactionSet = (value) => {
    const subFactions = AC.subFactions;
    const allOptions = ALC.alternateArmyListOptions;

    if (props.firstSelector) {
      ALC.setSelectedAlternativeList(value);
      createAlternativeSubFactionList(value, subFactions, allOptions);
      ALC.setAltArmyListSelectionComplete(true);
    } else {
      ALC.setsecondSelectedAlternativeList(value);
      createListWithSecondChoice(value, subFactions, allOptions);
      ALC.setAltArmyListSelectionComplete(true);
    }
  };

  const createAlternativeSubFactionList = (value, subFactions, allOptions) => {
    const notSelectedOptions = allOptions.filter((o) => value !== o);
    const newSubFactionList = subFactions.filter((sF) => !notSelectedOptions.includes(sF));
    ALC.setAlternateListSubFactions(newSubFactionList);
  };

  const createListWithSecondChoice = (value, subFactions, allOptions) => {
    const allChoices = [value, ALC.selectedAlternativeList];
    const notSelectedOptions = allOptions.filter((o) => !allChoices.includes(o));
    const newSubFactionList = subFactions.filter((sF) => !notSelectedOptions.includes(sF));
    ALC.setAlternateListSubFactions(newSubFactionList);
  };

  const setSecondOptionList = () => {
    return ALC.alternateArmyListOptions.filter((o) => o !== ALC.selectedAlternativeList);
  };

  //TODO
  // const ifOptionsIncludeAlly = (value, subFactions, allOptions) => {};

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
      label={<Typography>{ALC.alternateArmyListLabelText}</Typography>}
    />
  );
};

export default AlternativeArmyListSelector;
