// React
import React, { Fragment } from "react";
//Material UI
import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import EquipmentListEntry from "./EquipmentListEntry";
import { uuidGenerator } from "../../shared/sharedFunctions";

const useStyles = makeStyles((theme) => ({
  line: {
    marginTop: "0.5em",
    marginBottom: "0.5em",
    borderBottom: "solid black 0.1em",
    display: "block",
  },
}));

const EquipmentList = (props) => {
  const classes = useStyles();

  /**
   * Function checks, if the unit's equipment list should be displayed.
   * @returns true, if equipment array exists and contains elements.
   */
  const doesUnithaveEquipment = () => {
    const listExists = props.unit.equipment !== undefined;
    const listcontainsEntries = props.unit.equipment.length !== 0;

    return listExists && listcontainsEntries;
  };

  return (
    <List>
      {doesUnithaveEquipment() ? (
        <Fragment>
          <span className={classes.line}></span>
          {props.unit.equipment.map((e, i) => {
            return (
              <EquipmentListEntry
                unit={props.unit} //
                item={e}
                index={i}
                key={uuidGenerator()}
              />
            );
          })}
        </Fragment>
      ) : null}
    </List>
  );
};

export default EquipmentList;