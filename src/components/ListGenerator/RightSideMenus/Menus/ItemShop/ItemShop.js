// React
import React from "react";
//Material UI
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// components and functions
import ItemShopHeader from "./ItemShopHeader";
import ItemShopTree from "./ItemShopTree";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "45vw",
  },
  treePadding: {
    paddingLeft: "2em",
  },
});

const ItemShop = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.overlay}>
      <ItemShopHeader />

      <Grid
        item //
        justifyContent="flex-start"
        className={classes.treePadding}
      >
        <ItemShopTree />
      </Grid>
    </Grid>
  );
};

export default ItemShop;
