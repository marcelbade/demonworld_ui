// React
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
// Axios
import axios from "axios";
// Material UI
import { Grid, IconButton, Fade } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// notistack
import { SnackbarProvider } from "notistack";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CancelIcon from "@mui/icons-material/Cancel";
import SpellBookIcon from "../../assets/icons/spellbook-white.png";
// components and functions
import FactionTreeView from "./ArmySelectorView/SelectorTreeView/FactionTreeView";
import ArmyListBox from "./ArmyListView/ArmyListBox";
import AlternativeArmyListBox from "./ArmySelectorView/AlternativeArmyListSelection/AlternativeArmyLists";
import MenuBox from "./RightSideMenus/MenuBox";
import ValidationNotification from "../shared/ValidationNotification";
// context providers
import ArmyProvider from "../../contexts/armyContext";
import AllyProvider from "../../contexts/allyContext";
import AlternativeListProvider from "../../contexts/alternativeListContext";
import RightMenuContext from "../../contexts/rightMenuContext";
import ValidationContext from "../../contexts/validationContext";
import SelectionContext from "../../contexts/selectionContext";
import ItemContext from "../../contexts/itemContext";
import SecondSubFactionProvider from "../../contexts/secondSubFactionContext";
import TournamentRulesProvider from "../../contexts/tournamentRulesContext";

// constants
import { NONE } from "../../constants/factions";
import { NO_ALLY } from "../../constants/factions";
import ArmySelector from "./ArmySelectorView/ArmySelector";

