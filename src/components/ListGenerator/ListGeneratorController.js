// React
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
// Axios
import axios from "axios";
// Material UI
import { Grid, IconButton, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// notistack
import { SnackbarProvider } from "notistack";
// icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CancelIcon from "@material-ui/icons/Cancel";
import SpellBookIcon from "../../icons/spellbook-white.png";
// components and functions
import ArmyProvider from "../../contexts/armyContext";
import SelectionInput from "../shared/selectionInput";
import FactionTreeView from "./ArmySelectorView/SelectorTreeView/TreeView";
import ArmyListBox from "./ArmyListView/ArmyListBox";
import Allies from "./GeneratorComponents/Allies";
import ArmyValidation from "./GeneratorComponents/validation/ArmyValidation";
import Pdf from "./GeneratorComponents/Pdf";
import AlternativeArmyLists from "./GeneratorComponents/AlternativeArmyLists";
import MenuBox from "./RightSideMenus/MenuBox";
import ValidationNotification from "../shared/ValidationNotification";
// constants
import { ALL_FACTIONS_ARRAY, NONE } from "../../constants/factions";
import ArmyList from "./GeneratorComponents/ArmyList";
import { NO_ALLY } from "../../constants/allies";
import { INPUT_TEXTS } from "../../constants/textsAndMessages";

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
  pushMessages: {
    marginRight: "2em",
    marginBottom: "2em",
  },
}));

