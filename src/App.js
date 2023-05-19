// React
import * as React from "react";

// Material UI
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// router
import { Route, Switch } from "react-router-dom";
// components and functions
import landingPage from "./components/landingPage/landingPage";
import factionTable from "./components/compendiums/factionTable/components/factionTable";
import ListGeneratorController from "./components/ListGenerator/ListGeneratorController";
import LossCalculator from "./components/lossCalculator/LossCalculator";

const useStyles = makeStyles((theme) => ({
  homePage: {
    backgroundColor: "pink",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Grid container>
      <Switch>
        <Route path="/" component={landingPage} exact />
        <Route path="/compendium" component={factionTable} exact />
        <Route path="/listGenerator" component={ListGeneratorController} />
        <Route path="/lossCalculator" component={LossCalculator} />
      </Switch>
    </Grid>
  );
}

export default App;
