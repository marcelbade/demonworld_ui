// React
import React from "react";
import {  Grid2 as Grid, Typography } from "@mui/material";
// components and functions
import ContextHelpButton from "../../../../../shared/ContextHelpButton";
// constants
import { PUSH_MESSAGE_TYPES } from "../../../../../../constants/textsAndMessages";
import { useTheme } from "@emotion/react";

const ArmyListSubFactionHeader = (props) => {
  const theme = useTheme();

  const STYLES = { width: "60%", borderBottom: "solid 4px black", marginBottom: "1em", fontSize: "20px" };

  const TITLE = props.subFaction;

  return (
    <Grid
      container //
      direction="row"
      alignItems="center"
    >
      <Typography
        key={props.subFaction} //
        variant="subtitle1"
        sx={props.valid ? STYLES : { ...STYLES, color: theme.palette.errorColor }}
      >
        {TITLE}
        {props.valid ? null : (
          <ContextHelpButton
            message={props.message} //
            type={PUSH_MESSAGE_TYPES.ERROR}
          />
        )}
      </Typography>
    </Grid>
  );
};

export default ArmyListSubFactionHeader;
