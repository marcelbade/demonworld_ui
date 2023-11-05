import React, { useContext } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
// constants
import { NO_ALLY } from "../../../../constants/factions";
import { Typography } from "@mui/material";
// import { NONE } from "../../../../constants/factions";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";
import { AllyContext } from "../../../../contexts/allyContext";
import TreeUnitNodeList from "./TreeUnitNodeList.js";

const useStyles = makeStyles((theme) => ({
  allyName: {
    marginLeft: "1em",
    paddingTop: "1em",
    marginBottom: "1em",
    borderBottom: "black 1px solid",
    width: "70%",
  },
  subFactionNames: {
    "& .MuiTreeItem-label": {
      color: "red",
      FontFamily: "jaapokkiRegular",
    },
  },
}));

// only show the army selection tree if the army and, if it exists, the alternative list has been selected.
const FactionTreeView = () => {
  const classes = useStyles();

  const AC = useContext(ArmyContext);
  const ALC = useContext(AlternativeListContext);
  const AYC = useContext(AllyContext);

  const ALLY = "ally";
  const FACTION = "faction";

  const selectionComplete = () => {
    if (ALC.armyHasAlternativeLists) {
      return ALC.altArmyListSelectionComplete;
    }
    return true;
  };

  /**
   * Function selects a list of all sub factions for the army or for its ally.
   * If the army has alternative lists, the alternative list is
   * selected instead of the faction's list.
   * If a list of the army's sub faction is created,
   * the ally has to be removed from the array so it is not
   * displayed as one of the faction's sub faction in the tree.
   * @returns a list of all sub factions that can be found in the faction or in the allied faction
   */
  const selectsSubFactionList = (tree) => {
    let subfactions;
    if (!ALC.armyHasAlternativeLists && tree.type === FACTION) {
      subfactions = AC.subFactions;
    } else if (ALC.armyHasAlternativeLists && tree.type === FACTION) {
      subfactions = ALC.alternateListSubFactions;
    } else {
      subfactions = AYC.allySubFactions;
    }

    return subfactions;
  };
  const selectsunitList = (tree) => {
    let units;
    if (tree.type === FACTION) {
      units = AC.listOfAllFactionUnits;
    } else {
      units = AYC.listOfAlliedUnits;
    }

    return units;
  };

  const createSubFactionNodes = (tree) => {
    const list = selectsSubFactionList(tree).map((sF, i) => {
      {
        return (
          <TreeItem nodeId={`${i}`} label={sF} key={i}>
            {createUnitNodes(sF, tree)}
          </TreeItem>
        );
      }
    });

    return list;
  };

  const createUnitNodes = (subFaction, tree) => {
    return (
      <TreeUnitNodeList
        subFaction={subFaction} //
        units={selectsunitList(tree)}
        tree={tree}
      />
    );
  };

  return selectionComplete() ? (
    <>
      <TreeView
        className={classes.subFactionNames}
        aria-label="file system navigator" //
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {createSubFactionNodes({ type: FACTION })}
      </TreeView>

      {AYC.allyName !== NO_ALLY ? (
        <>
          <Typography variant="h5" align="left" className={classes.allyName}>
            Alliierte: {AYC.allyName}
          </Typography>

          <TreeView
            aria-label="file system navigator" //
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {createSubFactionNodes({ type: ALLY })}
          </TreeView>
        </>
      ) : null}
    </>
  ) : null;
};

export default FactionTreeView;
