// React
import React, { Fragment, useContext } from "react";
// Material UI
import { List, ListItem, makeStyles, Button } from "@material-ui/core";
// icons
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { unitCardMultiSort, uuidGenerator } from "../../../shared/sharedFunctions";
import EquipmentList from "./EquipmentList";
import UnitEntryButtons from "./UnitEntryButtons";
import ArmyListUnitEntry from "./ArmyListUnitEntry";

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

  /**
   * Function removes a unit from the current list.
   * @param {*} identifier unit.name + unique hash value
   */
  const removeUnit = (identifier) => {
    let filtered = AC.selectedUnits.filter((u) => u.name + u.uniqueID !== identifier);
    AC.setSelectedUnits(filtered);
  };

  return (
    <Fragment>
      {unitCardMultiSort(props.subFactionUnits).map((u, i) => {
        const identifier = u.unitName + u.uniqueID;
        return (
          <List className={classes.list} key={uuidGenerator()}>
            <ListItem key={uuidGenerator()} className={classes.element}>
              <Button
                key={uuidGenerator()}
                onClick={() => {
                  removeUnit(identifier);
                }}
              >
                <RemoveCircleOutlineIcon key={uuidGenerator()} />
              </Button>
              <ArmyListUnitEntry unit={u} />
              {/* BUTTONS */}
              <UnitEntryButtons
                unit={u} //
                subFaction={props.subFactionName}
                key={uuidGenerator()}
                className={classes.buttons}
              />
            </ListItem>
            <ListItem key={uuidGenerator()}>
              <EquipmentList
                key={uuidGenerator()} //
                unit={u}
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
