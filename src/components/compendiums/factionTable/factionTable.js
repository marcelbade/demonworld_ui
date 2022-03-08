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
    button: ["", true, "button"],
    faction: ["Fraktion", true],
    subFaction: ["Unterfraktion", true],
    name: ["Name", true],
    unitType: ["Typ", true],
    numberOfElements: ["Elemente", true],
    banner: ["Banner", true, "boolean"],
    musician: ["Musiker", true, "boolean"],
    wedgeFormation: ["Keil", true, "boolean"],
    skirmishFormation: ["Plänkler", true, "boolean"],
    squareFormation: ["Kare", true, "boolean"],
    horde: ["Horde", true, "boolean"],
    move: ["B", true],
    charge: ["A", true],
    skirmish: ["P", true],
    hold_maneuvers: ["H", true],
    unitSize: ["Größe", true],
    armourRange: ["Rüstung", true],
    armourMelee: ["Rüstung", true],
    weapon1: ["1. Waffe", true],
    weapon2: ["2. Waffe", true],
    rangedWeapon: ["Fernkampf", true],
    skillMelee: ["NK-Fertigkeit", true],
    skillRange: ["FK-Fertigkeit", true],
    initiative: ["Initiative", true],
    commandStars: ["Befehle", true, "command"],
    magic: ["Magie", true, "magic"],
    controlZone_OverRun: ["Kontrolbereich/Überrennen", true],
    hitpoints: ["Trefferpunkte", true],
    fear: ["Furcht", true],
    moral1: ["Moral", true],
    moral2: ["Moral", true],
    specialRules: ["Sonderregeln", true, "specialRules"],
    points: ["Punkte", true],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios(`http://localhost:8080/factions`);
    setLocalFactions(result.data);
  };

  /**
   * filters the factions JSON to get the desired faction.
   * @param {[{}]} selectedFaction
   */
  const selectFaction = (selectedFaction) => {
    setSingleFilteredFaction(localFactions.filter((lf) => lf.faction.toLowerCase() === selectedFaction.toLowerCase()));
  };

  /**
   *filters the unit names for the ones containing the search string.
   * @param {[{}]} nameSearchString
   */
  const selectUnit = (nameSearchString) => {
    setSingleFilteredFaction(localFactions.filter((lf) => lf.name.toLowerCase().includes(nameSearchString.toLowerCase())));
  };

  /**
   * show the options menu
   */
  const handleBttn = () => {
    setShowOptions(!showOptions);
  };

  /**
   * generates the options for the unit name selector. If a faction has been selected, only the names of that faction
   * are shown as options (singleFilteredFaction), otherwise ALL unit names in the games are displayed (localFactions).
   * @returns [String]
   */
  const getUnitNames = () => {
    return singleFilteredFaction.length === 0 ? localFactions.map((u) => u.name) : singleFilteredFaction.map((u) => u.name);
  };

  const openUnitCard = () => {
    setShowUnitCard(!showUnitCard);
  };

  const chooseColumnstoDisplay = (field, value) => {
    console.log(field);
    console.log(value);
  };

  // TODO: READ ME: see the columnHeader state? you need to turn that array property into a nested object.
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
        <Grid item container xs={12} direction="column" justifyContent="space-around" alignItems="flex-start">
          <SelectionInput filterData={selectFaction} options={ALL_FACTIONS_ARRAY} label="Suche nach Fraktion" />
          <SelectionInput className={classes.selectorInputs} filterData={selectUnit} options={getUnitNames()} label="Suche nach Einheit" />
        </Grid>
        <Grid item container xs={12}>
          {Object.entries(columnHeaders)
            .filter((cH) => cH[0] !== "button")
            .map((cH) => (
              <FormControlLabel
                key={uuidGenerator()}
                className={classes.checkBoxLabel}
                control={
                  <Checkbox
                    key={uuidGenerator()}
                    checked={cH[1][1]}
                    onChange={() => {
                      chooseColumnstoDisplay(cH[0], cH[1][1]);
                    }}
                  />
                }
                label={cH[1][0]}
              />
            ))}
        </Grid>
        <Grid item xs={12}>
          {localFactions ? (
            <table className={classes.table}>
              <thead>
                <tr>
                  {Object.values(columnHeaders).map((cH) => {
                    let element = cH[1] ? <th key={uuidGenerator()}>{cH[0]}</th> : null;
                    return element;
                  })}
                </tr>
              </thead>
              <tbody>
                {singleFilteredFaction.map((l) => {
                  return (
                    <>
                      <tr key={uuidGenerator()}>
                        {Object.entries(columnHeaders).map((cH) => {

                          console.log(cH)  

                          if (cH[1][2] === "boolean") {
                            return cH[1] ? <td key={uuidGenerator()}> {renderBooleanAsIcon(l.numberOfElements, l[cH[0]])} </td> : null;
                          } else if (cH[1][2] === "command") {
                            return cH[1] ? <td key={uuidGenerator()}> {renderCommandPoints(l[cH[0]])} </td> : null;
                          } else if (cH[1][2] === "magic") {
                            return cH[1] ? <td key={uuidGenerator()}> {renderMagicPoints(l[cH[0]])} </td> : null;
                          } else if (cH[1][2] === "specialRules") {
                            return cH[1] ? <td key={uuidGenerator()}> {renderSpecialRules(l[cH[0]])} </td> : null;
                          } else if (cH[1][2] === "button") {
                            return cH[1] ? (
                              <td key={uuidGenerator()}>
                                <IconButton onClick={openUnitCard}>{showUnitCard ? <CloseIcon /> : <ArrowForwardIosIcon />}</IconButton>
                              </td>
                            ) : null;
                          } else return cH[1] ? <td key={uuidGenerator()}> {l[cH[0]]} </td> : null;
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
