// React
import React, { Fragment } from "react";
//Material UI
import { Divider, List } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// components and functions
import EquipmentListEntry from "./EquipmentListEntry";

const useStyles = makeStyles((theme) => ({
  line: {
    color: "black",
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
          <Divider variant="middle"   />
          {props.unit.equipment.map((e, i) => {
            return (
              <EquipmentListEntry
                unit={props.unit} //
                item={e}
                index={i}
                key={props.unit.uniqueID}
              />
            );
          })}
        </Fragment>
      ) : null}
    </List>
  );
};

export default EquipmentList;
