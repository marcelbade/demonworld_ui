// react
import React from "react";

// material ui
import { Grid } from "@mui/material";
// components and functions
import ArmyListBox from "./ArmyListView/ArmyListBox";
import MenuBox from "./RightSideMenus/MenuBox";
import MainMenuReturnButton from "../shared/MainMenuReturnButton";
import ArmySelectionBox from "./ArmySelectorView/ArmySelectionBox";

const ListGeneratorController = () => {
  return (
    <Grid container direction="row">
      <Grid
        item //
        justifyContent="flex-start"
        alignItems="center"
        container
        xs={12}
      >
        <MainMenuReturnButton />
      </Grid>

      <Grid
        item //
        container
        direction="row"
        xs={12}
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
        >
          <ArmyListBox />
        </Grid>
      </Grid>
      <MenuBox />
    </Grid>
  );
};

export default ListGeneratorController;
