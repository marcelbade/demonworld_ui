// React
import React, { useContext } from "react";
//Material UI
import { Button, Grid2 as Grid, ButtonGroup, Typography, IconButton, ThemeProvider, CssBaseline } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// components and functions
import { SecondSubFactionContext } from "../../../../../contexts/secondSubFactionContext";
import { ItemContext } from "../../../../../contexts/itemContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
import { LightSwitchContext } from "../../../../../contexts/lightSwitchContext";
// custon hooks
import useArmyValidation from "../../../../../customHooks/UseArmyValidation";
import useRightSideMenuController from "../../../../../customHooks/useRightSideMenuController";
// theme
import lightTheme from "../../../../../AppTheme/lightTheme";
import darkTheme from "../../../../../AppTheme/darkTheme";

const SecondSubFactionMenu = () => {
  const IC = useContext(ItemContext);
  const SEC = useContext(SelectionContext);
  const SFC = useContext(SecondSubFactionContext);
  const LC = useContext(LightSwitchContext);

  const validation = useArmyValidation();
  const sideMenuController = useRightSideMenuController({}, "", {});

  /**
   * Function takes the selected unit from the list, sets a new value for
   * the secondSubfaction property and replaces the old version of the unit in the
   * selectedUnits state variable with the new one.
   * @param {unitCard} unit
   * @param {String} newSecondSubFaction
   */
  const setSecondSubFactionInArmyList = (unit, newSecondSubFaction) => {
    let currentState = [...SEC.selectedUnits];

    const unitRemoved = currentState.filter((u) => !(u.unitName === unit.unitName && u.uniqueID === unit.uniqueID));
    unit.secondSubFaction = newSecondSubFaction;

    SEC.setSelectedUnits([...unitRemoved, unit]);
  };

  return (
    <ThemeProvider theme={LC.darkModeOff ? lightTheme : darkTheme}>
      <CssBaseline />
      <Grid
        container
        direction="column"
        sx={{
          height: "100vh",
          width: "30vw",
        }}
      >
        <Grid item>
          <IconButton
            onClick={() => {
              sideMenuController.closeSecondSubFactionMenu();
            }}
            size="large"
          >
            <CancelIcon />
          </IconButton>
        </Grid>
        <Grid //
          container
          direction="row"
          justifyContent="center"
        >
          <Grid xs={9}>
            <Typography
              variant="h5" //
              align="center"
              sx={{ borderBottom: "solid 4px black", marginBottom: "1em" }}
            >
              {IC.unitSelectedForShop.unitName}
            </Typography>
          </Grid>
        </Grid>
        <Grid //
          container
          direction="row"
          justifyContent="center"
        >
          <ButtonGroup size="large" orientation="vertical">
            {SFC.secondSubFactionList.map((ssf, i) => {
              return ssf === IC.unitSelectedForShop.secondSubFaction ? (
                <Button
                  disabled={true} //
                  variant="text"
                  key={i}
                >
                  {ssf}
                </Button>
              ) : (
                <Button
                  variant="text"
                  key={ssf}
                  onClick={() => {
                    setSecondSubFactionInArmyList(IC.unitSelectedForShop, ssf);
                    // immediately re-evaluate list so the unit is shown correctly
                    validation.validateList(
                      SEC.selectedUnits, //
                      SEC.maxPointsAllowance
                    );
                  }}
                >
                  {ssf}
                </Button>
              );
            })}
          </ButtonGroup>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SecondSubFactionMenu;
