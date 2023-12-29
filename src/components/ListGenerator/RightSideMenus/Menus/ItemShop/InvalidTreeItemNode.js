import React from "react";
// material ui
import makeStyles from "@mui/styles/makeStyles";
import { Typography, IconButton, Grid } from "@mui/material";
// icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// constants
import ContextHelpButton from "../../../../shared/ContextHelpButton";

const useStyles = makeStyles((theme) => ({
  invalidItem: {
    color: theme.palette.disabled,
  },
  ruleText: {
    width: "40em",
  },
}));

const InvalidTreeItemNode = (props) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" direction="row">
      <Grid item container direction="column" xs={2}>
        <Typography
          variant="body1" //
          className={classes.invalidItem}
        >
          {props.item.itemName}
        </Typography>
        <Typography
          variant="body1" //
          className={classes.invalidItem}
        >
          {props.item.points}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <IconButton size="large" disabled={true}>
          <AddCircleOutlineIcon />
        </IconButton>
        <ContextHelpButton message={props.message} />
      </Grid>
    </Grid>
  );
};

export default InvalidTreeItemNode;