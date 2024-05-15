// react
import React from "react";
// material ui
import { Grid } from "@mui/material";
// components and functions
import ArmyListBox from "./ArmyListView/ArmyListBox";
import MenuBox from "./RightSideMenus/MenuBox";
import ArmySelectionBox from "./ArmySelectorView/ArmySelectionBox";
// icons
import MenuSwitch from "../shared/MenuSwitch";
import AppBar from "../shared/AppBar";

const ListGeneratorController = () => {
  return (
    <Grid container direction="row">
      <Grid
        item //
        container
        justifyContent="flex-start"
        sx={{
          marginBottom: "2em",
        }}
      >
        <MenuSwitch />
      </Grid>
      <AppBar />
      <Grid
        justifyContent="flex-start" //
        alignItems="center"
        container
        direction="row"
      ></Grid>
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
