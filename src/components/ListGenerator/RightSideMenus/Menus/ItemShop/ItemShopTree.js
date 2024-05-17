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
  const [disabledCategories, setDisabledCategories] = useState([]);

  /**
   * Whenever the item shop is opened for a new unit, this resets the state. This involves two stweps:
   * 1. filter out those item categories that the unit can never be equipped with, e.g.: a hero
   * can never get a banner.
   * 2. calculate the number of remaining categories and create an array of Boolean flags of the same size,
   * so that every flag correspond to one category. This array is the used to initialize the disabledCategories state
   * which controls the display of the branches.
   */
  useEffect(() => {
    if (isObjectEmtpy(IC.unitSelectedForShop)) {
      return;
    }

    const tempArray = filter.filterItemTypesForUnit(IC.unitSelectedForShop, IC.fetchedItems.factionItems);

    setFilteredItemGroups(tempArray);
    const numberOfCategories = tempArray.length;
    setDisabledCategories(Array(numberOfCategories).fill(false));
  }, [IC.unitSelectedForShop]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function tests wether all items of one type are blocked.
   * If so, the branch (item category) is shown as disabled (greyed out).
   * @param {item DTO} dto
   * @returns true, if the node must be disabled.
   */
  const testForEmptyItemCategory = (dto, i) => {
    let tempArray = [...disabledCategories];

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

    tempArray[i] = numberOfBlockedItems >= numberOfItems;

    setDisabledCategories(tempArray);
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
            onClick={() => controller.treeExpansionController([`${i}`])}
            disabled={disabledCategories[i]}
          >
            {dto.items.map((item, j) => {
              const result = isItemBlocked(IC.unitSelectedForShop, item);

              return result.isBlocked ? (
                <InvalidTreeItemNode
                  key={j} //
                  item={item}
                  message={result.message}
                />
              ) : (
                <Grid
                  key={j} //
                  container
                >
                  <TreeItemNode
                    item={item} //
                    categoryNumber={i}
                    categoryObj={dto}
                    testForEmptyItemCategory={testForEmptyItemCategory}
                  />
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
