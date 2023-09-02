// React
import { useEffect, useState, useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import AlternativeArmyListSelector from "../ArmySelectorView/AlternativeArmyListSelection/AlternativeArmyListSelector";
import SecondAlternativeArmySelector from "../ArmySelectorView/AlternativeArmyListSelection/SecondAlternativeArmySelector";
import { ArmyContext } from "../../../contexts/armyContext";
// constants
import {
  ARMY_ALTERNATIVES_LIST_MAPPER,
  ARMIES_WITH_ALTERNATIVE_LISTS,
  NONE,
  ALTERNATIVE_ARMY_SELECTION_TEXT,
  ARMIES_WITH_TWO_ALTERNATE_ARMY_PICKS,
} from "../../../constants/factions";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({}));

const AlternativeArmyLists = () => {
  const AC = useContext(ArmyContext);
  const classes = useStyles();
  const FIRST = "FIRST";
  const SECOND = "SECOND";

  // If the army's rules have alternative army lists, set to true.
  useEffect(() => {
    AC.setArmyHasAlternativeLists(ARMIES_WITH_ALTERNATIVE_LISTS[AC.selectedFactionName]);
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  // reset army's subFaction if alternate lists exist and one has been selected.
  useEffect(() => {
    if (AC.armyHasAlternativeLists && AC.selectedAlternativeList !== NONE) {
      alternateUnitListFilter();
    }
  }, [AC.armyHasAlternativeLists, AC.selectedAlternativeList]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    AC.setAlternateArmyListOptions(findDropdownOptions(FIRST));
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (ARMIES_WITH_TWO_ALTERNATE_ARMY_PICKS[AC.selectedFactionName] && AC.selectedAlternativeList !== NONE) {
      AC.setSecondAlternativeArmyOptions(findDropdownOptions(SECOND));
    }
  }, [AC.selectedFactionName, AC.selectedAlternativeList]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    AC.setAlternateArmyListLabelText(findLabelTexts());
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function filters units, removes all units that do not belong to the selected army list.
   */
  const alternateUnitListFilter = () => {
    const alternatives = ARMY_ALTERNATIVES_LIST_MAPPER[AC.selectedFactionName];
    const notSelected = alternatives.filter((a) => a !== AC.selectedAlternativeList);

    let tempArray = [...AC.subFactions];
    tempArray = tempArray.filter((f) => !notSelected.includes(f));

    AC.setAlternateListSubFactions([...tempArray]);
  };

  /**
   * Function retrieves the correct label text for the input element.
   * @returns String with the label text.
   */
  const findLabelTexts = () => {
    return ALTERNATIVE_ARMY_SELECTION_TEXT[AC.selectedFactionName];
  };

  /**
   *Function returns the names of the alternative army lists as options for the drop down menu.
   * @returns an array of string values.
   */
  const findDropdownOptions = (menu) => {
    let result = [];

    const listMapping = ARMY_ALTERNATIVES_LIST_MAPPER[AC.selectedFactionName];

    if (menu === FIRST) {
      result = [...listMapping];
    }
    if (menu === SECOND) {
      let temp = listMapping.filter((m) => m !== AC.selectedAlternativeList);
      result = [...temp];
    }

    return result;
  };

  return (
    <Fragment>
      {AC.armyHasAlternativeLists ? (
        <AlternativeArmyListSelector //
          alternateArmyFirstSelector={true}
          isArmySelector={false}
          className={classes.selector}
        />
      ) : null}
      {ARMIES_WITH_TWO_ALTERNATE_ARMY_PICKS[AC.selectedFactionName] && //
      AC.selectedAlternativeList !== NONE ? (
        <AlternativeArmyListSelector //
          alternateArmyFirstSelector={false}
          isArmySelector={false}
          className={classes.selector}
        />
      ) : null}
    </Fragment>
  );
};

export default AlternativeArmyLists;
