// React
import { Fragment } from "react";
// material ui
import { Grid, IconButton } from "@mui/material";
// icons
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
// components and functions
import StatCard from "../../../../shared/statCards/StatCard";

const CardView = (props) => {
  return (
    <Fragment>
      <Grid item container direction="row" alignItems="center" justifyContent="center" alignContent="center">
        <Grid item>
          {props.isMultiStateCard ? (
            <IconButton
              onClick={() => {
                props.carouselBackward();
              }}
              size="large"
            >
              <ChevronLeft
                sx={{
                  width: "2em",
                  height: "2em",
                }}
              />
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
              size="large"
            >
              <ChevronRight
                sx={{
                  width: "2em",
                  height: "2em",
                }}
              />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CardView;
