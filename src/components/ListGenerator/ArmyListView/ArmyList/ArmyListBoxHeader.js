// React
import React, { useContext, Fragment } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { useEffect } from "react";
import { NONE } from "../../../../constants/factions";

const ArmyListBoxHeader = () => {
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
  }, [AC.selectedFactionName]);

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default ArmyListBoxHeader;
