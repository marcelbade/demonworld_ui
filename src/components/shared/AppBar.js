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
import CompendiumDropDown from "../compendiums/factionTable/components/CompendiumDropDown";
import { ID } from "../../constants/appBarConstants";

const AppBar = (props) => {
  const MC = useContext(MenuContext);

  const controls = [
    { id: ID.RETURN_BTTN, elemnt: <MainMenuReturnButton bttnSize="medium" iconSize="2em" /> },
    { id: ID.LIST_DISPLAY, elemnt: <ListDisplaySwitch bttnSize="medium" /> },
    { id: ID.COMPENDIMUM_DROPDOWN, elemnt: <CompendiumDropDown /> },
    { id: ID.LIGHT_SWITCH, elemnt: <LightSwitch bttnSize="medium" /> },
  ];

  return (
    <Drawer
      open={MC.openMenu} //
      onClose={() => {
        MC.setOpenMenu(false);
      }}
      anchor="top"
    >
      <Grid container direction="row" alignItems="center" justifyContent="space-around">
        {controls
          .filter((c) => !props.hiddenElements.includes(c.id))
          .map((c) => (
            <Grid item>{c.elemnt}</Grid>
          ))}
      </Grid>
    </Drawer>
  );
};

export default AppBar;
