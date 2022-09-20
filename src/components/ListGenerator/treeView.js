import React from "react";
import PropTypes from "prop-types";
// Material UI
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
// icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// components and functions
import { MinusSquare, PlusSquare, CloseSquare, TransitionComponent } from "./dependencies/treeViewFunctions";
import { Fragment } from "react";
import { uuidGenerator } from "../shared/sharedFunctions";

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

/**
 *
 */
const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const useStyles = makeStyles({
  treeViewBox: {
    height: "auto",
    paddingLeft: "60px",
  },
  node: {
    fontFamily: "BreatheOfFire",
    color: "black",
  },
  treeNode: {
    backgroundColor: "white",
  },
  button: {
    fontFamily: "BreatheOfFire",
    color: "black",
    backgroundColor: "white",
    padding: "0 px",
  },
  bttnCheckBoxes: {
    paddingRight: "30px",
  },
  allyTitle: {
    paddingLeft: "60px",
    fontFamily: "BreatheOfFire",
    fontSize: "40px",
    color: "black",
    paddingTop: "1em",
  },
});

const FactionTreeView = (props) => {
  const classes = useStyles();

  /**
   * Function generates the  branches & leaf nodes in the TreeView. One branch -> one subfaction and all its units.
   *
   * @returns JSX-> a list of StyledTreeItem wrapping leafNodes.
   */
  const createTree = (units, distinctSubFactions) => {
    const tree = distinctSubFactions.map((subFaction) => {
      const nodeID = createNodeID(distinctSubFactions.indexOf(subFaction));

      return (
        <StyledTreeItem key={uuidGenerator()} nodeId={nodeID} label={subFaction}>
          {createLeafNodes(units, subFaction, nodeID)}
        </StyledTreeItem>
      );
    });

    return tree;
  };

  /**
   * Function generates the leaf nodes in the TreeView. One leafNode -> one unit.
   *
   * @param {String} distinctSubFaction
   * @param {String} parentNodeId
   * @returns JSX-> a list of StyledTreeItem wrappingg buttons
   */
  const createLeafNodes = (units, distinctSubFaction, parentNodeId) => {
    // get all units w. this subFaction
    let allUnitsOfSubFaction = units.filter((f) => f.subFaction === distinctSubFaction);

    return allUnitsOfSubFaction.map((u) => {
      // give every leave a nodeID bassed on the id of its branch and the element index.
      let nodeID = `${parentNodeId}${props.distinctSubFactions.indexOf(u)}`;

      return (
        <Grid container alignItems="center" key={uuidGenerator()}>
          <Grid item xs={9}>
            <StyledTreeItem nodeId={nodeID} label={`${u.name} - ${u.points}`} className={classes.treeNode}></StyledTreeItem>
          </Grid>
          <Grid item xs={3}>
            <IconButton
              // TODO disabled when {u.points > props.pointsLeft}
              className={classes.button}
              onClick={() => {
                props.selectUnit(u);
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      );
    });
  };

  /**
   * Function creates an ID for every node. The id must be larger than the root ID of 1, hence the offset.
   * @param {*} index of the subfaction in the array.
   * @returns int nodeID
   */
  const createNodeID = (index) => {
    const ID_OFFSET = 2;
    return `${ID_OFFSET}${index}`;
  };

  return props.faction ? (
    <Fragment>
      <TreeView
        className={classes.treeViewBox}
        defaultExpanded={["1"]}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
      >
        <StyledTreeItem nodeId="1" label={props.factionName}>
          {createTree(props.faction, props.distinctSubFactions)}
        </StyledTreeItem>
      </TreeView>
      {/* ALLIED FACTION */}
      {props.allyName ? (
        <Fragment>
          <div className={classes.allyTitle}>Alliierte: {props.allyName}</div>

          <TreeView
            className={classes.treeViewBox}
            defaultExpanded={["1"]}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}
          >
            <StyledTreeItem nodeId="1" label={props.allyName}>
              {createTree(props.ally, props.distinctAllySubFactions)}
            </StyledTreeItem>
          </TreeView>
        </Fragment>
      ) : null}
    </Fragment>
  ) : null;
};

export default FactionTreeView;
