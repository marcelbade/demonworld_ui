// React
import React from "react";
// Material UI
import { Grid } from "@mui/material";
// components & functions
import CardBack from "./cardComponents/CardBack";
import CardFront from "./cardComponents/CardFront";
import StatCardProvider from "../../../contexts/statCardContext";
import { isHeroOrMage, isSingleElementCard } from "../../../util/utilityFunctions";

/**
 * Wrapper Element. Allows for vertical or horizontal layout of the cards.
 * @param {String} props A value for the alignment property of the MUI grid element.
 * @returns jsx
 */
const StatCard = (props) => {
  const CSS = {
    width: "30em",
    marginTop: "2em",
    border: "1px black solid",
    marginLeft: "0.75em",
    marginRight: "0.75em",
  };

  return (
    <StatCardProvider
      value={{
        isSingleElement: isSingleElementCard(props.unit),
        isHeroOrMage: isHeroOrMage(props.unit),
        unit: props.unit,
      }}
    >
      <Grid container direction="column">
        <Grid
          item //
          sx={CSS}
        >
          <CardFront />
        </Grid>
        <Grid
          item //
          sx={CSS}
        >
          <CardBack />
        </Grid>
      </Grid>
    </StatCardProvider>
  );
};

export default StatCard;
