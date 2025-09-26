import { useContext } from "react";
// material ui
import { Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, Grid2 as Grid } from "@mui/material";
// components and functions
import { ItemContext } from "../../../../../contexts/itemContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
import UseUnitEqipmentLimits from "../../../../../customHooks/UseUnitEquipmentLimits";
import useSpecialItems from "../../../../../customHooks/UseSpecialItems";
// icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// constants
import { PUSH_MESSAGE_TYPES } from "../../../../../constants/textsAndMessages";
import { useTheme } from "@emotion/react";
import ContextHelpButton from "../../../../shared/ContextHelpButton";

const TreeItemNode = (props) => {
  const IC = useContext(ItemContext);
  const SEC = useContext(SelectionContext);

  const limiter = UseUnitEqipmentLimits();
  const special = useSpecialItems();

  const theme = useTheme();

  /**
   * Add the item card object to the selected unit. This means:
   * - if it is a melee wapon, the item name replaces the weapon1Name
   *   value and the a new value for weapon1 is calculated.
   * - if it is a range weapon, the item name replaces the rangedWeapon property
   * - a flag to track whether the item was lost is added for the lossCalculator component.
   * @param {itemCard object} item
   */
  const addItemToUnit = (item) => {
    let tempObj = { ...IC.unitSelectedForShop };

    tempObj.equipment.push({
      ...item,
    });

    IC.setUnitSelectedForShop({
      ...tempObj,
    });
  };

  /**
   * Function adds item name to the central item list to ensure that
   * unique items cannot be selected twice.
   * @param {itemCard} item
   */
  const addItemToCentralList = (item) => {
    IC.setAllEquippedItems([...IC.allEquippedItems, item.itemName]);
  };

  /**
   * Function checks if a special item was selected. Then, the selected unit property is reset.
   * This is done regardless of whether the test was positive or not and ensures that the selected
   * units are displayed correctly.
   */
  const testForSpecialItems = (item) => {
    special.testForSpecialItemEffects(IC.unitSelectedForShop, item);
    SEC.setSelectedUnits([...SEC.selectedUnits]);
  };

  return (
    <Accordion
      key={props.item.itemName} //
      sx={{
        boxShadow: "none", //
        width: "75%",
        overflowY: "auto",
        overflowX: "auto",
      }}
    >
      <AccordionSummary
        expandIcon={<AddCircleOutlineIcon />} //
        aria-controls="panel1a-content"
        id="shopItem"
      >
        <Grid
          container
          alignItems="center" //
          justifyContent="center"
        >
          <IconButton
            disabled={props.isBlocked}
            onClick={(e) => {
              addItemToUnit(props.item);
              addItemToCentralList(props.item);
              limiter.toggleUnitsItemTypeFlags(IC.unitSelectedForShop, props.item, true);
              testForSpecialItems(props.item);
              e.stopPropagation();
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>

          <Grid direction="column">
            <Typography
              sx={{
                minWidth: "12em", //
                color: props.isBlocked ? theme.palette.disabled : null,
              }}
              variant="body1"
            >
              {props.item.itemName}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                minWidth: "12em", //
                color: props.isBlocked ? theme.palette.disabled : null, //
              }}
            >
              {props.item.points}
            </Typography>
          </Grid>

          {props.isBlocked ? (
            <ContextHelpButton
              isVisible={true}
              message={props.blockMessage} //
              type={PUSH_MESSAGE_TYPES.INFO}
            />
          ) : null}
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          variant="body1" //
          sx={{
            width: "100%", //
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          {props.item.itemRules}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
export default TreeItemNode;
