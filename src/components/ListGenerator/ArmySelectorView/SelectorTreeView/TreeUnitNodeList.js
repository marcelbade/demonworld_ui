import React from "react";
import makeStyles from "@mui/styles/makeStyles";
// components and functions
import TreeUnitNode from "./TreeUnitNode";

const useStyles = makeStyles({
  node: {
    width: "110%",
    paddingBottom: "1em",
  },
});

const TreeUnitNodeList = (props) => {
  const classes = useStyles();

  return props.unitList.map((validationObj, i) => {
    return (
      <TreeUnitNode
        key={i} //
        className={classes.node}
        unit={validationObj.unit}
        isValidUnit={validationObj.valid}
      />
    );
  });
};

export default TreeUnitNodeList;
