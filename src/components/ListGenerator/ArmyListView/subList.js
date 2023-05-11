// React
import React, { Fragment, useEffect, useContext, useState } from "react";
// Material UI
import { List, ListItem, IconButton, Typography, Button, Grid, makeStyles } from "@material-ui/core";
// icons
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { displayUnitCost } from "../../compendiums/factionTable/depencies/factionTableFunctions";
import { ruleObjectProvider } from "../../gameLogic/globalRules/ruleObjectProvider";
import { unitCardMultiSort } from "../../shared/sharedFunctions";
// clsx
import clsx from "clsx";

const useStyles = makeStyles({
  gearListHeader: {
    testAlign: "right",
    color: "red",
  },
  deleteBttn: {
    padding: "0",
    marginRight: "1.5em",
  },
  buttons: {
    fontFamily: "NotMaryKate",
    marginRight: "1em",
    "&:hover": {
      backgroundColor: "grey",
      color: "red",
    },
  },
  equipment: {
    paddingLeft: "3em",
  },
  line: {
    marginTop: "0.5em",
    marginBottom: "0.5em",
    borderBottom: "solid black 0.1em",
    display: "block",
  },
  typographyFont: {
    fontFamily: "NotMaryKate",
  },
  subTotal: {
    fontFamily: "NotMaryKate",
  },
  textMargin: {
    marginRight: "3em",
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
   * Removes the item.
   * @param {unit.name + hash code} identifier
   * @param {array index } i
   */
  const removeItem = (identifier, i) => {
    contextArmy.removeItem(identifier, i);
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

  const displayCurrentPercentage = () => {
    return (subFactionTotal / contextArmy.maxPointsValue) * 100;
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
      <List>
        {unitCardMultiSort(props.subFactionUnits).map((u) => {
          const identifier = u.unitName + u.uniqueID;
          return (
            <ListItem key={identifier}>
              <Grid container direction="column">
                {/* FIRST ROW  */}
                <Grid container item direction="row">
                  {/* REMOVE BUTTON */}
                  <Grid item xs={1}>
                    <IconButton
                      className={classes.deleteBttn}
                      onClick={() => {
                        removeUnit(identifier);
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Grid>
                  {/* NAME */}
                  <Grid item xs={2}>
                    <Typography variant="button" className={classes.typographyFont}>
                      {u.unitName}{" "}
                    </Typography>
                  </Grid>
                  {/* POINTS */}
                  <Grid item xs={1}>
                    <Typography variant="button" className={classes.typographyFont}>
                      {u.points}
                    </Typography>
                  </Grid>
                  {/* BUTTONS */}
                  <Grid item xs={8} direction="row">
                    <Button
                      className={classes.buttons}
                      variant="outlined"
                      onClick={() => {
                        contextArmy.setUnitSelectedForShop(u);
                        contextArmy.toggleBetweenItemShops(u);
                      }}
                    >
                      Gegenstände
                    </Button>
                    <Button
                      className={classes.buttons}
                      variant="outlined"
                      onClick={() => {
                        contextArmy.toggleBetweenCards(u);
                      }}
                    >
                      Kartenvorschau
                    </Button>
                  </Grid>
                </Grid>
                {/* SECOND ROW  */}
                <Grid container item xs={12} direction="row">
                  {/* ITEMS */}
                  <Grid container item direction="row">
                    <Typography>
                      {u.equipment.length !== 0 ? <span className={classes.line}></span> : null}
                      {u.equipment.length !== 0
                        ? u.equipment.map((e, i) => {
                            return (
                              <Grid item xs={12} container direction="row" className={classes.equipment} key={identifier}>
                                <Grid item xs={3}>
                                  <IconButton
                                    className={clsx(classes.deleteBttn, classes.textMargin)}
                                    onClick={() => {
                                      removeItem(identifier, i);
                                    }}
                                  >
                                    <RemoveCircleOutlineIcon />
                                  </IconButton>
                                </Grid>
                                <Grid item xs={8}>
                                  <Typography variant="button" className={classes.typographyFont}>
                                    {e.name}
                                  </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                  <Typography variant="button" className={classes.typographyFont}>
                                    {e.points}
                                  </Typography>
                                </Grid>
                              </Grid>
                            );
                          })
                        : null}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
      <Grid container justify="flex-start" direction="row">
        <Grid container item xs={2} direction="row">
          <Typography className={classes.subTotal}>Gesamt: {subFactionTotal} </Typography>
          <Typography className={classes.subTotal}> Prozent {displayCurrentPercentage()} % </Typography>
        </Grid>
        <Grid container item xs={2} direction="column">
          <Typography className={classes.subTotal}>{`Minimum: ${percentages.min} %`}</Typography>
          <Typography className={classes.subTotal}> {`Maximum ${percentages.max} %`}</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SubList;
