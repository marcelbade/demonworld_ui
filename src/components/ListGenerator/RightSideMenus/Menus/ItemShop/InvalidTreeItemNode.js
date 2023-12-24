import React from "react";
// material ui
import makeStyles from "@mui/styles/makeStyles";
import { Typography, IconButton, Grid } from "@mui/material";
// icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// constants

const useStyles = makeStyles({
  itemName: {
   
    color: "grey",
  },
 
  ruleText: {
    width: "40em",
  },
});

const InvalidTreeItemNode = (props) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" direction="row">
      <Grid item container direction="column" xs={2}>
        <Typography variant="body1">{props.item.itemName}</Typography>
        <Typography variant="body1" className={classes.points}>
          {props.item.points}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <IconButton disabled={true} size="large" onClick={() => {}}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default InvalidTreeItemNode;
