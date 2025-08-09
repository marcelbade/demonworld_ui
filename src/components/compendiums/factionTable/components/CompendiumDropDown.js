// react
import { useContext } from "react";
// mui
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
// contexts
import { CompendiumContext } from "../../../../contexts/tableContext";
//  custom hooks
import useCompendiumTableControl from "../../../../customHooks/UseCompendiumTableControl";

const CompendiumDropDown = () => {
  const CC = useContext(CompendiumContext);
  const compendiumTableControl = useCompendiumTableControl();

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          multiple //
          value={CC.columns}
          onChange={null} //TODO ???
          input={<OutlinedInput />}
          renderValue={() => "Angezeigte Spalten"} // TODO add to texts
        >
          {CC.columns.map((c, i) => (
            <MenuItem key={i} value={c.label}>
              <Checkbox
                checked={c.displayed}
                onChange={() => {
                  compendiumTableControl.toggleColumn(c.column, c.displayed);
                }}
              />
              <ListItemText primary={c.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CompendiumDropDown;
