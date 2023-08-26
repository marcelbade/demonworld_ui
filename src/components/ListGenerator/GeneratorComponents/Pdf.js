// React
import { useEffect, useContext } from "react";
// Material UI
// components and functions
import { filterForSubFaction } from "../ListGeneratorFunctions";

import { ArmyContext } from "../../../contexts/armyContext";

const Pdf = () => {
  const AC = useContext(ArmyContext);

  // Set the PDF master list for pdf viewer.
  useEffect(() => {
    let tempArray = [];

    AC.distinctSubFactions.forEach((sF) => {
      tempArray.push({ subFaction: sF, units: filterForSubFaction(AC.selectedUnits, sF) });
      AC.setPdfMasterList([...tempArray]);
    });
  }, [AC.distinctSubFactions, AC.selectedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  // reset the PDF master list when another army is selected.
  useEffect(() => {
    AC.setSelectedAlternativeList("NONE");
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  // this component returns no jsx - it is simply meant to help code readability by factoring out all logic for army validation from the ListGeneratorController component.
  return null;
};

export default Pdf;
