// React
import React from "react";
// Material UI
import { Grid } from "@mui/material";
import { useTheme } from "@material-ui/core";
// components & functions
import CardBack from "./cardComponents/CardBack";
import CardFront from "./cardComponents/CardFront";
import StatCardProvider from "../../../contexts/statCardContext";
import { isSingleElementCard } from "../../../util/utilityFunctions";

/**
 * Wrapper Element. Allows for vertical or horizontal layout of the cards.
 * @param {String} props A value for the alignment property of the MUI grid element.
 * @returns jsx
 */
const StatCard = (props) => {
  const theme = useTheme();

  return (
    <StatCardProvider
      value={{
        isSingleElement: isSingleElementCard(props.unit),
        unit: props.unit,
      }}
    >
      <Grid sx={{ backgroundColor: theme.palette.statCardBackGround }} container direction={props.alignment}>
        <Grid
          item //
          sx={{
            width: "30em",
            marginTop: "2em",
            backgroundColor: (theme) => theme.palette.statCardBackGround,
            border: "1px black solid",
            marginLeft: "0.75em",
            marginRight: "0.75em",
          }}
        >
          <CardFront />
        </Grid>
        <Grid
          item //
        >
          <CardBack />
        </Grid>
      </Grid>
    </StatCardProvider>
  );
};

export default StatCard;
