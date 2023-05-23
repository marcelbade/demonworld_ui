// React
import React, { useContext } from "react";
// Material UI
import { Typography, ListItemText, makeStyles,ListItem } from "@material-ui/core";

// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
// clsx
import { Fragment } from "react";

const useStyles = makeStyles({
  font: {
    fontFamily: "NotMaryKate",
  },
});

const SubListStats = (props) => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  const calculateCurrentPercentage = () => {
    return Math.round((props.subFactionTotal / contextArmy.maxPointsValue) * 100);
  };

  const displayPoints = () => {
    return props.subFactionTotal === 0 ? null : `Gesamt: ${props.subFactionTotal} Punkte`;
  };

  const displayPercents = () => {
    return calculateCurrentPercentage() === 0 ? null : `Prozent ${calculateCurrentPercentage()} %`;
  };

  return (
    <ListItem>
      <ListItemText
        className={classes.text}
        primary={
          <Fragment>
            <Typography className={classes.font}>{displayPoints()}</Typography>
            <Typography className={classes.font}>{displayPercents()}</Typography>
          </Fragment>
        }
        secondary={
          <Fragment>
            <Typography className={classes.font}>{`Minimum: ${props.percentages.min} %`}</Typography>
            <Typography className={classes.font}> {`Maximum ${props.percentages.max} %`}</Typography>
          </Fragment>
        }
      />
    </ListItem>
  );
};

export default SubListStats;
