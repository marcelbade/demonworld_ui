// React
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Material UI
import { Box, Grid2 as Grid } from "@mui/material";
// components and functions
import CreateListScreen from "./CreateListScreen";
import LostPointDisplay from "./LostPointDisplay";
import LostUnitList from "./LostUnitList/LostUnitList";
import usePointCostCalculator from "../../customHooks/UsePointCostCalculator";
import CollapsableTopMenuDrawer from "../shared/CollapsableTopMenuDrawer";
import TopDrawerButton from "../shared/TopDrawerButton";
// context
import { LossCalcContext } from "../../contexts/LossCalculatorContext";

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
      size={12} //
      justifyContent="flex-start"
      alignContent="start"
      width="100vw"
      height="100vh"
    >
      <Grid
        container //
        direction="column"
        justifyItems="start"
        alignItems="center"
        size={12}
      >
        <CollapsableTopMenuDrawer
          displayPageTitle={true}
          title={""} //
          displayNaviBttn={true}
          displayListBttns={true}
        />
        <TopDrawerButton />
      </Grid>
      <Grid
        container //
        size={12}
        sx={{
          marginTop: "3em",
        }}
      >
        <LostUnitList list={LC.list} />
      </Grid>
      {/* -- outside the layout! -- */}
      <Box
        sx={{
          position: "fixed",
          top: "15em",
          right: "10em",
        }}
      >
        <LostPointDisplay totalPointsLost={LC.totalPointsLost} />
      </Box>
    </Grid>
  ) : (
    <CreateListScreen />
  );
};

export default LossCalculator;
