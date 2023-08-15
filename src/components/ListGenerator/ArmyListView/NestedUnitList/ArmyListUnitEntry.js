// React
import React, { Fragment, useContext } from "react";
// Material UI
import { makeStyles, ListItemText } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { uuidGenerator } from "../../../shared/sharedFunctions";

const useStyles = makeStyles({
  text: {
    width: "40%",
  },
  pointsAndSecondSubFaction: {
    display: "flex",
    flexDirection: "column",
  },
});

const ArmyListUnitEntry = (props) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  /**
   * Function displays the secondSubFaction property, if it differs from the subfaction property
   * @returns an html element with the secondSubFaction property or null.
   */
  const showSecondSubFaction = () => {
    return props.unit.subFaction !== props.unit.secondSubFaction ? <span>{props.unit.secondSubFaction} </span> : null;
  };

  const secondSubFactionIsSelected = () => {
    const result =  contextArmy.listValidationResults.filter((r) => r.unitWithOutSecondSubFaction === props.unit.unitName);

    // return result.length!==0?:
  };

  return (
    <Fragment>
      <ListItemText
        key={uuidGenerator()}
        primary={<span className={classes.text}>{props.unit.unitName}</span>}
        secondary={
          <span className={classes.pointsAndSecondSubFaction}>
            {showSecondSubFaction()}
            <span className={classes.text}>{props.unit.points}</span>
          </span>
        }
      />
    </Fragment>
  );
};

export default ArmyListUnitEntry;
