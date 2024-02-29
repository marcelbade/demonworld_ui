// React
import React, { useState, useContext, useEffect } from "react";
//Material UI
import { Grid } from "@mui/material";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// components and functions
import { ItemContext } from "../../../../../contexts/itemContext";
import useItemFilters from "../../../../../customHooks/UseItemFilters";
import { isObjectEmtpy } from "../../../../../util/utilityFunctions";
import TreeItemNode from "./TreeItemNode";
import useTreeViewController from "../../../../../customHooks/UseTreeViewController";
import InvalidTreeItemNode from "./InvalidTreeItemNode";
// constants
import { ITEM_CATEGORY_NAME_MAPPING } from "../../../../../constants/itemShopConstants";
import useUnitEqipmentLimits from "../../../../../customHooks/useUnitEqipmentLimits";

const ItemShopTree = () => {
  const IC = useContext(ItemContext);
  const controller = useTreeViewController();
  const filter = useItemFilters();
  const equipmentLimits = useUnitEqipmentLimits();

  const [filteredItemGroups, setFilteredItemGroups] = useState([]);

  // When the selected unit changes, recalculate which item(groups) are filtered out.
  useEffect(() => {
    if (!isObjectEmtpy(IC.unitSelectedForShop)) {
      setFilteredItemGroups(filter.filterItemTypesForUnit(IC.unitSelectedForShop, IC.fetchedItems.factionItems));
    }
  }, [IC.unitSelectedForShop]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function tests wether all items of one type are blocked.
   * If so, the treeItem node is shown as disabled.
   * @param {item DTO} dto
   * @returns true, if the node must be disabled.
   */
  const testForEmptyItemType = (dto) => {
    const numberOfItems = dto.items.length;
    let numberOfBlockedItems = 0;

    dto.items.forEach((item) => {
      if (
        filter.filterIndividualItems(IC.unitSelectedForShop, item).isInvalidItem || //
        equipmentLimits.disableItem(IC.unitSelectedForShop, item).disableButton
      ) {
        numberOfBlockedItems++;
      }
    });

    return numberOfBlockedItems >= numberOfItems;
  };

  /**
   * Wrapper Function. Tests whether an item can be equipped or not. Calls filterIndividualItems and disableItem.
   * @param {unitCard} unit
   * @param {itemCard} item
   * @returns An object with the test result an error message.
   * Result is false, if the item must be blocked. In that case, the button will be disabled.
   */
  const isItemBlocked = (unit, item) => {
    // if the item can be equipped,
    // test if the item needs to be disabled due to an equipment flag.

    const filterResult = filter.filterIndividualItems(unit, item);
    const limitResult = equipmentLimits.disableItem(unit, item);

    let displayedMessage = "";

    if (filterResult.errorMessage !== "") {
      displayedMessage = filterResult.errorMessage;
    } else if (limitResult.errorMessage !== "") {
      displayedMessage = limitResult.errorMessage;
    }

    return {
      isBlocked: filterResult.isInvalidItem || limitResult.disableButton,
      message: displayedMessage,
    };
  };

  return (
    <TreeView
      aria-label="file system navigator" //
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={controller.expansionValue}
    >
      {filteredItemGroups.map((dto, i) => {
        return (
          <TreeItem
            nodeId={`${i}`} //
            label={ITEM_CATEGORY_NAME_MAPPING[dto.typeName]}
            key={i}
            onClick={() => controller.getNodeId([`${i}`])}
            disabled={testForEmptyItemType(dto)}
          >
            {dto.items.map((item, i) => {
              const result = isItemBlocked(IC.unitSelectedForShop, item);

              return result.isBlocked ? (
                <InvalidTreeItemNode
                  key={i} //
                  item={item}
                  message={result.message}
                />
              ) : (
                <Grid
                  key={i} //
                  container
                >
                  <TreeItemNode item={item} />
                </Grid>
              );
            })}
          </TreeItem>
        );
      })}
    </TreeView>
  );
};

export default ItemShopTree;
