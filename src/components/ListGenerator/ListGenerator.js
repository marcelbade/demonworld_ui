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
// constants
import { ID } from "../../constants/appBarConstants";

const ListGenerator = () => {
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
        <MenuSwitch
          iconSize="25em" //
          bttnSize="2em"
          margin="0.5em"
        />
      </Grid>
      <AppBar hiddenElements={[ID.COMPENDIMUM_DROPDOWN]} />
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

export default ListGenerator;
