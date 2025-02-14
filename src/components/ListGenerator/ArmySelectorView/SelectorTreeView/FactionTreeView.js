import React, { useContext, useEffect } from "react";
// material ui
import { Box, Tabs, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// context
import { ArmyContext } from "../../../../contexts/armyContext";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";
import { AllyContext } from "../../../../contexts/allyContext";
// components and functions
import UnitSelectionTree from "./UnitSelectionTree.js";
import useArmyValidation from "../../../../customHooks/UseArmyValidation.js";
import UseDisplayAlly from "../../../../customHooks/UseDisplayAlly.js";
// constants
import { INPUT_TEXTS } from "../../../../constants/textsAndMessages.js";
import { SelectionContext } from "../../../../contexts/selectionContext.js";
import { NONE } from "../../../../constants/factions.js";

const FactionTreeView = () => {
  const AC = useContext(ArmyContext);
  const ALC = useContext(AlternativeListContext);
  const AYC = useContext(AllyContext);
  const SEC = useContext(SelectionContext);

  const validation = useArmyValidation();
  const display = UseDisplayAlly();
  const theme = useTheme();

  useEffect(() => {
    display.showAlly(AC.selectedFactionName);
    validation.validateList([], SEC.maxPointsAllowance);
  }, [JSON.stringify(ALC.selectedAlternativeLists)]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function conditionally returns object thatlets tree fade in.
   * @returns style to slowly fade in the tree view, if flag true.
   */
  const styleTree = () => {
    return AC.selectedFactionName === NONE //
      ? {}
      : theme.palette.animation.fadeIn;
  };

  return (
    <Box>
      <Box sx={styleTree()}>
        <UnitSelectionTree isFaction={true} />
        {display.showAlly(AC.selectedFactionName) ? (
          <>
            <Typography
              variant="h5"
              align="left"
              sx={{
                marginLeft: "1em", //
                paddingTop: "1em",
                marginBottom: "1em",
                borderBottom: "black 1px solid",
                width: "70%",
              }}
            >
              {INPUT_TEXTS.ALLY} {AYC.allyName}
            </Typography>
            <UnitSelectionTree
              subFactionDtoList={AYC.allySubFactionDTOs} //
              isFaction={false}
            />
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default FactionTreeView;
