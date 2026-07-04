// React
import React, { Fragment } from "react";
// Material UI
import { useTheme } from "@emotion/react";
import { Grid, TextField, Typography } from "@mui/material";
// functions and modules
import { COMPENDIUM } from "../../../constants/textsAndMessages";

const CardBackCenter = (props) => {
  const theme = useTheme();

  const specialRules = props.unit.specialRules === "" ? COMPENDIUM.NO_SPECIAL_RULES : props.unit.specialRules;
  const hasEquipment = "equipment" in props.unit && props.unit.equipment.length !== 0;

  return (
    <Grid alignItems="stretch">
      <TextField
        // multiline
        variant="standard"
        disabled={true}
        // variant="body1" //
        value={specialRules}
        // align="center"

        slotProps={{
          input: {
            backgroundColor: "blue",
            color: "primary",
          },
        }}

        // sx={{
        //   ...theme.palette.statCards.backGround,
        //   padding: "1em",
        //   width: "100%",
        // // input: { color: 'red' } ,
        //   root: {
        //     "& .Mui-disabled-root": { color: "black" },
        //   },
        // }}
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
      </TextField>
    </Grid>
  );
};

export default CardBackCenter;
