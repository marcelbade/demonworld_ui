// React
import React, { Fragment, useContext } from "react";
// Material UI
import { Grid, ListItemText, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components and functions
import { ValidationContext } from "../../../../../../../contexts/validationContext";
import ContextHelpButton from "../../../../../../shared/ContextHelpButton";
// constants
import { PUSH_MESSAGE_TYPES } from "../../../../../../../constants/textsAndMessages";

const ArmyListUnitEntry = (props) => {
  const VC = useContext(ValidationContext);
  const theme = useTheme;

  /**
   * Function validates that the second subFaction has been selected. Is only called for those armies that require it.
   */
  const isSecondSubFactionsValid = () => {
    let result = { isValid: true, message: "" };

    VC.listValidationResults.secondSubFactionMissing.forEach((u) => {
      if (u.unitWithOutSecondSubFaction === props.unit.unitName) {
        result = { isValid: false, message: u.message };
      }
    });

    return result;
  };

  /**
   * Function displays the secondSubFaction property, but only if it differs from the subfaction property.
   * @returns an html element with the secondSubFaction property or null.
   */
  const showSecondSubFaction = () => {
    return props.unit.subFaction !== props.unit.secondSubFaction;
  };

  const testForSecondSubFaction = isSecondSubFactionsValid();

  return (
    <Fragment>
      <ListItemText
        key={props.unit.secondSubFaction}
        primary={
          testForSecondSubFaction.isValid ? (
            <span>{props.unit.unitName}</span>
          ) : (
            <Grid container direction="row" alignItems="center">
              <Typography
                variant="button"
                sx={{
                  color: theme.palette.errorColor,
                  width: "40%",
                  fontFamily: "jaapokkiRegular",
                }}
              >
                {props.unit.unitName}
              </Typography>
              <ContextHelpButton
                message={testForSecondSubFaction.message} //
                type={PUSH_MESSAGE_TYPES.ERROR}
              />
            </Grid>
          )
        }
        secondary={
          <span
            sx={{
              display: "flex",
              flexDirection: "column",
              fontSize: "1.2em",
            }}
          >
            {showSecondSubFaction() ? <span>{props.unit.secondSubFaction} </span> : null}
            <span>{props.unit.points}</span>
          </span>
        }
      />
    </Fragment>
  );
};

export default ArmyListUnitEntry;
