// React
import { useEffect, useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import AlternativeArmyListSelector from "../ArmySelectorView/AlternativeArmyListSelection/AlternativeArmyListSelector";
import DwarfsSecondSelector from "../ArmySelectorView/AlternativeArmyListSelection/DwarfsSecondSelector";
import { ArmyContext } from "../../../contexts/armyContext";
import { findDistinctSubfactions } from "../ListGeneratorFunctions";
// constants
import {
  ARMY_ALTERNATIVES_LIST_MAPPER,
  ARMIES_TWO_CHOICES_PER_ALTERNATIVE_LIST,
  ARMIES_WITH_ALTERNATIVE_LISTS,
} from "../../../constants/factions";
import { ZWERGE } from "../../../constants/factions";
import { ALLIES_MAPPING } from "../../../constants/allies";
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
    let tempArray = [...findDistinctSubfactions(AC.listOfAllFactionUnits)];

    if (AC.listOfAllFactionUnits) {
      tempArray = tempArray.filter((subFaction) => alternateListSelectionFilter(subFaction));
    }

    AC.setDistinctSubFactions([...tempArray]);
  }, [AC.selectedFactionName, AC.selectedAlternativeList, AC.secondDwarvenOption]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function filters down an army's sub factions to the ones listed in the selected alternative army list.
   * Alternative army lists work by excluding certain sub factions from the list of sub factions available to the user.
   * This function takes an array of all possible choices (all sub factions affected by the alternative army lists),
   * removes the choice picked by the user and
   * then uses the resulting array to filter out all units that belong the sub factions excluded by that alternative list.
   * There is one faction (dwarfs) that requires 2 choices, the second being hard coded.
   * @param {String} subFaction
   * @returns true, if no alternative lists exist or if the subfaction has been selected by the user.
   */
  //TODO: can be simplified with filter!
  const alternateListSelectionFilter = (subFaction) => {
    if (ARMY_ALTERNATIVES_LIST_MAPPER[AC.selectedFactionName] !== undefined) {
      const tempArray = [...ARMY_ALTERNATIVES_LIST_MAPPER[AC.selectedFactionName]];

      const choice = tempArray.indexOf(AC.selectedAlternativeList);
      tempArray.splice(choice, 1);

      if (ARMIES_TWO_CHOICES_PER_ALTERNATIVE_LIST.includes(AC.selectedFactionName)) {
        const secondChoice = tempArray.indexOf(AC.secondDwarvenOption);
        tempArray.splice(secondChoice, 1);
      }

      if (tempArray.includes(ALLIES_MAPPING[AC.selectedFactionName])) {
        AC.setAllyName("");
        AC.setListOfAlliedUnits([]);
      }

      return !tempArray.includes(subFaction);
    }

    return true;
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
