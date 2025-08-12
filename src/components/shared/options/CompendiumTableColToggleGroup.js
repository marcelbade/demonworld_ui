// mui
import { FormControlLabel, Checkbox } from "@mui/material";
// custom hooks
import useCompendiumTableControl from "../../../customHooks/UseCompendiumTableControl";

const CompendiumTableColToggleGroup = (props) => {
  const compendiumTableControl = useCompendiumTableControl();

  return props.toggleGroup.map((c, i) => {
    return (
      <FormControlLabel
        key={i}
        control={
          <Checkbox
            checked={c.displayed}
            onChange={() => {
              compendiumTableControl.toggleColumn(c.column, c.displayed);
            }}
          />
        }
        label={c.label}
      />
    );
  });
};

export default CompendiumTableColToggleGroup;
