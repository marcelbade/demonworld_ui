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
import UnitCardPdfBox from "./pdfGenerator/UnitCards/UnitCardPdfBox";
import SpellCardPdfBox from "./pdfGenerator/SpellCards/SpellCardPdfBox";
import CardCreator from "./components/cardCreator/CardCreator";
import CreateNewAccount from "./components/Login/CreateNewAccount";
import SpellCompendium from "./components/spellCompendium/SpellCompendium";
import { CompendiumTableStateArray } from "./components/compendiums/factionTable/components/compendiumTableStateArray";
// context providers
import AllyProvider from "./contexts/allyContext";
import AlternativeListProvider from "./contexts/alternativeListContext";
import ArmyProvider from "./contexts/armyContext";
import CustomSnackBarProvider from "./components/shared/CustomSnackBarProvider";
import LightSwitchProvider from "./contexts/lightSwitchContext";
import ListDisplayProvider from "./contexts/ListDisplayContext";
import LossCalcProvider from "./contexts/LossCalculatorContext";
import MenuProvider from "./contexts/MenuContext";
import SecondSubFactionProvider from "./contexts/secondSubFactionContext";
import TournamentRulesProvider from "./contexts/tournamentRulesContext";
import UserProvider from "./contexts/userContext";
import ItemProvider from "./contexts/itemContext";
import SelectionProvider from "./contexts/selectionContext";
import RightMenuProvider from "./contexts/rightMenuContext";
import CompendiumProvider from "./contexts/compendiumContext";
import GameDataProvider from "./contexts/gameDataContext";
import SpellProvider from "./contexts/spellContext";
// theme
import lightTheme from "./AppTheme/lightTheme";
import darkTheme from "./AppTheme/darkTheme";
import { ThemeProvider } from "@mui/material";
// constants
import { NONE, NO_ALLY } from "./constants/factions";
import {
  ALL_FACTION_COLORS_URL,
  ALL_FACTION_NAMES_URL,
  ALL_UNITS_URL,
  FACTION_DTOS_URL,
  ITEM_DTOS_URL,
  SPELL_DTO_URL,
} from "./constants/URLs";
// custom hooks
import useAxios from "./customHooks/UseAxios";
import useCompendiumTableControl from "./customHooks/UseCompendiumTableControl";

