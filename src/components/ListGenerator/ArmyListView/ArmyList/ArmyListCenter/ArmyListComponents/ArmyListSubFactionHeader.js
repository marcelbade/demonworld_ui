// React
import React from "react";
import { Grid, Typography } from "@mui/material";
// components and functions
import ContextHelpButton from "../../../../../shared/ContextHelpButton";
// constants
import { PUSH_MESSAGE_TYPES } from "../../../../../../constants/textsAndMessages";

const ArmyListSubFactionHeader = (props) => {
 
  return (
    <Grid container>
      {props.valid ? (
        <Typography
          key={props.subFaction} //
          variant="subtitle1"
          sx={{ width: "60%", borderBottom: "solid 4px black", marginBottom: "1em" }}
        >
          {props.subFaction}
        </Typography>
      ) : (
        <Grid
          container //
          direction="row"
          sx={{ width: "60%", borderBottom: "solid 4px black", marginBottom: "1em", color: "red" }}
          alignItems="center"
        >
          <Typography
            key={props.subFaction} //
            sx={{ fontSize: "20px", fontWeight: "bold" }}
            variant="subtitle1"
          >
            {props.subFaction}
          </Typography>
          <ContextHelpButton
            message={props.message} //
            type={PUSH_MESSAGE_TYPES.ERROR}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default ArmyListSubFactionHeader;
