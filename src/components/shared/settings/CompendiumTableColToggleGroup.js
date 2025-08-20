// mui
import { FormControlLabel, Checkbox } from "@mui/material";
// custom hooks
import useCompendiumTableControl from "../../../customHooks/UseCompendiumTableControl";

const CompendiumTableColToggleGroup = (props) => {
  const compendiumTableControl = useCompendiumTableControl();

  return props.toggleGroup.map((t, i) => {
    return (
      <FormControlLabel
        key={i}
        control={
          <Checkbox
            checked={t.displayed}
            onChange={() => {
              compendiumTableControl.toggleColumn(t.column);
            }}
          />
        }
        label={t.label}
      />
    );
  });
};

export default CompendiumTableColToggleGroup;
