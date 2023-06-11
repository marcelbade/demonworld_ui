// React
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// Axios
import axios from "axios";
// Material UI
import { Drawer, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Stack } from "@mui/material";
// icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// components and functions
import ArmyProvider from "../../contexts/armyContext";
import SelectionInput from "../shared/selectionInput";
import FactionTreeView from "./ArmySelectorView/treeView";
import ArmyListDisplay from "./ArmyListView/ArmyListDisplay";
import ItemShop from "./ItemShop/ItemShop";
import { ruleValidation } from "../../gameLogic/useRuleValidation";
import { calculateTotalUnitPointCost, isObjectEmtpy, unitOrCmdCard } from "../shared/sharedFunctions";
import AlternativeArmyListSelector from "./ArmySelectorView/AlternativeArmyListSelection/AlternativeArmyListSelector";
import OptionButtons from "./OptionButtons/OptionButtons";
import { enrichUnitCardObject } from "./ListGeneratorFunctions";
// constants
import { ARMIES_WITH_ALTERNATIVE_LISTS } from "../../constants/factions";
import { ALLIES_MAPPING } from "../../constants/allies";
import { ALL_FACTIONS_ARRAY } from "../../constants/factions";

const useStyles = makeStyles((theme) => ({
  displayBox: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("md")]: {
      display: "block",
      flexDirection: "column",
    },
  },
  armySelectionBox: {
    [theme.breakpoints.up("md")]: {
      paddingTop: "2em",
      paddingLeft: "4em",
    },

    [theme.breakpoints.down("md")]: {},
  },
  armyListBox: {
    paddingTop: "2em",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      left: "30%",
    },
    [theme.breakpoints.down("md")]: {
      position: "relative",

      left: "10%",
    },
  },
  UnitCardDisplay: {
    position: "fixed",
  },
  BackBttn: {
    [theme.breakpoints.up("md")]: {
      position: "fixed",
      top: "0%",
      left: "1%",
    },
  },
  BackBttnIcon: {
    width: "2em",
    height: "2em",
  },
}));

