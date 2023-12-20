// React
import React, { useState, useContext, useEffect } from "react";
//Material UI
import { Grid, Typography, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { TreeItem, TreeView } from "@material-ui/lab";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// components and functions
import { ItemContext } from "../../../../../contexts/itemContext";
import { RightMenuContext } from "../../../../../contexts/rightMenuContext";
import useItemFilters from "../../../../../customHooks/UseItemFilters";
import { isObjectEmtpy } from "../../../../../util/utilityFunctions";
import TreeItemNode from "./TreeItemNode";
import { ITEM_CATEGORY_NAME_MAPPING } from "../../../../../constants/itemShopConstants";
import ItemRuleNode from "./ItemRuleNode";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "45vw",
  },
  treePadding: {
    paddingLeft: "2em",
  },
  unitName: {
    width: "60%",
    fontWeight: "bold",
    borderBottom: "solid 4px black",
    marginBottom: "1em",
    fontFamily: "jaapokkiRegular",
  },

  // TODO rule text for items
  itemTypeName: {
    "& .MuiTreeItem-label": {
      fontFamily: "jaapokkiRegular",
    },
  },
});

const ItemShop = () => {
  const classes = useStyles();

  const IC = useContext(ItemContext);
  const RC = useContext(RightMenuContext);

  const [filteredItemGroups, setFilteredItemGroups] = useState([]);

  const filter = useItemFilters();

  useEffect(() => {
    if (!isObjectEmtpy(IC.unitSelectedForShop)) {
      setFilteredItemGroups(filter.filterItemTypesForUnit(IC.unitSelectedForShop, IC.fetchedItems.factionItems));
    }
  }, [IC.unitSelectedForShop]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeShopPanel = () => {
    RC.setItemShopState({ ...RC.itemShopState, show: false });
  };

  return (
    <Grid container direction="column" className={classes.overlay}>
      <Grid item>
        <IconButton
          onClick={() => {
            closeShopPanel();
          }}
          size="large"
        >
          <CancelIcon />
        </IconButton>
      </Grid>
      {/* display selected unit's name  */}
      <Grid item container direction="row" justifyContent="center">
        <Typography variant="h5" align="center" className={classes.unitName}>
          {IC.unitSelectedForShop.unitName}
        </Typography>
      </Grid>
      <Grid item container direction="row" justifyContent="flex-start" className={classes.treePadding}>
        <TreeView
          aria-label="file system navigator" //
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {filteredItemGroups.map((dto, i) => {
            return (
              <TreeItem
                className={classes.itemTypeName}
                nodeId={`${i}`} //
                label={ITEM_CATEGORY_NAME_MAPPING[dto.typeName]}
                key={dto.typeName}
                
              >
                {dto.items.map((item) => {
                  return filter.filterIndividualItems(IC.unitSelectedForShop, item) ? (
                    <Grid container>
                      <TreeItemNode item={item} />
                      <ItemRuleNode
                        itemText={item.specialRules} //
                  
                      />
                    </Grid>
                  ) : null;
                })}
              </TreeItem>
            );
          })}
        </TreeView>
      </Grid>
    </Grid>
  );
};

export default ItemShop;
