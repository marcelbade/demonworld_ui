// react
import { useContext } from "react";
// mui
import { Grid2 as Grid } from "@mui/material";
// components and functions
import { MenuContext } from "../../contexts/MenuContext";
// icon
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

const TopDrawerButton = () => {
  const MC = useContext(MenuContext);

  return (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      onClick={() => {
        MC.setOpenTopMenuDrawer((prevState) => !prevState);
      }}
      sx={{
        backgroundColor: "darkgray",
        borderRadius: "0em 0em 10em 10em",
        width: "30vw",
        height:"5vh"
      }}
    >
      {MC.openTopMenuDrawer ? ( //
        <KeyboardDoubleArrowUpIcon fontSize="large" />
      ) : (
        <KeyboardDoubleArrowDownIcon fontSize="large" />
      )}
    </Grid>
  );
};

export default TopDrawerButton;
