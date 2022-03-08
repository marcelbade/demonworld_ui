// React
import React, { useEffect, useState } from "react";
// Axios
import axios from "axios";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Paper, Checkbox, FormControl, FormGroup, FormControlLabel, Typography } from "@material-ui/core";

// icons
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CloseIcon from "@material-ui/icons/Close";
// clsx
import clsx from "clsx";
// components & functions
import {
  renderBooleanAsIcon,
  renderMagicPoints,
  renderSpecialRules,
  unitOrCmdCard,
  renderCommandPoints,
} from "./depencies/factionTableFunctions";
import TableOptions from "./OptionsMenuDialog";
import SelectionInput from "../../shared/selectionInput";
import { uuidGenerator } from "../../shared/sharedFunctions";
import { ALL_FACTIONS_ARRAY } from "../../../constants/factions";

const useStyles = makeStyles({
  table: {
    width: "100%",
    textAlign: "center",
  },
  pageTitle: {
    marginLeft: "40px",
    fontFamily: "BreatheOfFire",
  },
  checkBoxLabel: {
    margin: "10px",
    width: "250px",
    "& .MuiFormControlLabel-label": {
      fontFamily: "BreatheOfFire",
    },
  },
});

const OverviewTable = () => {
  const classes = useStyles();

  // intialize local state
  const [localFactions, setLocalFactions] = useState([]);
  const [singleFilteredFaction, setSingleFilteredFaction] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showUnitCard, setShowUnitCard] = useState(false);
  const [columnHeaders, setColumnHeaders] = useState({
    button: { label: "", displayed: true, type: "button" },
    faction: { label: "Fraktion", displayed: true },
    subFaction: { label: "Unterfraktion", displayed: true },
    name: { label: "Name", displayed: true },
    unitType: { label: "Typ", displayed: true },
    numberOfElements: { label: "Elemente", displayed: true },
    banner: { label: "Banner", displayed: true, type: "boolean" },
    musician: { label: "Musiker", displayed: true, type: "boolean" },
    wedgeFormation: { label: "Keil", displayed: true, type: "boolean" },
    skirmishFormation: { label: "Plänkler", displayed: true, type: "boolean" },
    squareFormation: { label: "Kare", displayed: true, type: "boolean" },
    horde: { label: "Horde", displayed: true, type: "boolean" },
    move: { label: "B", displayed: true },
    charge: { label: "A", displayed: true },
    skirmish: { label: "P", displayed: true },
    hold_maneuvers: { label: "H", displayed: true },
    unitSize: { label: "Größe", displayed: true },
    armourRange: { label: "Rüstung", displayed: true },
    armourMelee: { label: "Rüstung", displayed: true },
    weapon1: { label: "1. Waffe", displayed: true },
    weapon2: { label: "2. Waffe", displayed: true },
    rangedWeapon: { label: "Fernkampf", displayed: true },
    skillMelee: { label: "NK-Fertigkeit", displayed: true },
    skillRange: { label: "FK-Fertigkeit", displayed: true },
    initiative: { label: "Initiative", displayed: true },
    commandStars: { label: "Befehle", displayed: true, type: "command" },
    magic: { label: "Magie", displayed: true, type: "magic" },
    controlZone_OverRun: { label: "Kontrolbereich/Überrennen", displayed: true },
    hitpoints: { label: "Trefferpunkte", displayed: true },
    fear: { label: "Furcht", displayed: true },
    moral1: { label: "Moral", displayed: true },
    moral2: { label: "Moral", displayed: true },
    specialRules: { label: "Sonderregeln", displayed: true, type: "specialRules" },
    points: { label: "Punkte", displayed: true },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios(`http://localhost:8080/factions`);
    setLocalFactions(result.data);
  };

  /**
   *filters the unit names for the ones containing the search string.
   * @param {[{}]} nameSearchString
   */
  const selectUnit = (nameSearchString) => {
    setSingleFilteredFaction(localFactions.filter((lf) => lf.name.toLowerCase().includes(nameSearchString.toLowerCase())));
  };

  /**
   * generates the options for the unit name selector. If a faction has been selected, only the names of that faction
   * are shown as options (singleFilteredFaction), otherwise ALL unit names in the games are displayed (localFactions).
   * @returns [String]
   */
  const getUnitNames = () => {
    return singleFilteredFaction.length === 0 ? localFactions.map((u) => u.name) : singleFilteredFaction.map((u) => u.name);
  };

  /**
   * filters the factions JSON to get the desired faction.
   * @param {[{}]} selectedFaction
   */
  const selectFaction = (selectedFaction) => {
    setSingleFilteredFaction(localFactions.filter((lf) => lf.faction.toLowerCase() === selectedFaction.toLowerCase()));
  };

  const openUnitCard = () => {
    setShowUnitCard(!showUnitCard);
  };

  /**
   * Function triggered by the Checkboxes. Controls which columns of the table are displayed by
   * setting the displayed property.
   * @param {String} column
   * @param {boolean} isChecked
   */
  const chooseColumnstoDisplay = (column, isChecked) => {
    setColumnHeaders({
      ...columnHeaders,
      [column]: {
        ...columnHeaders[column],
        displayed: !isChecked,
      },
    });
  };

  // TODO: READ ME: see if you can change the logic so it doesnt show all unit cards :D
  // TODO: READ ME: the selectors dont work properly.
  /**
   * THE TABLE
   */
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h3" className={classes.pageTitle}>
            Kompendium
          </Typography>
        </Grid>
        <Grid item container xs={12} direction="column" alignItems="flex-start">
          <SelectionInput filterData={selectFaction} options={ALL_FACTIONS_ARRAY} label="Suche nach Fraktion" />
          <SelectionInput className={classes.selectorInputs} filterData={selectUnit} options={getUnitNames()} label="Suche nach Einheit" />
        </Grid>
        <Grid item container xs={12}>
          {Object.entries(columnHeaders)
            .filter(([column, value]) => column !== "button")
            .map(([column, value]) => (
              <FormControlLabel
                key={uuidGenerator()}
                className={classes.checkBoxLabel}
                control={
                  <Checkbox
                    key={uuidGenerator()}
                    checked={value.displayed}
                    onChange={() => {
                      chooseColumnstoDisplay(column, value.displayed);
                    }}
                  />
                }
                label={value.label}
              />
            ))}
        </Grid>
        <Grid item xs={12}>
          {localFactions ? (
            <table className={classes.table}>
              <thead>
                <tr>
                  {Object.values(columnHeaders).map((value) => {
                    let element = value.displayed ? <th key={uuidGenerator()}>{value.label}</th> : null;
                    return element;
                  })}
                </tr>
              </thead>
              <tbody>
                {singleFilteredFaction.map((l) => {
                  return (
                    <>
                      <tr key={uuidGenerator()}>
                        {Object.entries(columnHeaders).map(([column, value]) => {
                          switch (value.type) {
                            case "boolean":
                              return value.displayed ? (
                                <td column={uuidGenerator()}> {renderBooleanAsIcon(l.numberOfElements, l[column])} </td>
                              ) : null;

                            case "command":
                              return value.displayed ? <td column={uuidGenerator()}> {renderCommandPoints(l[column])} </td> : null;

                            case "magic":
                              return value.displayed ? <td column={uuidGenerator()}> {renderMagicPoints(l[column])} </td> : null;

                            case "specialRules":
                              return value.displayed ? <td column={uuidGenerator()}> {renderSpecialRules(l[column])} </td> : null;

                            case "button":
                              return value.displayed ? (
                                <td key={uuidGenerator()}>
                                  <IconButton onClick={openUnitCard}>{showUnitCard ? <CloseIcon /> : <ArrowForwardIosIcon />}</IconButton>
                                </td>
                              ) : null;

                            default:
                              return value.displayed ? <td key={uuidGenerator()}> {l[column]} </td> : null;
                          }
                        })}
                      </tr>
                      <tr key={uuidGenerator()}>
                        <td key={uuidGenerator()} colSpan="100%">
                          {showUnitCard ? unitOrCmdCard(l) : null}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

export default OverviewTable;
