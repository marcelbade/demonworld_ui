// React
import React, { Fragment } from "react";
// Material UI
import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
// functions and modules
import { COMPENDIUM } from "../../../../../constants/textsAndMessages";

const CardBackCenter = (props) => {
  const theme = useTheme();

  const specialRules = props.unit.specialRules === "" ? COMPENDIUM.NO_SPECIAL_RULES : props.unit.specialRules;
  const hasEquipment = "equipment" in props.unit && props.unit.equipment.length !== 0;

  return (
    <Grid item>
      <Typography
        variant="body1" //
        align="center"
        sx={theme.palette.statCards.backGround}
      >
        {specialRules}
        {hasEquipment
          ? props.unit.equipment.map((e, i) => {
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