const useStyles = makeStyles((theme) => ({
  displayBox: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("lg")]: {
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

    [theme.breakpoints.down("lg")]: {},
  },
  armyListBox: {
    paddingTop: "2em",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      left: "30%",
    },
    [theme.breakpoints.down("lg")]: {
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
  const [subFactionObjects, setSubFactionObjects] = useState([]);
  const [listOfAllFactionUnits, setListOfAllFactionUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  // maximum point allowance
  const [maxPointsAllowance, setMaxPointsAllowance] = useState(2000);
  // allied faction
  const [allyName, setAllyName] = useState(NO_ALLY);
  const [distinctAllySubFactions, setDistinctAllySubFactions] = useState([]);
  const [listOfAlliedUnits, setListOfAlliedUnits] = useState([]);
  // validation
  const [listValidationResults, setListValidationResults] = useState({
    unitsBlockedbyRules: [],
    subFactionBelowMinimum: [],
    removeUnitsNoLongerValid: [],
    secondSubFactionMissing: [],
    alliedUnitsBlockedbyRules: [],
    commanderIsPresent: true,
  });
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
  const [numberOfAlternativeChoices, setNumberOfAlternativeChoices] = useState(0);
  const [selectedAlternativeList, setSelectedAlternativeList] = useState(NONE);
  const [alternateListSubFactions, setAlternateListSubFactions] = useState([]);
  const [altArmyListSelectionComplete, setAltArmyListSelectionComplete] = useState(false);
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
  // item shop
  const [allEquippedItems, setAllEquippedItems] = useState([]);
  const [itemShopState, setItemShopState] = useState({
    clickedUnit: {},
    lastclickedUnit: {},
    show: false,
  });
  const [unitSelectedForShop, setUnitSelectedForShop] = useState({});
  // unit card view
  const [statCardState, setStatCardState] = useState({
    clickedUnit: {},
    lastclickedUnit: {},
    show: false,
  });
  const [isSingleElement, setIsSingleElement] = useState(false);
  const [carouselCards, setCarouselCards] = useState([]);
  const [displayedCard, setDisplayedCard] = useState({});

  // right side options menu
  const [showOptionButtons, setShowOptionButtons] = useState(true);

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
    // http://localhost:8080/factions
    const result = await axios(`http://localhost:8080/factionDTOs`);
    setFetchedFactions(result.data);
  };

  //TODO Change URL in Production!
  const fetchItemData = async () => {
    const result = await axios(`http://localhost:8080/items`);
    setFetchedItems(result.data);
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
    <TournamentRulesProvider
      value={{
        // TOURNAMENT RULES OVERRIDE
        tournamentOverrideRules: tournamentOverrideRules,
        showTournamentRulesMenu: showTournamentRulesMenu,
        setShowTournamentRulesMenu: setShowTournamentRulesMenu,
        setTournamentOverrideRules: setTournamentOverrideRules,
      }}
    >
      <SecondSubFactionProvider
        value={{
          // SECOND SUB FACTION
          hasAdditionalSubFaction: hasAdditionalSubFaction,
          secondSubFactionList: secondSubFactionList,
          excemptSubFactions: excemptSubFactions,
          secondSubfactionCaption: secondSubfactionCaption,
          setHasAdditionalSubFaction: setHasAdditionalSubFaction,
          setSecondSubFactionList: setSecondSubFactionList,
          setExcemptSubFactions: setExcemptSubFactions,
          setSecondSubfactionCaption: setSecondSubfactionCaption,
        }}
      >
        <ItemContext
          value={{
            // ITEMSHOP
            fetchedItems: fetchedItems,
            allEquippedItems: allEquippedItems,
            unitSelectedForShop: unitSelectedForShop,
            setUnitSelectedForShop: setUnitSelectedForShop,
            setAllEquippedItems: setAllEquippedItems,
          }}
        >
          <ValidationContext
            value={{
              // ARMY LIST VALIDATION
              listValidationResults: listValidationResults,
              validationMessage: validationMessage,
              showToastMessage: showToastMessage,
              setListValidationResults: setListValidationResults,
              setValidationMessage: setValidationMessage,
              setShowToastMessage: setShowToastMessage,
            }}
          >
            <SelectionContext
              value={{
                // SELECTED UNIT LIST
                selectedUnits: selectedUnits,
                maxPointsAllowance: maxPointsAllowance,
                setSelectedUnits: setSelectedUnits,
                setMaxPointsAllowance: setMaxPointsAllowance,
              }}
            >
              <RightMenuContext
                value={{
                  // RIGHT SIDE MENU
                  statCardState: statCardState,
                  secondSubFactionMenuState: secondSubFactionMenuState,
                  itemShopState: itemShopState,
                  showOptionButtons: showOptionButtons,
                  isSingleElement: isSingleElement,
                  carouselCards: carouselCards,
                  displayedCard: displayedCard,
                  setStatCardState: setStatCardState,
                  setItemShopState: setItemShopState,
                  setSecondSubFactionMenuState: setSecondSubFactionMenuState,
                  closeCardDisplay: closeCardDisplay,
                  closeItemShop: closeItemShop,
                  closeSecondSubFactionMenu: closeSecondSubFactionMenu,
                  setShowOptionButtons: setShowOptionButtons,
                  setIsSingleElement: setIsSingleElement,
                  setCarouselCards: setCarouselCards,
                  setDisplayedCard: setDisplayedCard,
                }}
              >
                <AlternativeListProvider
                  value={{
                    // ALTERNATIVE LISTS
                    armyHasAlternativeLists: armyHasAlternativeLists,
                    numberOfAlternativeChoices: numberOfAlternativeChoices,
                    selectedAlternativeList: selectedAlternativeList,
                    altArmyListSelectionComplete: altArmyListSelectionComplete,
                    alternateListSubFactions: alternateListSubFactions,
                    setNumberOfAlternativeChoices: setNumberOfAlternativeChoices,
                    setAlternateListSubFactions: setAlternateListSubFactions,
                    setAltArmyListSelectionComplete: setAltArmyListSelectionComplete,
                    setSelectedAlternativeList: setSelectedAlternativeList,
                    setArmyHasAlternativeLists: setArmyHasAlternativeLists,
                  }}
                >
                  <AllyProvider
                    value={{
                      // ALLY
                      allyName: allyName,
                      allySubFactions: distinctAllySubFactions,
                      listOfAlliedUnits: listOfAlliedUnits,
                      setAllyName: setAllyName,
                      setListOfAlliedUnits: setListOfAlliedUnits,
                      setDistinctAllySubFactions: setDistinctAllySubFactions,
                    }}
                  >
                    <ArmyProvider
                      value={{
                        // ARMY
                        armyName: armyName,
                        setArmyName: setArmyName,
                        selectedFactionName: selectedFactionName,
                        fetchedFactions: fetchedFactions,
                        //TODO Changed!!
                        subFactionObjects: subFactionObjects,
                        // TODO DTO change -> now subFactionObjects.units!
                        listOfAllFactionUnits: listOfAllFactionUnits,
                        setSelectedFactionName: setSelectedFactionName,
                        setDistinctSubFactions: setSubFactionObjects,
                        setListOfAllFactionUnits: setListOfAllFactionUnits,
                      }}
                    >
                      <SnackbarProvider
                        ref={notistackRef}
                        TransitionComponent={Fade}
                        // maxSnack={3}
                        preventDuplicate
                        iconVariant={{
                          error: (
                            <img className={classes.pushMessageIcon} src={SpellBookIcon} alt={"Regelbuchtext"} height={35} width={35} />
                          ),
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
                            // TODO dont use inline css! :)
                            style={{ color: "#fff", fontSize: "20px" }}
                            size="large"
                          >
                            <CancelIcon />
                          </IconButton>
                        )}
                      >
                        <Grid container className={classes.displayBox} direction="column">
                          {/* <ArmyValidation /> */}
                          <Grid item xs={12} className={classes.BackBttnBox}>
                            <IconButton
                              className={classes.BackBttn}
                              onClick={() => {
                                backToMainmenu();
                              }}
                              size="large"
                            >
                              <ChevronLeftIcon className={classes.BackBttnIcon} />
                            </IconButton>
                          </Grid>
                          {/* ARMY SELECTION */}
                          <Grid container item direction="row">
                            <Grid container item direction={"column"} xs={3} className={classes.armySelectionBox}>
                              <ArmySelector />
                              <AlternativeArmyListBox />
                              <FactionTreeView className={classes.selector} />
                            </Grid>
                            {/* ARMYLIST */}
                            <Grid container item direction="column" justifyContent="flex-end" xs={3} className={classes.armyListBox}>
                              <ArmyListBox />
                            </Grid>
                          </Grid>
                          <MenuBox />
                          <ValidationNotification text={validationMessage} show={showToastMessage} />
                        </Grid>
                      </SnackbarProvider>
                    </ArmyProvider>
                  </AllyProvider>
                </AlternativeListProvider>
              </RightMenuContext>
            </SelectionContext>
          </ValidationContext>
        </ItemContext>
      </SecondSubFactionProvider>
    </TournamentRulesProvider>
  ) : null;
};

export default ListGeneratorController;
