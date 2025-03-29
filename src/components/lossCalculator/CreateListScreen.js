// React
import React, { useState } from "react";
//Material UI
import { Button, Grid2 as Grid } from "@mui/material";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
//  components and functions
import NaviButton from "../landingPage/NaviButton";
import LoginPrompt from "../Login/LogInPrompt";
// constants
import { LANDINGPAGE, LOSS_CALCULATOR, OPTIONS } from "../../constants/textsAndMessages";
import UserLogButton from "../Login/UserLogButton";
import LightSwitch from "../shared/LightSwitch";
import LoadArmyListPrompt from "../ListGenerator/RightSideMenus/Menus/OptionButtons/LoadArmyListPrompt";

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
      <Grid container justifyContent="space-between">
        <NaviButton
          relativeURL={"/"} //
          isIconButton={true}
          isCustomIcon={false}
          icon={ChevronLeftIcon}
          altText={LANDINGPAGE.BACK_TO_LANDINGPAGE}
          width={"3em"}
          height={"3em"}
        />
        <LightSwitch iconSize={"large"} />
      </Grid>
      <Grid
        container //
        direction="column"
        alignContent="center"
        justifyContent="center"
      >
        <Grid //
          container
          width={"45em"}
          alignContent="center"
          justifyContent="center"
        >
          <NaviButton
            relativeURL={"/ListGenerator"} //
            isIconButton={false}
            text={LOSS_CALCULATOR.CREATE_LIST}
            width={"30em"}
            height={"3em"}
          />
        </Grid>
        <Grid //
          container
          width={"45em"}
          alignContent="center"
          justifyContent="center"
        >
          <UserLogButton
            buttonHeight={"5em"} //
            buttonWidth={"5em"}
            iconSize={"large"}
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
    </Grid>
  );
};

export default CreateListScreen;
