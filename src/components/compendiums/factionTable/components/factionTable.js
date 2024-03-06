// React
import React, { useEffect, useState } from "react";
// Axios
import axios from "axios";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Typography } from "@mui/material";
// components & functions
import SelectionInput from "../../../shared/selectionInput";
import { ALL_FACTIONS_ARRAY } from "../../../../constants/factions";
import FactionTableRow from "./factionTableRow";
import DetailedCardView from "./detailedCardView";
import ToggleColumnsMenu from "./toggleColumnsMenu";
import FactionTableHeader from "./factionTableHeader";
import { COMPENDIUM, INPUT_TEXTS } from "../../../../constants/textsAndMessages";

const useStyles = makeStyles({
  table: {
    width: "100%",
    textAlign: "center",
  },
  pageTitle: {
    marginLeft: "40px",
    fontFamily: "BreatheOfFire",
  },
  toggleGroupBox: {
    border: 1,
    borderColor: "pink",
  },
  checkBoxLabel: {
    margin: "10px",
    width: "250px",
    "& .MuiFormControlLabel-label": {
      fontFamily: "BreatheOfFire",
    },
  },
  tableRow: {
    "& :hover": {
      backgroundColor: "lightgrey",
    },
  },
});

const OverviewTable = () => {
  const classes = useStyles();

  // intialize local state
  const [receivedData, setReceivedData] = useState([]);
  const [allFactions, setAllFactions] = useState([]);
  const [singleFilteredFaction, setSingleFilteredFaction] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedStatCards, setSelectedStatCards] = useState([]);
  const [allBoxes, setAllBoxes] = useState(true);

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

  return receivedData ? (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h3" className={classes.pageTitle}>
            {COMPENDIUM.TITLE}
          </Typography>
        </Grid>
        <Grid item container xs={12} direction="column" alignItems="flex-start">
          <SelectionInput
            className={classes.selectorInputs}
            alternatives={setSelectorFactionNames()}
            filterFunction={selectFaction}
            clearFunction={clearFaction}
            label={INPUT_TEXTS.SELECT_FACTION}
          />
          <SelectionInput
            className={classes.selectorInputs}
            alternatives={setSelectorUnitNames()}
            filterFunction={selectUnit}
            clearFunction={clearUnit}
            label={INPUT_TEXTS.SELECT_UNIT}
          />
        </Grid>
        <ToggleColumnsMenu
          allBoxes={allBoxes}
          columns={columns}
          toggleGroups={toggleGroups}
          chooseColumnsToDisplay={chooseColumnsToDisplay}
          toggleAllColumns={toggleAllColumns}
          toggleGroupsOfColumns={toggleGroupsOfColumns}
        />
        <Grid item xs={12}>
          {receivedData ? (
            <table className={classes.table}>
              <FactionTableHeader columns={columns} />
              <tbody className={classes.tableRow}>
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

export default OverviewTable;
