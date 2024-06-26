// react
import React, { useContext } from "react";
// components & functions
import { TableContext } from "../../../../contexts/tableContext";
import CardView from "../../../shared/CardView";
import { isSingleElementCard } from "../../../../util/utilityFunctions";
import { TableRow } from "@mui/material";

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
        isSingleElement={isSingleElement}
        carouselCards={carouselCards}
      />
    ) : null;
  };

  return (
    <TableRow key={` ${props.unit.unitName},${props.unit.subFaction}`}>
      <td colSpan={"30%"}>{displayCard()}</td>
    </TableRow>
  );
};

export default DetailedCardView;
