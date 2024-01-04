// React
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
//Material UI
import { Fade, Grid } from "@mui/material";
import {makeStyles} from "@mui/styles"
// notistack
import { SnackbarProvider } from "notistack";
// components and functions
import LossCalcProvider from "../../contexts/LossCalculatorContext";
import CreateListScreen from "./CreateListScreen";
import LostPointDisplay from "./LostPointDisplay";
import ReturnButton from "./ReturnButton";
import LostUnitList from "./LostUnitList/LostUnitList";
import customStyledErrorMessage from "../../AppTheme/notiStackTheme";
import CustomIcon from "../shared/statCards/CustomIcon";
// icons
import SpellBookIcon from "../../assets/icons/spellbook-white.png";

const useStyles = makeStyles({
  pushMessages: {
    marginRight: "2em",
    marginBottom: "2em",
  },
});

const LossCalculator = () => {
  const history = useHistory();
  const location = useLocation();

  const classes = useStyles();

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
    const sum = calculatePointLoss();
    setTotalPointsLost(sum);

    // mark destroyed units
    let tempArray = [...list];
    tempArray.forEach((u) => setUnitDestroyedFlag(u));
  };

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
    <SnackbarProvider
      Components={{
        error: customStyledErrorMessage,
      }}
      preventDuplicate
      maxSnack={3}
      TransitionComponent={Fade}
      iconVariant={{
        error: (
          <CustomIcon
            className={classes.pushMessageIcon} //
            icon={SpellBookIcon}
            altText={"Regelbuchtext"}
            height={35}
            width={35}
          />
        ),
      }}
    >
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
            <Grid item xs={1}>
              <ReturnButton navigateToPage={navigateToPage} />
            </Grid>
            <Grid container xs={7} item direction="column">
              <LostUnitList list={list} />
            </Grid>
            <Grid item xs={4} alignItems="center" justifyContent="flex-start" alignSelf="center">
              <LostPointDisplay totalPointsLost={totalPointsLost} />
            </Grid>
          </Grid>
        ) : (
          <CreateListScreen navigateToPage={navigateToPage} />
        )}
      </LossCalcProvider>
    </SnackbarProvider>
  );
};

export default LossCalculator;
