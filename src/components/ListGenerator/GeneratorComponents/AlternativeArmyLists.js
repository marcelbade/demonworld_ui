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
import { ALLIES_MAPPING, NO_ALLY } from "../../../constants/allies";

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

  // If there two alternative lists, set to true.
  useEffect(() => {
    AC.setArmyHasSecondChoice(ARMIES_WITH_TWO_ALTERNATE_ARMY_PICKS[AC.selectedFactionName]);
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  // reset army's subFaction if alternate lists exist and one has been selected.
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
  const alternativeArmyListFilter = (numberOfselections) => {
    const alternatives = ARMY_ALTERNATIVES_LIST_MAPPER[AC.selectedFactionName];
    let tempArray = [...AC.subFactions];
    let notSelected = [];
    let filterSubFactions;

    // are there one or two selectors for alternative lists?
    numberOfselections === 1
      ? (filterSubFactions = filterForOneAlternative) //
      : (filterSubFactions = filterForTwoAlternatives);

    notSelected = alternatives.filter((a) => filterSubFactions(a));
    tempArray = tempArray.filter((f) => !notSelected.includes(f));

    //allies
    if (tempArray.includes(ALLIES_MAPPING[AC.selectedFactionName])) {
      AC.setShowAlly(false);
    } else {
      AC.setShowAlly(true);
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
   * Function retrieves the correct label text for the input element.
   * @returns String with the label text.
   */
  const findLabelTexts = () => {
    return ALTERNATIVE_ARMY_SELECTION_TEXT[AC.selectedFactionName];
  };

  /**
   * Function returns the names of the alternative army lists as options for the drop down menu.
   * If the menu is the second option (in addition to the first),
   * then the array of options is simply the array for the first menu minus the selected value.
   * @returns an array of string values.
   */
  const findDropdownOptions = (menu) => {
    let result = [];

    const options = ARMY_ALTERNATIVES_LIST_MAPPER[AC.selectedFactionName];

    if (menu === FIRST) {
      result = [...options];
    }

    if (menu === SECOND) {
      let temp = options.filter((m) => m !== AC.selectedAlternativeList);
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
      {ARMIES_WITH_TWO_ALTERNATE_ARMY_PICKS[AC.selectedFactionName] && AC.selectedAlternativeList !== NONE ? (
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
