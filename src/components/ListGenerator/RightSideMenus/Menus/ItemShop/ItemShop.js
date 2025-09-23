// React
import React from "react";
//Material UI
import { Grid2 as Grid } from "@mui/material";
// components and functions
import ItemShopHeader from "./ItemShopHeader";
import ItemShopTree from "./ItemShopTree";

const ItemShop = () => {
  return (
    <Grid
      container
      direction={{ xs: "column", sm: "column", md: "column", lg: "column", xl: "column" }} //
      sx={{
        width: "50em", //
      }}
    >
      <ItemShopHeader />

      <Grid //
        justifyContent="flex-start"
        sx={{ paddingLeft: "2em" }}
      >
        <ItemShopTree />
      </Grid>
    </Grid>
  );
};

export default ItemShop;
