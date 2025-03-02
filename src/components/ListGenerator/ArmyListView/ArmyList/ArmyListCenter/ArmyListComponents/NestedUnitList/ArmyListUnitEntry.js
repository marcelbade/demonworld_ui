// React
import React, { Fragment } from "react";
// Material UI
import { Grid2 as Grid, ListItemText, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components and functions
import ContextHelpButton from "../../../../../../shared/ContextHelpButton";
// constants
import { PUSH_MESSAGE_TYPES } from "../../../../../../../constants/textsAndMessages";

const ArmyListUnitEntry = (props) => {
  const theme = useTheme();

  /**
   * Function displays the secondSubFaction property, but only if it differs from the subfaction property.
   * @returns an html element with the secondSubFaction property or null.
   */
  const showSecondSubFaction = () => {
    return props.unit.subFaction !== props.unit.secondSubFaction;
  };

  const UNIT = props.unit.unitName;

  return (
    <Fragment>
      <ListItemText
        key={props.unit.secondSubFaction}
        primary={
          props.isValid ? (
            <Typography variant="button">{UNIT}</Typography>
          ) : (
            <Grid //
              container
              direction="row"
              alignItems="center"
            >
              <Typography
                variant="button"
                sx={{
                  color: theme.palette.errorColor,
                  fontFamily: "jaapokkiRegular",
                }}
              >
                {UNIT}
              </Typography>
              <ContextHelpButton
                message={props.validationMessage} //
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
