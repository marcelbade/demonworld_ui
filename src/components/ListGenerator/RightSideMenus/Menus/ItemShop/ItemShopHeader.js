// React
import { useContext } from "react";
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
    <Grid
      container //
      alignItems="center"
      sx={{
        position: "absolute",
      }}
    >
      <IconButton
        onClick={() => {
          closeShopPanel();
        }}
        size="large"
      >
        <CancelIcon />
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
