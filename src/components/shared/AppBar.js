// React
import React, { useContext } from "react";
// Material UI
import { Grid, Drawer } from "@mui/material";
// context
import { MenuContext } from "../../contexts/MenuContext";
// components and functions
import MainMenuReturnButton from "./MainMenuReturnButton";
import LightSwitch from "./LightSwitch";
import ListDisplaySwitch from "./ListDisplaySwitch";


const AppBar = () => {
  const MC = useContext(MenuContext);

  return (
    <Drawer
      open={MC.openMenu} //
      onClose={() => {
        MC.setOpenMenu(false);
      }}
      anchor="top"
    >
      <Grid container direction="row" alignItems="center" justifyContent="space-around">
        <Grid item>
          <MainMenuReturnButton bttnSize="medium" iconSize="2em" />
        </Grid>
        <Grid item>
          <ListDisplaySwitch bttnSize="medium" />
        </Grid>
        <Grid item>
          <LightSwitch bttnSize="medium" />
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default AppBar;
