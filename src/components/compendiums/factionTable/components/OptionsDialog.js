// React
import React, { useContext } from "react";
// material ui
import { AppBar, Dialog, IconButton, Toolbar, Typography, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// components and functions
import ToggleColumnsMenu from "./ToggleColumnsMenu";
// constants
import { COMPENDIUM } from "../../../../constants/textsAndMessages";
import { TableContext } from "../../../../contexts/tableContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OptionsDialog = (props) => {
  const TC = useContext(TableContext);

  const handleOptionsClose = () => {
    TC.setOpenOptions(false);
  };

  return (
    <Dialog
      open={TC.openOptions} //
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
      <ToggleColumnsMenu />
    </Dialog>
  );
};

export default OptionsDialog;
