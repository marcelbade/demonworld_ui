// react
import React, { useContext } from "react";
// components & functions
import { TableContext } from "../../../../contexts/tableContext";
import CardView from "../../../shared/CardView";
import { isSingleElementCard } from "../../../../util/utilityFunctions";

// front and back side of the displayed unit cards are alligned horizontally.
const COLUMN = "column";

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

    const isSingleElement = isSingleElementCard(props.unit);
    const carouselCards = TC.displayUnits.filter(
      (u) =>
        u.belongsToUnit !== "NONE" && //
        u.belongsToUnit === props.unit.belongsToUnit
    );

    return TC.selectedStatCards.includes(props.unit.faction + displayName) ? ( //
      <CardView
        isMultiStateCard={props.unit.isMultiStateUnit}
        unit={props.unit} //
        alignment={COLUMN}
        isSingleElement={isSingleElement}
        carouselCards={carouselCards}
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
