// Material UI
import { List, Tooltip } from "@mui/material";
import { ListItemButton } from "@mui/material";
// custom hooks
import useRightSideMenuController from "../../../../../../../customHooks/UseRightSideMenuController";

/**
 * Component generates the buttons for the right side menu.
 * The buttons are displayed for every unit in the army list.
 * Buttons are generated via a table-driven function.
 * @param {*} props
 * @returns JSX elemment
 */
const UnitElementButtons = (props) => {
  const sideMenuController = useRightSideMenuController(
    props.unit, //
    props.subFaction,
    {
      displayCard: true,
      displayItemShop: true,
      secondSubFaction: true,
      displayOptionButtons: false,
    },
  );

  return (
    <List key={props.unit.uniqueID}>
      {sideMenuController.buttons.map((b, i) => {
        return (
          <Tooltip title={b.text}>
            <ListItemButton
              key={i} //
              variant="outlined"
              onClick={b.action}
              sx={{
                marginBottom: { xs: "2em", md: "0em" },
              }}
            >
              {b.icon}
            </ListItemButton>
          </Tooltip>
        );
      })}
    </List>
  );
};

export default UnitElementButtons;
