//  react
import { useContext } from "react";
// material ui
import { IconButton } from "@mui/material";
// icons
import SettingsIcon from "@mui/icons-material/Settings";
// contexts
import { MenuContext } from "../../../contexts/MenuContext";

const SettingsButton = () => {
  const MC = useContext(MenuContext);

  const handleClickOpen = () => {
    MC.setOpenMenu(true);
  };

  return (
    <IconButton variant="outlined" onClick={handleClickOpen}>
      <SettingsIcon fontSize="large" style={{ color: "white" }} />
    </IconButton>
  );
};

export default SettingsButton;
