// React
import { Fragment } from "react";
import makeStyles from '@mui/styles/makeStyles';

import { Grid, IconButton } from "@mui/material";
// icons
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
// components and functions
import StatCard from "../../../../shared/statCards/StatCard";

const useStyles = makeStyles({
  singleCard: {
    paddingLeft: "2em",
  },
  icons: {
    width: "3em",
    height: "3em",
  },
});

const CardView = (props) => {
  const classes = useStyles();
  //

  return (
    <Fragment>
      <Grid item container direction="row" alignItems="center" justifyContent="center" alignContent="center">
        <Grid item>
          {props.isMultiStateCard ? (
            <IconButton
              onClick={() => {
                props.carouselBackward();
              }}
              size="large">
              <ChevronLeft className={classes.icons} />
            </IconButton>
          ) : null}
        </Grid>
        <Grid>
          <StatCard
            isSingleElement={props.isSingleElement} //
            alignment={props.alignment}
            unit={props.cardData}
          />
        </Grid>
        <Grid item>
          {props.isMultiStateCard ? (
            <IconButton
              onClick={() => {
                props.carouselForward();
              }}
              size="large">
              <ChevronRight className={classes.icons} />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CardView;
