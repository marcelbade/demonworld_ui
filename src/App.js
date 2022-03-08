//js
import "./App.css";
// React
import React, { useState } from "react";
// material ui
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// icons
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
// router
import { Route, Switch, Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
// theme
import theme from "./theme";
// components and functions
import landingPage from "./components/landingPage/landingPage";
import factionTable from "./components/compendiums/factionTable/factionTable";
import ListGeneratorController from "./components/ListGenerator/ListGeneratorController";
// clsx
import clsx from "clsx";

const useStyles = makeStyles({
  root: {},
  navBar: {
    backgroundColor: "black",
  },
  linkList: {
    listStyle: "none",
    backgroundColor: "black",
  },
  drawer: {
    width: "200px",
    position: "fixed",
    zIndex: 600,
  },
  closeButton: {
    marginLeft: "5em",
  },
  openButton: {
    marginLeft: "2em",
    fontSize: "2em",
  },
  drawerButtons: {
    color: "black",
    opacity: 0.2,
    "&:hover": {
      opacity: 1,
    },
  },
});

const App = () => {
  const classes = useStyles();

  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* why the classes in the Drawer element? -> contains a lot of elements and CSS, this allows you
               to override the paper class inside. This is importanbt because your width for drawer != paper width 
            */}
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          classes={{ paper: classes.drawer }}
          open={drawerState}
          // onClose={setDrawerState(false)}
        >
          <List>
            <ListItem>
              <IconButton onClick={toggleDrawer} className={clsx(classes.drawerButtons, classes.closeButton)}>
                <CloseIcon />
              </IconButton>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <Link to="/">Startseite</Link>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <Link to="/compendium">Kompendium</Link>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <ListItemIcon></ListItemIcon>
              <Link to="/listGenerator">Armeegenerator</Link>
            </ListItem>
          </List>
        </Drawer>
        <Grid container>
          <IconButton onClick={toggleDrawer} className={clsx(classes.drawerButtons, classes.openButton)}>
            <MenuIcon />
          </IconButton>
          <Switch>
            <Route path="/" component={landingPage} exact />
            <Route path="/compendium" component={factionTable} exact />
            <Route path="/listGenerator" component={ListGeneratorController} />
          </Switch>
        </Grid>
      </main>
    </ThemeProvider>
  );
};

export default App;
