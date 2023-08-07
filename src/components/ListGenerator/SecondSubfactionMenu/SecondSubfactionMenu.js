// React
import React, { useContext } from "react";
//Material UI
import { Button, Grid, ButtonGroup, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { uuidGenerator } from "../../shared/sharedFunctions";
const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "20vw",
  },
  buttons: {
    fontWeight: "bold",
    border: "none",
  },
  currentlySelected: {
    fontWeight: "bold",
    border: "none",
    backgroundColor: "lightgrey",
    color: "red",
  },
  unitName: {
    fontWeight: "bold",
    borderBottom: "solid 4px black",
  },
});

const SecondSubFactionMenu = () => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  return (
    <Grid container direction="column" className={classes.overlay}>
      <Grid item container direction="row">
        {/*UNIT NAME */}
        <Grid item xs={9}>
          <Typography variant="h5" align="center" className={classes.unitName}>
            {contextArmy.unitSelectedForShop.unitName}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="row">
        <Grid item xs={3} className={classes.panelButtonsBackground}>
          {/* PANEL BUTTONS */}
          <ButtonGroup size="large" orientation="vertical">
            {contextArmy.secondSubFactionList.map((ssf) => {
              return ssf === contextArmy.unitSelectedForShop.secondSubFaction ? (
                <Button
                  disabled={true}
                  className={classes.currentlySelected}
                  variant="text"
                  key={uuidGenerator()}
                  onClick={() => {
                    contextArmy.setSecondSubFactionInArmyList(contextArmy.unitSelectedForShop, ssf);
                  }}
                >
                  {ssf}
                </Button>
              ) : (
                <Button
                  className={classes.buttons}
                  variant="text"
                  key={uuidGenerator()}
                  onClick={() => {
                    contextArmy.setSecondSubFactionInArmyList(contextArmy.unitSelectedForShop, ssf);
                  }}
                >
                  {ssf}
                </Button>
              );
            })}
          </ButtonGroup>
        </Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </Grid>
  );
};

export default SecondSubFactionMenu;
