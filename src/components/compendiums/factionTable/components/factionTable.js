// React
import React, { useEffect, useState } from "react";
// Axios
import axios from "axios";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
// components & functions
import SelectionInput from "../../../shared/selectionInput";
import { ALL_FACTIONS_ARRAY } from "../../../../constants/factions";
import FactionTableRow from "./factionTableRow";
import DetailedCardView from "./detailedCardView";
import ToggleColumnsMenu from "./toggleColumnsMenu";
import FactionTableHeader from "./factionTableHeader";

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
    { column: "faction", label: "Fraktion", displayed: true },
    { column: "subFaction", label: "Unterfraktion", displayed: true },
    { column: "name", label: "Name", displayed: true },
    { column: "unitType", label: "Typ", displayed: true },
    { column: "numberOfElements", label: "Elemente", displayed: true },
    { column: "standardBearer", label: "Banner", displayed: true, type: "boolean" },
    { column: "musician", label: "Musiker", displayed: true, type: "boolean" },
    { column: "wedgeFormation", label: "Keil", displayed: true, type: "boolean" },
    { column: "skirmishFormation", label: "Plänkler", displayed: true, type: "boolean" },
    { column: "squareFormation", label: "Kare", displayed: true, type: "boolean" },
    { column: "horde", label: "Horde", displayed: true, type: "boolean" },
    { column: "move", label: "Bewegen", displayed: true },
    { column: "charge", label: "Angriff", displayed: true },
    { column: "skirmish", label: "Plänkeln", displayed: true },
    { column: "hold_maneuvers", label: "Halten", displayed: true },
    { column: "unitSize", label: "Größe", displayed: true },
    { column: "armourRange", label: "FK-Rüstung", displayed: true },
    { column: "armourMelee", label: "NK-Rüstung", displayed: true },
    { column: "weapon1", label: "1. Waffe", displayed: true },
    { column: "weapon2", label: "2. Waffe", displayed: true },
    { column: "rangedWeapon", label: "Fernkampf", displayed: true },
    { column: "skillMelee", label: "NK-Fertigkeit", displayed: true },
    { column: "skillRange", label: "FK-Fertigkeit", displayed: true },
    { column: "initiative", label: "Initiative", displayed: true },
    { column: "commandStars", label: "Befehle", displayed: true, type: "command" },
    { column: "magic", label: "Magie", displayed: true, type: "magic" },
    { column: "controlZone_OverRun", label: "Kontrolbereich/Überrennen", displayed: true },
    { column: "hitpoints", label: "Trefferpunkte", displayed: true },
    { column: "fear", label: "Furcht", displayed: true },
    { column: "moral1", label: "Moral", displayed: true },
    { column: "moral2", label: "Moral", displayed: true },
    { column: "specialRules", label: "Sonderregeln", displayed: true, type: "specialRules" },
    { column: "points", label: "Punkte", displayed: true },
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
            Kompendium
          </Typography>
        </Grid>
        <Grid item container xs={12} direction="column" alignItems="flex-start">
          <SelectionInput
            className={classes.selectorInputs}
            options={setSelectorFactionNames()}
            filterFunction={selectFaction}
            clearFunction={clearFaction}
            label="Suche nach Fraktion"
          />
          <SelectionInput
            className={classes.selectorInputs}
            options={setSelectorUnitNames()}
            filterFunction={selectUnit}
            clearFunction={clearUnit}
            label="Suche nach Einheit"
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