const ListGeneratorController = () => {
  const classes = useStyles();
  const history = useHistory();
  const notistackRef = useRef();

  // intialize local states
  const [fetchedFactions, setFetchedFactions] = useState([]);
  const [fetchedItems, setFetchedItems] = useState([]);
  // army name
  const [armyName, setArmyName] = useState("");
  // selected faction
  const [selectedFactionName, setSelectedFactionName] = useState(NONE);
  const [distinctSubFactions, setDistinctSubFactions] = useState([]);
  const [listOfAllFactionUnits, setListOfAllFactionUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  // the current total point value of all selected units
  const [totalPointValue, setTotalPointValue] = useState(0);
  // maximum point allowance
  const [maxPointsAllowance, setMaxPointsAllowance] = useState(2000);
  // allied faction
  const [allyName, setAllyName] = useState(NO_ALLY);
  const [distinctAllySubFactions, setDistinctAllySubFactions] = useState([]);
  const [listOfAlliedUnits, setListOfAlliedUnits] = useState([]);
  const [showAlly, setShowAlly] = useState(true);
  // validation
  const [listValidationResults, setListValidationResults] = useState({
    unitsBlockedbyRules: [],
    subFactionBelowMinimum: [],
    removeUnitsNoLongerValid: [],
    secondSubFactionMissing: [],
    alliedUnitsBlockedbyRules: [],
    commanderIsPresent: true,
  });
  const [disableOptionsButtons, setDisableOptionsButtons] = useState(true);
  const [showTournamentRulesMenu, setShowTournamentRulesMenu] = useState(false);
  const [tournamentOverrideRules, setTournamentOverrideRules] = useState({
    enableOverride: false,
    maxHeroValue: 30,
    maxNumber: 2,
    uniquesOnlyOnce: true,
  });
  // validation toast message
  const [validationMessage, setValidationMessage] = useState(NONE);
  const [showToastMessage, setShowToastMessage] = useState(false);
  // alternative lists
  const [armyHasAlternativeLists, setArmyHasAlternativeLists] = useState(false);
  const [armyHasSecondChoice, setArmyHasSecondChoice] = useState(false);
  const [selectedAlternativeList, setSelectedAlternativeList] = useState(NONE);
  const [secondSelectedAlternativeList, setSecondSelectedAlternativeList] = useState(NONE);
  const [alternateArmyListOptions, setAlternateArmyListOptions] = useState([]);
  const [secondAlternativeArmyOptions, setSecondAlternativeArmyOptions] = useState([]);
  const [alternateListSubFactions, setAlternateListSubFactions] = useState([]);
  const [altArmyListSelectionComplete, setAltArmyListSelectionComplete] = useState(false);
  const [alternateArmyListLabelText, setAlternateArmyListLabelText] = useState(NONE);
  // additional subFactions - currently only important for the Thain army!
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
    setFetchedFactions(result.data);
  };

  //TODO Change URL in Production!
  const fetchItemData = async () => {
    const result = await axios(`http://localhost:8080/items`);
    setFetchedItems(result.data);
  };

  /**
   * Function resets the entire state back to default.
   */
  const resetTheState = () => {
    setSelectedUnits([]);
    setAllItems([]);
    setListValidationResults({
      ...listValidationResults,
      unitsBlockedbyRules: [],
      subFactionBelowMinimum: [],
      removeUnitsNoLongerValid: [],
      secondSubFactionMissing: [],
      commanderIsPresent: true,
    });

    setAlternateListSubFactions([]);
    closeCardDisplay();
    closeItemShop();
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
   * Close the item shop when a new army is selected.
   */
  useEffect(() => {
    closeItemShop();
  }, [selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Close the menu for choosing the second sub faction when a new army is selected.
   */
  useEffect(() => {
    closeSecondSubFactionMenu();
  }, [selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function calls history objects to take user back to main menu.
   */
  const backToMainmenu = () => {
    history.push("/");
  };

  return fetchedFactions && fetchedItems ? (
    <ArmyProvider
      value={{
        // ARMY NAME
        armyName: armyName,
        setArmyName: setArmyName,
        // ARMY
        selectedFactionName: selectedFactionName,
        fetchedFactions: fetchedFactions,
        subFactions: distinctSubFactions,
        listOfAllFactionUnits: listOfAllFactionUnits,
        totalPointValue: totalPointValue,
        setDistinctSubFactions: setDistinctSubFactions,
        setListOfAllFactionUnits: setListOfAllFactionUnits,
        setTotalPointValue: setTotalPointValue,
        // ALLY
        allyName: allyName,
        allySubFactions: distinctAllySubFactions,
        listOfAlliedUnits: listOfAlliedUnits,
        distinctAllySubFactions: distinctAllySubFactions,
        showAlly: showAlly,
        setShowAlly: setShowAlly,
        setAllyName: setAllyName,
        setListOfAlliedUnits: setListOfAlliedUnits,
        setDistinctAllySubFactions: setDistinctAllySubFactions,
        // ALTERNATIVE LISTS
        armyHasAlternativeLists: armyHasAlternativeLists,
        armyHasSecondChoice: armyHasSecondChoice,
        alternateArmyListOptions: alternateArmyListOptions,
        secondAlternativeArmyOptions: secondAlternativeArmyOptions,
        selectedAlternativeList: selectedAlternativeList,
        secondSelectedAlternativeList: secondSelectedAlternativeList,
        altArmyListSelectionComplete: altArmyListSelectionComplete,
        alternateArmyListLabelText: alternateArmyListLabelText,
        alternateListSubFactions: alternateListSubFactions,
        setArmyHasSecondChoice: setArmyHasSecondChoice,
        setAlternateListSubFactions: setAlternateListSubFactions,
        setAltArmyListSelectionComplete: setAltArmyListSelectionComplete,
        setAlternateArmyListOptions: setAlternateArmyListOptions,
        setSelectedAlternativeList: setSelectedAlternativeList,
        setSecondSelectedAlternativeList: setSecondSelectedAlternativeList,
        setSecondAlternativeArmyOptions: setSecondAlternativeArmyOptions,
        setArmyHasAlternativeLists: setArmyHasAlternativeLists,
        setAlternateArmyListLabelText: setAlternateArmyListLabelText,
        // SELECTED UNIT LIST
        selectedUnits: selectedUnits,
        maxPointsAllowance: maxPointsAllowance,
        setSelectedUnits: setSelectedUnits,
        setMaxPointsAllowance: setMaxPointsAllowance,
        resetTheState: resetTheState,
        // ARMY LIST VALIDATION
        listValidationResults: listValidationResults,
        disableOptionsButtons: disableOptionsButtons,
        setListValidationResults: setListValidationResults,
        setDisableOptionsButtons: setDisableOptionsButtons,
        // VALIDATION TOAST MESSAGE
        validationMessage: validationMessage,
        showToastMessage: showToastMessage,
        setValidationMessage: setValidationMessage,
        setShowToastMessage: setShowToastMessage,
        // RIGHT SIDE MENU
        showOptionButtons: showOptionButtons,
        statCardState: statCardState,
        secondSubFactionMenuState: secondSubFactionMenuState,
        itemShopState: itemShopState,
        setShowOptionButtons: setShowOptionButtons,
        // TOURNAMENT RULES OVERRIDE
        tournamentOverrideRules: tournamentOverrideRules,
        showTournamentRulesMenu: showTournamentRulesMenu,
        setShowTournamentRulesMenu: setShowTournamentRulesMenu,
        setTournamentOverrideRules: setTournamentOverrideRules,
        // ITEMSHOP
        fetchedItems: fetchedItems,
        allItems: allItems,
        unitSelectedForShop: unitSelectedForShop,
        setUnitSelectedForShop: setUnitSelectedForShop,
        setAllItems: setAllItems,
        // SECOND SUB FACTION
        hasAdditionalSubFaction: hasAdditionalSubFaction,
        secondSubFactionList: secondSubFactionList,
        excemptSubFactions: excemptSubFactions,
        secondSubfactionCaption: secondSubfactionCaption,
        //ADDITIONAL SUBFACTION (TRIBE)
        setHasAdditionalSubFaction: setHasAdditionalSubFaction,
        setSecondSubFactionList: setSecondSubFactionList,
        setExcemptSubFactions: setExcemptSubFactions,
        setSecondSubfactionCaption: setSecondSubfactionCaption,
        // PDF VIEWER
        pdfMasterList: pdfMasterList,
        setPdfMasterList: setPdfMasterList,
        // MENU STATES
        setStatCardState: setStatCardState,
        setItemShopState: setItemShopState,
        setSecondSubFactionMenuState: setSecondSubFactionMenuState,
        closeCardDisplay: closeCardDisplay,
        closeItemShop: closeItemShop,
        closeSecondSubFactionMenu: closeSecondSubFactionMenu,
      }}
    >
      <SnackbarProvider
        ref={notistackRef}
        TransitionComponent={Fade}
        // maxSnack={3}
        preventDuplicate
        iconVariant={{
          error: <img className={classes.pushMessageIcon} src={SpellBookIcon} alt={"Regelbuchtext"} height={35} width={35} />,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        action={(key) => (
          <IconButton
            onClick={() => {
              notistackRef.current.closeSnackbar(key);
              setShowToastMessage(false);
            }}
            style={{ color: "#fff", fontSize: "20px" }}
          >
            <CancelIcon />
          </IconButton>
        )}
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
            <Grid container item direction={"column"} xs={3} className={classes.armySelectionBox}>
              <SelectionInput
                className={classes.selector}
                filterFunction={setSelectedFactionName}
                isArmySelector={true}
                options={ALL_FACTIONS_ARRAY}
                label={INPUT_TEXTS.SELECT_FACTION}
              />
              <AlternativeArmyLists />
              <FactionTreeView className={classes.selector} />
            </Grid>
            {/* ARMYLIST */}
            <Grid container item direction="column" justify="flex-end" xs={3} className={classes.armyListBox}>
              <ArmyListBox setTotalPointValue={setTotalPointValue} />
            </Grid>
          </Grid>
          <MenuBox />
          <ValidationNotification text={validationMessage} show={showToastMessage} />
        </Grid>
      </SnackbarProvider>
    </ArmyProvider>
  ) : null;
};

export default ListGeneratorController;
