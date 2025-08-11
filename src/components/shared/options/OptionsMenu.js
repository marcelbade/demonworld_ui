// react
import { useContext, Fragment, useState, forwardRef } from "react";
// material ui
import { Grid2 as Grid, Button, Dialog, AppBar, Toolbar, IconButton, Slide, Typography } from "@mui/material";
// components and functions
import { MenuContext } from "../../../contexts/MenuContext";
import CancelIcon from "@mui/icons-material/Cancel";
import TabButtons from "../TabButtons";
import TabPanel from "../TabPanel";
import GameOptions from "./GameOptions";
import AppOptions from "./AppOptions";
import { OPTIONS } from "../../../constants/textsAndMessages";
import UserOptions from "./UserOptions";

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

  const handleClickOpen = () => {
    MC.setOpenMenu(true);
  };

  const handleClose = () => {
    MC.setOpenMenu(false);
  };

  const [tabValue, setTabValue] = useState(0);

  const TABS = [OPTIONS.GAME_RULES_OPTIONS, OPTIONS.APP_OPTIONS, OPTIONS.USER_OPTIONS];

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
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
            <TabPanel
              panelNr={0} //
              tabValue={tabValue}
              content={<GameOptions />}
            />
            <TabPanel
              panelNr={1} //
              tabValue={tabValue}
              content={<AppOptions />}
            />
            <TabPanel
              panelNr={2} //
              tabValue={tabValue}
              content={<UserOptions />}
            />
          </Grid>
        </Grid>
      </Dialog>
    </Fragment>
  );
};

export default OptionsMenu;
