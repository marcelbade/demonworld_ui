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

const ListDisplaySwitch = (props) => {
  const LDC = useContext(ListDisplayContext);

  const style = { fontSize: props.iconSize };

  const toggleListMode = () => {
    LDC.setSimpleMode((prevState) => !prevState);
  };

  return (
    <Tooltip title={<Typography>{OPTIONS.LIST_DISPLAY_SWITCH}</Typography>}>
      <IconButton
        size={props.bttnSize}
        onClick={() => {
          toggleListMode();
        }}
      >
        {LDC.simpleModeOn ? <ListAltIcon sx={style} /> : <MenuIcon sx={style} />}
      </IconButton>
    </Tooltip>
  );
};

export default ListDisplaySwitch;