function App() {
  const callAxios = useAxios();
  const compendiumTableControl = useCompendiumTableControl();

  // user accounts
  const [user, setUser] = useState({
    userName: "",
    isAdmin: false,
    isOwner: "",
    token: "",
  });
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [displayLogInDialog, setDisplayLogInDialog] = useState(false);
  const [showUserAvatarDialog, setShowUserAvatarDialog] = useState(false);
  const [showPasswordChangeDialog, setShowPasswordChangeDialog] = useState(false);

  // intialize local states
  const [fetchedFactions, setFetchedFactions] = useState([]);
  const [fetchedItems, setFetchedItems] = useState([]);

  // toggle settings menu, confirmation Dialog, top menu bar
  const [openMenu, setOpenMenu] = useState(false);
  const [blockDialog, setblockDialog] = useState({
    showOverrideDialog: true,
    showDeletionDialog: true,
  });
  const [openTopMenuDrawer, setOpenTopMenuDrawer] = useState(false);

  // toggle app theme
  const [darkModeOff, setDarkModeOff] = useState(true);

  // toggle list display
  const [simpleModeOn, setSimpleMode] = useState(false);

  // general game data
  const [factionColors, setFactionColors] = useState("");
  const [allFactionNames, setAllFactionNames] = useState([]);

  // faction meta data
  // DB primary key - do not initialize as a number to avoid write errors!
  const [armyID, setArmyID] = useState(null);
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

  // spells
  const [allSpells, setAllSpells] = useState([]);
  const [displaySpells, setDisplaySpells] = useState([]);
  const [selectedFactionForSpell, setSelectedFactionForSpell] = useState("");

  // unit card view
  const [statCardState, setStatCardState] = useState({
    clickedUnit: {},
    lastclickedUnit: {},
    show: false,
  });

  // right side options menu
  const [showOptionButtons, setShowOptionButtons] = useState({
    clickedUnit: {},
    lastclickedUnit: {},
    show: false,
  });

  const [displayedCard, setDisplayedCard] = useState({});

  //loss calculator
  const [list, setList] = useState([]);
  const [totalPointsLost, setTotalPointsLost] = useState(0);

  // compendium Table
  const [unitData, setUnitData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedCompendiumFaction, setSelectedCompendiumFaction] = useState("");
  const [selectedSubFaction, setSelectedSubFaction] = useState("");
  const [displaySubFactions, setDisplaySubFactions] = useState([]);
  const [displayUnits, setDisplayUnits] = useState([]);
  const [selectedStatCards, setSelectedStatCards] = useState([]);
  const [compendiumTableColumns, setCompendiumTableColumns] = useState(CompendiumTableStateArray);
  const [rowNumber, setRowNumber] = useState(20);

  useEffect(() => {
    fetchTableData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchTableData = async () => {
    callAxios.fetchData(setUnitData, ALL_UNITS_URL);
  };

  useEffect(() => {
    setUnitData(compendiumTableControl.addLock(unitData));
    setTableData(unitData);
    setDisplayUnits(unitData);
  }, [unitData]); // eslint-disable-line react-hooks/exhaustive-deps

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

  /**
   * fetch spells from the Back End via REST.
   */
  useEffect(() => {
    fetchSpellData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * fetch faction colors from the Back End via REST.
   */
  useEffect(() => {
    fetchColorData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   *fetch faction names from the Back End via REST.
   */
  useEffect(() => {
    fetchFactionNameData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchFactionData = async () => {
    callAxios.fetchData(setFetchedFactions, FACTION_DTOS_URL);
  };

  const fetchItemData = async () => {
    callAxios.fetchData(setFetchedItems, ITEM_DTOS_URL);
  };

  const fetchSpellData = async () => {
    callAxios.fetchData(setAllSpells, SPELL_DTO_URL);
  };

  const fetchColorData = async () => {
    callAxios.fetchData(setFactionColors, ALL_FACTION_COLORS_URL);
  };

  const fetchFactionNameData = async () => {
    callAxios.fetchData(setAllFactionNames, ALL_FACTION_NAMES_URL);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={darkModeOff ? lightTheme : darkTheme}>
        <CssBaseline />

        <SpellProvider
          value={{
            allSpells: allSpells,
            displaySpells: displaySpells,
            selectedFactionForSpell: selectedFactionForSpell,
            setAllSpells: setAllSpells,
            setDisplaySpells: setDisplaySpells,
            setSelectedFactionForSpell: setSelectedFactionForSpell,
          }}
        >
          <GameDataProvider
            value={{
              allFactionNames: allFactionNames,
              factionColors: factionColors,
            }}
          >
            <UserProvider
              value={{
                user: user,
                userLoggedIn: userLoggedIn,
                displayLogInDialog: displayLogInDialog,
                showUserAvatarDialog: showUserAvatarDialog,
                showPasswordChangeDialog: showPasswordChangeDialog,
                setUser: setUser,
                setUserLoggedIn: setUserLoggedIn,
                setDisplayLogInDialog: setDisplayLogInDialog,
                setShowUserAvatarDialog: setShowUserAvatarDialog,
                setShowPasswordChangeDialog: setShowPasswordChangeDialog,
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
                    openTopMenuDrawer: openTopMenuDrawer,
                    setOpenMenu: setOpenMenu,
                    setblockDialog: setblockDialog,
                    setOpenTopMenuDrawer: setOpenTopMenuDrawer,
                  }}
                >
                  <LightSwitchProvider
                    value={{
                      darkModeOff: darkModeOff,
                      setDarkModeOff: setDarkModeOff,
                    }}
                  >
                    <CompendiumProvider
                      value={{
                        displayUnits: displayUnits,
                        displaySubFactions: displaySubFactions,
                        data: tableData,
                        compendiumTableColumns: compendiumTableColumns,
                        selectedFaction: selectedCompendiumFaction,
                        selectedSubFaction: selectedSubFaction,
                        selectedStatCards: selectedStatCards,
                        unitData: unitData,
                        rowNumber: rowNumber,
                        setData: setTableData,
                        setDisplaySubFactions: setDisplaySubFactions,
                        setDisplayUnits: setDisplayUnits,
                        setSelectedFaction: setSelectedCompendiumFaction,
                        setSelectedSubFaction: setSelectedSubFaction,
                        setCompendiumTableColumns: setCompendiumTableColumns,
                        setSelectedStatCards: setSelectedStatCards,
                        setUnitData: setUnitData,
                        setRowNumber: setRowNumber,
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
                            <ItemProvider
                              value={{
                                // ITEMSHOP
                                fetchedItems: fetchedItems,
                                allEquippedItems: allEquippedItems,
                                unitSelectedForShop: unitSelectedForShop,
                                setAllEquippedItems: setAllEquippedItems,
                                setUnitSelectedForShop: setUnitSelectedForShop,
                              }}
                            >
                              <SelectionProvider
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
                                <RightMenuProvider
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
                                        distinctAllySubFactions: distinctAllySubFactions,
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
                                          armyID: armyID,
                                          playerName: playerName,
                                          teamName: teamName,
                                          armyName: armyName,
                                          selectedFactionName: selectedFactionName,
                                          eventName: eventName,
                                          selectedAccessUser: selectedAccessUser,
                                          creationDate: creationDate,
                                          fetchedFactions: fetchedFactions,
                                          distinctSubFactions: distinctSubFactions,
                                          listOfAllFactionUnits: listOfAllFactionUnits,
                                          subFactionDTOs: subFactionDTOs,
                                          isFetchedArmyList: isFetchedArmyList,
                                          setArmyID: setArmyID,
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
                                            <Grid>
                                              <Switch>
                                                <Route path="/" component={landingPage} exact />
                                                <Route path="/compendium" component={CompendiumTable} exact />
                                                <Route path="/listGenerator" component={ListGenerator} />
                                                <Route path="/lossCalculator" component={LossCalculator} />
                                                <Route path="/unitCardPdfBox" component={UnitCardPdfBox} />
                                                <Route path="/spellCardPdfBox" component={SpellCardPdfBox} />
                                                <Route path="/cardCreator" component={CardCreator} exact />
                                                <Route path="/addNewAccount" component={CreateNewAccount} exact />
                                                <Route path="/spellCompendium" component={SpellCompendium} exact />
                                              </Switch>
                                            </Grid>
                                          ) : null}
                                        </CustomSnackBarProvider>
                                      </ArmyProvider>
                                    </AllyProvider>
                                  </AlternativeListProvider>
                                </RightMenuProvider>
                              </SelectionProvider>
                            </ItemProvider>
                          </SecondSubFactionProvider>
                        </TournamentRulesProvider>
                      </LossCalcProvider>
                    </CompendiumProvider>
                  </LightSwitchProvider>
                </MenuProvider>
              </ListDisplayProvider>
            </UserProvider>
          </GameDataProvider>
        </SpellProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
