// React
import React, { useContext } from "react";
// Material UI
import { IconButton, Typography, Grid, makeStyles } from "@material-ui/core";
// icons
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";

// clsx
import clsx from "clsx";

const useStyles = makeStyles({
  deleteBttn: {
    padding: "0",
    marginRight: "1.5em",
  },
  equipment: {
    paddingLeft: "3em",
  },
  line: {
    marginTop: "0.5em",
    marginBottom: "0.5em",
    borderBottom: "solid black 0.1em",
    display: "block",
    // width: "1em",
  },
  typographyFont: {
    fontFamily: "NotMaryKate",
  },

  textMargin: {
    marginRight: "3em",
  },
});

const EquipmentList = (props) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  /**
   * Removes the item.
   * @param {unit.name + hash code} identifier
   * @param {array index } i
   */
  const removeItem = (identifier, i) => {
    contextArmy.removeItem(identifier, i);
  };

  return (
    <Grid container item direction="row">
      <Typography>
        {props.u.equipment.length !== 0 ? <span className={classes.line}></span> : null}
        {props.u.equipment.length !== 0
          ? props.u.equipment.map((e, i) => {
              return (
                <Grid item xs={12} container direction="row" className={classes.equipment} key={props.identifier}>
                  <Grid item xs={3}>
                    <IconButton
                      className={clsx(classes.deleteBttn, classes.textMargin)}
                      onClick={() => {
                        removeItem(props.identifier, i);
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="button" className={classes.typographyFont}>
                      {e.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="button" className={classes.typographyFont}>
                      {e.points}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })
          : null}
      </Typography>
    </Grid>
  );
};

export default EquipmentList;
