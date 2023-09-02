// React
import { useEffect, useState, useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import AlternativeArmyListSelector from "../ArmySelectorView/AlternativeArmyListSelection/AlternativeArmyListSelector";
import DwarfsSecondSelector from "../ArmySelectorView/AlternativeArmyListSelection/DwarfsSecondSelector";
import { ArmyContext } from "../../../contexts/armyContext";
// constants
import {
  ARMY_ALTERNATIVES_LIST_MAPPER,
  ARMIES_WITH_ALTERNATIVE_LISTS,
  NONE,
  ALTERNATIVE_ARMY_SELECTION_TEXT,
} from "../../../constants/factions";
import { ZWERGE } from "../../../constants/factions";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({}));

const AlternativeArmyLists = () => {
  const AC = useContext(ArmyContext);
  const classes = useStyles();

  // If the army's rules have alternative army lists, set to true.
  useEffect(() => {
    AC.setArmyHasAlternativeLists(ARMIES_WITH_ALTERNATIVE_LISTS.includes(AC.selectedFactionName));
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  // reset army's subFaction if alternate lists exist and one has been selected.
  useEffect(() => {
    if (AC.armyHasAlternativeLists && AC.selectedAlternativeList !== NONE) {
      alternateUnitListFilter();
      // alternateSubFactionFilter();
    }
  }, [AC.armyHasAlternativeLists, AC.selectedAlternativeList]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    AC.setAlternateArmyListOptions(findDropdownOptions());
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

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

    AC.setDistinctSubFactions([...tempArray]);
  };

  /**
   * Function retrieves the correct label text for the input element.
   * @returns String with the label text.
   */
  const findLabelTexts = () => {
    const result =
      AC.selectedFactionName === ZWERGE
        ? ALTERNATIVE_ARMY_SELECTION_TEXT[AC.selectedFactionName][0]
        : ALTERNATIVE_ARMY_SELECTION_TEXT[AC.selectedFactionName];

    return result;
  };

  /**
   *Function returns the names of the alternative army lists as options for the drop down menu.
   * @returns an array of string values.
   */
  const findDropdownOptions = () => {
    if (AC.selectedFactionName === ZWERGE) {
      const result = [...ARMY_ALTERNATIVES_LIST_MAPPER[AC.selectedFactionName]];

      result.pop();
      return result;
    }

    return ARMY_ALTERNATIVES_LIST_MAPPER[AC.selectedFactionName];
  };

  return (
    <Fragment>
      {AC.armyHasAlternativeLists ? <AlternativeArmyListSelector isArmySelector={false} className={classes.selector} /> : null}
      {/* DWARFS ONLY */}
      {AC.selectedFactionName === ZWERGE && AC.selectedAlternativeList !== "" ? (
        <DwarfsSecondSelector isArmySelector={false} className={classes.selector} />
      ) : null}
    </Fragment>
  );
};

export default AlternativeArmyLists;
