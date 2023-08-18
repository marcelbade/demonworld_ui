// React
import React from "react";
//Material UI
import { ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

  return (
    <ListItemText
      primary={<span className={switchCssClass()}>{props.itemName}</span>}
      secondary={<span className={classes.typographyFont}> {props.pointCost}</span>}
    />
  );
};

export default EquipmentListItemName;
