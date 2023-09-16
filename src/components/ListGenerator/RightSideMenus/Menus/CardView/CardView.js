// React
import { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
// icons
import CancelIcon from "@material-ui/icons/Cancel";
// components and functions
import { isObjectEmtpy, unitOrCmdCard } from "../../../../shared/sharedFunctions";
import { ArmyContext } from "../../../../../contexts/armyContext";
import { useState } from "react";
import { useEffect } from "react";
import { AUTOMATON, GIANT, HERO, MAGE } from "../../../../../constants/unitTypes";
import StatCard from "../../../../shared/statCards/StatCard";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "30vw",
  },
});

const CardView = () => {
  const AC = useContext(ArmyContext);
  const classes = useStyles();
  const COLUMN = "column";

  const [isSingleElement, setIsSingleElement] = useState(false);

  useEffect(() => {
    if (AC.statCardState.clickedUnit !== undefined) {
      const isSingleElement = unitOrCmdCard(AC.statCardState.clickedUnit);
      setIsSingleElement(isSingleElement);
    }
  }, [AC.statCardState.clickedUnit]);

  /**
   *  Function controls which kind of stat card (unit or character) is displayed.
   *
   * @param {[{*}]} unit
   * @returns  JSX element
   */
  const unitOrCmdCard = (unit) => {
    const SINGLE_ELEMENTS_LIST = [HERO, MAGE, AUTOMATON, GIANT];
    return SINGLE_ELEMENTS_LIST.includes(unit.unitType);
  };

  return (
    <Grid container className={classes.overlay}>
      <Grid item>
        <IconButton
          onClick={() => {
            AC.closeCardDisplay();
          }}
        >
          <CancelIcon />
        </IconButton>
      </Grid>
      <Grid item>
        {AC.statCardState.clickedUnit !== undefined ? (
          <StatCard
            isSingleElement={isSingleElement} //
            alignment={COLUMN}
            unit={AC.statCardState.clickedUnit}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default CardView;
