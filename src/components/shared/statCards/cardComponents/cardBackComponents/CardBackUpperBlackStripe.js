// React
import React from "react";
// Material UI
import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import { CARD_TEXT } from "../../../../../constants/textsAndMessages";
//  components and functions
import { numberOfElements } from "../../../../../util/utilityFunctions";

const CardBackUpperBlackStripe = (props) => {
  const theme = useTheme();

  const LEADER = props.unit.leader ? `${CARD_TEXT.LEADER} ` : null;
  const STANDARD_BEARER = props.unit.standardBearer ? `/ ${CARD_TEXT.STANDARD_BEARER}` : null;
  const MUSICIAN = props.unit.musician ? `/ ${CARD_TEXT.MUSICIAN}` : null;

  return (
    <Grid
      container //
      direction="row"
      sx={theme.palette.statCards.blackStripe}
      justifyContent="space-around"
    >
      {/* dont render element for giants & heroes so layout stays correct*/}
      {props.unit.numberOfElements > 1 ? (
        <Typography variant="h6">
          {LEADER}
          {STANDARD_BEARER}
          {MUSICIAN}
        </Typography>
      ) : null}
      <Typography variant="h6"> {numberOfElements(props.unit)} </Typography>
    </Grid>
  );
};

export default CardBackUpperBlackStripe;
