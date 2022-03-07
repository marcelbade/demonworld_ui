// React
import React, { Fragment, useEffect, useState } from "react";
// Material UI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography } from "@material-ui/core";
// icons
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

// import ClearIcon from "@material-ui/icons/Clear";
// components and functions
import { alliesMapping } from "../gameLogic/allies";
import GearButtonList from "./gearButtons";

const useStyles = makeStyles({
  gearListHeader: {
    testAlign: "right",
    color: "red",
  },
  deleteBttn: {
    padding: "0",
    marginRight: "2em",
  },
  decrption: {
    fontFamily: "Beryliumbold",
    marginRight: "3em",
  },
});

const SubList = (props) => {
  // TODO:
  // 5. This must contain the styling for the sublist: header with subFaction name , subFaction Point Total underline
  // 8. Gear: gear allocated to a unit must be its OWN list and therefore its own module (no, really...)
  // 9. their must be SEVERAL buttons next to each entry:
  /**
   *  - remove unit from list
   *  - add gear
   *  - remove all gear
   *  - IF you feelm like it, do this insteas: individual buttons for item categories: weapon, shield+armor, potions, magic trinkets
   *  -  that means: array or object
   *
   */

  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();

  const [itemButtonsVisibility, setItemButtonsVisibility] = useState({});
  const [subFactionTotal, setSubFactionTotal] = useState(0);

  /**
   * useEffect updates the itemButtonsVisibility object everytime a new unit is added to the ArmyList.
   * The object is needed to have a unique key for every button row.
   */
  useEffect(() => {
    let temp = {};
    let unitName;
    // eslint-disable-next-line
    props.subFactionUnits.map((u) => {
      unitName = u.unitName + u.uniqueID;
      temp = { ...temp, [unitName]: false };
    });
    setItemButtonsVisibility(temp);
  }, [props.subFactionUnits]);

  /**
   * useffEct calculates the total for the sub faction.
   */
  useEffect(() => {
    let temp = 0;
    if (props.subFactionUnits) {
      props.subFactionUnits.forEach((u) => (temp += u.points));
    }
    setSubFactionTotal(temp);
  }, [props.subFactionUnits]);

  const removeUnit = (identifier) => {
    props.removeUnit(identifier);
  };

  /**
   * Abstraction / decoupling function that calls the use state setter to toggle
   * the item buttons when an entry is clicked.
   * @param {string} identifier
   */
  const toggleGearBttns = (identifier) => {
    setItemButtonsVisibility({
      ...itemButtonsVisibility,
      [identifier]: !itemButtonsVisibility[identifier],
    });
  };

  /**
   * The component creates the list for a single sub faction.
   * An entry contains:
   *  - the unit name
   *  -  points
   *  - button row to select different kinds of items
   *  - a button to delete the entire entry.
   * The buttons only appear when the user hovers the mouse over the entry.
   */
  return (
    <Fragment>
      <List>
        {props.subFactionUnits.map((u) => {
          const identifier = u.unitName + u.uniqueID;

          return (
            <ListItem key={identifier}>
              <IconButton
                onClick={() => {
                  removeUnit(identifier);
                }}
                className={classes.deleteBttn}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <Typography
                className={classes.decrption}
                onClick={() => {
                  toggleGearBttns(identifier);
                }}
              >
                {u.unitName} - {u.points}
              </Typography>
              {itemButtonsVisibility[identifier] ? <GearButtonList unit={u} /> : null}
            </ListItem>
          );
        })}
      </List>
      <Typography>Gesamt: {subFactionTotal} </Typography>
    </Fragment>
  );
};

export default SubList;
