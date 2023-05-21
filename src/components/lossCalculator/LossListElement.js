// React
import React, { useState, useEffect } from "react";
//Material UI
import { Typography, Grid, ButtonGroup, Button, Tooltip, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// components and functions
import { ListItem } from "@mui/material";
import { uuidGenerator } from "../shared/sharedFunctions";

// clsx
import clsx from "clsx";
// icons
import skullsIcon from "../../icons/skulls.png";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme) => ({
  page: {
    border: "solid black 0.1em",
    borderRadius: "4px",
    padding: "2em",
    width: "40%",
    height: "15%",

    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      "@media (orientation:landscape)": {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "1em",
      },
    },
  },

  typographyFont: {
    fontFamily: "NotMaryKate",
    textAlign: "center",
    marginTop: "0.5em",
  },
  text: {
    paddingLeft: "1em",
  },
  line: {
    marginTop: "0.5em",
    marginBottom: "0.5em",
    borderBottom: "solid black 0.1em",
    display: "block",
  },
  bttn: {
    width: "1em",
    height: "4em",
  },
}));

const LossListElement = (props) => {
  const classes = useStyles();

  //state
  const [numberOfLostfElements, setNumberOfLostfElements] = useState(0);
  const [unitPointsLost, setUnitPointsLost] = useState(0);
  const [itemsLost, setItemsLost] = useState(0);
  const [itemClicked, setItemClicked] = useState([]);

  const TEXT = "Verlorene Elemente:";

  // Calculate total point loss for this unit
  useEffect(() => {
    const points = props.unit.points;
    const elements = props.unit.numberOfElements;
    let pointsLost = numberOfLostfElements * (points / elements);
    pointsLost += itemsLost;
    setUnitPointsLost(pointsLost);
  }, [numberOfLostfElements, itemsLost]); // eslint-disable-line react-hooks/exhaustive-deps

  // Send point total for this unit to the parent.
  useEffect(() => {
    props.updateUnitLossTracker(unitPointsLost, props.index);
  }, [unitPointsLost]); // eslint-disable-line react-hooks/exhaustive-deps

  // On first render, if the unit has equipment, create a booelan array ton control the state of the corresponding buttons.
  useEffect(() => {
    let tempArray = [];
    if (props.unit.equipment.length !== 0) {
      for (let i = 0; i < props.unit.equipment.length; i++) {
        tempArray.push(false);
      }
    }

    setItemClicked(tempArray);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function lets the user add lost elements.
   */
  const addLoss = () => {
    let temp = numberOfLostfElements;
    setNumberOfLostfElements(++temp);
  };

  /**
   * Function lets the user subtract lost elements.
   */
  const subtractLoss = () => {
    let temp = numberOfLostfElements;
    setNumberOfLostfElements(--temp);
  };

  /**
   * Function immediately sets the number of lost elements to the maximum number possible.
   */
  const unitDestroyed = () => {
    setNumberOfLostfElements(props.unit.numberOfElements);
  };

  /**
   * Function makrs all itms as lost by setting all flags to true.
   */
  const allItemsMarkedLost = () => {
    let tempArray = [...itemClicked];
    tempArray = tempArray.map((i) => (i = true));

    setItemClicked(tempArray);
  };

  /**
   * Function calculates the points when all items are marked lost together.
   */
  const allItemsLost = () => {
    let sum = 0;

    props.unit.equipment.forEach((i) => {
      sum += i.points;
    });

    setItemsLost(sum);
  };

  /**
   * Function prevents the user from choosing a number of lost elements larger than the number of elements the unit has.
   * @returns boolean flag
   */
  const notOverNumberOfElements = () => {
    return numberOfLostfElements === props.unit.numberOfElements;
  };

  /**
   * Function prevents the user from choosing a negative number of lost elements.
   * @returns  boolean flag
   */
  const notUnderZero = () => {
    return numberOfLostfElements === 0;
  };

  /**
   * Function adds the point cost of all items marked lost
   * @param {int} points
   */
  const addItemToLosses = (points) => {
    let temp = itemsLost;
    temp += points;

    setItemsLost(temp);
  };

  /**
   * Function subtracts the point cost of all items not marked lost.
   * @param {int} points
   */
  const subtractItemFromLosses = (points) => {
    let temp = itemsLost;
    temp -= points;

    setItemsLost(temp);
  };

  /**
   * An array of boolean flags is used to keep track of which items are marked lost. The index in the boolean array corresponds to the same index in the item list. A boolean flag set to true means the item was lost. The boolean flag then toggles the item's button between "add item to losses" / "remove item from losses".
   * @param {int} index
   */
  const markItemLost = (index) => {
    let tempArray = [...itemClicked];
    tempArray[index] = true;
    setItemClicked(tempArray);
  };

  // see comment for the "markItemLost" function.
  const removeLostMarker = (index) => {
    let tempArray = [...itemClicked];
    tempArray[index] = false;
    setItemClicked(tempArray);
  };

  return (
    <ListItem>
      <Grid container justify="space-between" alignItems="center" alignContent="center" className={classes.page}>
        <Grid container item xs={3} direction="column">
          <Grid item>
            <Typography variant="button" className={clsx(classes.typographyFont, classes.text)}>
              {props.unit.name}
            </Typography>
          </Grid>
          <Grid item>
            {/* ITTEM LIST */}
            {props.unit.equipment.length !== 0 ? <span className={classes.line}></span> : null}
            {props.unit.equipment.length !== 0
              ? props.unit.equipment.map((e, i) => {
                  return (
                    <Grid item xs={12} container direction="row" className={classes.equipment} key={uuidGenerator()}>
                      <Grid item xs={3}>
                        {itemClicked[i] ? (
                          <Button
                            className={clsx(classes.deleteBttn, classes.textMargin)}
                            onClick={() => {
                              subtractItemFromLosses(e.points);
                              removeLostMarker(i);
                            }}
                          >
                            <RemoveCircleOutlineIcon />
                          </Button>
                        ) : (
                          <Button
                            className={clsx(classes.deleteBttn, classes.textMargin)}
                            onClick={() => {
                              addItemToLosses(e.points);
                              markItemLost(i);
                            }}
                          >
                            <AddCircleOutlineIcon />
                          </Button>
                        )}
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
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="button" className={clsx(classes.typographyFont, classes.text)}>
            {TEXT}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
              onClick={() => {
                subtractLoss();
              }}
              disabled={notUnderZero()}
              className={classes.bttn}
            >
              <ChevronLeftIcon />
            </Button>
            <Typography variant="h6" className={classes.typographyFont}>
              {numberOfLostfElements}
            </Typography>
            <Button
              onClick={() => {
                addLoss();
              }}
              disabled={notOverNumberOfElements()}
              className={classes.bttn}
            >
              <ChevronRightIcon />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title={<Typography className={classes.tooltipText}>Einheit aufgerieben</Typography>}>
            <IconButton
              variant="contained"
              component={Button}
              onClick={() => {
                unitDestroyed();
                allItemsMarkedLost();
                allItemsLost();
              }}
              className={classes.bttn}
            >
              <img src={skullsIcon} alt="Einheit aufgerieben" height={40} width={40} />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item xs={1}>
          <Typography variant="h6" align="center" className={classes.typographyFont}>
            {unitPointsLost}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default LossListElement;
