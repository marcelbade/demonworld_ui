// React
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
//Material UI
import { Grid } from "@mui/material";
// components and functions
import LossCalcProvider from "../../contexts/LossCalculatorContext";
import CreateListScreen from "./CreateListScreen";
import LostPointDisplay from "./LostPointDisplay";
import ReturnButton from "./ReturnButton";
import LostUnitList from "./LostUnitList/LostUnitList";
import LightSwitch from "../shared/LightSwitch";
import usePointCostCalculator from "../../customHooks/UsePointCostCalculator";
// icons
import CustomSnackBarProvider from "../shared/statCards/CustomSnackBarProvider";

const LossCalculator = () => {
  const history = useHistory();
  const location = useLocation();
  const calculator = usePointCostCalculator();

  //state
  const [list, setList] = useState([]);
  const [totalPointsLost, setTotalPointsLost] = useState(0);

  // Initializes the state by pulling the list from the history object. If none is present, an alternative UI is displayed
  useEffect(() => {
    if (location.state !== undefined && location.state.selectedArmy !== undefined && location.state.selectedArmy.length !== 0) {
      setList(location.state.selectedArmy);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    calculateCurrentTotalPointLoss();
  }, [list]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function calculates current total point loss.
   */
  const calculateCurrentTotalPointLoss = () => {
    const sum = calculator.calculateTotalArmyPointLoss(list);
    setTotalPointsLost(sum);

    // mark destroyed units
    let tempArray = [...list];
    tempArray.forEach((u) => setUnitDestroyedFlag(u));
  };

  /**
   * Function determines if a unit has more than 1 hit point, i.e, if it is a hero, giant, mage or a unit with multiple hit points per element.
   * @param {*} unit
   * @returns true if the unit is a hero, mage, giant, or unit with more than 1 HP per element.
   */
  const isHeroMageOrGiantElement = (unit) => {
    return unit.hitpoints > 1;
  };

  /**
   * Function sets the unitDestroyed flag for a unit card object.
   * @param {unitCard obj} u
   * @returns unitCard obj
   */
  const setUnitDestroyedFlag = (u) => {
    if (u.lossCounter === u.maxCounter) {
      u.unitDestroyed = true;
    } else {
      u.unitDestroyed = false;
    }
    return u;
  };

  /**
   * Function sets the value of the itemLost flag for one element (item) in the equipment array.
   * @param {unitCard} selectedUnit
   * @param {String} itemName Name of the item the unit was equipped with.
   * @param {boolean} isLost  flag shows whether the element is lost or not.
   */
  const setItemIsLostFlag = (selectedUnit, itemName, isLost) => {
    let tempArray = [...list];

    let unitIndex = tempArray.findIndex((u) => u.uniqueID === selectedUnit.uniqueID);
    tempArray[unitIndex].equipment.forEach((e) => {
      if (e.name === itemName) {
        e.itemLost = isLost;
      }
    });

    setList([...tempArray]);
  };

  /**
   * Function calls history objects to take user back to main menu.
   */
  const navigateToPage = (destination) => {
    history.push(`/${destination}`);
  };

  return (
    <CustomSnackBarProvider>
      <LossCalcProvider
        value={{
          list: list,
          setList: setList,
          setItemIsLostFlag: setItemIsLostFlag,
          isHeroMageOrGiantElement: isHeroMageOrGiantElement,
        }}
      >
        {list.length !== 0 ? (
          <Grid
            container
            direction="row" //
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid
              item //
              xs={1}
            >
              <ReturnButton navigateToPage={navigateToPage} />
            </Grid>
            <Grid
              container //
              xs={4}
              item
              direction="column"
            >
              <LostUnitList list={list} />
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
              <LostPointDisplay totalPointsLost={totalPointsLost} />
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
            >
              <LightSwitch />
            </Grid>
          </Grid>
        ) : (
          <CreateListScreen navigateToPage={navigateToPage} />
        )}
      </LossCalcProvider>
    </CustomSnackBarProvider>
  );
};

export default LossCalculator;
