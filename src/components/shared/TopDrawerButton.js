// react
import { useContext } from "react";
// mui
import { IconButton } from "@mui/material";
// components and functions
import { MenuContext } from "../../contexts/MenuContext";
// icon
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

const TopDrawerButton = () => {
  const MC = useContext(MenuContext);

  return (
    <IconButton
      onClick={() => {
        MC.setOpenTopMenuDrawer((prevState) => !prevState);
      }}
    >
      <ExpandCircleDownIcon fontSize="large" />
    </IconButton>
  );
};

export default TopDrawerButton;
