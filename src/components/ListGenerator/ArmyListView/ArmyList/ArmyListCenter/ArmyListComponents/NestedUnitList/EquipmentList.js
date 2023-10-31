// React
import React, { useContext } from "react";
// Material UI
import { makeStyles, List, ListItemText, ListItem, Button } from "@material-ui/core";
// icons
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
// components and functions
import { ArmyContext } from "../../../../../../../contexts/armyContext";
// custom hooks
import useArmyValidation from "../../../../../../../customHooks/UseArmyValidation";
// constants
import { MAGICAL_ITEMS } from "../../../../../../../constants/itemShopConstants";
// clsx
import clsx from "clsx";

const useStyles = makeStyles({
  deleteBttn: {
    padding: "0",
    marginRight: "1.5em",
  },
  equipmentList: {
    display: "flex",
    flexDirection: "column",
  },
  line: {
    marginTop: "0.5em",
    borderTop: "solid black 0.1em",
    width: "55%",
  },
  element: {
    padding: "0px",
    margin: "0px",
  },
});

const EquipmentList = (props) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const AC = useContext(ArmyContext);
  const validation = useArmyValidation();

  /**
   * Function removes an item from a unit's equipment array.
   * @param {name + uniqueID} identifier
   * @param {int} position
   */
  const removeItem = (identifier, position) => {
    let temp = [...AC.selectedUnits];

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].name + temp[i].uniqueID === identifier) {
        temp[i].equipment.splice(position, 1);
      }
    }

    validation.validateList(temp, AC.maxPointsAllowance, AC.subFactions,AC.armyHasAlternativeLists);
    AC.setSelectedUnits(temp);
  };

  const removeItemFromCentralList = (item) => {
    let temp = [...AC.allEquippedItems];
    temp = temp.filter((i) => !i === item.itemName);
    AC.setAllEquippedItems(temp);
  };

  /**
   * Function sets the itemType flags of a unitCard to correctly toggle the item buttons
   * in the item shop on and off.
   * @param {*} item
   * @param {*} newFlagValue booleam flag. True, if the item is added, false if the item is removed.
   */
  const toggleUnitsItemTypeFlags = (item, newFlagValue) => {
    let tempObj = { ...AC.unitSelectedForShop };

    if (item.everyElement) {
      tempObj.equipmentTypes.unit = newFlagValue;
    } else if (MAGICAL_ITEMS.includes(item.itemType)) {
      tempObj.equipmentTypes.magicItem = newFlagValue;
    } else {
      tempObj.equipmentTypes[item.itemType] = newFlagValue;
    }

    AC.setUnitSelectedForShop({
      ...tempObj,
    });
  };

  /**
   * Function draws horizontal divider is displayed when the equipment list is not emtpy.
   * @returns css class
   */
  const displayListTop = () => {
    return props.unit.equipment.length === 0 ? classes.equipmentList : clsx(classes.line, classes.equipmentList);
  };

  return (
    <List className={displayListTop()} key={props.unit.uniqueID}>
      {props.unit.equipment.length !== 0
        ? props.unit.equipment.map((e, i) => {
            return (
              <ListItem key={props.unit.uniqueID} className={classes.element}>
                <Button
                  key={props.unit.uniqueID}
                  className={clsx(classes.deleteBttn)}
                  onClick={() => {
                    removeItem(props.identifier, i);
                    removeItemFromCentralList(e);
                    toggleUnitsItemTypeFlags(e, false);
                  }}
                >
                  <RemoveCircleOutlineIcon key={props.unit.uniqueID} />
                </Button>
                <ListItemText key={props.unit.uniqueID} primary={<span>{e.itemName}</span>} secondary={<span>{e.points}</span>} />
              </ListItem>
            );
          })
        : null}
    </List>
  );
};

export default EquipmentList;
