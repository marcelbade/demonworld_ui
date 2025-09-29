import { Grid2 as Grid, Typography } from "@mui/material";

const SpellProperty = (props) => {
  return (
    <Grid
      container //
      size={12}
      direction="row"
      sx={{ paddingBottom: "2em" }}
    >
      <Grid size={2}>
        <Typography
          sx={{
            paddingLeft: "1em",
          }}
        >
          {props.title}
        </Typography>
      </Grid>
      <Grid size={10}>
        <Typography
          sx={{
            paddingLeft: "1em",
            paddingRight: "2em",
          }}
        >
          {props.content}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SpellProperty;
