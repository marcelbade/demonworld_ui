// React
import React, { useContext } from "react";
// Material UI
import { Grid } from "@material-ui/core";
// functions and modules
import { DisplayAllSpecialRules } from "../../../../compendiums/factionTable/depencies/factionTableFunctions";
import { StateCardContext } from "../../../../../contexts/statCardContext";

const CardBackCenter = () => {
  const SC = useContext(StateCardContext);

  return <Grid item>{DisplayAllSpecialRules(SC.unit)}</Grid>;
};

export default CardBackCenter;
