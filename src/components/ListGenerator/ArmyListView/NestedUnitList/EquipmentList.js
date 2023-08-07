// React
import React, { useContext } from "react";
// Material UI
import { makeStyles, List, ListItemText, ListItem, Button } from "@material-ui/core";
// icons
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { uuidGenerator } from "../../../shared/sharedFunctions";
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
  const contextArmy = useContext(ArmyContext);

  /**
   * Function makes sure a horizontal divider is displayed when the equipment list is not emtpy.
   * @returns css class
   */
  const displayListTop = () => {
    return props.unit.equipment.length === 0 ? classes.equipmentList : clsx(classes.line, classes.equipmentList);
  };

  return (
    <List className={displayListTop()} key={uuidGenerator()}>
      {props.unit.equipment.length !== 0
        ? props.unit.equipment.map((e, i) => {
            return (
              <ListItem key={uuidGenerator()} className={classes.element}>
                <Button
                  key={uuidGenerator()}
                  className={clsx(classes.deleteBttn)}
                  onClick={() => {
                    contextArmy.removeItem(props.identifier, i);
                      contextArmy.recalculateItemTypeFlags(e, false);
                  }}
                >
                  <RemoveCircleOutlineIcon key={uuidGenerator()} />
                </Button>
                <ListItemText key={uuidGenerator()} primary={<span>{e.itemName}</span>} secondary={<span>{e.points}</span>} />
              </ListItem>
            );
          })
        : null}
    </List>
  );
};

export default EquipmentList;
