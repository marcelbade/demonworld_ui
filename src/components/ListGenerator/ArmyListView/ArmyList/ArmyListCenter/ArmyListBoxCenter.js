// React
import React, { useContext } from "react";
// Material UI
import List from "@mui/material/List";
// components and functions
import ArmyListSubFactionEntry from "./ArmyListComponents/ArmyListSubFactionEntry";
import { isSubFactionAlternativeAndSelected } from "../../../../../util/utilityFunctions";
import useArmyValidation from "../../../../../customHooks/UseArmyValidation";
import UseDisplayAlly from "../../../../../customHooks/UseDisplayAlly";
// context
import { ArmyContext } from "../../../../../contexts/armyContext";
import { AllyContext } from "../../../../../contexts/allyContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";

const ArmyListBoxCenter = () => {
  const AC = useContext(ArmyContext);
  const SEC = useContext(SelectionContext);
  const AYC = useContext(AllyContext);

  const validation = useArmyValidation();
  const useAlly = UseDisplayAlly();

  /**
   * Filters the selected units by subFaction. If allied units have been selected,
   * then their subFaction name is replaced with their faction name.
   * @param {[unitCard Objects]} allSelectedUnits
   * @param {String} subFaction
   * @returns
   */
  const filterUnitsForSubFaction = (subFaction) => {
    SEC.selectedUnits.forEach((u) => (u.faction === AYC.allyName ? (u.subFaction = u.faction) : null));
    return SEC.selectedUnits.filter((u) => u.subFaction === subFaction);
  };

  /**
   *
   * @param {*} subFactionDtoList
   * @returns
   */
  const filterAndCreateSubFactionValidationObjectList = (subFactionDtoList) => {
    let clonedSubFactionList = structuredClone(subFactionDtoList);

    const testResult = validation.testArmySelectionAndRunValidation(SEC.selectedUnits, SEC.maxPointsAllowance);

    return clonedSubFactionList
      .filter((subFactionDTO) => isSubFactionAlternativeAndSelected(subFactionDTO))
      .map((subFactionDTO) => validation.createSubFactionResultObject(subFactionDTO.name, testResult));
  };

  return (
    <List
      sx={{
        minHeight: "60em", //
      }}
    >
      {/* show army entries */}
      {filterAndCreateSubFactionValidationObjectList(AC.subFactionDTOs) //
        .map((validationObj, i) => (
          <ArmyListSubFactionEntry
            key={i} //
            subFaction={validationObj.subFactionName}
            valid={validationObj.valid}
            message={validationObj.validationMessage}
            units={filterUnitsForSubFaction(validationObj.subFactionName)}
          />
        ))}
      {/* show ally entries */}
      {useAlly.showAlly(AC.selectedFactionName) ? (
        <ArmyListSubFactionEntry
          key={AYC.allyName} //
          subFaction={AYC.allyName}
          valid={true}
          units={filterUnitsForSubFaction(AYC.allyName)}
        />
      ) : null}
    </List>
  );
};

export default ArmyListBoxCenter;
