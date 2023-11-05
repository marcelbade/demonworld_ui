// React
import React, { useContext } from "react";
import makeStyles from '@mui/styles/makeStyles';
// components & functions
import { renderMagicPoints, renderCommandPoints } from "../../../../compendiums/factionTable/depencies/factionTableFunctions";
import { Grid, Typography } from "@mui/material";
import { StateCardContext } from "../../../../../contexts/statCardContext";

const useStyles = makeStyles({
  cardTitle: {
    flexWrap: "nowrap",
    fontWeight: "normal",
    fontSize: "30px",
    color: "red",
  },
});

const CardFrontTitle = () => {
  const classes = useStyles();

  const SC = useContext(StateCardContext);

  return (
    <Grid item container justifyContent="space-around" direction="row">
      <Typography variant="h6" align="center">
        {renderCommandPoints(SC.unit.commandStars)}
      </Typography>
      <Typography variant="h6" align="center" className={classes.cardTitle}>
        {SC.unit.unitName}
      </Typography>
      <Typography variant="h6" align="center">
        {renderMagicPoints(SC.unit.magic)}
      </Typography>
    </Grid>
  );
};

export default CardFrontTitle;
