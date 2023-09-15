// React
import React, { useState, useContext, useEffect } from "react";
//Material UI
import { Button, Grid, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// icons
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";
import { uuidGenerator, isObjectEmtpy } from "../../../../shared/sharedFunctions";

import { ITEM_CATEGORY_NAME_MAPPING } from "../../../../../constants/itemShopConstants";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "30vw",
  },
  buttons: {
    fontWeight: "bold",
    border: "none",
  },
  unitName: {
    fontWeight: "bold",
    borderBottom: "solid 4px black",
  },
  itemText: {
    fontFamily: "Beryliumbold",
  },
  errorNoItems: {
    paddingTop: "3em",
    fontWeight: "bold",
    color: "red",
  },
});

const ShopPanelButtons = (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={3} className={classes.panelButtonsBackground}>
      <ButtonGroup size="large" orientation="vertical">
        {props.itemTypes.map((type) => {
          return (
            <Button
              className={classes.buttons}
              variant="text"
              key={uuidGenerator()}
              onClick={() => {
                props.showTab(type);
              }}
            >
              {ITEM_CATEGORY_NAME_MAPPING[type]}
            </Button>
          );
        })}
      </ButtonGroup>
    </Grid>
  );
};

export default ShopPanelButtons;
