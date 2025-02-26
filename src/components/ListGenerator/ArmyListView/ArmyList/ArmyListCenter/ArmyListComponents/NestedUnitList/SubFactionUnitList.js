// React
import React, { Fragment, useContext } from "react";
// Material UI
import { List, ListItem, IconButton } from "@mui/material";
// icons
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
// components and functions
import EquipmentList from "./EquipmentList";
import UnitElementButtons from "./UnitElementButtons";
import ArmyListUnitEntry from "./ArmyListUnitEntry";
// context
import { SelectionContext } from "../../../../../../../contexts/selectionContext";
import { ItemContext } from "../../../../../../../contexts/itemContext";
// custom hooks
import useArmyValidation from "../../../../../../../customHooks/UseArmyValidation";
import useUnitEquipmentLimits from "../../../../../../../customHooks/useUnitEqipmentLimits";
import useSpecialItems from "../../../../../../../customHooks/UseSpecialItems";
/**
 * The component creates the nested unit list for a single sub faction.
 * Every entry contains:
 *  - the unit name
 *  - points
 *  - buttons to display item shop and card view for that unit
 *  - the list of items selected for this unit
 *  - a button to delete the entire entry.
 * The buttons only appear when the user hovers the mouse over the entry.
 */
const SubFactionUnitList = (props) => {
  const IC = useContext(ItemContext);
  const SEC = useContext(SelectionContext);
  const validation = useArmyValidation();
  const limiter = useUnitEquipmentLimits();
  const specials = useSpecialItems();

  /**
   * Function removes a unit from the current list, then revalidates the list.
   * @param {Obj} validatedUnit returned from the validation logic.
   */
  const removeUnit = (validatedUnit) => {
    const identifier = validatedUnit.unit.unitName + validatedUnit.unit.uniqueID;

    let tempArray = [...SEC.selectedUnits];
    tempArray = tempArray.filter((u) => u.name + u.uniqueID !== identifier);

    const validationResult = validation.validateList(tempArray, SEC.maxPointsAllowance);
    validation.testForDisabledSubFaction(validationResult.unitsBlockedbyRules);

    SEC.setSelectedUnits(tempArray);
  };

  const removeItemButtonHandler = (unit, item, position) => {
    const identifier = unit.unitName + unit.uniqueID;

    removeItem(identifier, item);
    removeItemFromCentralList(position);
    specials.testSpecialItemEffectRemoval(unit);
    limiter.toggleUnitsItemTypeFlags(unit, position, false);
  };

  /**
   * Function removes an item from a unit's equipment array, and revalidates the list.
   * @param {name + uniqueID} identifier
   * @param {int} position
   */
  const removeItem = (identifier, position) => {
    let tempArray = [...SEC.selectedUnits];

    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].name + tempArray[i].uniqueID === identifier) {
        tempArray[i].equipment.splice(position, 1);
      }
    }

    validation.validateList(tempArray, SEC.maxPointsAllowance);

    SEC.setSelectedUnits(tempArray);
  };

  /**
   * Function removes item from the central list, making it eligible
   * to be selected again.
   * @param {itemCard} item
   */
  const removeItemFromCentralList = (item) => {
    let temp = [...IC.allEquippedItems];
    temp = temp.filter((i) => !i === item.itemName);
    IC.setAllEquippedItems(temp);
  };

  /**
   * Function strips all items from a unit.
   * @param {unitCard} unit
   */
  const removeAllItems = (unit) => {
    unit.equipment.forEach((item, i) => {
      removeItemButtonHandler(unit, item, i);
    });
  };

  return (
    <Fragment>
      {props.subFactionUnits
        .sort((a, b) => a.unitName > b.unitName)
        .map((u) => validation.createSecondSubFactionObject(u, validation.validateList(SEC.selectedUnits, SEC.maxPointsAllowance)))
        .map((validationObj, i) => {
          return (
            <List key={i}>
              <ListItem>
                <IconButton
                  onClick={() => {
                    removeAllItems(validationObj.unit);
                    removeUnit(validationObj);
                    props.fadeOutFunc();
                  }}
                >
                  <RemoveCircleOutline />
                </IconButton>
                <ArmyListUnitEntry
                  unit={validationObj.unit}
                  isValid={validationObj.valid}
                  validationMessage={validationObj.validationMessage}
                />
                {/* BUTTONS */}
                <UnitElementButtons
                  unit={validationObj.unit} //
                  subFaction={props.subFactionName}
                />
              </ListItem>
              <ListItem>
                <EquipmentList
                  removeItemButtonHandler={removeItemButtonHandler}
                  unit={validationObj.unit} //
                />
              </ListItem>
            </List>
          );
        })}
    </Fragment>
  );
};

export default SubFactionUnitList;
