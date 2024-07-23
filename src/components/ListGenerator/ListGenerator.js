// react
import React, { useContext } from "react";
// material ui
import { Grid, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
// components and functions
import ArmyListBox from "./ArmyListView/ArmyListBox";
import MenuBox from "./RightSideMenus/MenuBox";
import ArmySelectionBox from "./ArmySelectorView/ArmySelectionBox";
import ArmySelectorDropdown from "./ArmySelectorView/ArmySelectorDropdown";
// context
import { ArmyContext } from "../../contexts/armyContext";
// icons
import MenuSwitch from "../shared/MenuSwitch";
import AppBar from "../shared/AppBar";
// constants
import { ID } from "../../constants/appBarConstants";
import { NONE } from "../../constants/factions";
import BackToSelectionButton from "../shared/BackToSelectionButton";

const ListGenerator = () => {
  const AC = useContext(ArmyContext);
  const theme = useTheme();

  const factionSelectorStyle = {
    position: "absolute", //
    top: "30%",
    left: "35%",
    width: "30em",
  };

  return (
    <Grid container direction="row">
      <Box
        sx={
          AC.selectedFactionName === NONE //
            ? factionSelectorStyle
            : { ...theme.palette.animation.fadeAway, ...factionSelectorStyle }
        }
      >
        <ArmySelectorDropdown isArmySelector={true} />
      </Box>
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
        <BackToSelectionButton />
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
          {AC.selectedFactionName !== NONE ? <ArmyListBox /> : null}
        </Grid>
      </Grid>
      {AC.selectedFactionName !== NONE ? <MenuBox /> : null}
    </Grid>
  );
};

export default ListGenerator;
