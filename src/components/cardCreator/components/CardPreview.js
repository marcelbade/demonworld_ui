// react
import { useContext } from "react";
// material ui
import { Grid, Typography } from "@mui/material";
// providers and contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
import StatCard from "../../../htmlCardGenerator/StatCard";
// custom hooks
import useCarouselButtons from "../../../customHooks/UseCarouselButtons";
import CarousellButton from "../../shared/CarousellButton";

const CardPreview = () => {
  const CCC = useContext(CardCreationContext);

  const carousel = useCarouselButtons(CCC.unitCards[0], CCC.setDisplayedCard, CCC.unitCards);

  const backward = () => {
    carousel.carouselBackward();
    CCC.setDisplayedElement(carousel.elementNumber);
  };

  const forward = () => {
    carousel.carouselForward();
    CCC.setDisplayedElement(carousel.elementNumber);
  };

  return (
    <Grid
      container
      direction={{ xs: "column" }}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* show original unit name as title */}
      {CCC.unitCards[0].isMultiStateUnit ? <Typography variant="h5">{CCC.unitCards[0].unitName}</Typography> : null}
      <Grid
        container //
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CarousellButton
          display={CCC.unitCards[0].isMultiStateUnit} //
          action={backward}
          side={"left"}
        />
        <StatCard unit={CCC.displayedCard} width_xs={"30em"} width_lg={"45em"} />
        <CarousellButton
          display={CCC.unitCards[0].isMultiStateUnit} //
          action={forward}
          side={"right"}
        />
      </Grid>
    </Grid>
  );
};

export default CardPreview;
