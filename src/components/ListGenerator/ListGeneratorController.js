// React
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// Axios
import axios from "axios";
// Material UI
import { Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// components and functions
import ArmyProvider from "../../contexts/armyContext";
import SelectionInput from "../shared/selectionInput";
import FactionTreeView from "./ArmySelectorView/SelectorTreeView/TreeView";
import ArmyListDisplay from "./ArmyListView/ArmyListDisplay";
import { enrichUnitCardObject } from "./ListGeneratorFunctions";
import Allies from "./GeneratorComponents/Allies";
import ArmyValidation from "./GeneratorComponents/ArmyValidation";
import Pdf from "./GeneratorComponents/Pdf";
import AlternativeArmyLists from "./GeneratorComponents/AlternativeArmyLists";
// constants
import { ALL_FACTIONS_ARRAY } from "../../constants/factions";
import { ITEM_TYPE_BANNER, ITEM_TYPE_MUSICIAN } from "../../constants/itemShopConstants";
import Menus from "./GeneratorComponents/Menus";
import ArmyList from "./GeneratorComponents/ArmyList";

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
    width: "10em",
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
  BackBttnBox: {
    height: " 3em",
  },

  BackBttn: {
    [theme.breakpoints.up("md")]: {
      position: "fixed",
      top: "0%",
      left: "1%",
    },
  },
  BackBttnIcon: {
    width: "1em",
    height: "1em",
  },
  alternativeListSelector: {
    marginTop: "13em",
  },
}));

