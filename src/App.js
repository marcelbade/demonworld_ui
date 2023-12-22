// React
import * as React from "react";
// Material UI
import { Grid, ThemeProvider, StyledEngineProvider, CssBaseline } from "@mui/material";
// router
import { Route, Switch } from "react-router-dom";
// components and functions
import landingPage from "./components/landingPage/landingPage";
import factionTable from "./components/compendiums/factionTable/components/factionTable";
import ListGeneratorController from "./components/ListGenerator/ListGeneratorController";
import LossCalculator from "./components/LossCalculator/LossCalculator";
import PdfBox from "./components/PDFGenerator/PDFBox";
// theme
import theme from "./AppTheme/theme";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container>
          <Switch>
            <Route path="/" component={landingPage} exact />
            <Route path="/compendium" component={factionTable} exact />
            <Route path="/listGenerator" component={ListGeneratorController} />
            <Route path="/lossCalculator" component={LossCalculator} />
            <Route path="/PdfBox" component={PdfBox} />
          </Switch>
        </Grid>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
