import React from "react";
// material ui
import {makeStyles} from "@material-ui/core";
import { Typography, IconButton, Grid } from "@mui/material";
// icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// constants
import ContextHelpButton from "../../../../shared/ContextHelpButton";
import { PUSH_MESSAGE_TYPES } from "../../../../../constants/textsAndMessages";

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
        <ContextHelpButton
          message={props.message} //
          type={PUSH_MESSAGE_TYPES.ERROR}
        />
      </Grid>
    </Grid>
  );
};

export default InvalidTreeItemNode;
