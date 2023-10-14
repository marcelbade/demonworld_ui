import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, IconButton } from "@material-ui/core";
// icons
import HelpIcon from "@material-ui/icons/Help";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { calculateTotalPointCost, uuidGenerator } from "../../../shared/sharedFunctions";
import useArmyValidation from "../../GeneratorComponents/validation/ArmyValidation";

const useStyles = makeStyles({
  textBlock: {
    width: "25em",
  },
  blockedLeafNode: {
    paddingRight: "0.5em",

    color: "grey",
  },
  unblockedLeafNode: {
    paddingRight: "0.5em",
  },
  points: {
    color: "grey",
  },

  unblockedBttn: {
    alignContent: "center",
    color: "black",
  },
  blockedBttn: {
    paddingLeft: "1em",
  },
});

const LeafNode = (props) => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);
  const validation = useArmyValidation();

  const enrichUnitCardObject = (unit) => {
    unit = addUniqueIdToUnit(unit);
    unit = addLossCounterToUnit(unit);
    unit = addEquipmentSlotsToUnit(unit);

    return unit;
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
   * Function adds a property that counts the number of lost elements the unit has suffered. Needed for the loss calculator module.
   * @param {*} unit
   * @returns {} unit object with a lossCounter property
   */
  const addLossCounterToUnit = (unit) => {
    const max = unit.numberOfElements * unit.hitpoints;

    return {
      ...unit,
      lossCounter: 0,
      maxCounter: max,
      unitDestroyed: false,
    };
  };

  /**
   * Function adds a property which allows equipment to be added as well as check what equipment can be added. There are, at this moment, 5 types of items. Each type can be selected once.
   * @param {*} unit
   * @returns unit object with equipment + equipmentTypes property.
   */
  const addEquipmentSlotsToUnit = (unit) => {
    return {
      ...unit,
      equipment: [],
      equipmentTypes: {
        magicItem: false,
        // units only
        banner: false,
        instrument: false,
        unit: false,
        fortifications: false,
      },
    };
  };

  /**
   * Function adds a selected units to a the army list and adds 3 things:
   * - a unique ID, so the same unit can be selected more than once and all instances can be differentiated
   * - equipment slots so items can be added
   * - a loss counter for the loss calculator
   * @param {unitCard object} unit
   */
  const addUnit = (unit) => {
    let tempArray = [...AC.selectedUnits];
    let points = 0;

    tempArray.push(enrichUnitCardObject(unit));
    points = calculateTotalPointCost(tempArray);

    validation.validateList(tempArray, AC.maxPointsAllowance, AC.subFactions);
    AC.setSelectedUnits(tempArray);
    AC.setTotalPointValue(points);
  };

  const displayLeaf = (isBlocked) => {
    return isBlocked ? classes.blockedLeafNode : classes.unblockedLeafNode;
  };
  const displayBttn = (isBlocked) => {
    return isBlocked ? classes.blockedBttn : classes.unblockedBttn;
  };

  return (
    <Grid container direction="row" alignItems="center" justify="space-around">
      <Grid xs={6} item container direction="column">
        <Typography variant="button" className={displayLeaf(props.isBlocked)}>
          {props.unit.unitName}
        </Typography>

        <Typography variant="button" className={classes.points}>
          {props.unit.points}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <IconButton
          onClick={() => {
            addUnit(props.unit);
          }}
          disabled={props.isBlocked}
          className={displayBttn(props.isBlocked)}
        >
          <AddCircleOutlineIcon />
        </IconButton>
        {props.isBlocked ? (
          <IconButton
            onClick={() => {
              AC.setValidationMessage(props.blockMessage);
              AC.setShowToastMessage(true);
            }}
          >
            <HelpIcon />
          </IconButton>
        ) : null}
      </Grid>
    </Grid>
  );
};
export default LeafNode;
