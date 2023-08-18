// React
import React from "react";
//Material UI
import { ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { uuidGenerator } from "../../shared/sharedFunctions";
import LossCalcEquipmentButton from "./EquipmentListElementBttn";
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
  const itemName = props.element.name;
  const isItemLost = props.element.itemLost;
  const pointCost = props.element.points;

  return (
    <ListItem className={classes.entry} key={uuidGenerator()}>
      <LossCalcEquipmentButton
        unit={unit} //
        itemName={itemName}
        isItemLost={isItemLost}
      />

      <EquipmentListItemName
        pointCost={pointCost} //
        itemName={itemName}
        isItemLost={isItemLost}
      />
    </ListItem>
  );
};

export default EquipmentListEntry;
