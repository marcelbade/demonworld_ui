// React
import React, { useContext } from "react";
// Material UI
import { List, ListItemText, ListItem, IconButton } from "@mui/material";
// icons
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// components and functions
import { ItemContext } from "../../../../../../../contexts/itemContext";
import { SelectionContext } from "../../../../../../../contexts/selectionContext";
// custom hooks
import useArmyValidation from "../../../../../../../customHooks/UseArmyValidation";
import useUnitEquipmentLimits from "../../../../../../../customHooks/useUnitEqipmentLimits";
import useSpecialItems from "../../../../../../../customHooks/UseSpecialItems";

const EquipmentList = (props) => {
  const IC = useContext(ItemContext);
  const SEC = useContext(SelectionContext);
  const validation = useArmyValidation();
  const limiter = useUnitEquipmentLimits();
  const specials = useSpecialItems();

  /**
   * Function removes an item from a unit's equipment array, and revalidates the list.
   * @param {name + uniqueID} identifier
   * @param {int} position
   */
  const removeItem = (identifier, position) => {
    let temp = [...SEC.selectedUnits];

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].name + temp[i].uniqueID === identifier) {
        temp[i].equipment.splice(position, 1);
      }
    }

    validation.validateList(temp, SEC.maxPointsAllowance);

    SEC.setSelectedUnits(temp);
  };

  const removeItemFromCentralList = (item) => {
    let temp = [...IC.allEquippedItems];
    temp = temp.filter((i) => !i === item.itemName);
    IC.setAllEquippedItems(temp);
  };

  const removeSpecialItem = (selectedUnit) => {
    specials.testSpecialItemEffectRemoval(selectedUnit);
  };

  /**
   * Function draws horizontal divider is displayed when the equipment list is not empty.
   * @returns css class
   */
  const displayListTop = () => {
    return props.unit.equipment.length === 0
      ? {
          display: "flex",
          flexDirection: "column",
        }
      : {
          marginTop: "0.5em",
          borderTop: "solid black 0.1em",
          width: "55%",
          display: "flex",
          flexDirection: "column",
        };
  };

  return (
    <List sx={displayListTop()} key={props.unit.uniqueID}>
      {props.unit.equipment.length !== 0
        ? props.unit.equipment.map((e, i) => {
            return (
              <ListItem key={i} sx={{ padding: "0px", margin: "0px" }}>
                <IconButton
                  sx={{ padding: "0", marginRight: "1.5em" }}
                  onClick={() => {
                    removeSpecialItem(props.unit);
                    removeItem(props.identifier, i);
                    removeItemFromCentralList(e);
                    limiter.toggleUnitsItemTypeFlags(props.unit, e, false);
                  }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <ListItemText primary={<span>{e.itemName}</span>} secondary={<span>{e.points}</span>} />
              </ListItem>
            );
          })
        : null}
    </List>
  );
};

export default EquipmentList;
