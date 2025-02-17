// react
import React, { useContext, useEffect, useState } from "react";
// material ui
import { Grid } from "@mui/material";
// context
import { ArmyContext } from "../../../../contexts/armyContext";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";
import { AllyContext } from "../../../../contexts/allyContext";
// components and functions
import UnitSelectionTree from "./UnitSelectionTree.js";
import useArmyValidation from "../../../../customHooks/UseArmyValidation.js";
import UseDisplayAlly from "../../../../customHooks/UseDisplayAlly.js";
// constants
import { SelectionContext } from "../../../../contexts/selectionContext.js";
import { NO_ALLY } from "../../../../constants/factions.js";
import TreeViewTabButtons from "./TreeViewTabButtons.js";

const FactionTreeView = () => {
  const AC = useContext(ArmyContext);
  const ALC = useContext(AlternativeListContext);
  const AYC = useContext(AllyContext);
  const SEC = useContext(SelectionContext);

  const validation = useArmyValidation();
  const display = UseDisplayAlly();

  const [tabValue, setTabValue] = useState(0);

  const SHOW_ARMY = 0;
  const SHOW_ALLY = 1;

  useEffect(() => {
    display.showAlly(AC.selectedFactionName);
    validation.validateList([], SEC.maxPointsAllowance);
  }, [JSON.stringify(ALC.selectedAlternativeLists)]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function controls the buttons` styling. The selected Button/Tab
   * is highlighted.
   * @param {int} tab
   * @param {int} index
   * @param {boolean} showBttn
   * @returns an object with css properties.
   */
  const styleButtons = (tab, index) => {
    return tab === index //
      ? {
          backgroundColor: "lightgrey", //
          borderBottom: "solid 0.1em black",
          borderRadius: 0,
          width: "50%",
        }
      : { width: "50%" };
  };

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
   * - the faction has an ally it`s an alternative list and
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
        <TreeViewTabButtons
          styleButtons={styleButtons} //
          handleTabChange={setTabValue}
          SHOW_ARMY={SHOW_ARMY}
          SHOW_ALLY={SHOW_ALLY}
          tabValue={tabValue}
        />
      ) : null}
      <Grid
        container
        direction="row" //
      >
        <UnitSelectionTree
          isFaction={true} //
          tabValue={tabValue}
          SHOW_ALLY={SHOW_ARMY}
        />
        <UnitSelectionTree
          isFaction={false} //
          tabValue={tabValue}
          SHOW_ALLY={SHOW_ALLY}
        />
      </Grid>
    </Grid>
  ) : null;
};

export default FactionTreeView;
