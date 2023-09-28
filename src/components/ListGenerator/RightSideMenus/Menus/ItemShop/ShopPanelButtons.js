// React
import React from "react";
//Material UI
import { Button, Grid, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
        {props.itemTypes.map((type, i) => {
          return (
            <Button
              className={props.active === i ? classes.activeButton : classes.buttons}
              variant="text"
              key={i}
              onClick={() => {
                props.showTab(type);
                props.markButton(i);
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
