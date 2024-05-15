// React
import React, { useContext } from "react";
// Material UI
import { IconButton, Tooltip, Typography } from "@mui/material";
// context
import { MenuContext } from "../../contexts/MenuContext";
// icons
import D20 from "../../assets/icons/d20.png";
// constants
import { OPTIONS } from "../../constants/textsAndMessages";
import CustomIcon from "./statCards/CustomIcon";

const MenuSwitch = (props) => {
  const MC = useContext(MenuContext);

  return (
    <Tooltip title={<Typography>{OPTIONS.MENU_SWITCH}</Typography>}>
      <IconButton
        onClick={() => {
          MC.setOpenMenu(true);
        }}
        size={props.bttnSize}
      >
        <CustomIcon
          icon={D20} //
          altText={"placeholder"}
          width={props.iconSize}
          height={props.iconSize}
        />
      </IconButton>
    </Tooltip>
  );
};

export default MenuSwitch;
