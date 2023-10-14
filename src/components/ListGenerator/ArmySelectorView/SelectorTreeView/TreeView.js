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
import { NO_ALLY } from "../../../../constants/factions";
import { Typography } from "@material-ui/core";
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
  const SHOW_SUBFACTIONS = ["1"];

  useEffect(() => {
    let result = false;

    if (
      !AC.armyHasAlternativeLists && //
      !AC.armyHasSecondChoice
    ) {
      result = true;
    } else if (
      !AC.armyHasSecondChoice && //
      AC.armyHasAlternativeLists &&
      AC.selectedAlternativeList !== NONE
    ) {
      result = true;
    } else if (
      AC.armyHasAlternativeLists && //
      AC.armyHasSecondChoice &&
      AC.secondSelectedAlternativeList !== NONE
    ) {
      result = true;
    }

    AC.setAltArmyListSelectionComplete(result);
  }, [AC, AC.selectedFactionName, AC.selectedAlternativeList]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * The entire treeView for the army.
   */
  return AC && AC.altArmyListSelectionComplete ? (
    <>
      <TreeView
        className={classes.treeViewBox}
        defaultExpanded={SHOW_SUBFACTIONS}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
      >
        <StyledTreeItem
          nodeId="1"
          label={
            AC.selectedFactionName === NONE //
              ? ""
              : AC.selectedFactionNam
          }
        >
          <Tree showsFaction={true} />
        </StyledTreeItem>
      </TreeView>
      {/* ALLIED FACTION */}
      {AC.allyName !== NO_ALLY && AC.showAlly ? (
        <Fragment>
          <Typography className={classes.allyTitle} variant="h6">
            Alliierte: {AC.allyName}
          </Typography>
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
