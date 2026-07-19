// react
import { useEffect, useState } from "react";
// Material UI
import { Grid } from "@mui/material";
// components & functions
import CardBack from "./cardBack/CardBack";
import CardFront from "./cardFront/CardFront";
import { isObjectEmtpy } from "../util/utilityFunctions";

/**
 * Wrapper Element. Allows for vertical or horizontal layout of the cards.
 * @param {String} props A value for the alignment property of the MUI grid element.
 * @returns jsx
 */
const StatCard = (props) => {
  const CSS = {
    width: { xs: props.width_xs, lg: props.width_lg },
    marginTop: "2em",
    margin: "1em",
    border: "1px black solid",
  };

  const [data, setData] = useState(props.unit);

  useEffect(() => {
    setData(props.unit);
  }, [props.unit]);

  return data === undefined || isObjectEmtpy(data) ? null : (
    <Grid
      container //
      direction={{ xs: "column" }}
      sx={{ alignItems: "stretch" }}
    >
      <Grid sx={CSS}>
        <CardFront unit={data} />
      </Grid>
      <Grid sx={CSS}>
        <CardBack unit={data} />
      </Grid>
    </Grid>
  );
};

export default StatCard;
