// React
import React, { useState, useContext, useEffect } from "react";
//Material UI
import { Grid } from "@mui/material";
import { TreeItem, TreeView } from "@material-ui/lab";
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

const ItemShopTree = () => {
  const IC = useContext(ItemContext);
  const filter = useItemFilters();
  const controller = useTreeViewController();

  const [filteredItemGroups, setFilteredItemGroups] = useState([]);

  useEffect(() => {
    if (!isObjectEmtpy(IC.unitSelectedForShop)) {
      setFilteredItemGroups(filter.filterItemTypesForUnit(IC.unitSelectedForShop, IC.fetchedItems.factionItems));
    }
  }, [IC.unitSelectedForShop]); // eslint-disable-line react-hooks/exhaustive-deps

  const testForEmptyItemType = (dto) => {
    const numberOfItems = dto.items.length;
    let numberOfBlockedItems = 0;

    dto.items.forEach((item) => {
      if (!filter.filterIndividualItems(IC.unitSelectedForShop, item)) {
        numberOfBlockedItems++;
      }
    });

    return numberOfItems === numberOfBlockedItems;
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
            onClick={() => controller.getNodeId([`${i}`])}
            label={ITEM_CATEGORY_NAME_MAPPING[dto.typeName]}
            key={dto.typeName}
            disabled={testForEmptyItemType(dto)}
          >
            {dto.items.map((item) => {
              return filter.filterIndividualItems(IC.unitSelectedForShop, item) ? (
                <Grid container>
                  <TreeItemNode item={item} />
                </Grid>
              ) : (
                <InvalidTreeItemNode  item={item} />
              );
            })}
          </TreeItem>
        );
      })}
    </TreeView>
  );
};

export default ItemShopTree;
