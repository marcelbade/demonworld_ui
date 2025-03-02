// React
import React from "react";
//Material UI
import { Grid2 as Grid } from "@mui/material";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// constants
import { LANDINGPAGE, LOSS_CALCULATOR } from "../../constants/textsAndMessages";
import LogInButton from "../Login/LogInButton";
import LightSwitch from "../shared/LightSwitch";
//  components and functions
import NaviButton from "../landingPage/NaviButton";

const CreateListScreen = () => {
  return (
    <Grid //
      container
      direction="column"
    >
      <Grid container item justifyContent="space-between">
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
          <LogInButton
            buttonHeight={"5em"} //
            buttonWidth={"5em"}
            iconSize={"large"}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateListScreen;
