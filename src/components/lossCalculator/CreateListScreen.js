// React
import React from "react";
//Material UI
import { Grid, IconButton } from "@mui/material";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// constants
import { LOSS_CALCULATOR } from "../../constants/textsAndMessages";
import LogInButton from "../Login/LogInButton";
import LightSwitch from "../shared/LightSwitch";
//  components and functions
import NaviButton from "../landingPage/NaviButton";

const CreateListScreen = (props) => {
  return (
    <Grid container direction="column">
      <Grid container item justifyContent="space-between">
        <IconButton
          onClick={() => {
            // navigate to landing page
            props.navigateToPage("");
          }}
          size="large"
        >
          <ChevronLeftIcon sx={{ width: "2em", height: "2em" }} />
        </IconButton>
        <LightSwitch iconSize={"large"} />
      </Grid>
      <Grid
        container //
        item
        direction="column"
        alignContent="center"
        justifyContent="center"
      >
        <Grid
          item //
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
        <Grid
          item //
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
