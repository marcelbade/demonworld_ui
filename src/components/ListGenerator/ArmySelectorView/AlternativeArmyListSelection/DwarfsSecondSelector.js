// React
import React, { useState, useContext, useEffect } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, TextField } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import SelectionInput from "../../../shared/selectionInput";
// constants
import { ARMY_ALTERNATIVES_LIST_MAPPER, ALTERNATIVE_ARMY_SELECTION_TEXT } from "../../../../constants/factions";

const useStyles = makeStyles((theme) => ({
  alternativeListSelector: {
    marginTop: "3em",
    backgroundColor: "red",
    "& .MuiInputBase-input": {
      height: "5.5rem",
    },
  },
}));
const DwarfsSecondSelector = () => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  //state
  const [options, setOptions] = useState([]);
  const [labelText, setLabelText] = useState("");

  useEffect(() => {
    setOptions(SelectOptionsDynamically());
  }, [contextArmy.selectedAlternativeList]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLabelText(labelTextSelector());
  }, [contextArmy.selectedAlternativeList]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   *
   * @returns
   */
  const SelectOptionsDynamically = () => {
    const result = [...ARMY_ALTERNATIVES_LIST_MAPPER[contextArmy.selectedFactionName]];
    // remove selected option
    const position = result.indexOf(contextArmy.selectedAlternativeList);
    result.splice(position, 1);

    return result;
  };

  /**
   * Function retrieves the correct label text for the input element.
   * @returns String with the label text.
   */
  const labelTextSelector = () => {
    if (contextArmy.armyHasAlternativeLists) {
      return ALTERNATIVE_ARMY_SELECTION_TEXT[contextArmy.selectedFactionName][1];
    }
  };

  return (
    <SelectionInput
      className={classes.alternativeListSelector}
      filterFunction={contextArmy.setSecondDwarvenOption}
      isArmySelector={true}
      options={options}
      label={<Typography>{labelText}</Typography>}
    />
  );
};

export default DwarfsSecondSelector;
