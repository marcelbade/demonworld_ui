import React, { useContext } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { TableContext } from "../../../../contexts/tableContext";

const CompendiumDropDown = () => {
  const TC = useContext(TableContext);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          multiple //
          value={TC.columns}
          onChange={null}
          input={<OutlinedInput />}
          renderValue={() => "Angezeigte Spalten"}
        >
          {TC.columns.map((c, i) => (
            <MenuItem key={i} value={c.label}>
              <Checkbox
                checked={c.displayed}
                onChange={() => {
                  TC.toggleColumn(c.column, c.displayed);
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
