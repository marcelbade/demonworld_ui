// React
import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
//Material UI
import { Grid } from "@mui/material";
// components and functions
import CreateListScreen from "./CreateListScreen";
import LostPointDisplay from "./LostPointDisplay";
import LostUnitList from "./LostUnitList/LostUnitList";
import LightSwitch from "../shared/LightSwitch";
import usePointCostCalculator from "../../customHooks/UsePointCostCalculator";
import NaviButton from "../landingPage/NaviButton";
// context
import { LossCalcContext } from "../../contexts/LossCalculatorContext";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

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
        item //
        xs={12}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <NaviButton
          isIconButton={true}
          relativeURL={"/listGenerator"} //
          isCustomIcon={false}
          icon={ChevronLeftIcon}
          altText={""}
          width={"3em"}
          height={"3em"}
        />
        <Grid item sx={{ marginRight: "4em" }}>
          <LightSwitch />
        </Grid>
      </Grid>
      <Grid
        container //
        xs={4}
        item
        direction="column"
      >
        <LostUnitList list={LC.list} />
      </Grid>
      <Grid
        item
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
        item
        xs={7}
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
