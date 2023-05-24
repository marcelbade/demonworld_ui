// React
import React, { Fragment, useEffect, useContext, useState } from "react";
// Material UI
import { List, ListItem, makeStyles, ListItemText, Button } from "@material-ui/core";
// icons
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { displayUnitCost } from "../../../compendiums/factionTable/depencies/factionTableFunctions";
import { ruleObjectProvider } from "../../../gameLogic/globalRules/ruleObjectProvider";
import { unitCardMultiSort, uuidGenerator } from "../../../shared/sharedFunctions";
import EquipmentList from "./EquipmentList";
import SubListStats from "./SubListStats";
import ItemCardButtons from "./ItemCardButtons";

const useStyles = makeStyles({
  buttons: {
    fontFamily: "NotMaryKate",
    marginRight: "1em",
    "&:hover": {
      backgroundColor: "grey",
      color: "red",
    },
  },
  text: {
    width: "40%",
    fontFamily: "NotMaryKate",
  },
  list: {
    padding: "0px",
    margin: "0px",
  },
  element: {
    width: "80%",
    margin: "-1em",
    padding: "0em",
  },
});

const SubList = (props) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  const [subFactionTotal, setSubFactionTotal] = useState(0);
  const [percentages, setPercentages] = useState({
    min: 0,
    max: 0,
  });

  /**
   * Useffect calculates the point total for the sub faction and validates it.
   */
  useEffect(() => {
    let total = 0;
    if (props.subFactionUnits) {
      props.subFactionUnits.forEach((u) => (total += displayUnitCost(u)));
    }
    setSubFactionTotal(total);
  }, [props.subFactionUnits]);

  useEffect(() => {
    setPercentages({ min: displayPercentages().min, max: displayPercentages().max });
  }, [contextArmy.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Removes the unit.
   * @param {unit.name + hash code} identifier
   */
  const removeUnit = (identifier) => {
    contextArmy.removeUnit(identifier);
  };

  /**
   * Function calculates the minimum and maximum percentage allowance for the subfaction.
   * @returns Object with min and
   */
  const displayPercentages = () => {
    const subFaction = props.subFactionName;
    const ruleArray = ruleObjectProvider(contextArmy.selectedFactionName);
    const filteredArray = ruleArray.filter((r) => r.cardNames.includes(subFaction));

    let minPercentage = 0;
    let maxPercentage = 0;

    // when changing armies, the rulearray briefly becomes undefined.
    if (filteredArray.length !== 0) {
      minPercentage = filteredArray[0].min * 100;
      maxPercentage = filteredArray[0].max * 100;
    }

    return {
      min: minPercentage,
      max: maxPercentage,
    };
  };

  /**
   * The component creates the list for a single sub faction.
   * An entry contains:
   *  - the unit name
   *  - points
   *  - button row to select different kinds of items |< in flux :D
   *  - a button to delete the entire entry.
   * The buttons only appear when the user hovers the mouse over the entry.
   */
  return (
    <Fragment>
      {unitCardMultiSort(props.subFactionUnits).map((u, i) => {
        const identifier = u.unitName + u.uniqueID;
        return (
          <List className={classes.list} key={uuidGenerator()}>
            <ListItem key={uuidGenerator()} className={classes.element}>
              {/* REMOVE BUTTON */}
              <Button
                key={uuidGenerator()}
                onClick={() => {
                  removeUnit(identifier);
                }}
              >
                <RemoveCircleOutlineIcon key={uuidGenerator()} />
              </Button>
              {/* NAME + POINTS + BUTTONS*/}
              <ListItemText
                key={uuidGenerator()}
                primary={<span className={classes.text}>{u.unitName}</span>}
                secondary={<span className={classes.text}>{u.points}</span>}
              />
              {/* BUTTONS */}
              <ItemCardButtons u={u} key={uuidGenerator()} />
            </ListItem>
            <ListItem key={uuidGenerator()}>
              <EquipmentList key={uuidGenerator()} u={u} identifier={identifier} />
            </ListItem>
          </List>
        );
      })}
      {/* SUB LIST STATS */}
      <SubListStats key={uuidGenerator()} subFactionTotal={subFactionTotal} percentages={percentages} />
    </Fragment>
  );
};

export default SubList;
