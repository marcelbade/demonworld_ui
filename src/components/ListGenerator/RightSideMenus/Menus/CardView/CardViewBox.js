// React
import { useContext } from "react";
import { Grid2 as Grid, IconButton, ThemeProvider, CssBaseline } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// components and functions
import CardView from "../../../../shared/CardView";
// context
import { RightMenuContext } from "../../../../../contexts/rightMenuContext";
import { LightSwitchContext } from "../../../../../contexts/lightSwitchContext";
import { ArmyContext } from "../../../../../contexts/armyContext";
// custom hooks
import useRightSideMenuController from "../../../../../customHooks/UseRightSideMenuController";
// theme
import lightTheme from "../../../../../AppTheme/lightTheme";
import darkTheme from "../../../../../AppTheme/darkTheme";

const CardViewBox = () => {
  const RC = useContext(RightMenuContext);
  const LC = useContext(LightSwitchContext);
  const AC = useContext(ArmyContext);

  const sideMenuController = useRightSideMenuController({}, "", {});

  const allStateCards = RC.displayedCard.isMultiStateUnit
    ? AC.listOfAllFactionUnits.filter((u) => u.belongsToUnit === RC.displayedCard.unitName)
    : [];

  return (
    <ThemeProvider theme={LC.darkModeOff ? lightTheme : darkTheme}>
      <CssBaseline />
      <Grid
        sx={{
          height: "100vh", //
          width: "100%",
          paddingLeft: "1em",
          paddingRight: "1em",
        }}
      >
        <IconButton
          onClick={() => {
            sideMenuController.closeCardDisplay();
          }}
          size="large"
          sx={{ paddingBottom: "1em" }}
        >
          <CancelIcon fontSize="large" />
        </IconButton>

        {RC.statCardState.clickedUnit !== undefined ? (
          <CardView
            isMultiStateCard={RC.statCardState.clickedUnit?.isMultiStateUnit}
            unit={RC.displayedCard}
            carouselCards={allStateCards}
          />
        ) : null}
      </Grid>
    </ThemeProvider>
  );
};

export default CardViewBox;
