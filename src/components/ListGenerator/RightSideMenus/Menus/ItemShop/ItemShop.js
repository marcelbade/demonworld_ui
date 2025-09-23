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
      <ItemShopTree />
    </Grid>
  );
};

export default ItemShop;
