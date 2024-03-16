// React
import React, { useEffect, useState } from "react";
// Axios
import axios from "axios";
import makeStyles from "@mui/styles/makeStyles";
import { AppBar, Dialog, Grid, IconButton, Toolbar, Typography, Slide } from "@mui/material";
// components & functions
import SelectionInput from "../../../shared/selectionInput";
import { ALL_FACTIONS_ARRAY } from "../../../../constants/factions";
import FactionTableRow from "./factionTableRow";
import DetailedCardView from "./detailedCardView";
import ToggleColumnsMenu from "./toggleColumnsMenu";
import FactionTableHeader from "./factionTableHeader";
import { COMPENDIUM, INPUT_TEXTS } from "../../../../constants/textsAndMessages";
import LightSwitch from "../../../shared/LightSwitch";
import MainMenuReturnButton from "../../../shared/MainMenuReturnButton";
//icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles({
  test: {
    backgroundColor: "pink",
  },
  test2: {
    backgroundColor: "blue",
  },
  topButtons: {
    paddingRight: "3em",
  },
  table: {
    width: "100%",
    textAlign: "center",
  },
  pageTitle: {
    marginLeft: "0.5em",
    fontFamily: "NotMaryKate",
  },
  toggleGroupBox: {
    border: 1,
    borderColor: "pink",
  },
  checkBoxLabel: {
    margin: "10px",
    width: "250px",
    "& .MuiFormControlLabel-label": {
      fontFamily: "NotMaryKate",
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FactionTable = () => {
  const classes = useStyles();

  // intialize local state
  const [receivedData, setReceivedData] = useState([]);
  const [allFactions, setAllFactions] = useState([]);
  const [singleFilteredFaction, setSingleFilteredFaction] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedStatCards, setSelectedStatCards] = useState([]);
  const [allBoxes, setAllBoxes] = useState(true);
  const [openOptions, setOpenOptions] = useState(false);

  const [columns, setColumns] = useState([
    { column: "button", label: "", displayed: true, type: "button" },
    { column: "faction", label: COMPENDIUM.FACTION, displayed: true },
    { column: "subFaction", label: COMPENDIUM.SUBFACTION, displayed: true },
    { column: "name", label: COMPENDIUM.NAME, displayed: true },
    { column: "unitType", label: COMPENDIUM.UNITTYPE, displayed: true },
    { column: "numberOfElements", label: COMPENDIUM.NUMBEROFELEMENTS, displayed: true },
    { column: "standardBearer", label: COMPENDIUM.STANDARDBEARER, displayed: true, type: "boolean" },
    { column: "musician", label: COMPENDIUM.MUSICIAN, displayed: true, type: "boolean" },
    { column: "wedgeFormation", label: COMPENDIUM.WEDGEFORMATION, displayed: true, type: "boolean" },
    { column: "skirmishFormation", label: COMPENDIUM.SKIRMISHFORMATION, displayed: true, type: "boolean" },
    { column: "squareFormation", label: COMPENDIUM.NAME, displayed: true, type: "boolean" },
    { column: "horde", label: COMPENDIUM.HORDE, displayed: true, type: "boolean" },
    { column: "move", label: COMPENDIUM.MOVE, displayed: true },
    { column: "charge", label: COMPENDIUM.CHARGE, displayed: true },
    { column: "skirmish", label: COMPENDIUM.SKIRMISH, displayed: true },
    { column: "hold_maneuvers", label: COMPENDIUM.HOLD_MANEUVERS, displayed: true },
    { column: "unitSize", label: COMPENDIUM.UNIT_SIZE, displayed: true },
    { column: "armourRange", label: COMPENDIUM.ARMOURRANGE, displayed: true },
    { column: "armourMelee", label: COMPENDIUM.ARMOURMELEE, displayed: true },
    { column: "weapon1", label: COMPENDIUM.WEAPON1, displayed: true },
    { column: "weapon2", label: COMPENDIUM.WEAPON2, displayed: true },
    { column: "rangedWeapon", label: COMPENDIUM.RANGEDWEAPON, displayed: true },
    { column: "skillMelee", label: COMPENDIUM.SKILLMELEE, displayed: true },
    { column: "skillRange", label: COMPENDIUM.SKILLRANGE, displayed: true },
    { column: "initiative", label: COMPENDIUM.INITIATIVE, displayed: true },
    { column: "commandStars", label: COMPENDIUM.COMMANDSTARS, displayed: true, type: "command" },
    { column: "magic", label: COMPENDIUM.MAGIC, displayed: true, type: "magic" },
    { column: "controlZone_OverRun", label: COMPENDIUM.CONTROLZONE_OVERRUN, displayed: true },
    { column: "hitpoints", label: COMPENDIUM.HITPOINTS, displayed: true },
    { column: "fear", label: COMPENDIUM.FEAR, displayed: true },
    { column: "moral1", label: COMPENDIUM.MORAL1, displayed: true },
    { column: "moral2", label: COMPENDIUM.MORAL2, displayed: true },
    { column: "specialRules", label: COMPENDIUM.SPECIALRULES, displayed: true, type: "specialRules" },
    { column: "points", label: COMPENDIUM.POINTS, displayed: true },
  ]);

  const [toggleGroups, setToggleGroups] = useState([
    { name: "naming", stats: ["faction", "subFaction", "name"], displayed: true },
    {
      name: "unitCharacteristics",
      stats: ["banner", "musician", "wedgeFormation", "skirmishFormation", "squareFormation", "horde"],
      displayed: true,
    },
    { name: "movement", stats: ["move", "charge", "skirmish", "hold_maneuvers"], displayed: true },
    { name: "defense", stats: ["unitSize", "armourRange", "armourMelee"], displayed: true },
    { name: "offense", stats: ["weapon1", "weapon2", "rangedWeapon", "skillMelee", "skillRange", "initiative"], displayed: true },
    { name: "heroCharacteristics", stats: ["commandStars", "magic", "controlZone_OverRun"], displayed: true },
    { name: "vigor", stats: ["hitpoints", "fear", "moral1", "moral2"], displayed: true },
    { name: "napoints_rules", stats: ["specialRules", "points"], displayed: true },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios(`http://localhost:8080/factions`);
    setReceivedData(result.data);
  };

  useEffect(() => {
    setAllFactions(receivedData);
    setTableData(receivedData);
  }, [receivedData]);

  /**
   * Generates the options for the faction name selector.
   * @returns [String]
   */
  const setSelectorFactionNames = () => {
    return ALL_FACTIONS_ARRAY;
  };

  /**
   * Generates the options for the unit name selector. If a faction has been selected, only the names of that faction
   * are shown as options (singleFilteredFaction), otherwise ALL unit names in the games are displayed (localFactions).
   * @returns [String]
   */
  const setSelectorUnitNames = () => {
    return singleFilteredFaction.length === 0 ? allFactions.map((u) => u.unitName) : singleFilteredFaction.map((u) => u.unitName);
  };

  /**
   * OnChange function for faction name selector. Allows user to type and see the matching factions in real time.
   * setTableData changes table content after selection.
   * @param {[{}]} selectedFaction
   */
  const selectFaction = (selectedFaction) => {
    setSingleFilteredFaction(allFactions.filter((u) => u.faction.toLowerCase() === selectedFaction.toLowerCase()));
    setTableData(allFactions.filter((u) => u.faction.toLowerCase() === selectedFaction.toLowerCase()));
  };

  /**
   *  "onChange" function for the unit name selector. getUnitNames() resets it
   *  after the selection to show all units of the faction.
   * @param {[{}]} nameSearchString
   */
  const selectUnit = (nameSearchString) => {
    setSelectorUnitNames();
    setTableData(allFactions.filter((lf) => lf.unitName.toLowerCase().includes(nameSearchString.toLowerCase())));
  };

  const clearFaction = () => {
    setTableData(allFactions);
  };

  const clearUnit = () => {
    setTableData(singleFilteredFaction);
  };

  const toggleUnitCard = (unit) => {
    const id = unit.faction + unit.unitName;

    selectedStatCards.includes(id)
      ? setSelectedStatCards(selectedStatCards.filter((c) => c !== id))
      : setSelectedStatCards([...selectedStatCards, id]);
  };

  /**
   * Function triggered by the Checkboxes. Controls which columns of the table are displayed by
   * setting the displayed property.
   * @param {String} column
   * @param {boolean} isChecked
   */
  const chooseColumnsToDisplay = (column, isChecked) => {
    setColumns(
      columns.map((c) => {
        if (c.column === column) {
          c.displayed = !isChecked;
        }
        return c;
      })
    );
  };

  /**
   * Function toggles all table columns.
   */
  const toggleAllColumns = () => {
    setAllBoxes(!allBoxes);
    columns.forEach((u) => (u.displayed = !allBoxes));
  };

  /**
   * Function toggles all table columns of one Group.
   *
   * @param {String} name
   * @param {[String]} columnGroup
   * @param {boolean} isChecked
   */
  const toggleGroupsOfColumns = (name, columnGroup, isChecked) => {
    setToggleGroups(
      toggleGroups.map((t) => {
        if (t.unitName === name) {
          t.displayed = !isChecked;
        }
        return t;
      })
    );

    setColumns(
      columns.map((c) => {
        if (columnGroup.includes(c.column)) {
          c.displayed = !isChecked;
        }
        return c;
      })
    );
  };

  const handleOptionsOpen = () => {
    setOpenOptions(true);
  };

  console.log("openOptions");
  console.log(openOptions);

  const handleOptionsClose = () => {
    setOpenOptions(false);
  };

  return receivedData ? (
    <>
      <Grid container>
        <Grid
          item //
          container
          xs={12}
          alignContent="flex-start"
          direction="row"
          justifyContent="space-between"
          className={classes.topButtons}
        >
          <MainMenuReturnButton />
          <Grid
            item //
            container
            xs={1}
            alignContent="flex-start"
            justifyContent="end"
          >
            <LightSwitch />
            <IconButton onClick={handleOptionsOpen}>
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item container direction="row">
          <Grid item xs={8}>
            <Typography variant="h3" className={classes.pageTitle}>
              {COMPENDIUM.TITLE}
            </Typography>

            <SelectionInput
              alternatives={setSelectorFactionNames()}
              filterFunction={selectFaction}
              clearFunction={clearFaction}
              label={INPUT_TEXTS.SELECT_FACTION}
            />
            <SelectionInput
              alternatives={setSelectorUnitNames()}
              filterFunction={selectUnit}
              clearFunction={clearUnit}
              label={INPUT_TEXTS.SELECT_UNIT}
            />
          </Grid>
        </Grid>

        <Dialog
          open={openOptions} //
          onClose={handleOptionsClose}
          TransitionComponent={Transition}
          // override CSS for paper component child
          PaperProps={{
            sx: {
              minWidth: "80vw",
              minHeight: "80vh",
            },
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleOptionsClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {COMPENDIUM.COLUMNS}
              </Typography>
            </Toolbar>
          </AppBar>
          <ToggleColumnsMenu
            allBoxes={allBoxes}
            columns={columns}
            toggleGroups={toggleGroups}
            chooseColumnsToDisplay={chooseColumnsToDisplay}
            toggleAllColumns={toggleAllColumns}
            toggleGroupsOfColumns={toggleGroupsOfColumns}
          />
        </Dialog>

        <Grid item xs={12}>
          {receivedData ? (
            <table className={classes.table} rules="none">
              <FactionTableHeader columns={columns} />
              <tbody>
                {tableData.map((unit) => {
                  return (
                    <>
                      <FactionTableRow
                        columns={columns}
                        unit={unit}
                        selectedStatCards={selectedStatCards}
                        toggleUnitCard={toggleUnitCard}
                      />
                      <DetailedCardView selectedCards={selectedStatCards} unit={unit} />
                    </>
                  );
                })}
              </tbody>
            </table>
          ) : null}
        </Grid>
      </Grid>
    </>
  ) : null;
};

export default FactionTable;
