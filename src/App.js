// React
import { useState, useEffect } from "react";
// Material UI
import { Grid2 as Grid, StyledEngineProvider, CssBaseline } from "@mui/material";
// router
import { Route, Switch } from "react-router-dom";
// components and functions
import landingPage from "./components/landingPage/landingPage";
import CompendiumTable from "./components/compendiums/factionTable/components/CompendiumTable";
import ListGenerator from "./components/ListGenerator/ListGenerator";
import LossCalculator from "./components/lossCalculator/LossCalculator";
import PdfBox from "./components/PDFGenerator/PDFBox";
import CardCreator from "./components/cardCreator/CardCreator";
import CreateNewAccount from "./components/Login/CreateNewAccount";
// context providers
import AllyProvider from "./contexts/allyContext";
import AlternativeListProvider from "./contexts/alternativeListContext";
import ArmyProvider from "./contexts/armyContext";
import CustomSnackBarProvider from "./components/shared/CustomSnackBarProvider";
import ItemContext from "./contexts/itemContext";
import LightSwitchProvider from "./contexts/lightSwitchContext";
import ListDisplayProvider from "./contexts/ListDisplayContext";
import LossCalcProvider from "./contexts/LossCalculatorContext";
import MenuProvider from "./contexts/MenuContext";
import RightMenuContext from "./contexts/rightMenuContext";
import SecondSubFactionProvider from "./contexts/secondSubFactionContext";
import SelectionContext from "./contexts/selectionContext";
import TournamentRulesProvider from "./contexts/tournamentRulesContext";
import UserProvider from "./contexts/userContext";
// theme
import lightTheme from "./AppTheme/lightTheme";
import darkTheme from "./AppTheme/darkTheme";
import { ThemeProvider } from "@mui/material";
// constants
import { NONE, NO_ALLY } from "./constants/factions";
import { FACTION_DTOS_URL, ITEM_DTOS_URL } from "./constants/URLs";
// custom hooks
import useAxios from "./customHooks/UseAxios";

