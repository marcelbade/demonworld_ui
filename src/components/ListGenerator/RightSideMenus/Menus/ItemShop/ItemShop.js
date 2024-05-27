// React
import React from "react";
//Material UI
import { Grid } from "@mui/material";
// components and functions
import ItemShopHeader from "./ItemShopHeader";
import ItemShopTree from "./ItemShopTree";

const ItemShop = () => {
  return (
    <Grid container direction="column" sx={{ height: "100vh", width: "45vw" }}>
      <ItemShopHeader />

      <Grid
        item //
        justifyContent="flex-start"
        sx={{ paddingLeft: "2em" }}
      >
        <ItemShopTree />
      </Grid>
    </Grid>
  );
};

export default ItemShop;
