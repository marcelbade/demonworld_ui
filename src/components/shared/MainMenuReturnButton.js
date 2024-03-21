// react
import React from "react";
import { useHistory } from "react-router-dom";
// material ui
import { IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const useStyles = makeStyles((theme) => ({
  BackBttn: {
    [theme.breakpoints.up("md")]: {
      top: "0%",
      left: "1%",
    },
  },
  BackBttnIcon: {
    width: "2em",
    height: "2em",
  },
}));

const MainMenuReturnButton = () => {
  const history = useHistory();
  const classes = useStyles();

  /**
   * Function calls history objects to take user back to main menu.
   */
  const backToMainmenu = () => {
    history.push("/");
  };

  return (
    <IconButton
      className={classes.BackBttn}
      onClick={() => {
        backToMainmenu();
      }}
      size="large"
    >
      <ChevronLeftIcon className={classes.BackBttnIcon} />
    </IconButton>
  );
};

export default MainMenuReturnButton;
