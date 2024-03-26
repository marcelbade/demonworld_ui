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

  return (
    <Grid item>
      <Typography
        variant="body1" //
        align="center"
        sx={theme.palette.statCards.cardBackGround}
      >
        {SC.unit.specialRules === "" ? COMPENDIUM.NO_SPECIAL_RULES : SC.unit.specialRules}
        {"equipment" in SC.unit && SC.unit.equipment.length !== 0
          ? SC.unit.equipment.map((e, i) => {
              return (
                <Fragment key={i}>
                  {/* <hr></hr> */}
                  <Typography variant="body1" sx={CSS}>
                    {e.name}
                  </Typography>
                  <Typography>_______</Typography>
                  <Typography variant="body1" sx={CSS}>
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
