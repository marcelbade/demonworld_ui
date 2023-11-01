// React
import React, { useContext, useState } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import SelectionInput from "../../../shared/selectionInput";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";
import { AllyContext } from "../../../../contexts/allyContext";
// import useArmyValidation from "../../../../customHooks/UseArmyValidation";
// constants
import { ARMY_ALTERNATIVES_LIST_MAPPER, NO_ALLY } from "../../../../constants/factions";

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
  const AYC = useContext(AllyContext);

  const [allyName] = useState(AYC.allyName);

  const allAlternativeOptions = ARMY_ALTERNATIVES_LIST_MAPPER[AC.selectedFactionName];

  const handleInput = (value) => {
    redoSubFactionSet(value);
  };

  const redoSubFactionSet = (value) => {
    const subFactions = AC.subFactions;

    if (props.firstSelector) {
      ALC.setSelectedAlternativeList(value);
      createAlternativeSubFactionList(value, subFactions, allAlternativeOptions);
      ALC.setAltArmyListSelectionComplete(true);
    } else {
      createListWithSecondChoice(value, subFactions, allAlternativeOptions);
      ALC.setAltArmyListSelectionComplete(true);
    }
  };

  /**
   * Function filters the default sub faction list to create the alternative army list.
   * @param {event.value} value selected alternative list
   * @param {[String]} subFactions name list
   * @param {[String]} allOptions  name list
   */
  const createAlternativeSubFactionList = (value, subFactions, allOptions) => {
    const notSelectedOptions = allOptions.filter((o) => value !== o);
    const newSubFactionList = subFactions.filter((sF) => !notSelectedOptions.includes(sF));
    ALC.setAlternateListSubFactions(newSubFactionList);
  };

  /**
   * Function filters the default sub faction list to create the alternative army list
   * for armies that require two choices for the alternative list.
   * @param {event.value} value selected alternative list
   * @param {[String]} subFactions name list
   * @param {[String]} allOptions  name list
   */
  const createListWithSecondChoice = (value, subFactions, allOptions) => {
    const allChoices = [value, ALC.selectedAlternativeList];
    const notSelectedOptions = allOptions.filter((o) => !allChoices.includes(o));
    const newSubFactionList = subFactions.filter((sF) => !notSelectedOptions.includes(sF));

    isAllyAnOption(newSubFactionList);
    ALC.setAlternateListSubFactions(newSubFactionList);
  };

  /**
   * Function checks if the ally is one of the alternatives. If so, and if it is not selected,  the state is changed so it isn't displayed.
   */
  const isAllyAnOption = (subFactionList) => {
    if (
      allAlternativeOptions.includes(AYC.allyName) && //
      !subFactionList.includes(AYC.allyName)
    ) {
      AYC.setAllyName(NO_ALLY);
    } else {
      AYC.setAllyName(allyName);
    }
  };

  /**
   * Function computes the options available to the user after he made the first choice.
   * @returns an array of the available options to be diplayed in the dropdown.
   */
  const setSecondOptionList = () => {
    return allAlternativeOptions.filter((o) => o !== ALC.selectedAlternativeList);
  };

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
