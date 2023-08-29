import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { MinusSquare, PlusSquare, CloseSquare, TransitionComponent } from "./treeViewFunctions";
import { Fragment } from "react";
import Tree from "./Tree";
import { StyledTreeItem } from "./StyledTreeItem";
// constants
import { NO_ALLY } from "../../../../constants/allies";
import { NONE } from "../../../../constants/factions";

TransitionComponent.propTypes = {
  // Show the component; triggers the enter or exit states
  in: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  treeViewBox: {
    height: "auto",
    paddingLeft: "5em",
    [theme.breakpoints.up("md")]: {
      width: "45em",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  allyTitle: {
    paddingLeft: "5em",
    fontFamily: "BreatheOfFire",
    fontSize: "3em",
    color: "black",
    paddingTop: "1em",
  },
}));

const FactionTreeView = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);
  const SHOW_SUBFACTIONS = ["1"];

  useEffect(() => {
    const hasNoAlternatives = !AC.armyHasAlternativeLists;
    const alternativeListSelected = AC.armyHasAlternativeLists && AC.selectedAlternativeList !== NONE;

    let result = false;
    if (hasNoAlternatives || alternativeListSelected) {
      result = true;
    }

    AC.setAlternativeArmyPresentAndSelected(result);
  }, [AC, AC.selectedFactionName, AC.selectedAlternativeList]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * The entire treeView for the army.
   */
  return AC && AC.alternativeArmyPresentAndSelected ? (
    <>
      <TreeView
        className={classes.treeViewBox}
        defaultExpanded={SHOW_SUBFACTIONS}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
      >
        <StyledTreeItem nodeId="1" label={AC.selectedFactionName}>
          <Tree showsFaction={true} />
        </StyledTreeItem>
      </TreeView>
      {/* ALLIED FACTION */}
      {AC.allyName !== NO_ALLY && AC.showAlly ? (
        <Fragment>
          <div className={classes.allyTitle}>Alliierte: {AC.allyName}</div>
          <TreeView
            className={classes.treeViewBox}
            defaultExpanded={SHOW_SUBFACTIONS}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}
          >
            <StyledTreeItem nodeId="1" label={AC.allyName}>
              <Tree showsFaction={false} />
            </StyledTreeItem>
          </TreeView>
        </Fragment>
      ) : null}
    </>
  ) : null;
};

export default FactionTreeView;
