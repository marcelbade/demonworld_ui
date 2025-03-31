// React
import React, { useState } from "react";
//Material UI
import { Button, Grid2 as Grid } from "@mui/material";
//  components and functions
import NaviButton from "../landingPage/NaviButton";
import LoginPrompt from "../Login/LogInPrompt";
import AppBar from "../shared/AppBar";
import AppBarToggle from "../shared/AppBarToggle";
// constants
import { LOSS_CALCULATOR, OPTIONS } from "../../constants/textsAndMessages";
import UserLogButton from "../Login/UserLogButton";
import LoadArmyListPrompt from "../ListGenerator/RightSideMenus/Menus/OptionButtons/LoadArmyListPrompt";
import { ID } from "../../constants/appBarConstants";

const CreateListScreen = () => {
  const [showArmyLoadPrompt, setShowArmyLoadPrompt] = useState(false);

  const showLoadListPrompt = () => {
    setShowArmyLoadPrompt(true);
  };

  return (
    <Grid //
      container
      direction="column"
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <AppBar hiddenElements={[ID.COMPENDIMUM_DROPDOWN, ID.LIST_DISPLAY]} />
      <AppBarToggle
        iconSize="25em" //
        bttnSize="2em"
        margin="0.5em"
      />

      <Grid
        container //
        direction="column"
        alignItems="center"
        justifyItems="center"
        spacing={8}
      >
        <NaviButton
          relativeURL={"/ListGenerator"} //
          isIconButton={false}
          variant={"outlined"} //
          text={LOSS_CALCULATOR.CREATE_LIST}
          width={"30em"}
          height={"3em"}
        />
        <Button
          variant="outlined" //
          disabled={false}
          onClick={() => {
            showLoadListPrompt();
          }}
        >
          {OPTIONS.LOAD_LIST}
        </Button>
        <LoginPrompt />
        <LoadArmyListPrompt
          showArmyLoadPrompt={showArmyLoadPrompt} //
          setShowArmyLoadPrompt={setShowArmyLoadPrompt} //
        />
      </Grid>
    </Grid>
  );
};

export default CreateListScreen;
