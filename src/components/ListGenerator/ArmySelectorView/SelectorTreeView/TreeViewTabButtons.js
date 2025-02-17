// react
import React, { useContext } from "react";
// material ui
import { Button, Grid } from "@mui/material";
// context
import { AllyContext } from "../../../../contexts/allyContext";

const TreeViewTabButtons = (props) => {
  const AYC = useContext(AllyContext);

  return (
    <Grid
      container
      direction="row" //
      sx={{ width: "35em" }}
    >
      <Button
        sx={props.styleButtons(props.tabValue, props.SHOW_ARMY)}
        onClick={() => {
          props.handleTabChange(props.SHOW_ARMY);
        }}
      >
        {"Fraktion"}
      </Button>
      <Button
        sx={props.styleButtons(props.tabValue, props.SHOW_ALLY)}
        onClick={() => {
          props.handleTabChange(props.SHOW_ALLY);
        }}
      >
        {`Allierter: ${AYC.allyName}`}
      </Button>
    </Grid>
  );
};

export default TreeViewTabButtons;
