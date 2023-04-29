import React, { useContext } from "react";
import PropTypes from "prop-types";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { MinusSquare, PlusSquare, CloseSquare, TransitionComponent } from "../dependencies/treeViewFunctions";
import { Fragment } from "react";
import Tree from "./Tree";
import { StyledTreeItem } from "../dependencies/styledTreeItem";

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const useStyles = makeStyles({
  treeViewBox: {
    height: "auto",
    paddingLeft: "60px",
  },
  allyTitle: {
    paddingLeft: "60px",
    fontFamily: "BreatheOfFire",
    fontSize: "40px",
    color: "black",
    paddingTop: "1em",
  },
});

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
