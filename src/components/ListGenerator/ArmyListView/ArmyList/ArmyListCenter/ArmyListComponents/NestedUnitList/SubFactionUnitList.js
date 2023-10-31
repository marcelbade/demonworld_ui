// React
import React, { Fragment, useContext } from "react";
// Material UI
import { List, ListItem, makeStyles, Button } from "@material-ui/core";
// icons
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
// components and functions
import { ArmyContext } from "../../../../../../../contexts/armyContext";
import { unitCardMultiSort } from "../../../../../../shared/sharedFunctions";
import EquipmentList from "./EquipmentList";
import UnitElementButtons from "./UnitElementButtons";
import ArmyListUnitEntry from "./ArmyListUnitEntry";
import useArmyValidation from "../../../../../../../customHooks/UseArmyValidation";

const useStyles = makeStyles({
  text: {
    width: "40%",
  },
  pointsAndSecondSubFaction: {
    display: "flex",
    flexDirection: "column",
  },
  list: {
    padding: "0px",
    margin: "0px",
  },
  element: {
    width: "80%",
    margin: "-1em",
    padding: "0em",
  },
  buttons: {
    hieght: "80%",
  },
});

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
  const classes = useStyles();
  const AC = useContext(ArmyContext);
  const validation = useArmyValidation();

  /**
   * Function removes a unit from the current list.
   * @param {*} identifier unit.name + unique hash value
   */
  const removeUnit = (identifier) => {
    let filtered = AC.selectedUnits.filter((u) => u.name + u.uniqueID !== identifier);
    validation.validateList(filtered, AC.maxPointsAllowance, AC.subFactions,AC.armyHasAlternativeLists);
    AC.setSelectedUnits(filtered);
  };

  return (
    <Fragment>
      {unitCardMultiSort(props.subFactionUnits).map((u) => {
        const identifier = u.unitName + u.uniqueID;
        return (
          <List className={classes.list} key={identifier}>
            <ListItem className={classes.element}>
              <Button
                onClick={() => {
                  removeUnit(identifier);
                }}
              >
                <RemoveCircleOutlineIcon />
              </Button>
              <ArmyListUnitEntry unit={u} />
              {/* BUTTONS */}
              <UnitElementButtons
                unit={u} //
                subFaction={props.subFactionName}
                className={classes.buttons}
              />
            </ListItem>
            <ListItem>
              <EquipmentList
                unit={u} //
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
