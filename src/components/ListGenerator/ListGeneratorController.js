// React
import React, { useEffect, useState } from "react";
// Axios
import axios from "axios";
// Material UI
import { Drawer, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import ArmyProvider from "../../contexts/armyContext";
import SelectionInput from "../shared/selectionInput";
import FactionTreeView from "./ArmyTreeView/treeView";
import ArmyListDisplay from "./ArmyListView/armyListDisplay";
import ItemShop from "./ItemShop/ItemShop";
import { uuidGenerator } from "../shared/sharedFunctions";
import { alliesMapping } from "../gameLogic/allies";
import { ALL_FACTIONS_ARRAY } from "../../constants/factions";
import { ruleValidation } from "../gameLogic/useRuleValidation";
import { isObjectEmtpy } from "../shared/sharedFunctions";
import { unitOrCmdCard } from "../shared/sharedFunctions";

const useStyles = makeStyles({
  root: {},
  selector: {
    marginTop: "10px",
    paddingLeft: "10px",
    marginBottom: "60px",
  },
  itemScreen: {
    backgroundColor: "yellow",
  },
});

const ListGeneratorController = () => {
  const classes = useStyles();

  // intialize local states
  const [fetchedFactions, setfetchedFactions] = useState([]);
  const [fetchedItems, setfetchedItems] = useState([]);
  const [selectedFactionName, setSelectedFactionName] = useState("");
  const [selectedFaction, setSelectedFaction] = useState([]);
  const [allyName, setAllyName] = useState("");
  const [mappedAlly, setMappedAlly] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [maxPointsValue, setMaxPointsValue] = useState(2000); //  eslint-disable-line no-unused-vars
  //the current total point value of all selected units
  const [totalPointValue, setTotalPointValue] = useState(0);
  const [distinctSubFactions, setDistinctSubFactions] = useState([]);
  const [distinctAllySubFactions, setDistinctAllySubFactions] = useState([]);
  // validation
  const [blockedUnits, setblockedUnits] = useState({
    unitsBlockedbyRules: [],
    subFactionBelowMinimum: [],
  });
  const [drawerState, setDrawerState] = useState(false);
  // ItemShop view
  const [unitSelectedForShop, setUnitSelectedForShop] = useState({});
  const [allItems, setAllItems] = useState([]);
  // unit card view
  const [showStatCard, setShowStatCard] = useState({
    clickedUnit: {},
    lastclickedUnit: {},
    show: false,
  });

  /**
   * functions opens the item shop. Function is called in the <SubList> module.
   * @param {*} unit
   */
  const openItemShop = () => {
    setDrawerState(true);
  };

  const closeItemShop = () => {
    setDrawerState(false);
  };

  useEffect(() => {
    fetchFactionData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchFactionData = async () => {
    const result = await axios(`http://localhost:8080/factions`);
    setfetchedFactions(result.data);
  };

  useEffect(() => {
    fetchItemData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchItemData = async () => {
    const result = await axios(`http://localhost:8080/items`);
    setfetchedItems(result.data);
  };

  // when faction selected from drop down
  useEffect(() => {
    narrowDownToSelectedArmy();
  }, [selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    findSubFactions();
    findAllyName();
    narrowDownToAlly();
    findAlliedSubFactions();
  }, [selectedFaction]); // eslint-disable-line react-hooks/exhaustive-deps

  const narrowDownToSelectedArmy = () => {
    setSelectedFaction(fetchedFactions.filter((f) => f.faction.toLowerCase() === selectedFactionName.toLowerCase()));
  };

  const narrowDownToAlly = () => {
    if (allyName) {
      setMappedAlly(fetchedFactions.filter((f) => f.faction.toLowerCase() === allyName.toLowerCase()));
    }
  };

  // Function finds subfactions for the selected faction.
  const findSubFactions = () => {
    setDistinctSubFactions(findDistinctSubfactions(selectedFaction));
  };

  const findAlliedSubFactions = () => {
    if (allyName) {
      const ally = fetchedFactions.filter((f) => f.faction.toLowerCase() === allyName.toLowerCase());
      setDistinctAllySubFactions(findDistinctSubfactions(ally));
    }
  };

  // Function returns all distinct subFactions of a selected faction.
  const findDistinctSubfactions = (units) => {
    let distinctSubFactions = [];

    units.forEach((f) => {
      if (!distinctSubFactions.includes(f.subFaction)) {
        distinctSubFactions.push(f.subFaction);
      }
    });
    return distinctSubFactions;
  };

  //calculate total point value for army
  useEffect(() => {
    let pointTotal = 0;
    if (selectedUnits) {
      selectedUnits.forEach((u) => (pointTotal += u.points));
    }
    setTotalPointValue(pointTotal);
  }, [selectedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  // returns allied faction, if it exists
  const findAllyName = () => {
    const name = alliesMapping[selectedFactionName] ? alliesMapping[selectedFactionName] : "";
    setAllyName(name);
  };

  const selectUnit = (unit) => {
    setSelectedUnits([...selectedUnits, addEquipmentSlotsToUnit(addUniqueIdToUnit(unit))]);
  };

  useEffect(() => {
    if (selectedFactionName) {
      let validator = ruleValidation(selectedFactionName);
      let result = validator.testSubFactionRules(selectedFaction, selectedUnits, maxPointsValue);

      findInvalidUnits(result);
    }
  }, [selectedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  const findInvalidUnits = (validationResult) => {
    setblockedUnits({
      ...blockedUnits,
      unitsBlockedbyRules: validationResult.unitsBlockedbyRules,
      subFactionBelowMinimum: validationResult.subFactionBelowMinimum,
    });
  };

  /**
   *
   */
  useEffect(() => {
    let temp = allItems;
    let allCurrentItems = [];

    selectedUnits.forEach((unit) => {
      allCurrentItems = [...allCurrentItems, unit.equipment];
    });

    temp.forEach((item) => {
      if (!allCurrentItems.includes(item)) {
        const position = temp.indexOf(item);
        temp.splice(position, 1);
      }
    });

    setAllItems(temp);
  }, [selectedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Functions adds a UUID as unique id so the user can select the
   * same unit twice in a row. Without it, the useEffect does not fire, since the
   * unit objects are identical!
   *
   * @param {} unit
   * @returns {} unit object with a random ID
   */
  const addUniqueIdToUnit = (unit) => {
    const randomID = uuidGenerator();
    return { ...unit, uniqueID: randomID };
  };

  const addEquipmentSlotsToUnit = (unit) => {
    const maxItemNumber = calculateMaxNumberMagicItems(unit);

    return {
      ...unit,
      equipment: [],
      equipmentTypes: {
        poison: false,
        warpaint: false,
        maxMagic: maxItemNumber,
      },
    };
  };

  /**
   * Function calculates how many magical items the unit is allowed to have. +1 per special element.
   * @param {unit card} unit
   */
  const calculateMaxNumberMagicItems = (unit) => {
    let total = 1;

    if (unit.standardBearer) {
      ++total;
    }
    if (unit.musician) {
      ++total;
    }

    return total;
  };

  const removeUnit = (identifier) => {
    let filtered = selectedUnits.filter((u) => u.name + u.uniqueID !== identifier);
    setSelectedUnits(filtered);
  };

  const removeItem = (identifier, position) => {
    let temp = [...selectedUnits];

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].name + temp[i].uniqueID === identifier) {
        temp[i].equipment.splice(position, 1);
      }
    }

    setSelectedUnits(temp);
  };

  const clearList = () => {
    setSelectedUnits([]);
  };

  //TEST

  return fetchedFactions && fetchedItems ? (
    <ArmyProvider
      value={{
        name: selectedFactionName,
        subfactions: distinctSubFactions,
        units: selectedFaction,
        //
        allyName: allyName,
        allySubFactions: distinctAllySubFactions,
        alliedUnits: mappedAlly,
        //
        maxPointsValue: maxPointsValue,
        totalPointValue: totalPointValue,
        addedUnits: selectedUnits,
        //
        selectUnit: selectUnit,
        removeUnit: removeUnit,
        removeItem: removeItem,
        //
        blockedUnits: blockedUnits,
        //
        fetchedItems: fetchedItems,
        unitSelectedForShop: unitSelectedForShop,
        allItems: allItems,
        openItemShop: openItemShop,
        setUnitSelectedForShop: setUnitSelectedForShop,
        closeItemShop: closeItemShop,
        setAllItems: setAllItems,
        //
        selectedUnits: selectedUnits,
        setSelectedUnits: setSelectedUnits,
        //
        showStatCard: showStatCard,
        setShowStatCard: setShowStatCard,
      }}
    >
      <Grid container direction="row">
        <Grid container item xs={4} direction="column" className={classes.root}>
          <SelectionInput
            className={classes.selector}
            filterFunction={setSelectedFactionName}
            options={ALL_FACTIONS_ARRAY}
            label="Suche nach Fraktion"
          />
          <FactionTreeView className={classes.selector} />
        </Grid>
        <u>
          {selectedFaction.forEach((u) => (
            <li>{u.name}</li>
          ))}
        </u>

        <Grid item xs={5}>
          <ArmyListDisplay setTotalPointValue={setTotalPointValue} clearList={clearList} />
        </Grid>
        <Grid item xs={3}>
          <Drawer anchor={"right"} variant="persistent" open={drawerState} className={classes.itemScreen}>
            <ItemShop />
          </Drawer>
          {/* UNITCARD */}
          {showStatCard.show ? (
            <Grid item>{!isObjectEmtpy(showStatCard.clickedUnit) ? unitOrCmdCard(showStatCard.clickedUnit) : null}</Grid>
          ) : null}
        </Grid>
      </Grid>
    </ArmyProvider>
  ) : null;
};

export default ListGeneratorController;
