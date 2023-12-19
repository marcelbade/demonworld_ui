// React
import React from "react";
//Material UI
import { Button, Grid, ButtonGroup } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// components and functions
import { ITEM_CATEGORY_NAME_MAPPING } from "../../../../../constants/itemShopConstants";

const useStyles = makeStyles({
  buttons: {
    fontWeight: "bold",
    border: "none",
  },
  activeButton: {
    fontWeight: "bold",
    border: "none",
    backgroundColor: "lightgrey",
  },
});

const ShopPanelButtons = (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={3} className={classes.panelButtonsBackground}>
      <ButtonGroup size="large" orientation="vertical">
        {props.mappedItemTypes
          .filter((obj) => obj.items.length !== 0)
          .map((obj, i) => {
            return (
              <Button
                className={props.active === i ? classes.activeButton : classes.buttons}
                variant="text"
                key={i}
                onClick={() => {
                  props.showTab(obj.typeName);
                  props.markButton(i);
                }}
              >
                {ITEM_CATEGORY_NAME_MAPPING[obj.typeName]}
              </Button>
            );
          })}
      </ButtonGroup>
    </Grid>
  );
};

export default ShopPanelButtons;
