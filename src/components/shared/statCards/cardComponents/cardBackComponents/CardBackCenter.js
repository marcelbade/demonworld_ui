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
              console.log("e", e);

              return (
                <Fragment key={i}>
                  <Typography variant="body1">{e.name}</Typography>
                </Fragment>
              );
            })
          : null}
      </Typography>
    </Grid>
  );
};

export default CardBackCenter;
