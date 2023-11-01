// React
import React, { useContext } from "react";
// Material UI
import { ListItemText, makeStyles, List } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../../../contexts/armyContext";
import useSubFactionStats from "../../../../../../customHooks/UseSubFactionStats";

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
});

const ArmyListSubFactionFooter = (props) => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);
  const stats = useSubFactionStats(
    props.subFactionUnits, //
    props.subFactionName,
    AC.selectedFactionName,
    SEC.maxPointsAllowance
  );

  return (
    <List>
      <ListItemText className={classes.listElement} key={props.subFaction} primary={<span className={classes.font}>Gesamt</span>} />
      <ListItemText
        className={classes.listElement}
        key={props.subFaction}
        primary={
          <span className={classes.textBox}>
            <span>{stats.currentTotal}</span>
            <span> {stats.currentPercent}</span>
          </span>
        }
        secondary={
          <span className={classes.textBox}>
            <span>{`Minimum: ${stats.minPercentage} %`}</span>
            <span>{`Maximum ${stats.maxPercentage} %`}</span>
          </span>
        }
      />
    </List>
  );
};

export default ArmyListSubFactionFooter;
