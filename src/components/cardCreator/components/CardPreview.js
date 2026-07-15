// react
import { useContext } from "react";
// material ui
import { Grid } from "@mui/material";
// providers and contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
import StatCard from "../../../htmlCardGenerator/StatCard";

const CardPreview = () => {
  const CCC = useContext(CardCreationContext);

  return (
    <Grid
      container //
      direction="row"
      sx={{
        justifyContent: "center",
        width: "100%",
      }}
    >
      <StatCard unit={CCC.unit} width_xs={"55em"} width_lg={"55em"} />
    </Grid>
  );
};

export default CardPreview;
