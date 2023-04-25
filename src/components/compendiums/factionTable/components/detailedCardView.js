// React
import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// components & functions
import { uuidGenerator } from "../../../shared/sharedFunctions";
import { unitOrCmdCard } from "../../../shared/sharedFunctions";

const useStyles = makeStyles({
  backGround: {
    backgroundColor: "white",
    "& :hover": {
      backgroundColor: "white",
    },
  },
});

const DetailedCardView = (props) => {
 const classes = useStyles();

  return (
    <tr key={uuidGenerator()} className={classes.backGround}>
      <td key={uuidGenerator()} colSpan="100%">
        {props.selectedCards.includes(props.unit.faction + props.unit.unitName) ? unitOrCmdCard(props.unit) : null}
      </td>
    </tr>
  );
};

export default React.memo(DetailedCardView);
