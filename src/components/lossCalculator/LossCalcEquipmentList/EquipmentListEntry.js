// React
import React from "react";
//Material UI
import { ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import EquipmentListElementBttn from "./EquipmentListElementBttn";
import EquipmentListItemName from "./EquipmentListItemName";

const useStyles = makeStyles((theme) => ({
  entry: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",

      "@media (orientation:landscape)": {
        flexDirection: "row",
      },
    },
  },
}));

const EquipmentListEntry = (props) => {
  const classes = useStyles();

  const unit = props.unit;
  const itemName = props.item.name;
  const isItemLost = props.item.itemLost;
  const pointCost = props.item.points;
  const notSingleElementItem = props.item.everyElement;

  return (
    <ListItem className={classes.entry} key={props.unit.uniqueID}>
      <EquipmentListElementBttn
        unit={unit} //
        itemName={itemName}
        isItemLost={isItemLost}
        disableButton={notSingleElementItem}
      />

      <EquipmentListItemName
        pointCost={pointCost} //
        itemName={itemName}
        isItemLost={isItemLost}
        notSingleElementItem={notSingleElementItem}
      />
    </ListItem>
  );
};

export default EquipmentListEntry;
