// React
import React, { useContext, useEffect, useState } from "react";
// Material UI
import ListItem from "@material-ui/core/ListItem";
import { Grid } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { uuidGenerator } from "../../shared/sharedFunctions";
import SubList from "./SubFactionList/subList";
import InvalidHeader from "./InvalidHeader";
import ValidHeader from "./ValidHeader";
// constants
import { ALLIES_MAPPING } from "../../../constants/allies";

const SubFactionEntry = (props) => {
  const contextArmy = useContext(ArmyContext);

  const [underMinimum, setUnderMinimum] = useState({
    valid: true,
    message: "",
  });

  useEffect(() => {
    isSubFactionValid();
  }, [contextArmy.addedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Filters the selected units by subFaction. If allied units have been selected, then their subFaction name is replaced with their faction name.
   * @param {[unitCard Objects]} allUnits
   * @param {String} subFaction
   * @returns
   */
  const filterUnitsForSubFaction = (allUnits, subFaction) => {
    allUnits.forEach((u) => (u.faction === ALLIES_MAPPING[contextArmy.selectedFactionName] ? (u.subFaction = u.faction) : null));

    return allUnits.filter((u) => u.subFaction === subFaction);
  };

  /**
   * Function checks for every sub faction with a minimum point allowance > 0 if the condition has been fullfilled. If not, the sub faction name appears in red and a tooltip is displayed.
   */
  const isSubFactionValid = () => {
    contextArmy.blockedUnits.subFactionBelowMinimum.forEach((entry) => {
      if (entry.underMinimum.includes(props.subFaction)) {
        setUnderMinimum({ ...underMinimum, valid: false, message: entry.message });
      } else {
        setUnderMinimum({ ...underMinimum, valid: true, message: "" });
      }
    });
  };

  return contextArmy ? (
    <ListItem key={uuidGenerator()}>
      <Grid container direction={"column"} key={uuidGenerator()}>
        {underMinimum.valid ? (
          <ValidHeader subFaction={props.subFaction} />
        ) : (
          <InvalidHeader subFaction={props.subFaction} message={underMinimum.message} />
        )}
        {/* DISPLAY UNITS, PONT COST, PERCENTAGES FOR ONE SUBFACTION */}
        <SubList
          key={uuidGenerator()}
          subFactionUnits={filterUnitsForSubFaction(contextArmy.addedUnits, props.subFaction)} //
          subFactionName={props.subFaction}
        />
      </Grid>
    </ListItem>
  ) : null;
};

export default SubFactionEntry;
