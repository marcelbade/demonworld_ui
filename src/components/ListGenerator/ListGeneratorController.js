// react
import React, { useEffect, useState } from "react";
// axios
import axios from "axios";
// material ui
import { Grid, Fade } from "@mui/material";
// notistack
import { SnackbarProvider } from "notistack";
// icons
import SpellBookIcon from "../../assets/icons/spellbook-white.png";
// components and functions
import FactionTreeView from "./ArmySelectorView/SelectorTreeView/FactionTreeView";
import ArmyListBox from "./ArmyListView/ArmyListBox";
import AlternativeArmyLists from "./ArmySelectorView/AlternativeArmyListSelection/AlternativeArmyLists";
import MenuBox from "./RightSideMenus/MenuBox";
import MainMenuReturnButton from "../shared/MainMenuReturnButton";
import ArmySelector from "./ArmySelectorView/ArmySelector";
import CustomIcon from "../shared/statCards/CustomIcon";
import customStyledErrorMessage from "../../AppTheme/notiStackTheme";
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
import { TOOLTIPS } from "../../constants/textsAndMessages";

const ListGeneratorController = () => {
  // intialize local states
  const [fetchedFactions, setFetchedFactions] = useState([]);
  const [fetchedItems, setFetchedItems] = useState([]);
  // army meta data
  const [teamName, setTeamName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [armyName, setArmyName] = useState("");
  // selected faction
  const [selectedFactionName, setSelectedFactionName] = useState(NONE);
  const [distinctSubFactions, setDistinctSubFactions] = useState([]);
  const [listOfAllFactionUnits, setListOfAllFactionUnits] = useState([]);
  const [subFactionDTOs, setSubFactionDTOs] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  // maximum point allowance
  const [maxPointsAllowance, setMaxPointsAllowance] = useState(2000);
  // allied faction
  const [allyName, setAllyName] = useState(NO_ALLY);
  const [distinctAllySubFactions, setDistinctAllySubFactions] = useState([]);
  const [listOfAlliedUnits, setListOfAlliedUnits] = useState([]);
  const [allySubFactionDTOs, setAllySubFactionDTOs] = useState([]);
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
  // alternative lists
  const [armyHasAlternativeLists, setArmyHasAlternativeLists] = useState(false);
  const [numberOfAlternativeChoices, setNumberOfAlternativeChoices] = useState(0);
  const [selectedAlternativeList, setSelectedAlternativeList] = useState([]);
  const [alternateListSubFactions, setAlternateListSubFactions] = useState([]);
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
    const result = await axios(`http://localhost:8080/itemDTOs`);
    setFetchedItems(result.data);
  };

  //TODO: working, fine, but doesn't belong here!
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
              setListValidationResults: setListValidationResults,
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
                  displayedCard: displayedCard, // TODO
                  setStatCardState: setStatCardState,
                  setItemShopState: setItemShopState,
                  setSecondSubFactionMenuState: setSecondSubFactionMenuState,
                  closeCardDisplay: closeCardDisplay,
                  closeItemShop: closeItemShop,
                  closeSecondSubFactionMenu: closeSecondSubFactionMenu,
                  setShowOptionButtons: setShowOptionButtons,
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
                    allyIsAlternativeOption: allyIsAlternativeOption,
                    setNumberOfAlternativeChoices: setNumberOfAlternativeChoices,
                    setAlternateListSubFactions: setAlternateListSubFactions,
                    setAltArmyListSelectionComplete: setAltArmyListSelectionComplete,
                    setSelectedAlternativeList: setSelectedAlternativeList,
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
                        setArmyName: setArmyName,
                        selectedFactionName: selectedFactionName,
                        fetchedFactions: fetchedFactions,
                        subFactions: distinctSubFactions,
                        listOfAllFactionUnits: listOfAllFactionUnits,
                        subFactionDTOs: subFactionDTOs,
                        // listofAlternativeSubFactions: listofAlternativeSubFactions,
                        setSelectedFactionName: setSelectedFactionName,
                        setDistinctSubFactions: setDistinctSubFactions,
                        setListOfAllFactionUnits: setListOfAllFactionUnits,
                        setSubFactionDTOs: setSubFactionDTOs,
                        // setListofAlternativeSubFactions: setListofAlternativeSubFactions
                        setTeamName: setTeamName,
                        setPlayerName: setPlayerName,
                      }}
                    >
                      <SnackbarProvider
                        Components={{
                          error: customStyledErrorMessage,
                        }}
                        preventDuplicate
                        maxSnack={3}
                        TransitionComponent={Fade}
                        iconVariant={{
                          error: (
                            <CustomIcon //
                              icon={SpellBookIcon}
                              altText={TOOLTIPS.RULE_BOOK_TEXT}
                              height={35}
                              width={35}
                              boxHeight={45}
                              boxWidth={45}
                            />
                          ),
                        }}
                      >
                        <Grid container direction="row">
                          <Grid container item direction="column" xs={4} sx={{ paddingLeft: "2em" }}>
                            <Grid item>
                              <MainMenuReturnButton />
                            </Grid>
                            <Grid item>
                              <ArmySelector xs={1} />
                            </Grid>
                            <Grid item>
                              <AlternativeArmyLists />
                            </Grid>
                            <Grid item>
                              <FactionTreeView />
                            </Grid>
                          </Grid>
                          <Grid item xs={3}>
                            <ArmyListBox />
                          </Grid>
                          {/* </Grid>
                          </Grid> */}
                          <Grid item xs={3}>
                            <MenuBox />
                          </Grid>
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
