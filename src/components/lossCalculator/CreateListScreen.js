// React
import React from "react";
//Material UI
import { Button, Grid, IconButton } from "@mui/material";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// constants
import { LOSS_CALCULATOR } from "../../constants/textsAndMessages";

const CreateListScreen = (props) => {
  return (
    <Grid container direction="column">
      <Grid>
        <IconButton
          onClick={() => {
            // navigate to landing page
            props.navigateToPage("");
          }}
          size="large"
        >
          <ChevronLeftIcon sx={{ width: "2em", height: "2em" }} />
        </IconButton>
      </Grid>
      <Grid container direction="column" alignContent="center" justifyContent="center">
        <Button
          variant="outlined"
          sx={{
            margin: "2em",
            width: "30em",
            height: "3em",
          }}
          onClick={() => {
            props.navigateToPage("ListGenerator");
          }}
        >
          {LOSS_CALCULATOR.CREATE_LIST}
        </Button>
        <Button
          variant="outlined"
          sx={{
            margin: "2em",
            width: "30em",
            height: "3em",
          }}
          onClick={() => {
            //TODO open login prompt
          }}
        >
          {LOSS_CALCULATOR.LOG_INTO_ACCOUNT}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateListScreen;
