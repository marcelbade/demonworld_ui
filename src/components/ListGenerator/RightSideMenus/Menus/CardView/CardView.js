// React
import { useContext } from "react";
// Material UI
import { Grid, IconButton } from "@material-ui/core";
// icons
import CancelIcon from "@material-ui/icons/Cancel";
// components and functions
import { isObjectEmtpy, unitOrCmdCard } from "../../../../shared/sharedFunctions";
import { ArmyContext } from "../../../../../contexts/armyContext";

const CardView = () => {
  const AC = useContext(ArmyContext);

  // front and back side of the displayed unit cards are alligned vertically.
  const COLUMN = "column";

  return (
    <Grid container>
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
        {!isObjectEmtpy(AC.statCardState.clickedUnit) //
          ? unitOrCmdCard(AC.statCardState.clickedUnit, COLUMN)
          : null}
      </Grid>
    </Grid>
  );
};

export default CardView;
