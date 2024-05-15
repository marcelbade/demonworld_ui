// react
import React from "react";
// material ui
import { Grid } from "@mui/material";
// components and functions
import ArmyListBox from "./ArmyListView/ArmyListBox";
import MenuBox from "./RightSideMenus/MenuBox";
import MainMenuReturnButton from "../shared/MainMenuReturnButton";
import ArmySelectionBox from "./ArmySelectorView/ArmySelectionBox";
import LightSwitch from "../shared/LightSwitch";
import ListDisplaySwitch from "../shared/ListDisplaySwitch";

const ListGeneratorController = () => {
  return (
    <Grid container direction="row">
      <Grid
        justifyContent="flex-start" //
        alignItems="center"
        container
        direction="row"
      >
        <MainMenuReturnButton />
      </Grid>
      <Grid
        item //
        container
        direction="row"
      >
        <Grid
          item //
          xs={3}
        >
          <ArmySelectionBox />
        </Grid>
        <Grid
          item //
          xs={9}
          sx={{
            paddingLeft: "10em",
          }}
        >
          <ArmyListBox />
        </Grid>
      </Grid>
      <MenuBox />
    </Grid>
  );
};

export default ListGeneratorController;
