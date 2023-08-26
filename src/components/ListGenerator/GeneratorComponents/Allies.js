// React
import { useEffect, useContext } from "react";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { findDistinctSubfactions } from "../ListGeneratorFunctions";
// constants
import { ALLIES_MAPPING } from "../../../constants/allies";

const Allies = () => {
  const AC = useContext(ArmyContext);

  const NONE = "none";

  //Find The allied faction, if it exists. If no ally exists, return "none" instead of null.
  useEffect(() => {
    const name = ALLIES_MAPPING[AC.selectedFactionName] //
      ? ALLIES_MAPPING[AC.selectedFactionName]
      : NONE;
    AC.setAllyName(name);
  }, [AC.listOfAllFactionUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  // Add the ally as a subfaction.
  useEffect(() => {
    if (AC.allyName) {
      let temp = AC.distinctSubFactions;

      if (AC.allyName !== NONE) {
        temp.push(AC.allyName);
      }
      AC.setDistinctSubFactions(temp);
    }
  }, [AC.allyName]); // eslint-disable-line react-hooks/exhaustive-deps

  // Create a list of all allied units.
  useEffect(() => {
    if (AC.allyName) {
      AC.setListOfAlliedUnits(AC.fetchedFactions.filter((f) => f.faction === AC.allyName));
    }
  }, [AC.allyName]); // eslint-disable-line react-hooks/exhaustive-deps

  // Find the ally's distinct subfactions in the selected faction and create a set of them.
  useEffect(() => {
    if (AC.allyName) {
      const ally = AC.fetchedFactions.filter((f) => f.faction === AC.allyName);
      AC.setDistinctAllySubFactions(findDistinctSubfactions(ally));
    }
  }, [AC.allyName]); // eslint-disable-line react-hooks/exhaustive-deps

  // this component returns no jsx - it is simply meant to help code readability by factoring out all logic for allies from the ListGeneratorController component.
  return null;
};

export default Allies;
