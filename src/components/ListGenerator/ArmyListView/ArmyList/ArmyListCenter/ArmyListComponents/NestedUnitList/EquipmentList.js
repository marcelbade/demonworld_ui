// React
import React from "react";
// Material UI
import { List, ListItemText, ListItem, IconButton } from "@mui/material";
// icons
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const EquipmentList = (props) => {
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
    <List
      sx={displayListTop()} //
      key={props.unit.uniqueID}
    >
      {props.unit.equipment.length !== 0
        ? props.unit.equipment.map((e, i) => {
            return (
              <ListItem key={i} sx={{ padding: "0px", margin: "0px" }}>
                <IconButton
                  sx={{ padding: "0", marginRight: "1.5em" }}
                  onClick={() => {
                    props.removeItemButtonHandler(props.unit, e, i);
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
