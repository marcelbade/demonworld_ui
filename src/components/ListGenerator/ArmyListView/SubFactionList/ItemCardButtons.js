// React
import React, { useContext } from "react";
// Material UI
import { makeStyles, List } from "@material-ui/core";
import { ListItemButton } from "@mui/material";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { uuidGenerator } from "../../../shared/sharedFunctions";

const useStyles = makeStyles({
  buttons: {
    marginRight: "1em",
  },
});

const ItemCardButtons = (props) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  return (
    <List key={uuidGenerator()}>
      <ListItemButton
        key={uuidGenerator()}
        className={classes.buttons}
        variant="outlined"
        onClick={() => {
          contextArmy.setUnitSelectedForShop(props.u);
          contextArmy.toggleMenuState(props.u, false);
        }}
      >
        Gegenstände
      </ListItemButton>
      <ListItemButton
        key={uuidGenerator()}
        className={classes.cardButtons}
        variant="outlined"
        onClick={() => {
          contextArmy.toggleMenuState(props.u, true);
        }}
      >
        Kartenvorschau
      </ListItemButton>
    </List>
  );
};

export default ItemCardButtons;
