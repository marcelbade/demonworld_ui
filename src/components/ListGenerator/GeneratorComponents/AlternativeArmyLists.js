// React
import { useEffect, useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import AlternativeArmyListSelector from "../ArmySelectorView/AlternativeArmyListSelection/AlternativeArmyListSelector";
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

  // Reset army's subFaction if alternate lists exist and one has been selected.
  useEffect(() => {
    if (
      AC.armyHasAlternativeLists && //
      !AC.armyHasSecondChoice &&
      AC.selectedAlternativeList !== NONE
    ) {
      alternativeArmyListFilter(1);
    } else if (
      AC.armyHasAlternativeLists && //
      AC.armyHasSecondChoice &&
      AC.selectedAlternativeList !== NONE &&
      AC.secondSelectedAlternativeList !== NONE
    ) {
      alternativeArmyListFilter(2);
    }
  }, [AC.armyHasAlternativeLists, AC.armyHasSecondChoice, AC.selectedAlternativeList, AC.secondSelectedAlternativeList]); // eslint-disable-line react-hooks/exhaustive-deps

  // Set the available options for the dropdown.
  useEffect(() => {
    AC.setAlternateArmyListOptions(findDropdownOptions(FIRST));
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  // Set the available options for the second dropdown if two the army has two choices.
  useEffect(() => {
    if (ARMIES_WITH_TWO_ALTERNATE_ARMY_PICKS[AC.selectedFactionName] && AC.selectedAlternativeList !== NONE) {
      AC.setSecondAlternativeArmyOptions(findDropdownOptions(SECOND));
    }
  }, [AC.selectedFactionName, AC.selectedAlternativeList]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function filters units, removes all units that do not belong to the selected army list.
   */
  const alternativeArmyListFilter = (numberOfselections) => {
    const alternatives = ARMY_ALTERNATIVES_LIST_MAPPER[AC.selectedFactionName];
    let tempArray = [...AC.subFactions];
    let notSelectedSubfactions = [];
    let filterSubFactions;

    // are there one or two selections needed to chose an alternative list?
    numberOfselections === 1
      ? (filterSubFactions = filterForOneAlternative) //
      : (filterSubFactions = filterForTwoAlternatives);

    notSelectedSubfactions = alternatives.filter((a) => filterSubFactions(a));
    tempArray = tempArray.filter((f) => !notSelectedSubfactions.includes(f));

    //allies
    if (tempArray.includes(AC.allyName)) {
      AC.setShowAlly(true);
    } else {
      AC.setShowAlly(false);
    }

    AC.setAlternateListSubFactions([...tempArray]);
  };

  /**
   * Both functions - filterForOneAlternative and filterForTwoAlternatives - are filter functions
   * for the alternativeArmyListFilter and filter for the alternative lists that haven't been selected.
   * @param {String} a
   * @returns a filtered array
   */
  const filterForOneAlternative = (a) => {
    return a !== AC.selectedAlternativeList;
  };
  const filterForTwoAlternatives = (a) => {
    return a !== AC.selectedAlternativeList && a !== AC.secondSelectedAlternativeList;
  };

  /**
   * Function returns the names of the alternative army lists as options for the drop down menu.
   * @returns an array of string values.
   */
  const findDropdownOptions = (menu) => {
    let result = [];
    if (AC.selectedFactionName !== undefined) {
      const options = ARMY_ALTERNATIVES_LIST_MAPPER[AC.selectedFactionName];

      if (menu === FIRST) {
        result = [...options];
      }

      if (menu === SECOND) {
        let temp = options.filter((m) => m !== AC.selectedAlternativeList);
        result = [...temp];
      }
    }

    return result;
  };

  return (
    <Fragment>
      {AC.armyHasAlternativeLists ? (
        <AlternativeArmyListSelector //
          alternativeArmyFirstSelector={true}
          isArmySelector={false}
          className={classes.selector}
        />
      ) : null}
      {ARMIES_WITH_TWO_ALTERNATE_ARMY_PICKS[AC.selectedFactionName] && AC.selectedAlternativeList !== NONE ? (
        <AlternativeArmyListSelector //
          alternativeArmyFirstSelector={false}
          isArmySelector={false}
          className={classes.selector}
        />
      ) : null}
    </Fragment>
  );
};

export default AlternativeArmyLists;
