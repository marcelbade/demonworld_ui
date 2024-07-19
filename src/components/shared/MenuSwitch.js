// React
import React, { useContext } from "react";
// Material UI
import { IconButton, Tooltip, Typography } from "@mui/material";
// context
import { MenuContext } from "../../contexts/MenuContext";
// icons
import D20 from "../../assets/icons/d20.png";
// constants
import { ALTTEXT, OPTIONS } from "../../constants/textsAndMessages";
import CustomIcon from "./statCards/CustomIcon";

/**
 * Function renders a switch represented by an Icon to toggle the App Bar on the top of the screen
 * @param {{*}} props
 * @returns JSX
 */
const MenuSwitch = (props) => {
  const MC = useContext(MenuContext);

  return (
    <Tooltip title={<Typography>{OPTIONS.MENU_SWITCH}</Typography>}>
      <IconButton
        onClick={() => {
          MC.setOpenMenu(true);
        }}
        sx={{
          width: props.bttnSize,
          height: props.bttnSize,
          margin: props.margin,
        }}
      >
        <CustomIcon
          icon={D20} //
          altText={ALTTEXT.APP_BAR_SWITCH}
          width={props.iconSize}
          height={props.iconSize}
        />
      </IconButton>
    </Tooltip>
  );
};

export default MenuSwitch;
