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

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid
      container
      direction="column" //
      sx={{ width: "40em" }}
    >
      {AYC.allyName !== NO_ALLY ? (
        <TreeViewTabButtons
          styleButtons={styleButtons} //
          handleTabChange={handleTabChange}
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
  );
};

export default FactionTreeView;
