// React
import React, { useContext } from "react";
//Material UI
import { Grid2 as Grid, Typography, IconButton } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// components and functions
import { ItemContext } from "../../../../../contexts/itemContext";
import { RightMenuContext } from "../../../../../contexts/rightMenuContext";

const ItemShopHeader = () => {
  const IC = useContext(ItemContext);
  const RC = useContext(RightMenuContext);

  const closeShopPanel = () => {
    RC.setItemShopState({ ...RC.itemShopState, show: false });
  };

  return (
    <Grid container>
      <IconButton
        onClick={() => {
          closeShopPanel();
        }}
        size="large"
      >
        <CancelIcon />
      </IconButton>
      <Grid //
        container
        direction="row"
        justifyContent="center"
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ width: "60%", fontWeight: "bold", borderBottom: "solid 4px black", marginBottom: "1em", fontFamily: "jaapokkiRegular" }}
        >
          {IC.unitSelectedForShop.unitName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ItemShopHeader;
