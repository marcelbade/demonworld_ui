// React
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
// components & functions
import { renderMagicPoints, renderCommandPoints } from "../../../../compendiums/factionTable/depencies/factionTableFunctions";
import { Grid, Typography } from "@mui/material";
import { StateCardContext } from "../../../../../contexts/statCardContext";

const CardFrontTitle = () => {
  const theme = useTheme();
  const SC = useContext(StateCardContext);

  const CARD_TITLE = {
    backgroundColor: theme.palette.statCardBackGround, //
    flexWrap: "nowrap",
    fontWeight: "normal",
    fontSize: "30px",
    color: "red",
  };

  return (
    <Grid
      sx={CARD_TITLE} //
      item
      container
      justifyContent="space-around"
      direction="row"
    >
      <Typography variant="h6" align="center">
        {renderCommandPoints(SC.unit.commandStars)}
      </Typography>
      <Typography variant="h6" align="center" sx={CARD_TITLE}>
        {SC.unit.unitName}
      </Typography>
      <Typography variant="h6" align="center">
        {renderMagicPoints(SC.unit.magic)}
      </Typography>
    </Grid>
  );
};

export default CardFrontTitle;
