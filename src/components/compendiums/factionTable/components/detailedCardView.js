// react
import React from "react";
// components & functions
import StatCard from "../../../shared/statCards/StatCard";

// front and back side of the displayed unit cards are alligned horizontally.
const ROW = "row";

/**
 * displays the unit card in the compendium table
 * @param {*} props
 * @returns
 */
const DetailedCardView = (props) => {
  return (
    <tr key={props.unit.uniqueID}>
      <td colSpan={"10%"}></td>
      <td key={props.unit.uniqueID} colSpan={"30%"}>
        {props.selectedCards.includes(props.unit.faction + props.unit.unitName) ? ( //
          <StatCard
            unit={props.unit} //
            alignment={ROW}
          />
        ) : null}
      </td>
    </tr>
  );
};

export default React.memo(DetailedCardView);
