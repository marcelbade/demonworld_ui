// React
import React from "react";
//Material UI
import { ListItemText } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Tooltip } from "@mui/material";
import { LOSS_CALCULATOR } from "../../../constants/textsAndMessages";

const useStyles = makeStyles((theme) => ({
  typographyFont: {
    textAlign: "left",
    marginTop: "0.5em",
  },
  strikeTroughText: {
    textAlign: "left",
    marginTop: "0.5em",
    color: "red",
    textDecorationLine: "line-through",
    textDecorationThickness: "0.2em",
  },
}));

const EquipmentListItemName = (props) => {
  const classes = useStyles();

 

  /**
   * Function returns the correct css conditionally.x
   * @returns an object containing css.
   */
  const switchCssClass = () => {
    return props.isItemLost ? classes.strikeTroughText : classes.typographyFont;
  };

  return props.notSingleElementItem ? (
    <Tooltip title={LOSS_CALCULATOR.NOT_SINGLE_ELEMENT_ITEM_MESSAGE}>
      <ListItemText secondary={<span className={classes.typographyFont}> {props.itemName}</span>} />
    </Tooltip>
  ) : (
    <ListItemText
      primary={<span className={switchCssClass()}>{props.itemName}</span>}
      secondary={<span className={classes.typographyFont}> {props.pointCost}</span>}
    />
  );
};

export default EquipmentListItemName;
