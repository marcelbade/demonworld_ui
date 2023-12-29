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
import { VALIDATION } from "../../../../../constants/textsAndMessages";

const ItemShopTree = () => {
  const IC = useContext(ItemContext);
  const controller = useTreeViewController();
  const filter = useItemFilters();
  const limiter = useUnitEqipmentLimits();

  const [filteredItemGroups, setFilteredItemGroups] = useState([]);

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
        !filter.filterIndividualItems(IC.unitSelectedForShop, item) || //
        limiter.disableItem(IC.unitSelectedForShop, item)
      ) {
        numberOfBlockedItems++;
      }
    });

    return numberOfBlockedItems >= numberOfItems;
  };

  /**
   * Wrapper Function. Tests whether an item can be equipped or not. Calls filterIndividualItems and disableItem. Reu
   * @param {unitCard} unit
   * @param {itemCard} item
   * @returns An object with the test result an error message.
   * Result is false, if the item must be blocked. In that case, the button will be disabled.
   */
  const isItemBlocked = (unit, item) => {
    // if the item can be equipped,
    // test if the item needs to be disabled due to an equipment flag.
    if (filter.filterIndividualItems(unit, item)) {
      return {
        isBlocked: !limiter.disableItem(unit, item),
        message: VALIDATION.ALREADY_HAS_ITEM_OF_TYPE(ITEM_CATEGORY_NAME_MAPPING[item.itemType]),
      };
    }

    return {
      isBlocked: false, //
      message: VALIDATION.NOT_A_VALID_ITEM,
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
            {dto.items.map((item) => {
              const result = isItemBlocked(IC.unitSelectedForShop, item);

              return result.isBlocked ? (
                <Grid container>
                  <TreeItemNode item={item} />
                </Grid>
              ) : (
                <InvalidTreeItemNode item={item} message={result.message} />
              );
            })}
          </TreeItem>
        );
      })}
    </TreeView>
  );
};

export default ItemShopTree;
