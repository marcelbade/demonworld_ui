// material ui
import { Grid, Typography } from "@mui/material";
// custom components and functions

//  icons
import CarousellButton from "../shared/CarousellButton";
import useCarouselButtons from "../../customHooks/UseCarouselButtons";

const SpellNameAndSelectors = (props) => {
  const carousel = useCarouselButtons(props.selectedSpell, props.setSelectedSpell, props.displaySpells);

  const DISPLAYED_PROPERTY = "spellName";

  return props.display ? (
    <Grid
      container
      sx={{
        direction: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom: "2em",
        color: "red",
      }}
    >
      <CarousellButton
        display={true} //
        action={carousel.carouselBackward}
        side={"left"}
      />
      <Grid  size={3} >
        <Typography
          variant="h5" //
          align="center"
          width={{ xs: "60%", sm: "20%", md: "30%" }}
          sx={{
            wordWrap: "break-word",
          }}
        >
          {carousel.currentDisplayedData[DISPLAYED_PROPERTY]}
        </Typography>
      </Grid>
      <CarousellButton
        display={true} //
        action={carousel.carouselForward}
        side={"right"}
      />
    </Grid>
  ) : null;
};

export default SpellNameAndSelectors;
