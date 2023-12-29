import React, { useContext } from "react";
// material ui
import makeStyles from "@mui/styles/makeStyles";
import { Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, Grid } from "@mui/material";
// components and functions
import { ItemContext } from "../../../../../contexts/itemContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useUnitEqipmentLimits from "../../../../../customHooks/useUnitEqipmentLimits";

const useStyles = makeStyles({
  points: {
    color: "grey",
  },
  ruleText: {
    width: "40em",
  },
});

const TreeItemNode = (props) => {
  const classes = useStyles();
  const IC = useContext(ItemContext);
  const SEC = useContext(SelectionContext);

  const limiter = useUnitEqipmentLimits();

  /**
   * Add the item card object to the selected unit. In addition a flag to track whether the item was lost for the lossCalculator component is added.
   * @param {itemCard object} item
   */
  const addItemToUnit = (item) => {
    let tempObj = { ...IC.unitSelectedForShop };

    tempObj.equipment.push({
      ...item,
      itemLost: false,
    });

    IC.setUnitSelectedForShop({
      ...tempObj,
    });
  };

  //TODO implement
  const addItemToCentralList = () => {};

  /**
   * Function causes the list of all selected units to change (w/o actually changing it). This is necessary to correctly calculate the list's point cost whenever an item is added. Without this, the point cost of the item is only added whenever a unit is added or removed from the list, not when the item is added ore removed.
   */
  const triggerArymListRecalculation = () => {
    let tempArray = [...SEC.selectedUnits];
    SEC.setSelectedUnits([...tempArray]);
  };

  //TODO points, set item flags for units

  return (
    <Accordion
      key={props.item.itemName} //
      style={{ boxShadow: "none" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />} //
        aria-controls="panel1a-content"
        id="shopItem"
      >
        <Grid container alignItems="center" direction="row">
          <Grid item container direction="column" xs={3}>
            <Typography
              variant="body1"
            >
              {props.item.itemName}
            </Typography>
            <Typography variant="body1" className={classes.points}>
              {props.item.points}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <IconButton
              size="large"
              onClick={(e) => {
                addItemToUnit(props.item);
                addItemToCentralList(props.item);
                limiter.toggleUnitsItemTypeFlags(props.item, true);
                triggerArymListRecalculation();
                e.stopPropagation();
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          variant="body1" //
          className={classes.ruleText}
        >
          {props.item.specialRules}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
export default TreeItemNode;