const ListGeneratorController = () => {
  const classes = useStyles();
  const history = useHistory();

  // front and back side of the displayed unit cards are alligned vertically.
  const COLUMN = "column";
  const NONE = "none";

  // intialize local states
  const [fetchedFactions, setfetchedFactions] = useState([]);
  const [fetchedItems, setfetchedItems] = useState([]);
  const [selectedFactionName, setSelectedFactionName] = useState("");
  const [listOfAllFactionUnits, setListOfAllFactionUnits] = useState([]);
  const [allyName, setAllyName] = useState("");
  const [listOfAllAlliedUnits, setListOfAllAlliedUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  // maximum point allowance
  const [maxPointsAllowance, setMaxPointsAllowance] = useState(2000); //  eslint-disable-line no-unused-vars
  // the current total point value of all selected units
  const [totalPointValue, setTotalPointValue] = useState(0);
  // sub factions of currrently selected army
  const [distinctSubFactions, setDistinctSubFactions] = useState([]);
  // sub factions of ally
  const [distinctAllySubFactions, setDistinctAllySubFactions] = useState([]);
  // validation
  const [listValidationResults, SetListValidationResults] = useState({
    unitsBlockedbyRules: [],
    subFactionBelowMinimum: [],
  });
  // alternative lists
  const [armyHasAlternativeLists, setArmyHasAlternativeLists] = useState(false);
  const [selectedAlternativeList, setSelectedAlternativeList] = useState("");
  // item shop
  const [itemShopState, setItemShopState] = useState({
    clickedUnit: {},
    lastclickedUnit: {},
    show: false,
  });
  const [unitSelectedForShop, setUnitSelectedForShop] = useState({});
  const [allItems, setAllItems] = useState([]);
  // unit card
  const [statCardState, setStatCardState] = useState({
    clickedUnit: {},
    lastclickedUnit: {},
    show: false,
  });
  // option buttons
  const [showOptionButtons, setShowOptionButtons] = useState(true);
  //pdf viewer
  const [pdfMasterList, setPdfMasterList] = useState([]);

  /**
   * fetch units  from the Back End via REST.
   */
  useEffect(() => {
    fetchFactionData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * fetch items from the Back End via REST.
   */
  useEffect(() => {
    fetchItemData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchFactionData = async () => {
    const result = await axios(`http://localhost:8080/factions`);
    setfetchedFactions(result.data);
  };

  const fetchItemData = async () => {
    const result = await axios(`http://localhost:8080/items`);
    setfetchedItems(result.data);
  };

  /**
   * Sets the selected faction and sends it to the treeview by filtering ALL units down to that faction's units.
   */
  useEffect(() => {
    setListOfAllFactionUnits(fetchedFactions.filter((f) => f.faction.toLowerCase() === selectedFactionName.toLowerCase()));
  }, [selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Find all distinct subfactions in the selected faction and create a set of them.
   */
  useEffect(() => {
    setDistinctSubFactions(findDistinctSubfactions(listOfAllFactionUnits));
  }, [listOfAllFactionUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Close the item shop when a new army is selected.
   */
  useEffect(() => {
    closeItemShop();
  }, [listOfAllFactionUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   *  Clear all selected units from the army list  when a new army is selected.
   */
  useEffect(() => {
    clearList();
  }, [listOfAllFactionUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  // ALLY LOGIC
  /**
   * Find The allied faction, if it exists. If no ally exists, return "none" instead of null.
   */
  useEffect(() => {
    const name = ALLIES_MAPPING[selectedFactionName] ? ALLIES_MAPPING[selectedFactionName] : NONE;
    setAllyName(name);
  }, [listOfAllFactionUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * set the ally name
   */
  useEffect(() => {
    if (allyName) {
      setListOfAllAlliedUnits(fetchedFactions.filter((f) => f.faction.toLowerCase() === allyName.toLowerCase()));
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

  useEffect(() => {
    setArmyHasAlternativeLists(ARMIES_WITH_ALTERNATIVE_LISTS.includes(selectedFactionName));
  }, [selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Calculate the total point value for the army.
   */
  useEffect(() => {
    let pointTotal = 0;
    if (selectedUnits) {
      selectedUnits.forEach((u) => {
        const totalUnitCost = calculateTotalUnitPointCost(u);
        pointTotal += totalUnitCost;
      });
    }

    setTotalPointValue(pointTotal);
  }, [selectedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Validate the current army list everytime a unit is added or the max point allowance changes. Validation works through a validator object.
   */
  useEffect(() => {
    if (selectedFactionName) {
      let validator = ruleValidation(selectedFactionName);
      let result = validator.testSubFactionRules(listOfAllFactionUnits, selectedUnits, maxPointsAllowance);

      collectValidatioResults(result);
    }
  }, [selectedUnits, maxPointsAllowance]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // Open the option button drawer when everything else is closed, else close it.
  useEffect(() => {
    if (!statCardState.show && !itemShopState.show) setShowOptionButtons(true);
    if (statCardState.show || itemShopState.show) setShowOptionButtons(false);
  }, [statCardState, itemShopState]); // eslint-disable-line react-hooks/exhaustive-deps

  // Set master list for pdf viewer
  useEffect(() => {
    let tempArray = [];

    distinctSubFactions.forEach((sF) => {
      tempArray.push({ subFaction: sF, units: filterForSubFaction(sF) });
      setPdfMasterList([...tempArray]);
    });
  }, [distinctSubFactions, selectedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

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
   * Adds the selected units to a central list of units selected by the user and adds 2 things:
   * - a unique Id so the same unit can be selected more than once and all instances can be differentiated
   * - equipment slots so items can be added
   * @param {unitCard object} unit
   */
  const selectUnit = (unit) => {
    setSelectedUnits([...selectedUnits, enrichUnitCardObject(unit)]);
  };

  /**
   * add all invalid units to the block list.
   * @param {*} validationResult
   */
  const collectValidatioResults = (validationResult) => {
    SetListValidationResults({
      ...listValidationResults,
      unitsBlockedbyRules: validationResult.unitsBlockedbyRules,
      subFactionBelowMinimum: validationResult.subFactionBelowMinimum,
      commanderIspresent: validationResult.commanderIsPresent,
    });
  };

  /**
   * Function filters unit card arrays for a sub faction.
   * @param {String} subFaction
   * @returns An array of unit card objects filtered for a a sub faction.
   */
  const filterForSubFaction = (subFaction) => {
    return selectedUnits.filter((u) => u.subFaction === subFaction);
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
   * Function deletes the entire army list and closes the stat card display and item shop, if open.
   */
  const clearList = () => {
    setSelectedUnits([]);
    closeCardDisplay();
    closeItemShop();
  };

  /**
   * Function toggles the unit card view and Item shop view on and off, as well as switches between views for different units. In order to do this, both views are not toggled by a booelan flag, but an object that stores the previously clicked unit.
   * @param {unitCard} u
   */
  const toggleMenuState = (u, isCards) => {
    isCards ? closeItemShop() : closeCardDisplay();

    let stateObj = isCards ? statCardState : itemShopState;
    let stateObjSetter = isCards ? setStatCardState : setItemShopState;

    // first click on page (no card displayed)
    if (stateObj.clickedUnit === undefined) {
      stateObjSetter({ clickedUnit: u, lastclickedUnit: u, show: true });
    }
    // click on same unit again to toggle the card view on
    else if (stateObj.lastclickedUnit.unitName === u.unitName && stateObj.show === true) {
      stateObjSetter({ clickedUnit: u, lastclickedUnit: u, show: false });
    }
    // click on same unit again to toggle the card view off
    else if (stateObj.lastclickedUnit.unitName === u.unitName && stateObj.show === false) {
      stateObjSetter({ clickedUnit: u, lastclickedUnit: u, show: true });
    }
    // click on a different unit to show a different card
    else if (stateObj.lastclickedUnit.unitName !== u.unitName) {
      stateObjSetter({ clickedUnit: u, lastclickedUnit: u, show: true });
    }
  };

  /**
   * in order to work, the state setter needs a unit. Since the card view is toggled off, the first unit in the list is used.
   */
  const closeCardDisplay = () => {
    setStatCardState({ clickedUnit: selectedUnits[0], lastclickedUnit: selectedUnits[0], show: false });
  };

  const closeItemShop = () => {
    setItemShopState({ clickedUnit: selectedUnits[0], lastclickedUnit: selectedUnits[0], show: false });
  };

  /**
   * Function calls history objects to take user back to main menu.
   */
  const backToMainmenu = () => {
    history.push("/");
  };

  return fetchedFactions && fetchedItems ? (
    <ArmyProvider
      value={{
        // ARMY
        selectedFactionName: selectedFactionName,
        subfactions: distinctSubFactions,
        listOfAllFactionUnits: listOfAllFactionUnits,
        armyHasAlternativeLists: armyHasAlternativeLists,
        // ALLY
        allyName: allyName,
        allySubFactions: distinctAllySubFactions,
        listOfAllAlliedUnits: listOfAllAlliedUnits,
        // SELECTED UNIT LIST
        selectedUnits: selectedUnits,
        maxPointsAllowance: maxPointsAllowance,
        totalPointValue: totalPointValue,
        setSelectedUnits: setSelectedUnits,
        setMaxPointsAllowance: setMaxPointsAllowance,
        selectUnit: selectUnit,
        removeUnit: removeUnit,
        removeItem: removeItem,
        clearList: clearList,
        // ARMY LIST VALIDATION
        listValidationResults: listValidationResults,
        // ITEMSHOP
        fetchedItems: fetchedItems,
        allItems: allItems,
        unitSelectedForShop: unitSelectedForShop,
        setUnitSelectedForShop: setUnitSelectedForShop,
        setAllItems: setAllItems,
        // ALTERNATIVE LISTS
        selectedAlternativeList: selectedAlternativeList,
        setSelectedAlternativeList: setSelectedAlternativeList,
        // PDF VIEWER
        pdfMasterList: pdfMasterList,
        // MENU STATES
        toggleMenuState: toggleMenuState,
      }}
    >
      <Grid container className={classes.displayBox}>
        <IconButton
          className={classes.BackBttn}
          onClick={() => {
            backToMainmenu();
          }}
        >
          <ChevronLeftIcon className={classes.BackBttnIcon} />
        </IconButton>

        {/* ARMY SELECTION */}
        <Stack direction={"column"} className={classes.armySelectionBox}>
          <SelectionInput
            className={classes.selector}
            filterFunction={setSelectedFactionName}
            isArmySelector={true}
            options={ALL_FACTIONS_ARRAY}
            label="Wähle Eine Fraktion"
          />
          {armyHasAlternativeLists ? <AlternativeArmyListSelector /> : null}

          <FactionTreeView className={classes.selector} />
        </Stack>
        {/* ARMYLIST */}
        <Grid item container direction="column" justify="flex-end" xs={3} className={classes.armyListBox}>
          <ArmyListDisplay setTotalPointValue={setTotalPointValue} />
        </Grid>
        {/* OPTION BUTTON GROUP */}
        <Drawer anchor={"right"} variant="persistent" open={showOptionButtons} className={classes.optionButtons}>
          <OptionButtons />
        </Drawer>
        {/* ITEMSHOP */}
        <Drawer anchor={"right"} variant="persistent" open={itemShopState.show}>
          <ItemShop />
        </Drawer>
        {/* UNITCARD */}
        <Drawer anchor={"right"} variant="persistent" open={statCardState.show} className={classes.UnitCardDisplay}>
          {!isObjectEmtpy(statCardState.clickedUnit) ? unitOrCmdCard(statCardState.clickedUnit, COLUMN) : <p></p>}
        </Drawer>
      </Grid>
    </ArmyProvider>
  ) : null;
};

export default ListGeneratorController;
