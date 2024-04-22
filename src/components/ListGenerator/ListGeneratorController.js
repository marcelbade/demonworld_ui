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
      <Grid container item direction="column" xs={4} sx={{ paddingLeft: "2em" }}>
        <MainMenuReturnButton />
        <ArmySelectionBox />
      </Grid>
      <Grid item xs={3}>
        <ArmyListBox />
      </Grid>
      <Grid item xs={3}>
        <MenuBox />
      </Grid>
    </Grid>
  );
};

export default ListGeneratorController;
