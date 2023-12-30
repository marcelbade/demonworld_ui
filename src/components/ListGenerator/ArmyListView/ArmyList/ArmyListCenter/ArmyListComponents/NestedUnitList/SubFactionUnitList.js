// React
import React, { Fragment, useContext } from "react";
// Material UI
import { List, ListItem, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// icons
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// components and functions
import { ArmyContext } from "../../../../../../../contexts/armyContext";
import { unitCardMultiSort } from "../../../../../../../util/utilityFunctions";
import EquipmentList from "./EquipmentList";
import UnitElementButtons from "./UnitElementButtons";
import ArmyListUnitEntry from "./ArmyListUnitEntry";
import useArmyValidation from "../../../../../../../customHooks/UseArmyValidation";
import { AlternativeListContext } from "../../../../../../../contexts/alternativeListContext";
import { SelectionContext } from "../../../../../../../contexts/selectionContext";

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
  const SEC = useContext(SelectionContext);
  const ALC = useContext(AlternativeListContext);
  const validation = useArmyValidation();

  /**
   * Function removes a unit from the current list.
   * @param {*} identifier unit.name + unique hash value
   */
  const removeUnit = (identifier) => {
    let filtered = SEC.selectedUnits.filter((u) => u.name + u.uniqueID !== identifier);
    validation.validateList(filtered, SEC.maxPointsAllowance, AC.subFactions, ALC.armyHasAlternativeLists);
    SEC.setSelectedUnits(filtered);
  };

  return (
    <Fragment>
      {unitCardMultiSort(props.subFactionUnits).map((u) => {
        const identifier = u.unitName + u.uniqueID;
        return (
          <List className={classes.list} key={identifier}>
            <ListItem className={classes.element}>
              <IconButton
                onClick={() => {
                  removeUnit(identifier);
                }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <ArmyListUnitEntry unit={u} />
              {/* BUTTONS */}
              <UnitElementButtons
                unit={u} //
                subFaction={props.subFactionName}
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
