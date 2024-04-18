// React
import React, { useState } from "react";
// Material UI
import { Grid,  StyledEngineProvider, CssBaseline } from "@mui/material";
// router
import { Route, Switch } from "react-router-dom";
// components and functions
import landingPage from "./components/landingPage/landingPage";
import CompendiumTable from "./components/compendiums/factionTable/components/CompendiumTable";
import ListGeneratorController from "./components/ListGenerator/ListGeneratorController";
import LossCalculator from "./components/LossCalculator/LossCalculator";
import PdfBox from "./components/PDFGenerator/PDFBox";
// context providers
import LightSwitchProvider from "./contexts/lightSwitchContext";
// theme
import lightTheme from "./AppTheme/lightTheme";
import darkTheme from "./AppTheme/darkTheme";
import { ThemeProvider } from '@mui/material';

function App() {
  const [darkModeOff, setDarkModeOff] = useState(true);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={darkModeOff ? lightTheme : darkTheme}>
        <CssBaseline />
        <LightSwitchProvider
          value={{
            darkModeOff: darkModeOff,
            setDarkModeOff: setDarkModeOff,
          }}
        >
          <Grid container>
            <Switch>
              <Route path="/" component={landingPage} exact />
              <Route path="/compendium" component={CompendiumTable} exact />
              <Route path="/listGenerator" component={ListGeneratorController} />
              <Route path="/lossCalculator" component={LossCalculator} />
              <Route path="/PdfBox" component={PdfBox} />
            </Switch>
          </Grid>
        </LightSwitchProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
