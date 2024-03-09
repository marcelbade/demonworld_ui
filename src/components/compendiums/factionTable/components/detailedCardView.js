// React
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
// components & functions
import { unitOrCmdCard } from "../../../../util/utilityFunctions";

const useStyles = makeStyles((theme) => ({
  backGround: {
    backgroundColor: theme.palette.backGround,
    "& :hover": {
      backgroundColor: theme.palette.backGround,
    },
  },
  card: {
    paddingBottom: "1em",
  },
}));

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
      <td colSpan={"10%"}></td>
      <td key={props.unit.uniqueID} colSpan={"30%"} className={classes.card}>
        {props.selectedCards.includes(props.unit.faction + props.unit.unitName) //
          ? unitOrCmdCard(props.unit, ROW)
          : null}
      </td>
    </tr>
  );
};

export default React.memo(DetailedCardView);
