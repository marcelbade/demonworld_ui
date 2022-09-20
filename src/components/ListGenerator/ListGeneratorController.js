// React
import React, { useEffect, useState } from "react";
// Axios
import axios from "axios";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
// components and functions
import { ruleValidation as selectvalidatorFor } from "../gameLogic/useRuleValidation";
import SelectionInput from "../shared/selectionInput";
import FactionTreeView from "./treeView";
import ArmyListDisplay from "./armyListDisplay";
import { uuidGenerator } from "../shared/sharedFunctions";
import { alliesMapping } from "../gameLogic/allies";
import { ALL_FACTIONS_ARRAY } from "../../constants/factions";

const useStyles = makeStyles({
  root: {},
  selector: {
    marginTop: "10px",
    paddingLeft: "10px",
    marginBottom: "60px",
  },
  list: {},
});

const ListGeneratorController = () => {
  const classes = useStyles();

  // intialize local states
  const [suppliedFactions, setSuppliedFactions] = useState([]);
  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [disableAllUnitSelection, setDisableAllUnitSelection] = useState(false); //  eslint-disable-line no-unused-vars
  const [maxPointsValue, setMaxPointsValue] = useState(2000); //  eslint-disable-line no-unused-vars
  const [pointsLeft, setPointsLeft] = useState(maxPointsValue);
  const [validator, setValidator] = useState(null);
  //the current total point value of all selected units
  const [totalPointValue, setTotalPointValue] = useState(0);
  const [distinctSubFactions, setDistinctSubFactions] = useState([]);
  const [ally, setAlly] = useState("");
  const [distinctAllySubFactions, setDistinctAllySubFactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // when faction selected from drop down
  useEffect(() => {
    findSubFactions();
    setAlly(findAlly());
    setDistinctAllySubFactions(findDistinctSubfactions(findAlly()));
    setValidator(selectvalidatorFor(selectedFaction));
  }, [selectedFaction]); // eslint-disable-line react-hooks/exhaustive-deps

  //TODO TEST ONLY; PLEASE DELETE
  useEffect(() => {
    console.log("validator ->");
    console.log(validator);
    if (validator) console.log(validator.testSubFactionRules());
  }, [validator]);

  //calculate total point value for army
  useEffect(() => {
    let pointTotal = 0;
    if (selectedUnits) {
      selectedUnits.forEach((u) => (pointTotal += u.points));
    }
    setTotalPointValue(pointTotal);

    //TODO here the custom hook neeeds to be added...
  }, [selectedUnits]);

  const fetchData = async () => {
    const result = await axios(`http://localhost:8080/factions`);
    setSuppliedFactions(result.data);
  };

  // Function filters the localFactions JSON down to the selected faction.
  const filterForSelectedFaction = (selectedFaction) => {
    let result = suppliedFactions.filter((f) => f.faction.toLowerCase() === selectedFaction.toLowerCase());
    return result;
  };

  // Function finds subfactions for the selected faction.
  const findSubFactions = () => {
    setDistinctSubFactions(findDistinctSubfactions(selectedFaction));
  };

  // returns allied faction, if it exists
  const findAlly = () => {
    return alliesMapping[selectedFaction] ? alliesMapping[selectedFaction] : "";
  };

  // Function returns all distinct subFactions of a selected faction.
  const findDistinctSubfactions = (faction) => {
    let distinctSubFactions = [];

    filterForSelectedFaction(faction).forEach((f) => {
      if (!distinctSubFactions.includes(f.subFaction)) {
        distinctSubFactions.push(f.subFaction);
      }
    });

    return distinctSubFactions;
  };

  const selectUnit = (unit) => {
    setSelectedUnits([...selectedUnits, addUniqueIdToUnit(unit)]);

    //TODO: This were you add the validation and show the error  :D

    // if (isChoiceValid()) setSelectedUnits([...selectedUnits, addUniqueIdToUnit(unit)]);
    // else console.log("toast message!");
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

  const removeUnit = (identifier) => {
    let filtered = selectedUnits.filter((u) => u.name + u.uniqueID !== identifier);
    setSelectedUnits(filtered);
  };

  const clearList = () => {
    setSelectedUnits([]);
  };

  const remainingPoints = (pointValue) => {
    setPointsLeft(pointValue);
  };

  return suppliedFactions ? (
    <Grid container direction="row">
      <Grid container xs={4} item direction="column" className={classes.root}>
        <SelectionInput
          className={classes.selector}
          filterFunction={setSelectedFaction}
          options={ALL_FACTIONS_ARRAY}
          label="Suche nach Fraktion"
        />
        <FactionTreeView
          className={classes.selector}
          // addPoints={addPoints}
          selectUnit={selectUnit}
          ally={filterForSelectedFaction(ally)}
          faction={filterForSelectedFaction(selectedFaction)}
          distinctSubFactions={distinctSubFactions}
          allyName={ally}
          factionName={selectedFaction}
          distinctAllySubFactions={distinctAllySubFactions}
          pointsLeft={pointsLeft}
          disableAllUnitSelection={disableAllUnitSelection}
        />
      </Grid>

      <Grid xs={6} item>
        <ArmyListDisplay
          remainingPoints={remainingPoints}
          setTotalPointValue={setTotalPointValue}
          clearList={clearList}
          removeUnit={removeUnit}
          selectedFaction={selectedFaction}
          addedUnits={selectedUnits}
          factionName={selectedFaction}
          distinctSubFactions={distinctSubFactions}
          allyName={ally}
          distinctAllySubFactions={distinctAllySubFactions}
          maxPointsValue={maxPointsValue}
          totalPointValue={totalPointValue}
          validator={validator}
          //CSS
          className={classes.list}
        />
      </Grid>
    </Grid>
  ) : null;
};

export default ListGeneratorController;
