// react
import { useContext, useEffect, useState } from "react";
// material ui
import { Grid2 as Grid } from "@mui/material";
// context
import { ArmyContext } from "../../../../contexts/armyContext";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";
import { AllyContext } from "../../../../contexts/allyContext.js";
// components and functions
import UnitSelectionTree from "./UnitSelectionTree.js";
import useArmyValidation from "../../../../customHooks/UseArmyValidation.js";
import UseDisplayAlly from "../../../../customHooks/UseDisplayAlly.js";
// constants
import { SelectionContext } from "../../../../contexts/selectionContext.js";
import { NO_ALLY } from "../../../../constants/factions.js";
import TabButtons from "../../../shared/TabButtons.js";
import { CREATOR } from "../../../../constants/textsAndMessages.js";
import TabPanel from "../../../shared/TabPanel.js";

const FactionTreeView = () => {
  const AC = useContext(ArmyContext);
  const ALC = useContext(AlternativeListContext);
  const AYC = useContext(AllyContext);
  const SEC = useContext(SelectionContext);

  const validation = useArmyValidation();
  const display = UseDisplayAlly();

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    display.showAlly(AC.selectedFactionName);
    validation.testArmySelectionAndRunValidation([], SEC.maxPointsAllowance);
  }, [JSON.stringify(ALC.selectedAlternativeLists)]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function tests, whether the tree view should be displayed.
   * @returns true, if
   *  - the army has no alternative lists
   *  - the alternative list selection is complete.
   */
  const showTreeView = () => {
    return ALC.armyHasAlternativeLists //
      ? ALC.altArmyListSelectionComplete
      : true;
  };

  /**
   * Function tests, whether the tab buttons and the ally tab
   * should be displayed.
   * @returns true, if
   * - the faction has an ally that is not also an
   *   alternative list
   * - the faction has an ally, it`s an alternative list and
   *   it was selected
   */
  const showTabBttns = () => {
    let factionHasAlly = AYC.allyName !== NO_ALLY;
    let isAllySelected = true;

    if (ALC.armyHasAlternativeLists) {
      isAllySelected =
        ALC.armyHasAlternativeLists && //
        ALC.selectedAlternativeLists.includes(AYC.allyName);
    }

    return factionHasAlly && isAllySelected;
  };

  return showTreeView() ? (
    <Grid
      container
      direction="column" //
      sx={{ width: "40em" }}
    >
      {showTabBttns() ? (
        <TabButtons
          direction="row"
          handleTabChange={setTabValue} //
          altPanels={[CREATOR.FACTION_NAME, CREATOR.ALLY]}
          tabValue={tabValue}
          showBottomBorder={true}
        />
      ) : null}
      <Grid
        container //
        direction="row"
        sx={{
          marginTop:"2em",
        }}
      >
        <TabPanel
          panelNr={0}
          tabValue={tabValue}
          content={
            <UnitSelectionTree
              isFaction={true} //
            />
          }
        />
        <TabPanel
          panelNr={1}
          tabValue={tabValue}
          content={
            <UnitSelectionTree
              isFaction={false} //
            />
          }
        />
      </Grid>
    </Grid>
  ) : null;
};

export default FactionTreeView;
