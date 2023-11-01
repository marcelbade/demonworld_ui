// React
import { Fragment } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";

import { Grid, IconButton } from "@material-ui/core";
// icons
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
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
      <Grid item container direction="row" alignItems="center" justify="center" alignContent="center">
        <Grid item>
          {props.isMultiStateCard ? (
            <IconButton
              onClick={() => {
                props.carouselBackward();
              }}
            >
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
            >
              <ChevronRight className={classes.icons} />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CardView;
