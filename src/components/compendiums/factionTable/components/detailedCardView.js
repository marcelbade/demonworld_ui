// React
import React from "react";
import makeStyles from '@mui/styles/makeStyles';
// components & functions
import { unitOrCmdCard } from "../../../shared/sharedFunctions";

const useStyles = makeStyles({
  backGround: {
    backgroundColor: "white",
    "& :hover": {
      backgroundColor: "white",
    },
  },
});

// front and back side of the displayed unit cards are alligned horizontally.
const ROW = "row";

/**
 * displays the unit card in the compendium table
 * @param {*} props
 * @returns
 */
const DetailedCardView = (props) => {
  const classes = useStyles();

  return (
    <tr key={props.unit.uniqueID} className={classes.backGround}>
      <td key={props.unit.uniqueID} colSpan="100%">
        {props.selectedCards.includes(props.unit.faction + props.unit.unitName) ? unitOrCmdCard(props.unit, ROW) : null}
      </td>
    </tr>
  );
};

export default React.memo(DetailedCardView);
