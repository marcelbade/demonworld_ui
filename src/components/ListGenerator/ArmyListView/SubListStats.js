// React
import React, { useContext } from "react";
// Material UI
import { Typography, Grid, makeStyles } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
// clsx
import clsx from "clsx";

const useStyles = makeStyles({
  typographyFont: {
    fontFamily: "NotMaryKate",
  },
  font: {
    fontFamily: "NotMaryKate",
  },
  textMargin: {
    marginRight: "3em",
  },
  currentPercentage: {
    marginLeft: "1em",
  },
});

const SubListStats = (props) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  const displayCurrentPercentage = () => {
    return Math.round((props.subFactionTotal / contextArmy.maxPointsValue) * 100);
  };

  return (
    <Grid container direction="column">
      <Grid container item xs={4} direction="row">
        <Typography className={classes.font}>{props.subFactionTotal === 0 ? null : `Gesamt: ${props.subFactionTotal} Punkte`}</Typography>
        <Typography className={clsx(classes.font, classes.currentPercentage)}>
          {displayCurrentPercentage() === 0 ? null : `Prozent ${displayCurrentPercentage()} %`}
        </Typography>
      </Grid>
      <Grid container item xs={4} direction="row">
        <Typography className={classes.font}>{`Minimum: ${props.percentages.min} %`}</Typography>
        <Typography className={clsx(classes.font, classes.currentPercentage)}> {`Maximum ${props.percentages.max} %`}</Typography>
      </Grid>
    </Grid>
  );
};

export default SubListStats;
