// React
import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";

// modules
import StatCardUnitBack from "./statCardCommanderBack";
import StatCardUnitFront from "./statCardCommanderFront";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  cardBox: {
    border: "1px solid black",
    borderCollapse: "collapse",
    backgroundColor: "lightgrey",
    fontFamily: "Beryliumbold",
    fontWeight: "bold",
    fontSize: "20px",
    tableLayout: "fixed",
    width: "1800px",
  },
  movementCell: {
    textAlign: "left",
  },
  leftCell: {
    paddingLeft: "0px",
    width: "30%",
  },
  centerCell: {
    width: "40%",
  },
  rightCell: {
    width: "30%",
  },
  cardBorder: {
    borderRight: "1px solid black",
  },
  spanCellTwo: {
    textAlign: "end",
  },
  unitCardStripe: {
    padding: "10px",
    color: "white",
    backgroundColor: "black",
  },
  cardTitle: {
    fontFamily: "notMaryKate",
    fontWeight: "normal",
    marginBottom: "0px",
    marginTop: "0px",
    textAlign: "center",
    fontSize: "30px",
    color: "red",
    borderWidth: "0px",
  },
});

const StatCardCommander = (props) => {
  const classes = useStyles();

  return (
    <Grid direction="column" spacing={3}>
      <Grid item>
        <StatCardUnitFront unit={props.unit} />
      </Grid>
      <Grid>
        <StatCardUnitBack unit={props.unit} />
      </Grid>
    </Grid>
  );
};

export default StatCardCommander;
