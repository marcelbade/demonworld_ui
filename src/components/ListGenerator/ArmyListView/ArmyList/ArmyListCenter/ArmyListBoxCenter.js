// React
import React, { useContext, useEffect } from "react";
// Material UI
import List from "@mui/material/List";
import { Grid } from "@mui/material";
// components and functions
import ArmyListSubFactionEntry from "./ArmyListComponents/ArmyListSubFactionEntry";
import { isSubFactionAlternativeAndSelected } from "../../../../../util/utilityFunctions";
import useArmyValidation from "../../../../../customHooks/UseArmyValidation";
// context
import { ArmyContext } from "../../../../../contexts/armyContext";
import { AllyContext } from "../../../../../contexts/allyContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
//  constants
import { NO_ALLY } from "../../../../../constants/factions";

const ArmyListBoxCenter = () => {
  const AC = useContext(ArmyContext);
  const SEC = useContext(SelectionContext);
  const AYC = useContext(AllyContext);
  const validation = useArmyValidation();

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
    <Grid container>
      <List>
        {AC.subFactionDTOs
          .filter((dto) => isSubFactionAlternativeAndSelected(dto))
          .map((dto) => validation.returnValidationResult("subFaction", dto.name))
          .map((obj, i) => (
            <ArmyListSubFactionEntry
              key={i} //
              subFaction={obj.subFactionName}
              valid={obj.valid}
              message={obj.validationMessage}
              units={filterUnitsForSubFaction(obj.subFactionName)}
            />
          ))}
        {AYC.allyName !== NO_ALLY ? (
          <ArmyListSubFactionEntry
            key={AYC.allyName} //
            subFaction={AYC.allyName}
            valid={true}
            units={filterUnitsForSubFaction(AYC.allyName)}
          />
        ) : null}
      </List>
    </Grid>
  );
};

export default ArmyListBoxCenter;
