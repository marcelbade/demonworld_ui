// material ui
import { FormControlLabel, Checkbox, Stack } from "@mui/material";

const SpellPrintDialogOptions = (props) => {
  return (
    <Stack direction="column">
      {props.optionsTable.map((o, i) => (
        <FormControlLabel
          key={i}
          sx={{
            ".MuiGrid-root": {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
            marginBottom: "1em",
          }}
          control={
            <Checkbox
              checked={o.checked} //
              onChange={() => {
                o.controlFunction((prevState) => !prevState);
              }}
            />
          }
          label={o.labelText}
          labelPlacement="end"
        />
      ))}
    </Stack>
  );
};

export default SpellPrintDialogOptions;
