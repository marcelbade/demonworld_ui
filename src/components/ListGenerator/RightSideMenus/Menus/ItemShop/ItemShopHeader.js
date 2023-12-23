// React
import React, { useContext } from "react";
//Material UI
import { Grid, Typography, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// components and functions
import { ItemContext } from "../../../../../contexts/itemContext";
import { RightMenuContext } from "../../../../../contexts/rightMenuContext";

const useStyles = makeStyles({
  unitName: {
    width: "60%",
    fontWeight: "bold",
    borderBottom: "solid 4px black",
    marginBottom: "1em",
    fontFamily: "jaapokkiRegular",
  },
});

const ItemShopHeader = () => {
  const classes = useStyles();

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
      <Grid item container direction="row" justifyContent="center">
        <Typography variant="h5" align="center" className={classes.unitName}>
          {IC.unitSelectedForShop.unitName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ItemShopHeader;
