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
   * Filters the selected units by subFaction. If allied units have been selected, then their subFaction name is replaced with their faction name.
   * @param {[unitCard Objects]} allSelectedUnits
   * @param {String} subFaction
   * @returns
   */
  const filterUnitsForSubFaction = (subFaction) => {
    SEC.selectedUnits.forEach((u) => (u.faction === AYC.allyName ? (u.subFaction = u.faction) : null));
    return SEC.selectedUnits.filter((u) => u.subFaction === subFaction);
  };

  return (
    <List
      sx={{
        minHeight: "60em", //
      }}
    >
      {AC.subFactionDTOs
        .filter((dto) => isSubFactionAlternativeAndSelected(dto))
        .map((dto) => validation.createSubFactionResultObject(dto.name, validation.validateList( SEC.selectedUnits, SEC.maxPointsAllowance)))
        .map((obj, i) => (
          <ArmyListSubFactionEntry
            key={i} //
            subFaction={obj.subFactionName}
            valid={obj.valid}
            message={obj.validationMessage}
            units={filterUnitsForSubFaction(obj.subFactionName)}
          />
        ))}
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
