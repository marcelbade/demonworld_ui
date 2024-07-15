// React
import React, { useContext } from "react";
// Material UI
import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import { StateCardContext } from "../../../../../contexts/statCardContext";
import { CARD_TEXT } from "../../../../../constants/textsAndMessages";
//  components and functions
import { numberOfElements } from "../../../../../util/utilityFunctions";

const CardBackUpperBlackStripe = () => {
  const SC = useContext(StateCardContext);
  const theme = useTheme();

  const LEADER = SC.unit.leader ? `${CARD_TEXT.LEADER} ` : null;
  const STANDARD_BEARER = SC.unit.standardBearer ? `/ ${CARD_TEXT.STANDARD_BEARER}` : null;
  const MUSICIAN = SC.unit.musician ? `/ ${CARD_TEXT.MUSICIAN}` : null;

  return (
    <Grid
      container //
      direction="row"
      sx={theme.palette.statCards.blackStripe}
      justifyContent="space-around"
    >
      <Typography variant="h6">
        {LEADER}
        {STANDARD_BEARER}
        {MUSICIAN}
      </Typography>
      <Typography variant="h6"> {numberOfElements(SC.unit)} </Typography>
    </Grid>
  );
};

export default CardBackUpperBlackStripe;
