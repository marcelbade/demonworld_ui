import React, { useContext, Fragment, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
//
import { MenuContext } from "../../../contexts/MenuContext";
import CancelIcon from "@mui/icons-material/Cancel";
import TabButtons from "../TabButtons";
import TabPanel from "../TabPanel";
import GameOptions from "./GameOptions";
import AppOptions from "./AppOptions";
import { Grid2 } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
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

  const TABS = ["GAME_OPTIONS", "APP_OPTIONS"];

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog // TODO addto theme: full screen dialog witzout rounded edges!
        fullScreen
        open={MC.openMenu}
        onClose={handleClose}
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
              Optionen {/* TODO add to texts */}
            </Typography>
          </Toolbar>
        </AppBar>
        <TabButtons
          direction="column"
          handleTabChange={setTabValue} //
          altPanels={TABS}
          tabValue={tabValue}
        />
        <Grid2 container direction="row">
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
        </Grid2>
      </Dialog>
    </Fragment>
  );
};

export default OptionsMenu;
