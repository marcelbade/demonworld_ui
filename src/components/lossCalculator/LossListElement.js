// React
import React, { useState, useEffect } from "react";
//Material UI
import { Typography, Grid, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// components and functions
import { ListItem } from "@mui/material";
import ListElementBttns from "./ListElementBttns";
import EquipmentListEntry from "./EquipmentListEntry";

// clsx
import clsx from "clsx";
// icons

const useStyles = makeStyles((theme) => ({
  listElement: {
    border: "solid 0.1em",
    borderRadius: "4px",

    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      padding: "2em",
      width: "40%",
      height: "15%",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",

      width: "100%",
      height: "35%",
      "@media (orientation:landscape)": {
        flexDirection: "row",
       
      },
    },
  },
  borderNormal: {
    borderColor: "black",
  },
  borderLost: {
    borderColor: "red",
  },

  typographyFont: {
    fontFamily: "NotMaryKate",
    textAlign: "center",
    marginTop: "0.5em",
  },
  text: {
    paddingLeft: "1em",
  },
  strikeTroughText: {
    paddingLeft: "1em",
    color: "red",
    textDecorationLine: "line-through",
    textDecorationThickness: "0.2em",
  },
  line: {
    marginTop: "0.5em",
    marginBottom: "0.5em",
    borderBottom: "solid black 0.1em",
    display: "block",
  },
}));

const LossListElement = (props) => {
  const classes = useStyles();

  //state
  const [numberOfLostElements, setNumberOfLostElements] = useState(0);
  const [unitPointsLost, setUnitPointsLost] = useState(0);
  const [itemsLost, setItemsLost] = useState(0);
  const [itemClicked, setItemClicked] = useState([]);
  const [markAsLost, setMarkAsLost] = useState(false);

  const TEXT = "Verlorene Elemente:";

  // Calculate the total point loss for this unit
  useEffect(() => {
    const points = props.unit.points;
    const elements = props.unit.numberOfElements;
    let pointsLost = numberOfLostElements * (points / elements);
    pointsLost += itemsLost;
    setUnitPointsLost(pointsLost);
  }, [numberOfLostElements, itemsLost]); // eslint-disable-line react-hooks/exhaustive-deps

  // Send the point total for this unit to the parent.
  useEffect(() => {
    props.updateUnitLossTracker(unitPointsLost, props.index);
  }, [unitPointsLost]); // eslint-disable-line react-hooks/exhaustive-deps

  // On first render, if the unit has equipment, create a booelan array to control the state of the corresponding buttons used to add/subtract an item's point cost from the net total.
  useEffect(() => {
    let tempArray = [];
    if (props.unit.equipment.length !== 0) {
      for (let i = 0; i < props.unit.equipment.length; i++) {
        tempArray.push(false);
      }
    }

    setItemClicked(tempArray);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // when the entire unit is lost, make the name red and striketrough.
  useEffect(() => {
    numberOfLostElements === props.unit.numberOfElements ? setMarkAsLost(true) : setMarkAsLost(false);
  }, [numberOfLostElements]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ListItem>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        alignContent="center"
        className={markAsLost ? clsx(classes.listElement, classes.borderLost) : clsx(classes.listElement, classes.borderNormal)}
      >
        {/* NAME*/}
        <Grid container item md={4} direction="column">
          <Grid item   >
            <Typography
              variant="button"
              className={markAsLost ? clsx(classes.typographyFont, classes.strikeTroughText) : clsx(classes.typographyFont, classes.text)}
            >
              {props.unit.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <List>
              {/* ITTEM LIST */}
              {props.unit.equipment.length !== 0 ? <span className={classes.line}></span> : null}
              {props.unit.equipment.length !== 0
                ? props.unit.equipment.map((e, i) => {
                    return (
                      <EquipmentListEntry
                        itemsLost={itemsLost}
                        itemClicked={itemClicked}
                        strikeTroughText={markAsLost}
                        setItemsLost={setItemsLost}
                        setItemClicked={setItemClicked}
                        element={e}
                        index={i}
                        key={e.name + i}
                      />
                    );
                  })
                : null}
            </List>
          </Grid>
        </Grid>
        <Grid item      >
          <Typography variant="button" className={clsx(classes.typographyFont, classes.text)}>
            {TEXT}
          </Typography>
        </Grid>
        <Grid  item      >
          {/*  BUTTONS */}
          <ListElementBttns
            itemClicked={itemClicked}
            numberOfLostElements={numberOfLostElements}
            unit={props.unit}
            setNumberOfLostElements={setNumberOfLostElements}
            setItemClicked={setItemClicked}
            setItemsLost={setItemsLost}
          />
        </Grid>
        <Grid item     >
          <Typography variant="h6" align="center" className={classes.typographyFont}>
            {unitPointsLost}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default LossListElement;
