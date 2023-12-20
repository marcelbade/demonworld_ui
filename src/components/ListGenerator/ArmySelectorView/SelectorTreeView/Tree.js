import React from "react";
import makeStyles from "@mui/styles/makeStyles";
// material ui
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
// components and functions
import TreeUnitNode from "./TreeUnitNode";
import useArmyValidation from "../../../../customHooks/UseArmyValidation.js";
import { unitCardMultiSort } from "../../../../util/utilityFunctions.js";
// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { isSubFactionAlternativeAndSelective } from "../../../../util/utilityFunctions.js";

const useStyles = makeStyles({
  node: {
    width: "110%",
    paddingBottom: "1em",
  },
  subFactionName: {
    "& .MuiTreeItem-label": {
      FontFamily: "jaapokkiRegular",
    },
  },
  emptySubFactionName: {
    "& .MuiTreeItem-label": {
      FontFamily: "jaapokkiRegular",
      color: "grey",
    },
  },
});

const Tree = (props) => {
  const classes = useStyles();
  const validation = useArmyValidation();
  const UNIT = "unit";

  const testForEmptySubFaction = (subfactionDTO) => {
    const numberOfUnits = subfactionDTO.units.length;

    const numberOfBlockedUnits = subfactionDTO.units
      .map((u) => validation.returnValidationResult(UNIT, u, true))
      .filter((obj) => !obj.valid).length;

    return numberOfUnits === numberOfBlockedUnits;
  };

  return (
    <TreeView
      aria-label="file system navigator" //
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {props.subFactionDtoList.map((dto, i) => {
        return isSubFactionAlternativeAndSelective(dto) ? (
          <TreeItem
            nodeId={`${i}`} //
            label={dto.name}
            key={i}
            className={testForEmptySubFaction(dto) ? classes.emptySubFactionName : classes.subFactionName}
          >
            {unitCardMultiSort(dto.units)
              .map((u) => validation.returnValidationResult(UNIT, u, true))
              .map((validationObj, i) => {
                return (
                  <TreeUnitNode
                    key={i} //
                    className={classes.node}
                    unit={validationObj.unit}
                    isValidUnit={validationObj.valid}
                    validationMessage={validationObj.validationMessage}
                  />
                );
              })}
          </TreeItem>
        ) : null;
      })}
    </TreeView>
  );
};

export default Tree;
