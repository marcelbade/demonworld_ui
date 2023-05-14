// React
import React, { useState, useContext, useEffect } from "react";
//Material UI
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import SelectionInput from "../../shared/selectionInput";

// constants
import { ARMY_TO_ALTERNATIVES_MAPPER, ALTERNATIVE_ARMY_SELECTION_TEXT } from "../../../constants/factions";

const useStyles = makeStyles({});

const AlternativeArmyListSelector = () => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  //state
  const [options, setOptions] = useState([]);
  const [labelText, setLabelText] = useState("");
  const [alternativeArmyListOption, setAlternativeArmyListOption] = useState("");

  useEffect(() => {
    setOptions(optionSelector());
  }, [contextArmy.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLabelText(labelTextSelector());
  }, [contextArmy.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    contextArmy.setSelectedAlternativeList(alternativeArmyListOption);
  }, [alternativeArmyListOption]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function maps the name of an army to the names of its alternative list and returns them, if it has any.
   * @returns returns the names of the alternative army lists as Strings
   */
  const optionSelector = () => {
    if (contextArmy.armyHasAlternativeLists) {
      return ARMY_TO_ALTERNATIVES_MAPPER[contextArmy.selectedFactionName];
    }
  };

  /**
   * Funtcion retrieves the correct label text for the input element.
   * @returns String with the label text.
   */
  const labelTextSelector = () => {
    if (contextArmy.armyHasAlternativeLists) {
      return ALTERNATIVE_ARMY_SELECTION_TEXT[contextArmy.selectedFactionName];
    }
  };

  return (
    <Grid container direction="column" className={classes.overlay}>
      <SelectionInput
        className={classes.selector}
        filterFunction={setAlternativeArmyListOption}
        isArmySelector={false}
        options={options}
        label={labelText}
      />
    </Grid>
  );
};

export default AlternativeArmyListSelector;
