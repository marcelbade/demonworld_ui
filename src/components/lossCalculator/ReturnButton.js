// React
import React from "react";
import { useLocation } from "react-router-dom";
//Material UI
import { Grid, IconButton } from "@mui/material";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const ReturnButton = (props) => {
  const location = useLocation();

  return (
    <Grid item>
      <IconButton
        onClick={() => {
          props.navigateToPage(location.state.lastPage);
        }}
        size="large"
      >
        <ChevronLeftIcon
          sx={{
            width: "2em",
            height: "2em",
          }}
        />
      </IconButton>
    </Grid>
  );
};

export default ReturnButton;
