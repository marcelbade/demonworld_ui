// React
import React from "react";
// material ui
import { AppBar, Dialog, IconButton, Toolbar, Typography, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// components and functions
import ToggleColumnsMenu from "./ToggleColumnsMenu";
// constants
import { COMPENDIUM } from "../../../../constants/textsAndMessages";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OptionsDialog = (props) => {
  const handleOptionsClose = () => {
    props.setOpenOptions(false);
  };

  return (
    <Dialog
      open={props.openOptions} //
      onClose={handleOptionsClose}
      TransitionComponent={Transition}
      // override CSS for paper component child
      PaperProps={{
        sx: {
          minWidth: "80vw",
          minHeight: "80vh",
        },
      }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleOptionsClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {COMPENDIUM.COLUMNS}
          </Typography>
        </Toolbar>
      </AppBar>
      <ToggleColumnsMenu
        allBoxes={props.allBoxes}
        columns={props.columns}
        toggleGroups={props.toggleGroups}
        toggleColumn={props.toggleColumn}
        toggleAllColumns={props.toggleAllColumns}
        toggleGroupsOfColumns={props.toggleGroupsOfColumns}
      />
    </Dialog>
  );
};

export default OptionsDialog;
