// React
import { useEffect, useContext } from "react";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { findDistinctSubfactions } from "../ListGeneratorFunctions";
// constants
import { ALLIES_MAPPING, NO_ALLY } from "../../../constants/allies";

const Allies = () => {
  const AC = useContext(ArmyContext);

  //Find The allied faction, if it exists. If no ally exists, return "no ally" instead of null.
  useEffect(() => {
    const name = ALLIES_MAPPING[AC.selectedFactionName] //
      ? ALLIES_MAPPING[AC.selectedFactionName]
      : NO_ALLY;

    AC.setAllyName(name);
  }, [AC.listOfAllFactionUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  // Add the ally as a subfaction.
  useEffect(() => {
    let temp = [...AC.subFactions];

    if (AC.allyName !== NO_ALLY) {
      temp.push(AC.allyName);
    }
    AC.setDistinctSubFactions([...temp]);
  }, [AC.allyName]); // eslint-disable-line react-hooks/exhaustive-deps

  // Create a list of all allied units.
  useEffect(() => {
    if (AC.allyName !== NO_ALLY) {
      AC.setListOfAlliedUnits(AC.fetchedFactions.filter((f) => f.faction === AC.allyName));
    }
  }, [AC.allyName]); // eslint-disable-line react-hooks/exhaustive-deps

  // Find the ally's distinct subFactions in the selected faction and create a set of them.
  useEffect(() => {
    if (AC.allyName !== NO_ALLY) {
      const ally = AC.fetchedFactions.filter((f) => f.faction === AC.allyName);
      AC.setDistinctAllySubFactions(findDistinctSubfactions(ally));
    }
  }, [AC.allyName]); // eslint-disable-line react-hooks/exhaustive-deps

  // this component returns no jsx - it is simply meant to help code readability by factoring out all logic for allies from the ListGeneratorController component.
  return null;
};

export default Allies;
