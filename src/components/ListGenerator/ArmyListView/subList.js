// React
import React, { Fragment, useEffect, useContext, useState } from "react";
// Material UI
import { List, ListItem, IconButton, Typography, Button, Grid, makeStyles } from "@material-ui/core";
// icons
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { displayUnitCost } from "../../compendiums/factionTable/depencies/factionTableFunctions";
import { isObjectEmtpy } from "../../shared/sharedFunctions";
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

  /**
   * The useffect calculates the point total for the sub faction and validates it.
   */
  useEffect(() => {
    let total = 0;
    if (props.subFactionUnits) {
      props.subFactionUnits.forEach((u) => (total += displayUnitCost(u)));
    }
    setSubFactionTotal(total);
  }, [props.subFactionUnits]);

  const removeUnit = (identifier) => {
    contextArmy.removeUnit(identifier);
  };

  const removeItem = (identifier, i) => {
    contextArmy.removeItem(identifier, i);
  };

  /**
   * function toggles the unit card view on and off as well as switches between card views for different units. TO do this, the card view is not toggled by a booelan flag, but an object that stores the previouslyx clickedUnit
   * @param {unitCard} u
   */
  const toggleBetweenCards = (u) => {
    // first click on page (no card displayed)
    if (isObjectEmtpy(contextArmy.showStatCard.lastclickedUnit))
      contextArmy.setShowStatCard({ clickedUnit: u, lastclickedUnit: u, show: true });
    // click on same unit again to toggle the card view on
    else if (contextArmy.showStatCard.lastclickedUnit.unitName === u.unitName && contextArmy.showStatCard.show === true)
      // click on same unit again to toggle the card view off
      contextArmy.setShowStatCard({ clickedUnit: u, lastclickedUnit: u, show: false });
    else if (contextArmy.showStatCard.lastclickedUnit.unitName === u.unitName && contextArmy.showStatCard.show === false)
      contextArmy.setShowStatCard({ clickedUnit: u, lastclickedUnit: u, show: true });
    // click on a different unit to show a different card
    else if (contextArmy.showStatCard.lastclickedUnit.unitName !== u.unitName)
      contextArmy.setShowStatCard({ clickedUnit: u, lastclickedUnit: u, show: true });
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
        {props.subFactionUnits.map((u) => {
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
                        contextArmy.openItemShop();
                        contextArmy.setUnitSelectedForShop(u);
                      }}
                    >
                      Gegenstände
                    </Button>
                    <Button
                      className={classes.buttons}
                      variant="outlined"
                      onClick={() => {
                        toggleBetweenCards(u);
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
      <Typography className={classes.subTotal}>Gesamt: {subFactionTotal} </Typography>
    </Fragment>
  );
};

export default SubList;
