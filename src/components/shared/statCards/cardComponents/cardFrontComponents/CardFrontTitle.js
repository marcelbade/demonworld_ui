// React
import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// components & functions
import { renderMagicPoints, renderCommandPoints } from "../../../../compendiums/factionTable/depencies/factionTableFunctions";
import { Grid, Typography } from "@material-ui/core";
import { StateCardContext } from "../../../../../contexts/statCardContext";
 
const useStyles = makeStyles({
  cardTitle: {
    wordSpacing: "100vw",
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
    <Grid item container justify="space-around" direction="row">
      <Grid item xs={3}>
        <Typography variant="h6" align="center">
          {renderCommandPoints(SC.unit.commandStars)}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6" align="center" className={classes.cardTitle}>
          {SC.unit.unitName}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h6" align="center">
          {renderMagicPoints(SC.unit.magic)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CardFrontTitle;
