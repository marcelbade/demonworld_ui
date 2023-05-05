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

const useStyles = makeStyles((theme) => ({
  armySelectionBox: {
    backgroundColor: "white",
    [theme.breakpoints.down("lg")]: {
      backgroundColor: "red",
    },
  },
  selector: {
    marginTop: "10em",
    paddingLeft: "10em",
    marginBottom: "60em",
  },
  itemScreen: {},
  UnitCardDisplay: {
    position: "fixed",
  },
}));

const ListGeneratorController = () => {
  const classes = useStyles();
  // front and back side of the displayed unit cards are alligned vertically.
  const COLUMN = "column";
  const NONE = "none";

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
  // ItemShop
  const [unitSelectedForShop, setUnitSelectedForShop] = useState({});
  const [allItems, setAllItems] = useState([]);
  // unit card
  const [showStatCard, setShowStatCard] = useState({
    clickedUnit: {},
    lastclickedUnit: {},
    show: false,
  });

  /**
   * functions opens and closes the item shop.
   * @param {*} unit
   */
  const toggleItemShop = () => {
    setDrawerState(!drawerState);
  };

  /**
   * fetch units  from the Back End via REST.
   */
  useEffect(() => {
    fetchFactionData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchFactionData = async () => {
    const result = await axios(`http://localhost:8080/factions`);
    setfetchedFactions(result.data);
  };

  /**
   * fetch items from the Back End via REST.
   */
  useEffect(() => {
    fetchItemData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchItemData = async () => {
    const result = await axios(`http://localhost:8080/items`);
    setfetchedItems(result.data);
  };

  /**
   * Set the selected faction ans sends it to the treeview
   */
  useEffect(() => {
    setSelectedFaction(fetchedFactions.filter((f) => f.faction.toLowerCase() === selectedFactionName.toLowerCase()));
  }, [selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Find all distinct subfactions in the selected faction and create a set of them.
   */
  useEffect(() => {
    setDistinctSubFactions(findDistinctSubfactions(selectedFaction));
  }, [selectedFaction]); // eslint-disable-line react-hooks/exhaustive-deps

  // ALLY LOGIC
  /**
   * Find The allied faction, if it exists. If no ally exists, return "none" instead of null.
   */
  useEffect(() => {
    const name = alliesMapping[selectedFactionName] ? alliesMapping[selectedFactionName] : NONE;
    setAllyName(name);
  }, [selectedFaction]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * set the ally name
   */
  useEffect(() => {
    if (allyName) {
      setMappedAlly(fetchedFactions.filter((f) => f.faction.toLowerCase() === allyName.toLowerCase()));
    }
  }, [allyName]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Find the ally's distinct subfactions in the selected faction and create a set of them.
   */
  useEffect(() => {
    if (allyName) {
      const ally = fetchedFactions.filter((f) => f.faction.toLowerCase() === allyName.toLowerCase());
      setDistinctAllySubFactions(findDistinctSubfactions(ally));
    }
  }, [allyName]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * If the army has an ally, then the allied faction's name is added as an additional subfaction. Otherwise the "none" value is ignored.
   */
  useEffect(() => {
    if (allyName) {
      let temp = distinctSubFactions;

      if (allyName !== NONE) {
        temp.push(allyName);
      }
      setDistinctSubFactions(temp);
    }
  }, [allyName]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function returns all distinct subFactions of a selected faction.
   * @param {[unitCard object]} units
   * @returns [String] name of all distinct subfactions
   */
  const findDistinctSubfactions = (units) => {
    let distinctSubFactions = [];

    units.forEach((f) => {
      if (!distinctSubFactions.includes(f.subFaction)) {
        distinctSubFactions.push(f.subFaction);
      }
    });

    return distinctSubFactions;
  };

  /**
   * Calculate total point value for army.
   */
  useEffect(() => {
    let pointTotal = 0;
    if (selectedUnits) {
      selectedUnits.forEach((u) => (pointTotal += u.points));
    }
    setTotalPointValue(pointTotal);
  }, [selectedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Adds the selected units to a central list of units selected by the user and adds 2 things:
   * - a unique Id so the same unit can be selected more than once and all instances can be differentiated
   * - equipment slots so items can be added
   * @param {unitCard object} unit
   */
  const selectUnit = (unit) => {
    setSelectedUnits([...selectedUnits, addEquipmentSlotsToUnit(addUniqueIdToUnit(unit))]);
  };

  /**
   * Validate the current army list everytime a unit is added. Validation works through a validator object.
   */
  useEffect(() => {
    if (selectedFactionName) {
      let validator = ruleValidation(selectedFactionName);
      let result = validator.testSubFactionRules(selectedFaction, selectedUnits, maxPointsValue);

      collectAllBlockedUnits(result);
    }
  }, [selectedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * add all invalid units to the block list.
   * @param {*} validationResult
   */
  const collectAllBlockedUnits = (validationResult) => {
    setblockedUnits({
      ...blockedUnits,
      unitsBlockedbyRules: validationResult.unitsBlockedbyRules,
      subFactionBelowMinimum: validationResult.subFactionBelowMinimum,
    });
  };

  /**
   * Everytime the unit selections changes, recalculate which items are currently selected and store it in the central item list.
   */
  useEffect(() => {
    let temp = allItems;
    let allCurrentItems = [];

    // current items in the army
    selectedUnits.forEach((unit) => {
      allCurrentItems = [...allCurrentItems, unit.equipment];
    });

    // compare
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

  /**
   * removes a unit from the current list.
   * @param {*} identifier unit.name + unique hash value
   */
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

  /**
   * Funtion deletes the entire army list and closes the stat card display, if open.
   */
  //TODO
  const clearList = () => {
    setSelectedUnits([]);
    // in order to work, this state setter needs a unit. since the card view is toggled off, the first unit in the list is selected.
    setShowStatCard({ clickedUnit: selectedUnits[0], lastclickedUnit: selectedUnits[0], show: false });
  };

  return fetchedFactions && fetchedItems ? (
    <ArmyProvider
      value={{
        // ARMY
        name: selectedFactionName,
        subfactions: distinctSubFactions,
        units: selectedFaction,
        // ALLY
        allyName: allyName,
        allySubFactions: distinctAllySubFactions,
        alliedUnits: mappedAlly,
        // NET POINT VALUES
        maxPointsValue: maxPointsValue,
        totalPointValue: totalPointValue,
        addedUnits: selectedUnits,
        // BUTTON FUNCTIONS
        selectUnit: selectUnit,
        removeUnit: removeUnit,
        removeItem: removeItem,
        // BLOCKED UNITS
        blockedUnits: blockedUnits,
        // ITEMSHOP
        fetchedItems: fetchedItems,
        unitSelectedForShop: unitSelectedForShop,
        allItems: allItems,
        toggleItemShop: toggleItemShop,
        setUnitSelectedForShop: setUnitSelectedForShop,
        setAllItems: setAllItems,
        //  SELECTED UNITS
        selectedUnits: selectedUnits,
        setSelectedUnits: setSelectedUnits,
        // STAT CARD DISPLAY
        showStatCard: showStatCard,
        setShowStatCard: setShowStatCard,
      }}
    >
      <Grid container direction="row">
        <Grid container item xs={3} direction="column" className={classes.armySelectionBox}>
          {/* ARMY SELECTION */}
          <SelectionInput
            className={classes.selector}
            filterFunction={setSelectedFactionName}
            options={ALL_FACTIONS_ARRAY}
            label="Wähle Eine Fraktion"
          />
          <FactionTreeView className={classes.selector} />
        </Grid>
        {/* ARMYLIST */}
        <Grid item xs={5}>
          <ArmyListDisplay setTotalPointValue={setTotalPointValue} clearList={clearList} />
        </Grid>
        {/* RIGHT SIDE */}
        <Grid item xs={3}>
          {/* ITEMSHOP */}
          <Drawer anchor={"right"} variant="persistent" open={drawerState} className={classes.itemScreen}>
            <ItemShop />
          </Drawer>
          {/* UNITCARD */}
          {showStatCard.show ? (
            <Grid item className={classes.UnitCardDisplay}>
              {!isObjectEmtpy(showStatCard.clickedUnit) ? unitOrCmdCard(showStatCard.clickedUnit, COLUMN) : null}
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </ArmyProvider>
  ) : null;
};

export default ListGeneratorController;