const ListGeneratorController = () => {
  const classes = useStyles();
  const history = useHistory();

  // intialize local states
  const [fetchedFactions, setfetchedFactions] = useState([]);
  const [fetchedItems, setfetchedItems] = useState([]);
  // selected faction
  const [selectedFactionName, setSelectedFactionName] = useState("");
  const [listOfAllFactionUnits, setListOfAllFactionUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  // allied faction
  const [allyName, setAllyName] = useState("");
  const [listOfAlliedUnits, setListOfAlliedUnits] = useState([]);
  // maximum point allowance
  const [maxPointsAllowance, setMaxPointsAllowance] = useState(2000);
  // the current total point value of all selected units
  const [totalPointValue, setTotalPointValue] = useState(0);
  // sub factions of currrently selected army
  const [distinctSubFactions, setDistinctSubFactions] = useState([]);
  // sub factions of ally
  const [distinctAllySubFactions, setDistinctAllySubFactions] = useState([]);
  // validation
  const [listValidationResults, setListValidationResults] = useState({
    unitsBlockedbyRules: [],
    subFactionBelowMinimum: [],
    removeUnitsNoLongerValid: [],
    secondSubFactionMissing: [],
  });
  // tournament rules override

  const [tournamentOverrideRules, setTournamentOverrideRules] = useState({
    overrideIsOn: false,
    tournamentHeroValue: 30,
    tournamentNonUniqueMax: 2,
    tournamentUniquesOnylOnce: true,
  });

  // alternative lists
  const [armyHasAlternativeLists, setArmyHasAlternativeLists] = useState(false);
  const [selectedAlternativeList, setSelectedAlternativeList] = useState("NONE");
  // The dwarf faction needs two selections
  const [secondDwarvenOption, setSecondDwarvenOption] = useState("");
  // additional subfactions - currently only important for the Thain army!
  const [hasAdditionalSubFaction, setHasAdditionalSubFaction] = useState(false);
  const [secondSubFactionList, setSecondSubFactionList] = useState(false);
  const [secondSubfactionCaption, setSecondSubfactionCaption] = useState("");
  const [excemptSubFactions, setExcemptSubFactions] = useState("");
  // second SubFaction Menu view
  const [secondSubFactionMenuState, setSecondSubFactionMenuState] = useState({
    clickedUnit: {},
    lastclickedUnit: {},
    show: false,
  });
  // item shop view
  const [itemShopState, setItemShopState] = useState({
    clickedUnit: {},
    lastclickedUnit: {},
    show: false,
  });
  const [unitSelectedForShop, setUnitSelectedForShop] = useState({});
  const [allItems, setAllItems] = useState([]);
  // unit card view
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

  //TODO Change URL in Production!
  const fetchFactionData = async () => {
    const result = await axios(`http://localhost:8080/factions`);
    setfetchedFactions(result.data);
  };

  //TODO Change URL in Production!
  const fetchItemData = async () => {
    const result = await axios(`http://localhost:8080/items`);
    setfetchedItems(result.data);
  };

  /**
   * Everytime the unit selections changes, recalculate which unique items are already selected and store it in the central item list. Only store those that are magical items that can only be equipped once!
   */
  useEffect(() => {
    let temp = [];

    if (selectedUnits) {
      for (let i = 0; i < selectedUnits.length; i++) {
        if (selectedUnits[i].equipment) {
          for (let j = 0; j < selectedUnits[i].equipment.length; j++) {
            if (!selectedUnits[i].equipment[j].additionalItem || !selectedUnits[i].equipment[j].isGeneric) {
              temp.push(selectedUnits[i].equipment[j].itemName);
            }
          }
        }
      }
    }
    setAllItems(temp);
  }, [selectedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function removes an item from a unit's equipment array.
   * @param {name + uniqueID} identifier
   * @param {int} position
   */
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
   * Function recalculates itemType flags of a unitCard to correctly toggle the item buttons
   * in thej item shop on and off.
   * @param {itemCard object} item
   */
  const recalculateItemTypeFlags = (item, ITEM_ADDED) => {
    if (ITEM_ADDED) {
      let tempObj = { ...unitSelectedForShop };

      tempObj.equipmentTypes.banner = item.itemType === ITEM_TYPE_BANNER ? true : false;
      tempObj.equipmentTypes.musician = item.itemType === ITEM_TYPE_MUSICIAN ? true : false;
      tempObj.equipmentTypes.magicItem = !item.isAdditionalItem;

      setUnitSelectedForShop({
        ...tempObj,
      });
      //item removed
    } else {
      let tempObj = { ...unitSelectedForShop };

      tempObj.equipmentTypes.banner = item.itemType === ITEM_TYPE_BANNER ? false : true;
      tempObj.equipmentTypes.musician = item.itemType === ITEM_TYPE_MUSICIAN ? false : true;
      tempObj.equipmentTypes.magicItem = item.isAdditionalItem;

      setUnitSelectedForShop({
        ...tempObj,
      });
    }
  };

  /**
   * Function deletes the entire army list, resets the state and closes the stat card display and item shop, if open.
   */
  const clearList = () => {
    setSelectedUnits([]);
    setAllItems([]);
    setListValidationResults({
      ...listValidationResults,
      unitsBlockedbyRules: [],
      subFactionBelowMinimum: [],
      removeUnitsNoLongerValid: [],
      secondSubFactionMissing: [],
    });

    closeCardDisplay();
    closeItemShop();
  };

  /**
   * Close the item shop when a new army is selected.
   */
  useEffect(() => {
    closeItemShop();
  }, [listOfAllFactionUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Close the menu for choosing the second sub faction when a new army is selected.
   */
  useEffect(() => {
    closeSecondSubFactionMenu();
  }, [listOfAllFactionUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function toggles the unit card view and Item shop view on and off, as well as switches between views for different units. In order to do this, both views are not toggled by a simple booelan flag, but an object that stores the previously clicked unit.
   * @param {unitCard} unit
   */
  const toggleMenuState = (unit, menu) => {
    let stateObjSetter;
    let stateObj;

    switch (menu) {
      case "UNIT_CARDS":
        stateObj = statCardState;
        stateObjSetter = setStatCardState;
        closeItemShop();
        closeSecondSubFactionMenu();
        break;
      case "ITEMS":
        stateObj = itemShopState;
        stateObjSetter = setItemShopState;
        closeCardDisplay();
        closeSecondSubFactionMenu();
        break;
      case "SECOND_SUB_FACTION":
        stateObj = secondSubFactionMenuState;
        stateObjSetter = setSecondSubFactionMenuState;
        closeCardDisplay();
        closeItemShop();
        break;

      default:
        break;
    }

    // first click on page (no card displayed)
    if (stateObj.clickedUnit === undefined) {
      stateObjSetter({ clickedUnit: unit, lastclickedUnit: unit, show: true });
    }
    // click on same unit again to toggle the card view on
    else if (stateObj.lastclickedUnit.unitName === unit.unitName && stateObj.show === true) {
      stateObjSetter({ clickedUnit: unit, lastclickedUnit: unit, show: false });
    }
    // click on same unit again to toggle the card view off
    else if (stateObj.lastclickedUnit.unitName === unit.unitName && stateObj.show === false) {
      stateObjSetter({ clickedUnit: unit, lastclickedUnit: unit, show: true });
    }
    // click on a different unit to show a different card
    else if (stateObj.lastclickedUnit.unitName !== unit.unitName) {
      stateObjSetter({ clickedUnit: unit, lastclickedUnit: unit, show: true });
    }
  };

  /**
   * in order to work, the state setter needs a unit at the start. Since the view is not visible, the first unit in the list is used.
   */
  const closeCardDisplay = () => {
    setStatCardState({ clickedUnit: selectedUnits[0], lastclickedUnit: selectedUnits[0], show: false });
  };

  const closeItemShop = () => {
    setItemShopState({ clickedUnit: selectedUnits[0], lastclickedUnit: selectedUnits[0], show: false });
  };

  const closeSecondSubFactionMenu = () => {
    setSecondSubFactionMenuState({ clickedUnit: selectedUnits[0], lastclickedUnit: selectedUnits[0], show: false });
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
        fetchedFactions: fetchedFactions,
        subfactions: distinctSubFactions,
        listOfAllFactionUnits: listOfAllFactionUnits,
        setDistinctSubFactions: setDistinctSubFactions,
        setListOfAllFactionUnits: setListOfAllFactionUnits,
        setTotalPointValue: setTotalPointValue,
        // ALLY
        allyName: allyName,
        allySubFactions: distinctAllySubFactions,
        listOfAlliedUnits: listOfAlliedUnits,
        distinctSubFactions: distinctSubFactions,
        setAllyName: setAllyName,
        setListOfAlliedUnits: setListOfAlliedUnits,
        setDistinctAllySubFactions: setDistinctAllySubFactions,
        // SELECTED UNIT LIST
        selectedUnits: selectedUnits,
        maxPointsAllowance: maxPointsAllowance,
        totalPointValue: totalPointValue,
        setSelectedUnits: setSelectedUnits,
        setMaxPointsAllowance: setMaxPointsAllowance,
        clearList: clearList,
        // ARMY LIST VALIDATION
        listValidationResults: listValidationResults,
        setListValidationResults: setListValidationResults,
        // TOURNAMENT RULES OVERRIDE
        tournamentOverrideRules: tournamentOverrideRules,
        // ITEMSHOP
        statCardState: statCardState,
        secondSubFactionMenuState: secondSubFactionMenuState,
        itemShopState: itemShopState,
        fetchedItems: fetchedItems,
        allItems: allItems,
        unitSelectedForShop: unitSelectedForShop,
        showOptionButtons: showOptionButtons,
        setShowOptionButtons: setShowOptionButtons,
        setItemShopState: setItemShopState,
        setSecondSubFactionMenuState: setSecondSubFactionMenuState,
        setUnitSelectedForShop: setUnitSelectedForShop,
        setAllItems: setAllItems,
        removeItem: removeItem,
        recalculateItemTypeFlags: recalculateItemTypeFlags,
        // ALTERNATIVE LISTS
        armyHasAlternativeLists: armyHasAlternativeLists,
        selectedAlternativeList: selectedAlternativeList,
        secondDwarvenOption: secondDwarvenOption,
        setSelectedAlternativeList: setSelectedAlternativeList,
        setSecondDwarvenOption: setSecondDwarvenOption,
        setArmyHasAlternativeLists: setArmyHasAlternativeLists,
        // SECOND SUB FACTION
        hasAdditionalSubFaction: hasAdditionalSubFaction,
        secondSubFactionList: secondSubFactionList,
        excemptSubFactions: excemptSubFactions,
        secondSubfactionCaption: secondSubfactionCaption,

        //AdditionalSubfactions
        setHasAdditionalSubFaction: setHasAdditionalSubFaction,
        setSecondSubFactionList: setSecondSubFactionList,
        setExcemptSubFactions: setExcemptSubFactions,
        setSecondSubfactionCaption: setSecondSubfactionCaption,

        // PDF VIEWER
        pdfMasterList: pdfMasterList,
        setPdfMasterList: setPdfMasterList,
        // MENU STATES
        toggleMenuState: toggleMenuState,
      }}
    >
      <Grid container className={classes.displayBox} direction="column">
        <Allies />
        <ArmyValidation />
        <Pdf />
        <ArmyList />

        <Grid item xs={12} className={classes.BackBttnBox}>
          <IconButton
            className={classes.BackBttn}
            onClick={() => {
              backToMainmenu();
            }}
          >
            <ChevronLeftIcon className={classes.BackBttnIcon} />
          </IconButton>
        </Grid>
        {/* ARMY SELECTION */}
        <Grid container item direction="row">
          <Grid direction={"column"} xs={3} className={classes.armySelectionBox}>
            <SelectionInput
              className={classes.selector}
              filterFunction={setSelectedFactionName}
              isArmySelector={true}
              options={ALL_FACTIONS_ARRAY}
              label="Wähle Eine Fraktion"
            />
            <AlternativeArmyLists />

            <FactionTreeView className={classes.selector} />
          </Grid>
          {/* ARMYLIST */}
          <Grid item container direction="column" justify="flex-end" xs={3} className={classes.armyListBox}>
            <ArmyListDisplay setTotalPointValue={setTotalPointValue} />
          </Grid>
          <Menus />
        </Grid>
      </Grid>
    </ArmyProvider>
  ) : null;
};

export default ListGeneratorController;
