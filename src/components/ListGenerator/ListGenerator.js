// react
import React, { useContext } from "react";
// material ui
import { Grid2 as Grid, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
// components and functions
import ArmyListBox from "./ArmyListView/ArmyListBox";
import MenuBox from "./RightSideMenus/MenuBox";
import ArmySelectionBox from "./ArmySelectorView/ArmySelectionBox";
import ArmySelectorDropdown from "./ArmySelectorView/ArmySelectorDropdown";
// context
import { ArmyContext } from "../../contexts/armyContext";
// icons
import MenuToggle from "../shared/MenuToggle";
import AppBar from "../shared/AppBar";
// constants
import { ID } from "../../constants/appBarConstants";
import { NONE } from "../../constants/factions";
import BackToSelectionButton from "../shared/BackToSelectionButton";
import DeleteArmyListButton from "../shared/DeleteArmyListButton";

const ListGenerator = () => {
  const AC = useContext(ArmyContext);

  const theme = useTheme();

  const factionSelectorStyle = {
    position: "absolute", //
    top: "30%",
    left: "35%",
    width: "30em",
  };

  const setArmySelectorBoxStyle = () => {
    return AC.selectedFactionName === NONE //
      ? factionSelectorStyle
      : { ...theme.palette.animation.fadeAway, ...factionSelectorStyle };
  };

  return (
    <Grid container direction="row">
      <Box sx={setArmySelectorBoxStyle()}>
        <ArmySelectorDropdown />
      </Box>
      <Grid //
        container
        justifyContent="flex-start"
        sx={{
          position: "fixed",
        }}
      >
        <MenuToggle
          iconSize="25em" //
          bttnSize="2em"
          margin="0.5em"
        />
        <BackToSelectionButton />
        <DeleteArmyListButton />
      </Grid>
      <AppBar hiddenElements={[ID.COMPENDIMUM_DROPDOWN]} />
      <Grid
        justifyContent="flex-start" //
        alignItems="center"
        container
        direction="row"
      ></Grid>
      <Grid //
        container
        direction="row"
      >
        <Grid //
          xs={3}
          position={"fixed"}
          marginTop={"5em"}
        >
          <ArmySelectionBox />
        </Grid>
        <Grid //
          xs={9}
          sx={{
            paddingLeft: "50em",
            marginTop: "5em",
          }}
        >
          {AC.selectedFactionName !== NONE ? <ArmyListBox /> : null}
        </Grid>
      </Grid>
      {AC.selectedFactionName !== NONE ? <MenuBox /> : null}
    </Grid>
  );
};

export default ListGenerator;
