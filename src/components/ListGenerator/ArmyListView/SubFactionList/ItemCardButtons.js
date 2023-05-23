// React
import React, { useContext } from "react";
// Material UI
import { makeStyles, Button } from "@material-ui/core";
import { ListItemButton, Stack } from "@mui/material";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";

const useStyles = makeStyles({
  buttons: {
    fontFamily: "NotMaryKate",
    marginRight: "1em",
    "&:hover": {
      backgroundColor: "grey",
      color: "red",
    },
  },
  teest: {
    display: "flex",
    flexDirection: "column",
  },
});

const ItemCardButtons = (props) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  return (
    <Stack direction={"column"}>
      <Button
        className={classes.buttons}
        variant="outlined"
        onClick={() => {
          contextArmy.setUnitSelectedForShop(props.u);
          contextArmy.toggleBetweenItemShops(props.u);
        }}
      >
        Gegenstände
      </Button>
      <Button
        className={classes.buttons}
        variant="outlined"
        onClick={() => {
          contextArmy.toggleBetweenCards(props.u);
        }}
      >
        Kartenvorschau
      </Button>
    </Stack>
  );
};

export default ItemCardButtons;