function App() {
  const callAxios = useAxios();

  // user accounts
  const [user, setUser] = useState({
    userName: "",
    isAdmin: "",
    isOwner: "",
    token: "",
  });
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [displayLogInDialog, setDisplayLogInDialog] = useState(false);
  const [showUserAvatarDrawer, setShowUserAvatarDrawer] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  // intialize local states
  const [fetchedFactions, setFetchedFactions] = useState([]);
  const [fetchedItems, setFetchedItems] = useState([]);

  // toggle top menu, confirmation Dialog
  const [openMenu, setOpenMenu] = useState(false);
  const [blockDialog, setblockDialog] = useState({
    confirmationDialog: false,
    deletionDialog: false,
  });

  // toggle app theme
  const [darkModeOff, setDarkModeOff] = useState(true);

  // toggle list display
  const [simpleModeOn, setSimpleMode] = useState(false);

  // army meta data
  const [teamName, setTeamName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [armyName, setArmyName] = useState("");
  const [eventName, setEventName] = useState("");
  const [selectedAccessUser, setSelectedAccessUser] = useState([]);
  const [creationDate, setCreationDate] = useState(new Date());

  // army list was loaded, i.e. fetched from DB
  const [isFetchedArmyList, setIsFetchedArmyList] = useState(false);
  // selected faction & army list
  const [selectedFactionName, setSelectedFactionName] = useState(NONE);
  const [distinctSubFactions, setDistinctSubFactions] = useState([]);
  const [listOfAllFactionUnits, setListOfAllFactionUnits] = useState([]);
  const [subFactionDTOs, setSubFactionDTOs] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [enableUpdateListBttn, setEnableUpdateListBttn] = useState(false);

  // maximum point allowance
  const [maxPointsAllowance, setMaxPointsAllowance] = useState(2000);
  // allied faction
  const [allyName, setAllyName] = useState(NO_ALLY);
  const [distinctAllySubFactions, setDistinctAllySubFactions] = useState([]);
  const [listOfAlliedUnits, setListOfAlliedUnits] = useState([]);
  const [allySubFactionDTOs, setAllySubFactionDTOs] = useState([]);
  // tournament rules
  const [showTournamentRulesMenu, setShowTournamentRulesMenu] = useState(false);
  const [tournamentOverrideRules, setTournamentOverrideRules] = useState({
    enableOverride: false,
    maxHeroValue: 30,
    maxNumber: 2,
    uniquesOnlyOnce: true,
  });
  // alternative lists
  const [armyHasAlternativeLists, setArmyHasAlternativeLists] = useState(false);
  const [numberOfAlternativeChoices, setNumberOfAlternativeChoices] = useState(0);
  const [selectedAlternativeLists, setSelectedAlternativeLists] = useState([]);
  const [alternateListNames, setAlternateListNames] = useState([]);
  const [altArmyListSelectionComplete, setAltArmyListSelectionComplete] = useState(false);
  const [allyIsAlternativeOption, setAllyIsAlternativeOption] = useState(false);
  // additional subFactions - currently only important for the Thain faction!
  const [hasAdditionalSubFaction, setHasAdditionalSubFaction] = useState(false);
  const [secondSubFactionList, setSecondSubFactionList] = useState([]);
  const [secondSubfactionCaption, setSecondSubfactionCaption] = useState("");
  const [excemptSubFactions, setExcemptSubFactions] = useState([]);
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
  const [displayedCard, setDisplayedCard] = useState({});
  // right side options menu
  const [showOptionButtons, setShowOptionButtons] = useState(false);
  //loss calculator
  const [list, setList] = useState([]);
  const [totalPointsLost, setTotalPointsLost] = useState(0);

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
    callAxios.fetchData(setFetchedFactions, FACTION_DTOS_URL);
  };

  const fetchItemData = async () => {
    callAxios.fetchData(setFetchedItems, ITEM_DTOS_URL);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={darkModeOff ? lightTheme : darkTheme}>
        <CssBaseline />

        <UserProvider
          value={{
            user: user,
            userLoggedIn: userLoggedIn,
            displayLogInDialog: displayLogInDialog,
            showUserAvatarDrawer: showUserAvatarDrawer,
            showPasswordReset: showPasswordReset,
            setUser: setUser,
            setUserLoggedIn: setUserLoggedIn,
            setDisplayLogInDialog: setDisplayLogInDialog,
            setShowUserAvatarDrawer: setShowUserAvatarDrawer,
            setShowPasswordReset: setShowPasswordReset,
          }}
        >
          <ListDisplayProvider
            value={{
              simpleModeOn: simpleModeOn,
              setSimpleMode: setSimpleMode,
            }}
          >
            <MenuProvider
              value={{
                openMenu: openMenu,
                blockDialog: blockDialog,
                setOpenMenu: setOpenMenu,
                setblockDialog: setblockDialog,
              }}
            >
              <LightSwitchProvider
                value={{
                  darkModeOff: darkModeOff,
                  setDarkModeOff: setDarkModeOff,
                }}
              >
                <LossCalcProvider
                  value={{
                    list: list,
                    totalPointsLost: totalPointsLost,
                    setList: setList,
                    setTotalPointsLost: setTotalPointsLost,
                  }}
                >
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
                          setAllEquippedItems: setAllEquippedItems,
                          setUnitSelectedForShop: setUnitSelectedForShop,
                        }}
                      >
                        <SelectionContext
                          value={{
                            // SELECTED UNIT LIST
                            selectedUnits: selectedUnits,
                            maxPointsAllowance: maxPointsAllowance,
                            enableUpdateListBttn: enableUpdateListBttn,
                            setSelectedUnits: setSelectedUnits,
                            setMaxPointsAllowance: setMaxPointsAllowance,
                            setEnableUpdateListBttn: setEnableUpdateListBttn,
                          }}
                        >
                          <RightMenuContext
                            value={{
                              // RIGHT SIDE MENU
                              statCardState: statCardState,
                              secondSubFactionMenuState: secondSubFactionMenuState,
                              itemShopState: itemShopState,
                              showOptionButtons: showOptionButtons,
                              displayedCard: displayedCard,
                              setStatCardState: setStatCardState,
                              setItemShopState: setItemShopState,
                              setSecondSubFactionMenuState: setSecondSubFactionMenuState,
                              setShowOptionButtons: setShowOptionButtons,
                              setDisplayedCard: setDisplayedCard,
                            }}
                          >
                            <AlternativeListProvider
                              value={{
                                // ALTERNATIVE LISTS
                                armyHasAlternativeLists: armyHasAlternativeLists,
                                numberOfAlternativeChoices: numberOfAlternativeChoices,
                                selectedAlternativeLists: selectedAlternativeLists,
                                altArmyListSelectionComplete: altArmyListSelectionComplete,
                                alternateListNames: alternateListNames,
                                allyIsAlternativeOption: allyIsAlternativeOption,
                                setNumberOfAlternativeChoices: setNumberOfAlternativeChoices,
                                setAlternateListNames: setAlternateListNames,
                                setAltArmyListSelectionComplete: setAltArmyListSelectionComplete,
                                setSelectedAlternativeLists: setSelectedAlternativeLists,
                                setArmyHasAlternativeLists: setArmyHasAlternativeLists,
                                setAllyIsAlternativeOption: setAllyIsAlternativeOption,
                              }}
                            >
                              <AllyProvider
                                value={{
                                  // ALLY
                                  allyName: allyName,
                                  allySubFactions: distinctAllySubFactions,
                                  listOfAlliedUnits: listOfAlliedUnits,
                                  allySubFactionDTOs: allySubFactionDTOs,
                                  setAllyName: setAllyName,
                                  setListOfAlliedUnits: setListOfAlliedUnits,
                                  setDistinctAllySubFactions: setDistinctAllySubFactions,
                                  setAllySubFactionDTOs: setAllySubFactionDTOs,
                                }}
                              >
                                <ArmyProvider
                                  value={{
                                    // ARMY
                                    playerName: playerName,
                                    teamName: teamName,
                                    armyName: armyName,
                                    selectedFactionName: selectedFactionName,
                                    eventName: eventName,
                                    selectedAccessUser: selectedAccessUser,
                                    creationDate: creationDate,
                                    fetchedFactions: fetchedFactions,
                                    subFactions: distinctSubFactions,
                                    listOfAllFactionUnits: listOfAllFactionUnits,
                                    subFactionDTOs: subFactionDTOs,
                                    isFetchedArmyList: isFetchedArmyList,
                                    setArmyName: setArmyName,
                                    setEventName: setEventName,
                                    setSelectedAccessUser: setSelectedAccessUser,
                                    setSelectedFactionName: setSelectedFactionName,
                                    setDistinctSubFactions: setDistinctSubFactions,
                                    setListOfAllFactionUnits: setListOfAllFactionUnits,
                                    setCreationDate: setCreationDate,
                                    setSubFactionDTOs: setSubFactionDTOs,
                                    setTeamName: setTeamName,
                                    setPlayerName: setPlayerName,
                                    setIsFetchedArmyList: setIsFetchedArmyList,
                                  }}
                                >
                                  <CustomSnackBarProvider>
                                    {fetchedFactions && fetchedItems ? (
                                      <Grid container>
                                        <Switch>
                                          <Route path="/" component={landingPage} exact />
                                          <Route path="/compendium" component={CompendiumTable} exact />
                                          <Route path="/listGenerator" component={ListGenerator} />
                                          <Route path="/lossCalculator" component={LossCalculator} />
                                          <Route path="/PdfBox" component={PdfBox} />
                                          <Route path="/cardCreator" component={CardCreator} exact />
                                          <Route path="/addNewAccount" component={CreateNewAccount} exact />
                                        </Switch>
                                      </Grid>
                                    ) : null}
                                  </CustomSnackBarProvider>
                                </ArmyProvider>
                              </AllyProvider>
                            </AlternativeListProvider>
                          </RightMenuContext>
                        </SelectionContext>
                      </ItemContext>
                    </SecondSubFactionProvider>
                  </TournamentRulesProvider>
                </LossCalcProvider>
              </LightSwitchProvider>
            </MenuProvider>
          </ListDisplayProvider>
        </UserProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
