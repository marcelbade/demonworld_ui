// React
import { useState } from "react";
// material ui
import { Grid } from "@mui/material";
// components and functions
import StatCard from "../../htmlCardGenerator/StatCard";
import CarousellButton from "./CarousellButton";
import useCarouselButtons from "../../customHooks/UseCarouselButtons";

const CardView = (props) => {
  const [localDisplayCard, setLocalDisplayCard] = useState({});

  const carousel = useCarouselButtons(props.unit, setLocalDisplayCard, props.carouselCards);

  return (
    <Grid
      container //
      direction="row"
      sx={{
        justifyContent: "center",
        width: "100%",
      }}
    >
      <CarousellButton
        display={props.isMultiStateCard} //
        action={carousel.carouselBackward}
        side={"left"}
      />

      <StatCard
        unit={localDisplayCard} //
        width_xs={"5em"}
        width_lg={"35em"}
      />

      <CarousellButton
        display={props.isMultiStateCard} //
        action={carousel.carouselForward}
        side={"right"}
      />
    </Grid>
  );
};

export default CardView;
