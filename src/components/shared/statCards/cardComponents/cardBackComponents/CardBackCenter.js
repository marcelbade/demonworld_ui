// React
import React, { useContext, Fragment } from "react";
// Material UI
import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
// functions and modules
import { StateCardContext } from "../../../../../contexts/statCardContext";
import { COMPENDIUM } from "../../../../../constants/textsAndMessages";

const CardBackCenter = () => {
  const theme = useTheme();
  const SC = useContext(StateCardContext);

  const EQUIPMENT_CSS = {
    fontFamily: "Beryliumbold",
    paddingLeft: "0.5em",
  };

  const specialRules = SC.unit.specialRules === "" ? COMPENDIUM.NO_SPECIAL_RULES : SC.unit.specialRules;
  const hasEquipment = "equipment" in SC.unit && SC.unit.equipment.length !== 0;

  return (
    <Grid item>
      <Typography
        variant="body1" //
        align="center"
        sx={theme.palette.statCards.backGround}
      >
        {specialRules}
        {hasEquipment
          ? SC.unit.equipment.map((e, i) => {
              return (
                <Fragment key={i}>
                  <Typography variant="body1" sx={EQUIPMENT_CSS}>
                    {e.name}
                  </Typography>
                  <Typography>_______</Typography>
                  <Typography variant="body1" sx={EQUIPMENT_CSS}>
                    {e.rule}
                  </Typography>
                </Fragment>
              );
            })
          : null}
      </Typography>
    </Grid>
  );
};

export default CardBackCenter;
