// React
import { useTheme } from "@emotion/react";
import { useState, useContext, useEffect } from "react";
//Material UI
import { Grid2 as Grid } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// components and functions
import { ItemContext } from "../../../../../contexts/itemContext";
import { isObjectEmtpy } from "../../../../../util/utilityFunctions";
import TreeItemNode from "./TreeItemNode";
// custom hooks
import useTreeViewController from "../../../../../customHooks/UseTreeViewController";
import UseUnitEqipmentLimits from "../../../../../customHooks/UseUnitEquipmentLimits";
import useItemFilters from "../../../../../customHooks/UseItemFilters";
// constants
import { ITEM_CATEGORY_NAME_MAPPING } from "../../../../../constants/itemShopConstants";

const ItemShopTree = () => {
  const theme = useTheme();

  const IC = useContext(ItemContext);
  const controller = useTreeViewController();
  const filter = useItemFilters();
  const equipmentLimits = UseUnitEqipmentLimits();

  const [filteredItemGroups, setFilteredItemGroups] = useState([]);

  /**
   * Whenever the item shop is opened for a new unit, this resets the state. This involves two stweps:
   * 1. filter out those item categories that the unit can never be equipped with, e.g.: a hero
   * can never get a banner.
   * 2. calculate the number of remaining categories and create an array of Boolean flags of the same size,
   * so that every flag correspond to one category. This array is the used to initialize the disabledCategories state
   * which controls the display of the branches.
   */
  useEffect(() => {
    //
    if (isObjectEmtpy(IC.unitSelectedForShop)) {
      return;
    }

    const tempArray = filter.filterItemTypesForUnit(IC.unitSelectedForShop, IC.fetchedItems.factionItems);
    setFilteredItemGroups(tempArray);
  }, [IC.unitSelectedForShop.uniqueID]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function tests whether a branch in the tree (i.e., one item group) should
   * be shown as empty (every item blocked).
   * @param {object} dto
   * @returns true, if the number of items in group is equal the number of blocked
   * items in the group.
   */
  const disableBranch = (dto) => {
    let i = 0;
    dto.items.forEach((item) => {
      const result = isItemBlocked(IC.unitSelectedForShop, item);

      if (result.isBlocked) {
        i++;
      }
    });

    return i === dto.items.length;
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
    <SimpleTreeView
      aria-label="file system navigator" //
      defaultcollapseicon={<ExpandMoreIcon />}
      defaultexpandicon={<ChevronRightIcon />}
      expanded={controller.expansionValue}
      sx={{ paddingTop: "4em" }}
    >
      {filteredItemGroups.map((dto, i) => {
        return (
          <TreeItem // item category
            itemId={`${i}`}
            label={ITEM_CATEGORY_NAME_MAPPING[dto.typeName]} // show the item categories in German
            key={i}
            onClick={() => controller.treeExpansionController([`${i}`])}
            sx={{
              color: disableBranch(dto) ? theme.palette.disabled : null,
            }}
          >
            {dto.items.map((item, j) => {
              const result = isItemBlocked(IC.unitSelectedForShop, item);

              return (
                <Grid
                  key={j} //
                  container
                >
                  <TreeItemNode
                    item={item} //
                    categoryNumber={i}
                    categoryObj={dto}
                    isBlocked={result.isBlocked}
                    blockMessage={result.message}
                  />
                </Grid>
              );
            })}
          </TreeItem>
        );
      })}
    </SimpleTreeView>
  );
};

export default ItemShopTree;
