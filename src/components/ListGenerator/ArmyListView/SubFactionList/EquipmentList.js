// React
import React, { useContext, Fragment } from "react";
// Material UI
import { IconButton, Typography, makeStyles, List, ListItemText } from "@material-ui/core";
// icons
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";

// clsx
import clsx from "clsx";

const useStyles = makeStyles({
  deleteBttn: {
    padding: "0",
    marginRight: "1.5em",
  },
  equipmentList: {
    display: "flex",
    flexDirection: "row",
  },
  line: {
    marginTop: "0.5em",
    marginBottom: "0.5em",
    borderBottom: "solid black 0.1em",
    display: "block",
    width: "75%",
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
    <Typography>
      {props.u.equipment.length !== 0 ? <span className={classes.line}></span> : null}
      {props.u.equipment.length !== 0
        ? props.u.equipment.map((e, i) => {
            return (
              <List className={classes.equipmentList} key={props.identifier}>
                <IconButton
                  className={clsx(classes.deleteBttn, classes.textMargin)}
                  onClick={() => {
                    removeItem(props.identifier, i);
                  }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <ListItemText
                  primary={
                    <Fragment>
                      <Typography variant="button" className={classes.typographyFont}>
                        {e.name}
                      </Typography>
                    </Fragment>
                  }
                  secondary={
                    <Fragment>
                      <Typography variant="button" className={classes.typographyFont}>
                        {e.points}
                      </Typography>
                    </Fragment>
                  }
                />
              </List>
            );
          })
        : null}
    </Typography>
  );
};

export default EquipmentList;
