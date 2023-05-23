import React, { useContext } from "react";
import PropTypes from "prop-types";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { MinusSquare, PlusSquare, CloseSquare, TransitionComponent } from "./treeViewFunctions";
import { Fragment } from "react";
import Tree from "./Tree";
import { StyledTreeItem } from "./styledTreeItem";

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
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
  const contextArmy = useContext(ArmyContext);
  const SHOW_SUBFACTIONS = ["1"];
  // no ally found
  const NONE = "none";

  /**
   * The entire treeView of the army
   */
  return contextArmy ? (
    <>
      <TreeView
        className={classes.treeViewBox}
        defaultExpanded={SHOW_SUBFACTIONS}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
      >
        <StyledTreeItem nodeId="1" label={contextArmy.unitName}>
          <Tree showsFaction={true} />
        </StyledTreeItem>
      </TreeView>
      {/* ALLIED FACTION */}
      {/* test if there is an ally */}
      {contextArmy.allyName !== NONE ? (
        <Fragment>
          <div className={classes.allyTitle}>Alliierte: {contextArmy.allyName}</div>
          <TreeView
            className={classes.treeViewBox}
            defaultExpanded={SHOW_SUBFACTIONS}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}
          >
            <StyledTreeItem nodeId="1" label={contextArmy.allyName}>
              <Tree showsFaction={false} />
            </StyledTreeItem>
          </TreeView>
        </Fragment>
      ) : null}
    </>
  ) : null;
};

export default FactionTreeView;
