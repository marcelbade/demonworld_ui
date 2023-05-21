// React
import React from "react";
//Material UI
import { Typography, Grid, ButtonGroup, Button, Tooltip, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// icons
import skullsIcon from "../../icons/skulls.png";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme) => ({
  typographyFont: {
    fontFamily: "NotMaryKate",
    textAlign: "center",
    marginTop: "0.5em",
  },
  text: {
    paddingLeft: "1em",
  },

  bttn: {
    width: "1em",
    height: "4em",
  },
}));

const ListElementBttns = (props) => {
  const classes = useStyles();

  /**
   * Function lets the user add lost elements.
   */
  const addLoss = () => {
    let temp = props.numberOfLostElements;
    props.setNumberOfLostElements(++temp);
  };

  /**
   * Function lets the user subtract lost elements.
   */
  const subtractLoss = () => {
    let temp = props.numberOfLostElements;
    props.setNumberOfLostElements(--temp);
  };

  /**
   * Function immediately sets the number of lost elements to the maximum number possible.
   */
  const unitDestroyed = () => {
    props.setNumberOfLostElements(props.unit.numberOfElements);
  };

  /**
   * Function makrs all itms as lost by setting all flags to true.
   */
  const allItemsMarkedLost = () => {
    let tempArray = [...props.itemClicked];
    tempArray = tempArray.map((i) => (i = true));

    props.setItemClicked(tempArray);
  };

  /**
   * Function calculates the points when all items are marked lost together.
   */
  const allItemsLost = () => {
    let sum = 0;

    props.unit.equipment.forEach((i) => {
      sum += i.points;
    });

    props.setItemsLost(sum);
  };

  /**
   * Function prevents the user from choosing a number of lost elements larger than the number of elements the unit has.
   * @returns boolean flag
   */
  const notOverNumberOfElements = () => {
    return props.numberOfLostElements === props.unit.numberOfElements;
  };

  /**
   * Function prevents the user from choosing a negative number of lost elements.
   * @returns  boolean flag
   */
  const notUnderZero = () => {
    return props.numberOfLostElements === 0;
  };

  return (
    <Grid item xs={2} container justify="space-between">
      <Grid item>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button
            onClick={() => {
              subtractLoss();
            }}
            disabled={notUnderZero()}
            className={classes.bttn}
          >
            <ChevronLeftIcon />
          </Button>
          <Typography variant="h6" className={classes.typographyFont}>
            {props.numberOfLostElements}
          </Typography>
          <Button
            onClick={() => {
              addLoss();
            }}
            disabled={notOverNumberOfElements()}
            className={classes.bttn}
          >
            <ChevronRightIcon />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={1}>
        <Tooltip title={<Typography className={classes.tooltipText}>Einheit aufgerieben</Typography>}>
          <IconButton
            variant="contained"
            component={Button}
            onClick={() => {
              unitDestroyed();
              allItemsMarkedLost();
              allItemsLost();
            }}
            className={classes.bttn}
          >
            <img src={skullsIcon} alt="Einheit aufgerieben" height={40} width={40} />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default ListElementBttns;
