// React
import React from "react";
// Material UI
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// modules
import StatCardCommanderBack from "./statCardCommanderBack";
import StatCardCommanderFront from "./statCardCommanderFront";

const useStyles = makeStyles({
  CardBox: {
    marginRight: "2em",
  },
});
/**
 * Wrapper Element. Allows for vertical or horizontal layout of the cards.
 * @param {String} props A value for the alignment property of the MUI grid element.
 * @returns jsx
 */
const StatCardCommander = (props) => {
  const classes = useStyles();

  return (
    <Grid direction={props.alignment} className={classes.CardBox} spacing={3}>
      <Grid item>
        <StatCardCommanderFront unit={props.unit} />
      </Grid>
      <Grid>
        <StatCardCommanderBack unit={props.unit} />
      </Grid>
    </Grid>
  );
};

export default StatCardCommander;
