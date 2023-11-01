import React, { useContext } from "react";
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
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";
import { AllyContext } from "../../../../contexts/allyContext";

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
  const ALC = useContext(AlternativeListContext);
  const AYC = useContext(AllyContext);

  const SHOW_SUBFACTIONS = ["1"];

  /**
   * The entire treeView for the army.
   */

  const selectionComplete = () => {
    if (ALC.armyHasAlternativeLists) {
      return ALC.altArmyListSelectionComplete;
    }
    return true;
  };

  return selectionComplete() ? (
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
            AC.factionName === NONE //
              ? ""
              : AC.factionName
          }
        >
          <Tree isFaction={true} />
        </StyledTreeItem>
      </TreeView>
      {/* ALLIED FACTION */}
      {AYC.allyName !== NO_ALLY ? (
        <Fragment>
          <Typography className={classes.allyTitle} variant="h6">
            Alliierte: {AYC.allyName}
          </Typography>
          <TreeView
            className={classes.treeViewBox}
            defaultExpanded={SHOW_SUBFACTIONS}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}
          >
            <StyledTreeItem nodeId="1" label={AYC.allyName}>
              <Tree isFaction={false} />
            </StyledTreeItem>
          </TreeView>
        </Fragment>
      ) : null}
    </>
  ) : null;
};

export default FactionTreeView;
