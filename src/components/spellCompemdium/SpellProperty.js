import { Stack, Typography } from "@mui/material";

const SpellProperty = (props) => {
  return (
    <Stack direction="row" sx={{paddingBottom:"2em"}}>
      <Typography sx={{ width: "10em" }}> {props.title}</Typography>
      <Typography sx={{ width: "70em" }}> {props.content}</Typography>
    </Stack>
  );
};

export default SpellProperty;
