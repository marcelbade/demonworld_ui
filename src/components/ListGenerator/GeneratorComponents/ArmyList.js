// React
import { useEffect, useContext } from "react";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { findDistinctSubfactions } from "../ListGeneratorFunctions";
import { calculateTotalUnitPointCost } from "../../shared/sharedFunctions";

const ArmyList = () => {
  const AC = useContext(ArmyContext);

  /**
   * Creates a list of all units of the selected faction.
   */
  useEffect(() => {
    AC.setListOfAllFactionUnits(AC.fetchedFactions.filter((f) => f.faction === AC.selectedFactionName));
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Find all distinct subFactions in the selected faction and create a set of them.
   */
  useEffect(() => {
    AC.setDistinctSubFactions(findDistinctSubfactions(AC.listOfAllFactionUnits));
  }, [AC.listOfAllFactionUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   *  Clear all selected units from the army list  when a new army is selected.
   */
  useEffect(() => {
    AC.resetTheState();
  }, [AC.listOfAllFactionUnits, AC.selectedFactionName, AC.selectedAlternativeList, AC.secondSelectedAlternativeList]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function calculate the total point value for the army.
   */
  useEffect(() => {
    let pointTotal = 0;
    if (AC.selectedUnits) {
      AC.selectedUnits.forEach((u) => {
        const totalUnitCost = calculateTotalUnitPointCost(u);
        pointTotal += totalUnitCost;
      });
    }

    AC.setTotalPointValue(pointTotal);
  }, [AC.selectedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  // this component returns no jsx - it is simply meant to help code readability by factoring out all logic for the army list from the ListGeneratorController component.
  return null;
};

export default ArmyList;
