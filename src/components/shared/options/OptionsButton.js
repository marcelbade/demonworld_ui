//  react
import { useContext } from "react";
// material ui
import { Grid2 as Grid, IconButton } from "@mui/material";
// icons
import SettingsIcon from "@mui/icons-material/Settings";
// contexts
import { MenuContext } from "../../../contexts/MenuContext";

const OptionsButton = () => {
  const MC = useContext(MenuContext);

  const handleClickOpen = () => {
    MC.setOpenMenu(true);
  };

  return (
    <Grid>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <SettingsIcon fontSize="large" />
      </IconButton>
    </Grid>
  );
};

export default OptionsButton;
