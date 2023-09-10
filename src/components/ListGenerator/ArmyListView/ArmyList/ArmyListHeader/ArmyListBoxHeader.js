// React
import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { TextField, IconButton, Tooltip, Typography, Grid } from "@material-ui/core";
// icons
import CancelIcon from "@material-ui/icons/Cancel";
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";
import { useEffect } from "react";
import { NONE } from "../../../../../constants/factions";
import { TOOLTIPS } from "../../../../../constants/textsAndMessages";

const useStyles = makeStyles({
  button: {},
});

const ArmyListBoxHeader = () => {
  const classes = useStyles();

  const AC = useContext(ArmyContext);

  /**
   * Function takes the user input for maximum point allowance, validates it, and sets the state.
   * @param {event object} event
   */
  const changeArmyName = (event) => {
    AC.setArmyName(event.target.value);
  };

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dayOfMonth = currentDate.getDate();

    if (AC.selectedFactionName !== NONE) {
      const defaultArmyName = `${AC.selectedFactionName}liste - ${dayOfMonth}.${month}.${year}`;
      AC.setArmyName(defaultArmyName);
    }
  }, [AC.selectedFactionName]);// eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Grid container flexdirection="row" alignItems="center">
      <TextField
        id="outlined-basic"
        autoComplete="off"
        value={AC.armyName}
        InputProps={{
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            pading: "50px",
            width: "330px",
          },
        }}
        onChange={changeArmyName}
        required
        variant="standard"
      />
      <Tooltip title={<Typography className={classes.tooltipText}>{TOOLTIPS.DELETE_ARMY_LIST}</Typography>}>
        <IconButton
          className={classes.button}
          variant="outlined"
          onClick={() => {
            AC.resetTheState();
          }}
        >
          <CancelIcon />
        </IconButton>
      </Tooltip>
    </Grid>
  );
};

export default ArmyListBoxHeader;
