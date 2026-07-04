// React
import { useContext } from "react";
//Material UI
import { Grid, Typography, IconButton } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// components and functions
import { ItemContext } from "../../../../../contexts/itemContext";
// custom hooks
import UseRightSideMenuController from "../../../../../customHooks/UseRightSideMenuController";

const ItemShopHeader = () => {
  const IC = useContext(ItemContext);
  const sideMenuController = UseRightSideMenuController({}, "", {});

  return (
    <Grid
      container //
      alignItems="center"
    >
      <IconButton
        onClick={() => {
          sideMenuController.closeItemShop();
        }}
        size="large"
      >
        <CancelIcon fontSize="large" />
      </IconButton>

      <Typography
        variant="h5" //
        align="center"
        sx={{ marginLeft: "1em" }}
      >
        {IC.unitSelectedForShop.unitName}
      </Typography>
    </Grid>
  );
};

export default ItemShopHeader;
