// React
import React, { Fragment, useContext, useEffect } from "react";
// Material UI
import { makeStyles, ListItemText, Tooltip } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { uuidGenerator } from "../../../shared/sharedFunctions";
import { useState } from "react";

const useStyles = makeStyles({
  text: {
    width: "40%",
  },
  validUnitEntryStyle: {
    width: "40%",
  },
  invalidUnitEntryStyle: {
    color: "red",
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

  const [secondSubFactionCheck, setSecondSubFactionCheck] = useState({ isValid: true, message: "" });

  useEffect(() => {
    isSecondSubFactionsValid();
  }, [contextArmy.listValidationResults.secondSubFactionMissing]); // eslint-disable-line react-hooks/exhaustive-deps

  const isSecondSubFactionsValid = () => {
    contextArmy.listValidationResults.secondSubFactionMissing.forEach((u) => {
      if (u.unitWithOutSecondSubFaction === props.unit.unitName) {
        setSecondSubFactionCheck({
          ...secondSubFactionCheck,
          isValid: false,
          message: u.message,
        });
      }
    });
  };

  /**
   * Function displays the secondSubFaction property, but only if it differs from the subfaction property.
   * @returns an html element with the secondSubFaction property or null.
   */
  const showSecondSubFaction = () => {
    return props.unit.subFaction !== props.unit.secondSubFaction ? <span>{props.unit.secondSubFaction} </span> : null;
  };

  return (
    <Fragment>
      <ListItemText
        key={uuidGenerator()}
        primary={
          secondSubFactionCheck.isValid ? (
            <span className={classes.validUnitEntryStyle}>{props.unit.unitName}</span>
          ) : (
            <Tooltip title={secondSubFactionCheck.message}>
              <span className={classes.invalidUnitEntryStyle}>{props.unit.unitName}</span>
            </Tooltip>
          )
        }
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
