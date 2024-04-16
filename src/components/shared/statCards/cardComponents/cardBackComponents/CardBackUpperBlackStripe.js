// React
import React, { useContext } from "react";
// Material UI
import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import { StateCardContext } from "../../../../../contexts/statCardContext";
import { CARD_PREVIEW } from "../../../../../constants/textsAndMessages";

const CardBackUpperBlackStripe = () => {
  const SC = useContext(StateCardContext);
  const theme = useTheme();

  const displayUnitElements = () => {
    let specialElements = 0;
    if (SC.unit.leader) {
      ++specialElements;
    }
    if (SC.unit.standardBearer) {
      ++specialElements;
    }
    if (SC.unit.musician) {
      ++specialElements;
    }

    return SC.unit.numberOfElements - specialElements;
  };

  const elements = `${displayUnitElements()} ${CARD_PREVIEW.ELEMENTS}`;
  const singleElement = `1 ${CARD_PREVIEW.SINGLE_ELEMENT}`;
  const specialFigures =
    `${SC.unit.leader ? CARD_PREVIEW.LEADER : ""}` +
    `${SC.unit.standardBearer ? ` / ${CARD_PREVIEW.STANDARD_BEARER}` : ""}` +
    `${SC.unit.musician ? ` / ${CARD_PREVIEW.MUSICIAN}` : ""}`;

  return (
    <Grid
      container //
      direction="row"
      sx={theme.palette.statCards.blackStripe}
      justifyContent="space-around"
    >
      {SC.unit.numberOfElements !== 1 ? <Typography variant="h6">{specialFigures}</Typography> : null}

      <Typography variant="h6">{SC.unit.numberOfElements !== 1 ? elements : singleElement}</Typography>
    </Grid>
  );
};

export default CardBackUpperBlackStripe;
