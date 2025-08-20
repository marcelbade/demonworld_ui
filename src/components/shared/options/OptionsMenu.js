// react
import { useContext, useState, forwardRef } from "react";
// material ui
import { Grid2 as Grid, Dialog, AppBar, Toolbar, IconButton, Slide, Typography } from "@mui/material";
// components and functions
import CancelIcon from "@mui/icons-material/Cancel";
import TabButtons from "../TabButtons";
import TabPanel from "../TabPanel";
import GameOptions from "./GameOptions";
import AppOptions from "./AppOptions";
import { OPTIONS } from "../../../constants/textsAndMessages";
import UserOptions from "./UserOptions";
import CompendiumOptions from "./CompendiumOptions";
// contexts
import { MenuContext } from "../../../contexts/MenuContext";

const Transition = forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up" //
      ref={ref}
      {...props}
    />
  );
});

const OptionsMenu = () => {
  const MC = useContext(MenuContext);

  const handleClose = () => {
    MC.setOpenMenu(false);
  };

  const [tabValue, setTabValue] = useState(0);

  const TABS = [
    OPTIONS.GAME_RULES_OPTIONS, //
    OPTIONS.COMPENDIUM_RULES_OPTIONS, //
    OPTIONS.APP_OPTIONS,
    OPTIONS.USER_OPTIONS,
  ];

  const panels = [
    <GameOptions />, //
    <CompendiumOptions />,
    <AppOptions />,
    <UserOptions />,
  ];

  return (
    <Dialog
      fullScreen
      open={MC.openMenu}
      onClose={handleClose}
      sx={{ backgroundColor: "black" }}
      slots={{
        transition: Transition,
      }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CancelIcon color="error" />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {OPTIONS.OPTIONS_DIALOG_TITLE}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container //
        direction="row"
        sx={{ height: "100%" }}
      >
        <Grid size={2}>
          <TabButtons
            direction="column"
            handleTabChange={setTabValue} //
            altPanels={TABS}
            tabValue={tabValue}
            showBottomBorder={false}
          />
        </Grid>
        <Grid size={10}>
          {panels.map((p, i) => (
            <TabPanel
              key={i}
              panelNr={i} //
              tabValue={tabValue}
              content={p}
            />
          ))}
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default OptionsMenu;
