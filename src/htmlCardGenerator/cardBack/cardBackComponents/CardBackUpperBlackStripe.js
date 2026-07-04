// Material UI
import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
//  components and functions
import { numberOfElements, renderSpecialElements } from "../../../util/utilityFunctions";

const CardBackUpperBlackStripe = (props) => {
  const theme = useTheme();

  return (
    <Grid
      container //
      direction="row"
      sx={theme.palette.statCards.blackStripe}
      justifyContent="space-around"
    >
      {/* dont render element for giants & heroes so layout stays correct*/}
      {props.unit.numberOfElements > 1 ? (
        <Typography
          variant="h6" //
        >
          {renderSpecialElements(props.unit)}
        </Typography>
      ) : null}
      <Typography variant="h6"> {numberOfElements(props.unit)} </Typography>
    </Grid>
  );
};

export default CardBackUpperBlackStripe;
