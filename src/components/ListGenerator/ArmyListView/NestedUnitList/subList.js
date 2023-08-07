// React
import React, { Fragment, useContext } from "react";
// Material UI
import { List, ListItem, makeStyles, ListItemText, Button } from "@material-ui/core";
// icons
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { unitCardMultiSort, uuidGenerator } from "../../../shared/sharedFunctions";
import EquipmentList from "./EquipmentList";
import SubListStats from "./SubListStats";
import SublistEntryButtons from "./SubListEntryButtons";

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
});

const SubList = (props) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  /**
   * Removes the unit.
   * @param {unit.name + hash code} identifier
   */
  const removeUnit = (identifier) => {
    contextArmy.removeUnit(identifier);
  };

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
  return (
    <Fragment>
      {unitCardMultiSort(props.subFactionUnits).map((u, i) => {
        const identifier = u.unitName + u.uniqueID;
        return (
          <List className={classes.list} key={uuidGenerator()}>
            <ListItem key={uuidGenerator()} className={classes.element}>
              {/* REMOVE BUTTON */}
              <Button
                key={uuidGenerator()}
                onClick={() => {
                  removeUnit(identifier);
                }}
              >
                <RemoveCircleOutlineIcon key={uuidGenerator()} />
              </Button>
              {/* NAME + POINTS + BUTTONS*/}
              <ListItemText
                key={uuidGenerator()}
                primary={<span className={classes.text}>{u.unitName}</span>}
                secondary={
                  <span className={classes.pointsAndSecondSubFaction}>
                    {u.subFaction !== u.secondSubFaction ? <span className={classes.text}>{u.secondSubFaction}</span> : null}
                    <span className={classes.text}>{u.points}</span>
                  </span>
                }
              />
              {/* BUTTONS */}
              <SublistEntryButtons unit={u} subFaction={props.subFactionName} key={uuidGenerator()} />
            </ListItem>
            <ListItem key={uuidGenerator()}>
              <EquipmentList key={uuidGenerator()} unit={u} identifier={identifier} />
            </ListItem>
          </List>
        );
      })}
      {/* SUB LIST STATS */}
      <SubListStats key={uuidGenerator()} subFactionName={props.subFactionName} subFactionUnits={props.subFactionUnits} />
    </Fragment>
  );
};

export default SubList;
