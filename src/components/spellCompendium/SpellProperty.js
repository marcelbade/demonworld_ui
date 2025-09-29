import { Grid2 as Grid, IconButton, Typography } from "@mui/material";
// icons
import EditNoteIcon from "@mui/icons-material/EditNote";

const SpellProperty = (props) => {
  return (
    <Grid
      container //
      size={12}
      direction="row"
      sx={{
        paddingBottom: "2em", //
        paddingLeft: "2em",
      }}
      alignItems="center"
    >
      <IconButton
        sx={{
          height: "2em",
          width: "2em",
          backgroundColor: "darkred",
        }}
        onClick={() => {
          props.setPropertyToEdit(props.property);
        }}
      >
        <EditNoteIcon color="white" />
      </IconButton>
      <Grid size={1}>
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
