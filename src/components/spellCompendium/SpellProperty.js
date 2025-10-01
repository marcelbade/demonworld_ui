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
          border: props.currentEdit[props.property] ? "2px solid green" : "2px solid black",
        }}
        onClick={() => {
          props.setPropertyToEdit(props.property);
          props.showActiveEdit(props.property);
        }}
      >
        <EditNoteIcon style={{ color: props.currentEdit[props.property] ? "green" : "black" }} />
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
          sx={
            props.currentEdit[props.property] //
              ? {
                  paddingLeft: "1em",
                  paddingRight: "2em",
                  border: "solid 3px green",
                }
              : {
                  paddingLeft: "1em",
                  paddingRight: "2em",
                }
          }
        >
          {props.content}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SpellProperty;
