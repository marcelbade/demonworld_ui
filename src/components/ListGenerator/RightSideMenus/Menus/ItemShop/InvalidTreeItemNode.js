import React from "react";
// material ui
import makeStyles from "@mui/styles/makeStyles";
import { Typography, IconButton, Grid } from "@mui/material";
// icons
import HelpIcon from "@mui/icons-material/Help";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// components and functions
import usePushMessages from "../../../../../customHooks/UsePushMessages";
// constants
import { VALIDATION } from "../../../../../constants/textsAndMessages";

const useStyles = makeStyles({
  invalidItem: {
    color: "grey",
  },

  ruleText: {
    width: "40em",
  },
});

const InvalidTreeItemNode = (props) => {
  const classes = useStyles();
  const pushMessages = usePushMessages();

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
        <IconButton
          onClick={() => {
            pushMessages.showSnackBar(VALIDATION.NOT_A_VALID_ITEM);
          }}
          size="large"
        >
          <HelpIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default InvalidTreeItemNode;
