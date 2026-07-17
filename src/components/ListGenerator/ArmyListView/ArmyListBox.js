// React
import { useContext } from "react";
// components and functions
import { Grid, List } from "@mui/material";
import { isSubFactionAlternativeAndSelected } from "../../../util/utilityFunctions";
import ArmyListSubFactionEntry from "./ArmyList/ArmyListCenter/ArmyListComponents/ArmyListSubFactionEntry";
// context
import { AllyContext } from "../../../contexts/allyContext";
import { AlternativeListContext } from "../../../contexts/alternativeListContext";
import { ArmyContext } from "../../../contexts/armyContext";
import { SelectionContext } from "../../../contexts/selectionContext";
// custom hooks
import useArmyValidation from "../../../customHooks/UseArmyValidation";
import UseDisplayAlly from "../../../customHooks/UseDisplayAlly";
// constants
import { NONE } from "../../../constants/factions";

/**
 * JSX component returns the army list, i.e. the center
 * of the list generator page. Displays all selected units, items,
 * and tribes (if applicable)
 *
 * @returns  a JSX component.
 */

const ArmyListBox = () => {
  const AC = useContext(ArmyContext);
  const ALC = useContext(AlternativeListContext);
  const AYC = useContext(AllyContext);
  const SEC = useContext(SelectionContext);

  const validation = useArmyValidation();
  const useAlly = UseDisplayAlly();

  /**
   * Function checks if the user is done selecting an army,
   * by checking if this army has alternative lists. If that's the case
   * the flag altArmyListSelectionComplete is returned, otherwise it defaults to true.
   * If true, the component is displayed.
   * @returns true, if selection is complete.
   */
  const isSelectionComplete = () => {
    return ALC.armyHasAlternativeLists ? ALC.altArmyListSelectionComplete : true;
  };

  // Filters the selected units by subFaction.
  const filterUnitsForSubFaction = (subFaction) => {
    const tempArray = [...SEC.selectedUnits];

    return tempArray.filter((u) => u.subFaction === subFaction);
  };

  // Filters the selected units by ally name.
  const filterUnitsForAlly = (AllyName) => {
    const tempArray = [...SEC.selectedUnits];

    return tempArray.filter((u) => u.faction === AllyName);
  };

  /**
   *
   * @param {*} subFactionDtoList
   * @returns
   */
  const filterAndCreateSubFactionValidationObjectList = (subFactionDtoList) => {
    const validationResult = validation.testArmySelectionAndRunValidation(SEC.selectedUnits, SEC.maxPointsAllowance);

    return subFactionDtoList
      .filter((subFactionDTO) => isSubFactionAlternativeAndSelected(subFactionDTO))
      .map((subFactionDTO) => validation.createSubFactionResultObject(subFactionDTO.name, validationResult));
  };

  return isSelectionComplete() && AC.selectedFactionName !== NONE ? (
    <Grid
      container //
      direction={{ xs: "column" }}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <List
        sx={{
          minHeight: "60em", //
        }}
      >
        {/* display selected army units */}
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
        {/* display selected ally units */}
        {useAlly.showAlly(AC.selectedFactionName) ? (
          <ArmyListSubFactionEntry
            key={AYC.allyName} //
            subFaction={AYC.allyName}
            valid={true}
            units={filterUnitsForAlly(AYC.allyName)}
          />
        ) : null}
      </List>
    </Grid>
  ) : null;
};

export default ArmyListBox;
