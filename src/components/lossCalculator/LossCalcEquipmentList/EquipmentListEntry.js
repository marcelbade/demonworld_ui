// React
import React from "react";
//Material UI
import { ListItem } from "@mui/material";
import { useTheme } from "@emotion/react";
// components and functions
import EquipmentListElementBttn from "./EquipmentListElementBttn";
import EquipmentListItemName from "./EquipmentListItemName";

const EquipmentListEntry = (props) => {
  const theme = useTheme();

  const ENTRY = {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("lg")]: {
      flexDirection: "row",

      "@media (orientation:landscape)": {
        flexDirection: "row",
      },
    },
  };

  const unit = props.unit;
  const itemName = props.item.name;
  const isItemLost = props.item.itemLost;
  const pointCost = props.item.points;
  const notSingleElementItem = props.item.everyElement;

  return (
    <ListItem sx={ENTRY} key={props.unit.uniqueID}>
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
