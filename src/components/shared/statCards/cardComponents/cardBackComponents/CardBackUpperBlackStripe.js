// React
import React, { useContext } from "react";
// Material UI
import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import { StateCardContext } from "../../../../../contexts/statCardContext";
import { CARD_PREVIEW } from "../../../../../constants/textsAndMessages";
//  components and functions
import { numberOfElements } from "../../../../../util/utilityFunctions";

const CardBackUpperBlackStripe = () => {
  const SC = useContext(StateCardContext);
  const theme = useTheme();

  const LEADER = SC.unit.leader ? `${CARD_PREVIEW.LEADER} ` : null;
  const STANDARD_BEARER = SC.unit.standardBearer ? `/ ${CARD_PREVIEW.STANDARD_BEARER}` : null;
  const MUSICIAN = SC.unit.musician ? `/ ${CARD_PREVIEW.MUSICIAN}` : null;

  return (
    <Grid
      container //
      direction="row"
      sx={theme.palette.statCards.blackStripe}
      justifyContent="center"
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
