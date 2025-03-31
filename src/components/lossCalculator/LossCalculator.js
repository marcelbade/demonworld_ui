// React
import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
//Material UI
import { Grid2 as Grid } from "@mui/material";
// components and functions
import CreateListScreen from "./CreateListScreen";
import LostPointDisplay from "./LostPointDisplay";
import LostUnitList from "./LostUnitList/LostUnitList";
import usePointCostCalculator from "../../customHooks/UsePointCostCalculator";
// context
import { LossCalcContext } from "../../contexts/LossCalculatorContext";
// icons
import AppBar from "../shared/AppBar";
import AppBarToggle from "../shared/AppBarToggle";
import { ID } from "../../constants/appBarConstants";

const LossCalculator = () => {
  const location = useLocation();
  const calculator = usePointCostCalculator();

  const LC = useContext(LossCalcContext);

  // Initializes the state by pulling the list from the history object. If none is present, an alternative UI is displayed
  useEffect(() => {
    if (
      location.state === undefined && //
      location.state.selectedArmy === undefined &&
      location.state.selectedArmy.length === 0
    ) {
      return;
    }

    LC.setList(location.state.selectedArmy);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    calculateCurrentTotalPointLoss();
  }, [LC.list]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function calculates current total point loss.
   */
  const calculateCurrentTotalPointLoss = () => {
    const sum = calculator.calculateTotalArmyPointLoss(LC.list);
    LC.setTotalPointsLost(sum);

    // mark destroyed units
    let tempArray = [...LC.list];
    tempArray.forEach((u) => setUnitDestroyedFlag(u));
  };

  /**
   * Function sets the unitDestroyed flag for a unit card object.
   * @param {unitCard obj} u
   * @returns unitCard obj
   */
  const setUnitDestroyedFlag = (u) => {
    u.unitDestroyed = u.lossCounter === u.maxCounter;
    return u;
  };

  return LC.list.length !== 0 ? (
    <Grid
      container
      direction="row" //
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid
        sx={{
          position: "fixed",
        }}
      >
        <AppBarToggle
          iconSize="25em" //
          bttnSize="2em"
          margin="0.5em"
        />
        <AppBar hiddenElements={[ID.COMPENDIMUM_DROPDOWN, ID.LIST_DISPLAY]} />
      </Grid>
      <Grid
        container //
        size={10}
        direction="column"
        sx={{
          marginLeft: "5em",
          marginTop: "5em",
        }}
      >
        <LostUnitList list={LC.list} />
      </Grid>
      <Grid
        sx={{
          marginTop: "4em", //
          marginLeft: "4em", //
          position: "fixed",
          top: "10%",
          left: "60%",
        }}
      >
        <LostPointDisplay totalPointsLost={LC.totalPointsLost} />
      </Grid>
      <Grid
        container //
        size={7}
        justifyContent="flex-end"
        alignItems="center"
        sx={{
          marginTop: "2em", //
          paddingRight: "1em",
        }}
      ></Grid>
    </Grid>
  ) : (
    <CreateListScreen />
  );
};

export default LossCalculator;
