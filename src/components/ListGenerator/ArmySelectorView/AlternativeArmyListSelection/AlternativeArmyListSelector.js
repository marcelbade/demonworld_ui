// React
import React, { useState, useContext, useEffect } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import SelectionInput from "../../../shared/selectionInput";
// constants
import { ARMY_ALTERNATIVES_LIST_MAPPER, ALTERNATIVE_ARMY_SELECTION_TEXT, ZWERGE } from "../../../../constants/factions";

const useStyles = makeStyles((theme) => ({
  alternativeListSelector: {
    marginTop: "3em",
    backgroundColor: "red",
    "& .MuiInputBase-input": {
      height: "5.5rem",
    },
  },
}));
const AlternativeArmyListSelector = () => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  //state
  const [options, setOptions] = useState([]);
  const [labelText, setLabelText] = useState("");

  useEffect(() => {
    setOptions(optionSelector());
  }, [contextArmy.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLabelText(labelTextSelector());
  }, [contextArmy.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function maps the name of an army to the names of its alternative list and returns them, if it has any.
   * @returns returns the names of the alternative army lists as Strings.
   */
  const optionSelector = () => {
    if (contextArmy.armyHasAlternativeLists) {
      if (contextArmy.selectedFactionName === ZWERGE) {
        const result = [...ARMY_ALTERNATIVES_LIST_MAPPER[contextArmy.selectedFactionName]];

        result.pop(); 
        return result;
      }
      return ARMY_ALTERNATIVES_LIST_MAPPER[contextArmy.selectedFactionName];
    }
  };

  /**
   * Function retrieves the correct label text for the input element.
   * @returns String with the label text.
   */
  const labelTextSelector = () => {
    if (contextArmy.armyHasAlternativeLists) {
      const result =
        contextArmy.selectedFactionName === ZWERGE
          ? ALTERNATIVE_ARMY_SELECTION_TEXT[contextArmy.selectedFactionName][0]
          : ALTERNATIVE_ARMY_SELECTION_TEXT[contextArmy.selectedFactionName];

      return result;
    }
  };

  return (
    <SelectionInput
      className={classes.alternativeListSelector}
      filterFunction={contextArmy.setSelectedAlternativeList}
      isArmySelector={true}
      options={options}
      label={<Typography>{labelText}</Typography>}
    />
  );
};

export default AlternativeArmyListSelector;
