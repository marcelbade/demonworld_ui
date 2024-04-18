// React
import { useContext } from "react";
import { Grid, IconButton, ThemeProvider, CssBaseline } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// components and functions
import { RightMenuContext } from "../../../../../contexts/rightMenuContext";
import CardView from "../../../../shared/CardView";
// theme
import lightTheme from "../../../../../AppTheme/lightTheme";
import darkTheme from "../../../../../AppTheme/darkTheme";
import { LightSwitchContext } from "../../../../../contexts/lightSwitchContext";

const CardViewBox = () => {
  const RC = useContext(RightMenuContext);
  const LC = useContext(LightSwitchContext);

  const COLUMN = "column";

  return (
    <ThemeProvider theme={LC.darkModeOff ? lightTheme : darkTheme}>
      <CssBaseline />
      <Grid
        container //
        direction={COLUMN}
        sx={{ height: "100vh", width: "30vw", padding: "2em" }}
      >
        <Grid item>
          <IconButton
            onClick={() => {
              RC.closeCardDisplay();
            }}
            size="large"
          >
            <CancelIcon />
          </IconButton>
        </Grid>
        <Grid container item>
          {RC.statCardState.clickedUnit !== undefined ? (
            <CardView
              isMultiStateCard={RC.statCardState.clickedUnit?.isMultiStateUnit}
              unit={RC.displayedCard}
              alignment={COLUMN}
              isSingleElement={RC.isSingleElement}
              carouselCards={RC.carouselCards}
            />
          ) : null}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default CardViewBox;
