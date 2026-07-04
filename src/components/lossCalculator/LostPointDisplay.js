//Material UI
import { Grid, Typography } from "@mui/material";
// functions and components
import ContextHelpButton from "../shared/ContextHelpButton";
// constants
import { LOSS_CALCULATOR, PUSH_MESSAGE_TYPES } from "../../constants/textsAndMessages";

const LostPointDisplay = (props) => {
  return (
    <Grid
      container //
      direction="row"
      justifyItems="start"
      alignItems="center"
      size={12}
      sx={{
        paddingLeft: "2em", //
        paddingTop: { xs: "2em", md: "0em" },
      }}
    >
      <Typography
        variant="h5" //
        sx={{ paddingRight: "2em" }}
      >{`${LOSS_CALCULATOR.LOST_POINTS}`}</Typography>
      <Typography
        variant="h5" //
        sx={{ paddingRight: "2em" }}
      >{`${props.totalPointsLost.toFixed(2)}`}</Typography>

      <ContextHelpButton
        isVisible={true}
        message={LOSS_CALCULATOR.LOSS_BUTTON_HELP} //
        type={PUSH_MESSAGE_TYPES.INFO}
      />
    </Grid>
  );
};

export default LostPointDisplay;
