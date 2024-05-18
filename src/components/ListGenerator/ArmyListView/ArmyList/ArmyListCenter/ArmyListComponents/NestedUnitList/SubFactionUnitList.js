// React
import React, { Fragment, useContext } from "react";
// Material UI
import { List, ListItem, IconButton } from "@mui/material";
// icons
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// components and functions
import EquipmentList from "./EquipmentList";
import UnitElementButtons from "./UnitElementButtons";
import ArmyListUnitEntry from "./ArmyListUnitEntry";
import useArmyValidation from "../../../../../../../customHooks/UseArmyValidation";
// context
import { SelectionContext } from "../../../../../../../contexts/selectionContext";

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
  // eslint-disable-next-line no-unused-vars
  const SEC = useContext(SelectionContext);
  const validation = useArmyValidation();

  /**
   * Function removes a unit from the current list, and revalidates the list.
   * @param {*} identifier unit.name + unique hash value
   */
  const removeUnit = (identifier) => {
    let tempArray = [...SEC.selectedUnits];
    tempArray = tempArray.filter((u) => u.name + u.uniqueID !== identifier);

    validation.validateList(tempArray, SEC.maxPointsAllowance);

    SEC.setSelectedUnits(tempArray);
  };

  return (
    <Fragment>
      {props.subFactionUnits
        .sort((a, b) => a.unitName > b.unitName)
        .map((u) => validation.returnValidationResult("secondSubFaction", u))
        .map((validationObj, i) => {
          const identifier = validationObj.unit.unitName + validationObj.unit.uniqueID;
          return (
            <List key={i}>
              <ListItem>
                <IconButton
                  onClick={() => {
                    removeUnit(identifier);
                  }}
                >
                  <RemoveCircleOutlineIcon />
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
                  unit={validationObj.unit} //
                  identifier={identifier}
                />
              </ListItem>
            </List>
          );
        })}
    </Fragment>
  );
};

export default SubFactionUnitList;
