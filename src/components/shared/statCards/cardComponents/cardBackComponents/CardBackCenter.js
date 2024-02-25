// React
import React, { useContext, Fragment } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// functions and modules
import { StateCardContext } from "../../../../../contexts/statCardContext";

const useStyles = makeStyles({
  specialRules: {
    fontFamily: "jaapokkiRegular",
    paddingLeft: "0.5em",
  },
});

const CardBackCenter = () => {
  const classes = useStyles();
  const SC = useContext(StateCardContext);

  return (
    <Grid item>
      <Typography variant="body1" align="center" className={classes.specialRules}>
        {SC.unit.specialRules === "" ? "Keine Besonderen Spielregeln" : SC.unit.specialRules}
        {"equipment" in SC.unit && SC.unit.equipment.length !== 0
          ? SC.unit.equipment.map((e, i) => {
              return (
                <Fragment key={i}>
                  {/* <hr></hr> */}
                  <Typography variant="body1" className={classes.specialRules}>
                    {e.name}
                  </Typography>
                  <Typography>_______</Typography>
                  <Typography variant="body1" className={classes.specialRules}>
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
