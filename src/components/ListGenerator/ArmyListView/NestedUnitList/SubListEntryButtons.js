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

const SublistEntryButtons = (props) => {
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
          contextArmy.setUnitSelectedForShop(props.unit);
          contextArmy.toggleMenuState(props.unit, "ITEMS");
        }}
      >
        Gegenstände
      </ListItemButton>
      <ListItemButton
        key={uuidGenerator()}
        className={classes.cardButtons}
        variant="outlined"
        onClick={() => {
          contextArmy.toggleMenuState(props.unit, "UNIT_CARDS");
        }}
      >
        Kartenvorschau
      </ListItemButton>

      {contextArmy.hasAdditionalSubFaction && !contextArmy.excemptSubFactions.includes(props.subFaction) ? (
        <ListItemButton
          key={uuidGenerator()}
          className={classes.cardButtons}
          variant="outlined"
          onClick={() => {
            contextArmy.toggleMenuState(props.unit, "SECOND_SUB_FACTION");
          }}
        >
          {contextArmy.secondSubfactionCaption}
        </ListItemButton>
      ) : null}
    </List>
  );
};

export default SublistEntryButtons;
