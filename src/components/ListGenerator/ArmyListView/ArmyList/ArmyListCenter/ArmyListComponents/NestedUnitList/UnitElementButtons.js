// React
import React from "react";
// Material UI
import { List } from "@mui/material";
import { ListItemButton } from "@mui/material";
// custom hooks
import useRightSideMenuController from "../../../../../../../customHooks/useRightSideMenuController";

/**
 * Component generates the buttons for the right side menu.
 * The buttons are displayed for every unit in the army list.
 * Buttons are generated via a table-driven function.
 * @param {*} props
 * @returns JSX elemment
 */
const UnitElementButtons = (props) => {
  const ICON_SIZE = 25;

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
