// React
import React, { useState, useContext, useEffect } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
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
  const AC = useContext(ArmyContext);

  //state
  const [options, setOptions] = useState([]);
  const [labelText, setLabelText] = useState("");

  useEffect(() => {
    setOptions(findMenuOptions());
  }, [AC.selectedAlternativeList]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLabelText(findLabelText());
  }, [AC.selectedAlternativeList]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * functions generates the options for the autocomplete dynmaically by checking which option was selected in the first dropdown.
   * @returns
   */
  const findMenuOptions = () => {
    const result = [...ARMY_ALTERNATIVES_LIST_MAPPER[AC.selectedFactionName]];
    // remove selected option
    const position = result.indexOf(AC.selectedAlternativeList);
    result.splice(position, 1);

    return result;
  };

  /**
   * Function retrieves the correct label text for the input element.
   * @returns String with the label text.
   */
  const findLabelText = () => {
    if (AC.armyHasAlternativeLists) {
      return ALTERNATIVE_ARMY_SELECTION_TEXT[AC.selectedFactionName][1];
    }
  };

  return (
    <SelectionInput
      className={classes.alternativeListSelector}
      filterFunction={AC.setSecondAlternativeArmyOption}
      isArmySelector={true}
      options={options}
      label={<Typography>{labelText}</Typography>}
    />
  );
};

export default DwarfsSecondSelector;
