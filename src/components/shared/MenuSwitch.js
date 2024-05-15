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

  const style = { fontSize: props.iconSize };

  return (
    <Tooltip title={<Typography>{OPTIONS.LIGHT_SWITCH}</Typography>}>
      <IconButton
        onClick={() => {
          MC.setOpenMenu(true);
        }}
        size="large"
      >
        <CustomIcon
          icon={D20} //
          altText={"placeholder"}
          sx={style}
        />
      </IconButton>
    </Tooltip>
  );
};

export default MenuSwitch;
