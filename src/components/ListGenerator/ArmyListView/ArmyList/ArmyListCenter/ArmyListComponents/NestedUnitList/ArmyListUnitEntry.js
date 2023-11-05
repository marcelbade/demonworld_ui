// React
import React, { Fragment, useContext, useEffect } from "react";
// Material UI
import { ListItemText, Tooltip } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
// components and functions
import { ArmyContext } from "../../../../../../../contexts/armyContext";
import { ValidationContext } from "../../../../../../../contexts/validationContext";
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
  const VC = useContext(ValidationContext);



  // TODO reworkthis into the hook!
  useEffect(() => {
    if (ARMIES_ADDITIONAL_SUBFACTIONS.includes(AC.factionName)) {
      isSecondSubFactionsValid();
    }
  }, [VC.listValidationResults.secondSubFactionMissing]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function validates that the second subFaction has been selected. Is only called for those armies that require it.
   */
  const isSecondSubFactionsValid = () => {
    VC.listValidationResults.secondSubFactionMissing.forEach((u) => {
      if (u.unitWithOutSecondSubFaction === props.unit.unitName) {
        props.unit.secondSubFaction.hasSecondSubFaction = false;
        props.unit.secondSubFaction.errorMessage = u.message;
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
          props.unit.secondSubFaction.hasSecondSubFaction ? (
            <span className={classes.validUnitEntryStyle}>{props.unit.unitName}</span>
          ) : (

            //TODO  title = undefined
            <Tooltip title={props.unit.secondSubFaction.errorMessage}>
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
