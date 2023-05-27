// React
import React, { useContext } from "react";
// Material UI
import { ListItemText, makeStyles, List } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { uuidGenerator } from "../../../shared/sharedFunctions";
// clsx

const useStyles = makeStyles({
  listElement: {
    display: "flex",
    flexDirection: "column",
  },
  textBox: {
    gap: "1em",
    display: "flex",
    flexDirection: "row",
  },
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
    return props.subFactionTotal === 0 ? null : `${props.subFactionTotal} Punkte`;
  };

  const displayPercents = () => {
    return calculateCurrentPercentage() === 0 ? null : `Prozent ${calculateCurrentPercentage()} %`;
  };

  return (
    <List>
      <ListItemText className={classes.listElement} key={uuidGenerator()} primary={<span className={classes.font}>Gesamt</span>} />
      <ListItemText
        className={classes.listElement}
        key={uuidGenerator()}
        primary={
          <span className={classes.textBox}>
            <span className={classes.font}>{displayPoints()}</span>
            <span className={classes.font}> {displayPercents()}</span>
          </span>
        }
        secondary={
          <span className={classes.textBox}>
            <span className={classes.font}>{`Minimum: ${props.percentages.min} %`}</span>
            <span className={classes.font}>{`Maximum ${props.percentages.max} %`}</span>
          </span>
        }
      />
    </List>
  );
};

export default SubListStats;
