// React
import * as React from "react";
// Material UI
import {
  ThemeProvider,
  createMuiTheme,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  Box,
  CssBaseline,
  styled,
  Grid,
} from "@material-ui/core";
// router
import { Route, Switch, Link } from "react-router-dom";
// components and functions
import landingPage from "./components/landingPage/landingPage";
import factionTable from "./components/compendiums/factionTable/components/factionTable";
import ListGeneratorController from "./components/ListGenerator/ListGeneratorController";
// icons
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ChevronLeftIcon from "@material-ui/icons/ArrowBackIos";
import MenuIcon from "@material-ui/icons/Menu";

const theme = createMuiTheme();

const DRAWER_WIDTH = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  flexGrow: 1,
  paddingLeft: theme.spacing(30),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// correct Header

function App() {
  //const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <List>
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <Link to="/">Startseite</Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <Link to="/compendium">Kompendium</Link>
            </ListItem>
            <ListItem>
              <ListItemIcon></ListItemIcon>
              <Link to="/listGenerator">Armeegenerator</Link>
            </ListItem>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Grid container>
            <IconButton aria-label="open drawer" onClick={handleDrawerOpen}>
              {!open ? <MenuIcon /> : null}
            </IconButton>
            <Switch>
              <Route path="/" component={landingPage} exact />
              <Route path="/compendium" component={factionTable} exact />
              <Route path="/listGenerator" component={ListGeneratorController} />
            </Switch>
          </Grid>
        </Main>
      </Box>
    </ThemeProvider>
  );
}

export default App;
