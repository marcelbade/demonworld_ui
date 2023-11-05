// React
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
//Material UI
import { Grid } from "@mui/material";
// icons
// components and functions
import LossCalcProvider from "../../contexts/LossCalculatorContext";
import CreateListScreen from "./CreateListScreen";
import LostPointDisplay from "./LostPointDisplay";
import ReturnButton from "./ReturnButton";
import LostUnitList from "./LostUnitList/LostUnitList";

const LossCalculator = () => {
  const history = useHistory();
  const location = useLocation();

  //state
  const [list, setList] = useState([]);
  const [totalPointsLost, setTotalPointsLost] = useState(0);

  // Initializes the state by pulling the list from the history object. If none is present, an alternative UI is displayed
  useEffect(() => {
    if (location.state !== undefined && location.state.selectedArmy !== undefined && location.state.selectedArmy.length !== 0) {
      setList(location.state.selectedArmy);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Calculate current total point loss.
  useEffect(() => {
    const sum = calculatePointLoss();
    setTotalPointsLost(sum);

    // mark destroyed units
    let tempArray = [...list];
    tempArray.forEach((u) => setUnitDestroyedFlag(u));
  }, [list]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function calculates the net point loss. Loss is calculated as total point cost per lost element plus the cost of every lost item carried by a single lost element.
   * @returns the sum of the army points lost.
   */
  const calculatePointLoss = () => {
    let sum = 0;

    list.forEach((u) => {
      const totalUnitCost = calculateTotalUnitCost(u);

      sum += u.lossCounter * (totalUnitCost / u.maxCounter);
      sum += calculatePointsOfLostEquipment(u.equipment);
    });

    return sum;
  };

  /**
   * Function calculates the total point cost of all the unit's items that have been lost. Note that this only factors in items that are carried by single element. Items held by all elements of a unit are added to the unit's point cost.
   * @param {[itemCard]} equipmentList
   * @returns the net point los of all single element items.
   */
  const calculatePointsOfLostEquipment = (equipmentList) => {
    return equipmentList.filter((e) => e.itemLost).reduce((sum, { points }) => sum + points, 0);
  };

  /**
   * Function calculates the total point cost of a unit. Here the total point cost is the unit's point cost plus the cost for every item that is carried by the whole unit, i.e. every element. This is important as the point loss for these items must be per element.
   * @param {unitCard} unit
   * @returns total ppoint cost
   */
  const calculateTotalUnitCost = (unit) => {
    const itemsOnEveryELement = unit.equipment.filter((e) => e.everyElement).reduce((sum, { points }) => sum + points, 0);

    return unit.points + itemsOnEveryELement;
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
    <LossCalcProvider
      value={{
        list: list,
        setList: setList,
        setItemIsLostFlag: setItemIsLostFlag,
        isHeroMageOrGiantElement: isHeroMageOrGiantElement,
      }}
    >
      {list.length !== 0 ? (
        <Grid container direction="row">
          <Grid container item xs={6} direction="column">
            <Grid item>
              <ReturnButton navigateToPage={navigateToPage} />
            </Grid>
            <Grid container item alignItems>
              <LostUnitList list={list} />
            </Grid>
          </Grid>
          <LostPointDisplay totalPointsLost={totalPointsLost} />
        </Grid>
      ) : (
        <CreateListScreen navigateToPage={navigateToPage} />
      )}
    </LossCalcProvider>
  );
};

export default LossCalculator;
