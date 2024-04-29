import { useState, useRef } from "react";

/**
 * This hook controls the expanded attribute of the treeView elements. This enables two features:
 * 1. only one of the treeView's treeItem can be expanded at the same time.
 *  Expanding another item contracts the first one
 * 2. clicking the same treeItem a second time contracts that item.
 *
 * @returns object that exposes a getter for the nodeId of the clicked
 * treeItem and a constant containing id of the clicked node.
 */
const useTreeViewController = () => {
  const [expanded, setExpanded] = useState({ oldValue: [""], newValue: [""] });

  const lastVal = useRef(expanded.oldValue);

  const treeExpansionController = (nodeId) => {
    if (lastVal.current === nodeId) {
      setExpanded((prevState) => ({ ...prevState, newValue: [""] }));
    } else {
      lastVal.current = expanded.newValue;
      const temp = expanded.newValue;
      setExpanded((prevState) => ({ ...prevState, oldValue: temp, newValue: nodeId }));
    }
  };

  return {
    treeExpansionController: treeExpansionController,
    expansionValue: expanded.newValue,
  };
};

export default useTreeViewController;
