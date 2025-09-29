import { Stack, Typography } from "@mui/material";

const SpellProperty = (props) => {
  return (
    <Stack direction="row" sx={{ paddingBottom: "2em" }}>
      <Typography sx={{ minWidth: "30%", maxWidth: "30%" }}>{props.title}</Typography>
      <Typography sx={{ minWidth: "80%", maxWidth: "20%" }}>{props.content}</Typography>
    </Stack>
  );
};

export default SpellProperty;
