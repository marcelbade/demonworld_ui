// React
import React, { useContext } from "react";
// Material UI
import { IconButton, Tooltip, Typography } from "@mui/material";
// components and functions
import { ListDisplayContext } from "../../contexts/ListDisplayContext";
// icons
import MenuIcon from "@mui/icons-material/Menu";
import ListAltIcon from "@mui/icons-material/ListAlt";
// constants
import { OPTIONS } from "../../constants/textsAndMessages";

const ListDisplaySwitch = () => {
  const LDC = useContext(ListDisplayContext);

  const toggleListMode = () => {
    LDC.setSimpleMode((prevState) => !prevState);
  };

  return (
    <Tooltip title={<Typography>{OPTIONS.LIST_DISPLAY_SWITCH}</Typography>}>
      <IconButton
        onClick={() => {
          toggleListMode();
        }}
      >
        {LDC.simpleModeOn ? <ListAltIcon /> : <MenuIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ListDisplaySwitch;
