// React
import React, { useState, useContext, useEffect } from "react";
//Material UI
import { Grid, Typography, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// components and functions
import { ItemContext } from "../../../../../contexts/itemContext";
import { RightMenuContext } from "../../../../../contexts/rightMenuContext";
import ShopItemList from "./ShopItemList";
import ShopPanelButtons from "./ShopPanelButtons";
import useItemFilters from "../../../../../customHooks/UseItemFilters";
import { isObjectEmtpy } from "../../../../../util/utilityFunctions";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "30vw",
  },
  buttons: {
    fontWeight: "bold",
    border: "none",
  },
  unitName: {
    width: "60%",
    fontWeight: "bold",
    borderBottom: "solid 4px black",
    marginBottom: "1em",
  },
  itemText: {
    fontFamily: "Beryliumbold",
  },
  errorNoItems: {
    paddingTop: "3em",
    fontWeight: "bold",
    color: "red",
  },
});

const ItemShop = () => {
  const classes = useStyles();

  const IC = useContext(ItemContext);
  const RC = useContext(RightMenuContext);

  const [displayThisItemType, setDisplayThisItemType] = useState("item");
  const [active, setActive] = useState(false);
  const [filteredItemGroups, setFilteredItemGroups] = useState([]);

  const filter = useItemFilters();

  useEffect(() => {
    if (!isObjectEmtpy(IC.unitSelectedForShop)) {
      setFilteredItemGroups(filter.filterItemsForUnit(IC.unitSelectedForShop, IC.fetchedItems.factionItems));
    }
  }, [IC.unitSelectedForShop]);

  const markButton = (key) => {
    setActive(key);
  };

  // shows all items of the type whose button was pressed.
  const showTab = (type) => {
    setDisplayThisItemType(type);
  };

  return (
    <Grid container direction="column" className={classes.overlay}>
      {/* close item shop - make this a single component */}
      <Grid>
        <IconButton
          onClick={() => {
            RC.setItemShopState({ ...RC.itemShopState, show: false });
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

      <Grid item container direction="row" justifyContent="center" className={classes.dynamicPart}>
        {/* buttons to switch between Item categories*/}
        <ShopPanelButtons
          mappedItemTypes={filteredItemGroups}
          active={active} //
          showTab={showTab}
          markButton={markButton}
        />
        <Grid item xs={8}>
          {/* show items*/}
          <ShopItemList
            unit={IC.unitSelectedForShop}
            items={filteredItemGroups} //
            displayThisItemType={displayThisItemType}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemShop;
