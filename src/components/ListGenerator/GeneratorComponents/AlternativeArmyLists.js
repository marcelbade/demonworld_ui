// React
import { useEffect, useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import AlternativeArmyListSelector from "../ArmySelectorView/AlternativeArmyListSelection/AlternativeArmyListSelector";
import DwarfsSecondSelector from "../ArmySelectorView/AlternativeArmyListSelection/DwarfsSecondSelector";
import { ArmyContext } from "../../../contexts/armyContext";
// constants
import { ARMY_ALTERNATIVES_LIST_MAPPER, ARMIES_WITH_ALTERNATIVE_LISTS, NONE } from "../../../constants/factions";
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
      alternateSubFactionFilter();
    }
  }, [AC.armyHasAlternativeLists, AC.selectedAlternativeList]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function filters down an army's sub factions to the ones listed in the selected alternative army list.
   * Alternative army lists work in one of two ways:
   * either by excluding certain sub factions from the list of sub factions available to the user
   * or by removing units from the list of all units available.
   * This function takes an array of all possible choices (all sub factions affected by the alternative army lists),
   * removes the one option selected by the user and
   * then uses the resulting array to filter out all units that belong the sub factions excluded by that alternative list.
   * There is one faction (dwarfs) that requires 2 choices, the second being hard coded.
   * @param {String} subFaction
   *
   * @returns true, if no alternative lists exist or if the subfaction has been selected by the user.
   */
  const alternateUnitListFilter = () => {
    const alternatives = ARMY_ALTERNATIVES_LIST_MAPPER[AC.selectedFactionName];
    const notSelected = alternatives.filter((a) => a !== AC.selectedAlternativeList);

    let tempArray = [...AC.listOfAllFactionUnits];

    tempArray = tempArray.filter((u) => {
      if (notSelected.includes(u.subFaction)) {
        return false;
      }
      return true;
    });

    AC.setAlternativeUnitList([...tempArray]);
  };

  const alternateSubFactionFilter = () => {
    const alternatives = ARMY_ALTERNATIVES_LIST_MAPPER[AC.selectedFactionName];
    const notSelected = alternatives.filter((a) => a !== AC.selectedAlternativeList);
    const tempArray = [...AC.subFactions];

    AC.setAlternativeSubFactionList(tempArray.filter((sF) => !notSelected.includes(sF)));
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
