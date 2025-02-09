// React
import React from "react";
// Material UI
import { List } from "@mui/material";
import { ListItemButton } from "@mui/material";
// custom hooks
import useRightSideMenuController from "../../../../../../../customHooks/useRightSideMenuController";

const UnitElementButtons = (props) => {
  const sideMenuController = useRightSideMenuController(
    props.unit, //
    props.subFaction,
    {
      displayCard: true,
      displayItemShop: true,
      secondSubFaction: true,
    }
  );

  return (
    <List key={props.unit.uniqueID}>
      {sideMenuController.buttons.map((b, i) => {
        return (
          <ListItemButton
            key={i} //
            variant="outlined"
            onClick={b.action}
          >
            {b.text}
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default UnitElementButtons;
