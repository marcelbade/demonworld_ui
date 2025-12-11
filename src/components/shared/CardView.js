// React
import { Fragment, useState } from "react";
// material ui
import { Grid2 as Grid } from "@mui/material";
// components and functions
import StatCard from "../../htmlCardGenerator/StatCard";
import CarousellButton from "./CarousellButton";
import useCarouselButtons from "../../customHooks/UseCarouselButtons";

const CardView = (props) => {
  const [localDisplayCard, setLocalDisplayCard] = useState({});

  const carousel = useCarouselButtons(props.unit, setLocalDisplayCard, props.carouselCards);

  return (
    <Fragment>
      <Grid
        container //
        direction="row"
        alignItems="center"
        justifyContent="center"
        alignContent="center"
        sx={{
          width: "100%" ,// { xs: "5em", sm: "10em", md: "20em" },
          backgroundColor: "red", //
        }}
      >
        <CarousellButton
          display={props.isMultiStateCard} //
          action={carousel.carouselBackward}
          side={"left"}
        />

        <StatCard unit={localDisplayCard} />

        <CarousellButton
          display={props.isMultiStateCard} //
          action={carousel.carouselForward}
          side={"right"}
        />
      </Grid>
    </Fragment>
  );
};

export default CardView;
