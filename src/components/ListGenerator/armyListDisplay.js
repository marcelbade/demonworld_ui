// React
import React, { Fragment, useEffect, useState } from "react";
// Material UI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, IconButton, TextField } from "@material-ui/core";

// icons
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

// custom imports
import { DEFAULT_ARMY_SIZE } from "../../constants/numericConstants";
import { uuidGenerator } from "../shared/sharedFunctions";

//TODO: this needs to change :D
// import { pointAllowances } from "../gameLogic/goblinRules";
import SubList from "./subList";

// TODO: remove unneeded styles
const useStyles = makeStyles({
  root: { fontFamily: "gonjuring" },
  list: { height: "70%", minHeight: "70%", maxHeight: "70%" },
  HeaderBox: {
    fontFamily: "notMaryKate",
    fontSize: "20px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    width: "60%",
    borderBottom: "solid 4px black",
  },
  total: {
    fontSize: "20px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    width: "60%",
  },
  clearIcon: {
    width: "40px",
    height: "40px",
  },
  armyName: {
    fontFamily: "BreatheOfFire",
    "& .MuiTextField": {
      fontFamily: "BreatheOfFire",
    },
  },
  bottom: { bottom: "100px" },
  withinLimit: { color: "black" },
  exceeded: { color: "red" },
  subList: {
    textAlign: "end",
  },
});

const ArmyListDisplay = (props) => {
  const classes = useStyles();

  // TODO : PUT THIS IN A CONSTANT FILE :D

  const maximum = DEFAULT_ARMY_SIZE;

  const [addedUnits, setAddedUnits] = useState([]);
  // eslint-disable-next-line  no-unused-vars
  const [faction, setFaction] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setFaction(props.factionName);
  }, [props.factionName]);

  /**
   *  Function adds the selected unit to the array that holds all selected units.
   */
  useEffect(() => {
    if (props.selectedUnit) {
      setAddedUnits([...addedUnits, props.selectedUnit]);
    }
  }, [props.selectedUnit]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function calculates the total army point cost
   */
  useEffect(() => {
    let temp = 0;
    if (addedUnits) {
      addedUnits.forEach((u) => (temp += u.points));
    }
    setTotal(temp);
  }, [addedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function calculates the remaining points.
   */
  useEffect(() => {
    props.remainingPoints(props.maxPointsValue - props.totalPointValue);
  }, [props.totalPointValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const filterUnitsForSubFaction = (allUnits, subFaction) => {
    return allUnits.filter((u) => u.subFaction === subFaction);
  };

  /**
   * Function removes a unit when its removal button is clicked.
   * @param {*} identifier
   */
  const removeUnit = (identifier) => {
    let temp = addedUnits.filter((u) => u.name + u.uniqueID !== identifier);
    setAddedUnits(temp);
  };

  /**
   * Function deletes the entire list.
   */
  const clearList = () => {
    setAddedUnits([]);
  };

  /**
   * Component creates the overall army list box but delegates the generation of the subFaction lists
   * to the subList component.
   */
  return (
    <Fragment>
      <Typography className={classes.armyName}>{props.factionName}</Typography>

      {addedUnits.length !== 0 ? (
        <IconButton
          onClick={() => {
            clearList();
          }}
          className={classes.removeButton}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      ) : null}

      <List>
        {props.distinctSubFactions.map((subFactionName) => (
          <ListItem key={uuidGenerator()}>
            <Grid container direction={"column"}>
              <Typography className={classes.HeaderBox}>
                {" "}
                {subFactionName}
              </Typography>
              <SubList
                factionName={props.factionName}
                className={classes.subList}
                subFactionName={subFactionName}
                subFactionUnits={filterUnitsForSubFaction(
                  addedUnits,
                  subFactionName
                )}
                removeUnit={removeUnit}
              />
            </Grid>
          </ListItem>
        ))}
      </List>
      {addedUnits.length !== 0 ? (
        <Typography className={classes.total}>
          Gesamtpunktzahl: {total}
          <TextField
          //TODO: max. points as promp
          // ref="maximumPoints"
          // defaultValue={maximum}
          // variant="standard"
          // value={refs.maximumPoints.getValue()}
          // onChange={setArmyMaxPoints(value)}
          />
        </Typography>
      ) : null}
    </Fragment>
  );
};

export default ArmyListDisplay;
