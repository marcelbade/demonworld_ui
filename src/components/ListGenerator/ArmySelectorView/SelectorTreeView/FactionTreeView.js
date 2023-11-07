import React, { useContext } from "react";
// material ui
import makeStyles from "@mui/styles/makeStyles";
import { Typography } from "@mui/material";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";
import { AllyContext } from "../../../../contexts/allyContext";
import Tree from "./Tree.js";
// constants
import { NO_ALLY } from "../../../../constants/factions";

const useStyles = makeStyles((theme) => ({
  allyName: {
    marginLeft: "1em",
    paddingTop: "1em",
    marginBottom: "1em",
    borderBottom: "black 1px solid",
    width: "70%",
  },
}));

// only show the army selection tree if the army and, if it exists, the alternative list has been selected.
const FactionTreeView = () => {
  const classes = useStyles();

  const AC = useContext(ArmyContext);
  const ALC = useContext(AlternativeListContext);
  const AYC = useContext(AllyContext);

  /**
   * Function checks if the user is done selecting an army.
   * @returns
   */
  const selectionComplete = () => {
    return ALC.armyHasAlternativeLists ? ALC.altArmyListSelectionComplete : true;
  };

  return selectionComplete() ? (
    <>
      <Tree subFactionDtoList={AC.subFactionDTOs} />

      {AYC.allyName !== NO_ALLY ? (
        <>
          <Typography variant="h5" align="left" className={classes.allyName}>
            Alliierte: {AYC.allyName}
          </Typography>
          <Tree subFactionDtoList={AYC.allySubFactionDTOs} />
        </>
      ) : null}
    </>
  ) : null;
};

export default FactionTreeView;
