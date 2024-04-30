import React, { useContext } from "react";
// material ui
import { Typography } from "@mui/material";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";
import { AllyContext } from "../../../../contexts/allyContext";
import Tree from "./Tree.js";
// constants
import { NO_ALLY } from "../../../../constants/factions";
import { INPUT_TEXTS } from "../../../../constants/textsAndMessages.js";

// only show the army selection tree if the army and, if it exists, the alternative list has been selected.
const FactionTreeView = () => {
  const AC = useContext(ArmyContext);
  const ALC = useContext(AlternativeListContext);
  const AYC = useContext(AllyContext);

  /**
   * Function checks if the user is done selecting an army,
   * by checking if this army has alternative lists. If that's the case
   * the flag altArmyListSelectionComplete is returned, otherwise it defaults to true.
   * @returns true, if selection is complete.
   */
  const isSelectionComplete = () => {
    return ALC.armyHasAlternativeLists ? ALC.altArmyListSelectionComplete : true;
  };

  /**
   * Function checks if an ally should be displayed.
   * @returns true if one exists and it is not part
   * of the alternative army selection
   */
  const displayAlly = () => {
    if (ALC.allyIsAlternativeOption) {
      return ALC.selectedAlternativeLists.includes(AYC.allyName);
    }

    return AYC.allyName !== NO_ALLY;
  };

  return isSelectionComplete() ? (
    <>
      <Tree subFactionDtoList={AC.subFactionDTOs} isFactionNotAlly={true} />

      {displayAlly() ? (
        <>
          <Typography
            variant="h5"
            align="left"
            sx={{ marginLeft: "1em", paddingTop: "1em", marginBottom: "1em", borderBottom: "black 1px solid", width: "70%" }}
          >
            {INPUT_TEXTS.ALLY} {AYC.allyName}
          </Typography>
          <Tree subFactionDtoList={AYC.allySubFactionDTOs} isFactionNotAlly={false} />
        </>
      ) : null}
    </>
  ) : null;
};

export default FactionTreeView;
