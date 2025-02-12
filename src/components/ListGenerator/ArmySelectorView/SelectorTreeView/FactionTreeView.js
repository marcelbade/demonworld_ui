import React, { useContext, useEffect } from "react";
// material ui
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// context
import { ArmyContext } from "../../../../contexts/armyContext";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";
import { AllyContext } from "../../../../contexts/allyContext";
// components and functions
import Tree from "./Tree.js";
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
   * Function checks if the user is done selecting an army,
   * by checking if this army has alternative lists. If that's the case
   * the flag altArmyListSelectionComplete is returned, otherwise it defaults to true.
   * @returns true, if selection is complete.
   */
  const isSelectionComplete = () => {
    return ALC.armyHasAlternativeLists //
      ? ALC.altArmyListSelectionComplete && AC.selectedFactionName !== NONE
      : true;
  };

  return isSelectionComplete() ? (
    <Box sx={AC.selectedFactionName === NONE ? {} : theme.palette.animation.fadeIn}>
      {AC.selectedFactionName === NONE ? null :  <Tree isFaction={true} />}

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
          <Tree
            subFactionDtoList={AYC.allySubFactionDTOs} //
            isFaction={false}
          />
        </>
      ) : null}
    </Box>
  ) : null;
};

export default FactionTreeView;
