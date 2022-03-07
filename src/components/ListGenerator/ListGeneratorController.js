// React
import React, { useEffect, useState } from "react";
// Axios
import axios from "axios";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
// components and functions
import ArmySelection from "../shared/armySelection";
import FactionTreeView from "./treeView";
import ArmyListDisplay from "./armyListDisplay";
import { uuidGenerator } from "../shared/sharedFunctions";
import { alliesMapping } from "../gameLogic/allies";

const useStyles = makeStyles({
  root: {},
  selector: {
    marginTop: "10px",
    marginBottom: "60px",
  },
  list: {},
});

const ListGeneratorController = () => {
  const classes = useStyles();

  // intialize local states
  const [suppliedFactions, setSuppliedFactions] = useState([]);
  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [disableAllUnitSelection, setDisableAllUnitSelection] = useState(false); //  eslint-disable-line no-unused-vars
  const [maxPointsValue, setMaxPointsValue] = useState(500); //  eslint-disable-line no-unused-vars
  const [pointsLeft, setPointsLeft] = useState(maxPointsValue);
  //the current total point value of all selected units
  const [totalPointValue, setTotalPointValue] = useState(0);
  const [distinctSubFactions, setDistinctSubFactions] = useState([]);
  const [ally, setAlly] = useState("");
  const [distinctAllySubFactions, setDistinctAllySubFactions] = useState([]);

  const addPoints = (points) => {
    setTotalPointValue(totalPointValue + points);
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    findSubFactions();
    setAlly(findAlly());
    setDistinctAllySubFactions(findDistinctSubfactions(findAlly()));
  }, [selectedFaction]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function finds subfactions for the selected faction.
   */
  const findSubFactions = () => {
    setDistinctSubFactions(findDistinctSubfactions(selectedFaction));
  };

  /**
   * Function returns the allied faction, if it exists.
   *
   * @returns String The allied Faction or an empty String.
   */
  const findAlly = () => {
    return alliesMapping[selectedFaction] ? alliesMapping[selectedFaction] : "";
  };

  /**
   * call BE to get all game factions as JSON.
   */
  const fetchData = async () => {
    const result = await axios(`http://localhost:8080/factions`);
    setSuppliedFactions(result.data);
  };

  /**
   * Function filters the localFactions JSON  down to the selected faction.
   *
   * @param {[{}]} selectedFaction
   */
  const filterForSelectedFaction = (selectedFaction) => {
    let result = suppliedFactions.filter(
      (f) => f.faction.toLowerCase() === selectedFaction.toLowerCase()
    );
    return result;
  };

  /**
   * Function returns all distinct subFactions of a selected faction.
   * @returns []
   */
  const findDistinctSubfactions = (faction) => {
    let distinctSubFactions = [];

    filterForSelectedFaction(faction).forEach((f) => {
      if (!distinctSubFactions.includes(f.subFaction)) {
        distinctSubFactions.push(f.subFaction);
      }
    });

    return distinctSubFactions;
  };

  /**
   * Functions adds a UUID as unique id so the user can select the
   * same unit twice in a row. Without it, the useEffect does not fire, since the
   * unit objects are identical!
   *
   * @param {} unit
   * @returns {} unit object with a random ID
   */
  const addUniqueIdToUnit = (unit) => {
    const randomID = uuidGenerator();
    return { ...unit, uniqueID: randomID };
  };

  /**
   * Abstraction layer function. Is passed to every button
   * in the tree view for calls. sets the SelectedUnit variable that is passed
   * to the list to be added.
   *  calls the
   * @param {} unit
   */
  const selectUnit = (unit) => {
    setSelectedUnit(addUniqueIdToUnit(unit));
  };

  const remainingPoints = (pointValue) => {
    setPointsLeft(pointValue);
  };

  return suppliedFactions ? (
    <Grid container direction="row">
      <Grid container xs={2} item direction="column" className={classes.root}>
        <Grid item className={classes.selector}>
          <ArmySelection filterData={setSelectedFaction} />
        </Grid>

        <FactionTreeView
          addPoints={addPoints}
          selectUnit={selectUnit}
          factionName={selectedFaction}
          faction={filterForSelectedFaction(selectedFaction)}
          distinctSubFactions={distinctSubFactions}
          allyName={ally}
          ally={filterForSelectedFaction(ally)}
          distinctAllySubFactions={distinctAllySubFactions}
          pointsLeft={pointsLeft}
          disableAllUnitSelection={disableAllUnitSelection}
        />
      </Grid>

      <Grid xs={10} item>
        <ArmyListDisplay
          remainingPoints={remainingPoints}
          setTotalPointValue={setTotalPointValue}
          factionName={selectedFaction}
          distinctSubFactions={distinctSubFactions}
          allyName={ally}
          distinctAllySubFactions={distinctAllySubFactions}
          maxPointsValue={maxPointsValue}
          selectedUnit={selectedUnit}
          totalPointValue={totalPointValue}
          //CSS
          className={classes.list}
        />
      </Grid>
    </Grid>
  ) : null;
};

export default ListGeneratorController;
