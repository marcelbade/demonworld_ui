// React
import React, { useEffect, useState } from "react";
// Material UI
import { Grid } from "@mui/material";
// components & functions
import CardBack from "./cardComponents/CardBack";
import CardFront from "./cardComponents/CardFront";
import { isObjectEmtpy } from "../../../util/utilityFunctions";

/**
 * Wrapper Element. Allows for vertical or horizontal layout of the cards.
 * @param {String} props A value for the alignment property of the MUI grid element.
 * @returns jsx
 */
const StatCard = (props) => {
  const CSS = {
    width: "32em",
    marginTop: "2em",
    border: "1px black solid",
    marginLeft: "0.75em",
    marginRight: "0.75em",
  };

  const [data, setData] = useState(props.unit);

  useEffect(() => {
    setData(props.unit);
  }, [props.unit]);

  return data === undefined || isObjectEmtpy(data) ? null : (
    <Grid container direction="column">
      <Grid
        item //
        sx={CSS}
      >
        <CardFront unit={data} />
      </Grid>
      <Grid
        item //
        sx={CSS}
      >
        <CardBack unit={data} />
      </Grid>
    </Grid>
  );
};

export default StatCard;
