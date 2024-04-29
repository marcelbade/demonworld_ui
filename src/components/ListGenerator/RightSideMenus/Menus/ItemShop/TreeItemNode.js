import React, { useContext } from "react";
// material ui
import { Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, Grid } from "@mui/material";
// components and functions
import { ItemContext } from "../../../../../contexts/itemContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
import useUnitEqipmentLimits from "../../../../../customHooks/useUnitEqipmentLimits";
import CustomIcon from "../../../../shared/statCards/CustomIcon";
import useSpecialItems from "../../../../../customHooks/UseSpecialItems";
// icons
import SpellBookIcon from "../../../../../assets/icons/spellbook-black.png";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// constants
import { TOOLTIPS } from "../../../../../constants/textsAndMessages";

const TreeItemNode = (props) => {
  const IC = useContext(ItemContext);
  const SEC = useContext(SelectionContext);

  const limiter = useUnitEqipmentLimits();
  const special = useSpecialItems();

  /**
   * Add the item card object to the selected unit. This means:
   * - if it is a melee wapon, the item name replaces the weapon1Name value and the a new value
   *   for weapon1 is calculated.
   * - if it is a range weapon, the item name replaces the rangedWeapon property
   * - a flag to track whether the item was lost is added for the lossCalculator component.
   * @param {itemCard object} item
   */
  const addItemToUnit = (item) => {
    let tempObj = { ...IC.unitSelectedForShop };

    tempObj.equipment.push({
      ...item,
      itemLost: false,
    });

    IC.setUnitSelectedForShop({
      ...tempObj,
    });
  };

  const addItemToCentralList = (item) => {
    IC.setAllEquippedItems([...IC.allEquippedItems, item]);
  };

  /**
   * Function checks if a special item was selected. Then, the selected unit property is reset.
   * This is done regardless of whether the test was positive or not and ensures that the selected
   * units are displayed correctly.
   */
  const testForSpecialItems = (item) => {
    special.testForSpecialItems(IC.unitSelectedForShop, item);
    SEC.setSelectedUnits([...SEC.selectedUnits]);
  };

  return (
    <Accordion
      key={props.item.itemName} //
      style={{ boxShadow: "none" }}
    >
      <AccordionSummary
        expandIcon={
          <CustomIcon //
            icon={SpellBookIcon}
            altText={TOOLTIPS.RULE_BOOK_TEXT}
            height={35}
            width={35}
            boxHeight={45}
            boxWidth={45}
          />
        } //
        aria-controls="panel1a-content"
        id="shopItem"
      >
        <Grid container alignItems="center" direction="row">
          <Grid item container direction="column" xs={3}>
            <Typography variant="body1">{props.item.itemName}</Typography>
            <Typography variant="body1" sx={{ color: "grey" }}>
              {props.item.points}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <IconButton
              size="large"
              onClick={(e) => {
                addItemToUnit(props.item);
                addItemToCentralList(props.item);
                limiter.toggleUnitsItemTypeFlags(IC.unitSelectedForShop, props.item, true);
                testForSpecialItems(props.item);
                props.testForEmptyItemCategory(props.categoryObj, props.categoryNumber);
                e.stopPropagation();
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          variant="body1" //
          sx={{ width: "50em" }}
        >
          {props.item.specialRules}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
export default TreeItemNode;
