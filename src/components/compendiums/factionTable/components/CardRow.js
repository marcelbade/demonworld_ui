// react
import React, { useContext } from "react";
// components & functions
import StatCard from "../../../shared/statCards/StatCard";
import { TableContext } from "../../../../contexts/tableContext";

// front and back side of the displayed unit cards are alligned horizontally.
const ROW = "row";

/**
 * displays the unit card in the compendium table
 * @param {*} props
 * @returns
 */
const DetailedCardView = (props) => {
  const TC = useContext(TableContext);

  const displayCard = () => {
    const displayName =
      props.unit.multiCardName === "" //
        ? props.unit.unitName
        : props.unit.multiCardName;

    return TC.selectedStatCards.includes(props.unit.faction + displayName) ? ( //
      <StatCard
        unit={props.unit} //
        alignment={ROW}
      />
    ) : null;
  };

  return (
    <tr key={` ${props.unit.unitName},${props.unit.subFaction}`}>
      <td colSpan={"10%"}></td>
      <td colSpan={"30%"}>{displayCard()}</td>
    </tr>
  );
};

export default DetailedCardView;
