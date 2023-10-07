// React
import React, { Fragment, useContext, useEffect } from "react";
// Material UI
import { makeStyles, ListItemText, Tooltip } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../../../../contexts/armyContext";
import { useState } from "react";
// constants
import { ARMIES_ADDITIONAL_SUBFACTIONS } from "../../../../../../../constants/factions";

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
  const AC = useContext(ArmyContext);

  const [secondSubFactionCheck, setSecondSubFactionCheck] = useState({ isValid: true, message: "" });

  useEffect(() => {
    if (ARMIES_ADDITIONAL_SUBFACTIONS.includes(AC.selectedFactionName)) {
      isSecondSubFactionsValid();
    }
  }, [AC.listValidationResults.secondSubFactionMissing]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function validates that the second subFaction has been selected. Is only called for those armies that require it.
   */
  const isSecondSubFactionsValid = () => {
    AC.listValidationResults.secondSubFactionMissing.forEach((u) => {
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
        key={props.unit.uniqueID}
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
