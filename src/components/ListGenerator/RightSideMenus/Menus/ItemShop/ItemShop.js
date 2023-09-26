// React
import React, { useState, useContext, useEffect } from "react";
//Material UI
import { Grid, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// icons
import CancelIcon from "@material-ui/icons/Cancel";
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";
import { isObjectEmtpy } from "../../../../shared/sharedFunctions";
import { itemFilter } from "./ItemLogic/itemShopFilterLogic";
import ShopItemList from "./ShopItemList";
import ShopPanelButtons from "./ShopPanelButtons";

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
    fontWeight: "bold",
    borderBottom: "solid 4px black",
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
  const AC = useContext(ArmyContext);

  //state
  const [itemTypes, setItemTypes] = useState([]);
  const [displayThisItemType, setDisplayThisItemType] = useState("");

  // When the selected unit changes, set the correct items in the shop
  useEffect(() => {
    setItemTypes(findDistinctItemTypes());
  }, [AC.unitSelectedForShop]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    showTab(itemTypes[0]);
  }, [itemTypes]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function finds the distinct item types of the filtered item list and returns it. These are used as shop categories.
   * @returns [String] an array of item type names.
   */
  const findDistinctItemTypes = () => {
    let distinctTypes = [];

    filterFetchedItemsForUnit().forEach((item) => {
      if (!distinctTypes.includes(item.itemType)) return distinctTypes.push(item.itemType);
    });

    return distinctTypes;
  };

  /**
   * Function filters all items in the game down to the ones the selected unit can be equipped with.
   * If no unit has been selected, it returns an empty array by default.
   * @returns an array of item objects. array can be emtpy.
   */
  const filterFetchedItemsForUnit = () => {
    const unit = AC.unitSelectedForShop;
    const isUnitSelected = !isObjectEmtpy(AC.unitSelectedForShop);

    if (isUnitSelected) {
      let items = AC.fetchedItems;

      return items
        .filter((item) => itemFilter.filterForFactionAndGenericItems(item, unit))
        .filter((item) => itemFilter.filterForUnitType(item, unit))
        .filter((item) => itemFilter.filterForUnit(item, unit))
        .filter((item) => itemFilter.filterForStandardBearer(item, unit))
        .filter((item) => itemFilter.filterForMusician(item, unit))
        .filter((item) => itemFilter.filterForMagicUsers(item, unit))
        .filter((item) => itemFilter.filterForItemsWithMaxArmor(item, unit))
        .filter((item) => itemFilter.filterForItemsWithMaxSize(item, unit))
        .filter((item) => itemFilter.filterForShields(item, unit))
        .filter((item) => itemFilter.filterForCavalryItems(item, unit))
        .filter((item) => itemFilter.filterForItemsNotUsableByCavalry(item, unit))
        .filter((item) => itemFilter.filterForSpears(item, unit))
        .filter((item) => itemFilter.filterForLances(item, unit))
        .filter((item) => itemFilter.filterForBows(item, unit))
        .filter((item) => itemFilter.filterForCrossBows(item, unit))
        .filter((item) => itemFilter.whenUnitHasNoLeader(item, unit))
        .filter((item) => itemFilter.whenUnitIsGiant(item, unit));
    } else {
      return [];
    }
  };

  // shows all items of the type whose button was pressed.
  const showTab = (type) => {
    setDisplayThisItemType(type);
  };

  return (
    <Grid container direction="column" className={classes.overlay}>
      <Grid>
        <IconButton
          onClick={() => {
            AC.setItemShopState({ ...AC.itemShopState, show: false });
          }}
        >
          <CancelIcon />
        </IconButton>
      </Grid>
      <Grid item container direction="row">
        <Grid item xs={9}>
          <Typography variant="h5" align="center" className={classes.unitName}>
            {AC.unitSelectedForShop.unitName}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="row" className={classes.dynamicPart}>
        <ShopPanelButtons
          itemTypes={itemTypes} //
          showTab={showTab}
        />
        <Grid item xs={8}>
          <ShopItemList
            items={filterFetchedItemsForUnit()} //
            displayThisItemType={displayThisItemType}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemShop;
