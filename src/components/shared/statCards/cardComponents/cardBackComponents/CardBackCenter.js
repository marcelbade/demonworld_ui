// React
import React, { useContext, Fragment } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
// functions and modules
import { StateCardContext } from "../../../../../contexts/statCardContext";

const CardBackCenter = () => {
  const SPECIAL_RULES = { fontFamily: "jaapokkiRegular", paddingLeft: "0.5em" };

  const SC = useContext(StateCardContext);

  return (
    <Grid item>
      <Typography variant="body1" align="center" sx={SPECIAL_RULES}>
        {SC.unit.specialRules === "" ? "Keine Besonderen Spielregeln" : SC.unit.specialRules}
        {"equipment" in SC.unit && SC.unit.equipment.length !== 0
          ? SC.unit.equipment.map((e, i) => {
              return (
                <Fragment key={i}>
                  {/* <hr></hr> */}
                  <Typography variant="body1" sx={SPECIAL_RULES}>
                    {e.name}
                  </Typography>
                  <Typography>_______</Typography>
                  <Typography variant="body1" sx={SPECIAL_RULES}>
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
