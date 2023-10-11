// React
import { useEffect, useContext } from "react";
// Material UI
import { Drawer } from "@material-ui/core";
// components and functions
import TournamentRulesMenu from "./Menus/TournamentRulesMenu/TournamentRulesMenu";
import OptionButtons from "./Menus/OptionButtons/OptionButtons";
import ItemShop from "./Menus/ItemShop/ItemShop";
import SecondSubFactionMenu from "./Menus/SecondSubfactionMenu/SecondSubfactionMenu";
import { ArmyContext } from "../../../contexts/armyContext";
import CardViewBox from "./Menus/CardView/CardViewBox";
import { ARMIES_ADDITIONAL_SUBFACTIONS, ARMIES_ADDITIONAL_SUBFACTIONS_BUTTON_CAPTION } from "../../../constants/factions";

const MenuBox = () => {
  const AC = useContext(ArmyContext);

  // Show the option button drawer when everything else is closed, else close it.
  useEffect(() => {
    if (
      !AC.showTournamentRulesMenu && //
      !AC.statCardState.show &&
      !AC.itemShopState.show &&
      !AC.secondSubFactionMenuState.show
    ) {
      AC.setShowOptionButtons(true);
    }
    if (
      AC.showTournamentRulesMenu || //
      AC.statCardState.show ||
      AC.itemShopState.show ||
      AC.secondSubFactionMenuState.show
    ) {
      AC.setShowOptionButtons(false);
    }
  }, [AC.statCardState, AC.itemShopState, AC.secondSubFactionMenuState, AC.showTournamentRulesMenu]); // eslint-disable-line react-hooks/exhaustive-deps

  // Set boolean flag if the selected faction has an addditonal sub faction for every unit.
  useEffect(() => {
    if (ARMIES_ADDITIONAL_SUBFACTIONS.includes(AC.selectedFactionName)) {
      const result = ARMIES_ADDITIONAL_SUBFACTIONS_BUTTON_CAPTION.filter((e) => e.army === AC.selectedFactionName);

      AC.setHasAdditionalSubFaction(true);
      AC.setSecondSubfactionCaption(result[0].caption);
      AC.setExcemptSubFactions(result[0].excemptSubFactions);
      AC.setSecondSubFactionList(result[0].secondSubFactionList);
    } else {
      AC.setHasAdditionalSubFaction(false);
    }
  }, [AC.selectedFactionName, AC.secondSubFactionMenuState]); // eslint-disable-line react-hooks/exhaustive-deps

  const components = [
    { exists: true, show: AC.showOptionButtons, element: <OptionButtons />, id: 0 },
    { exists: true, show: AC.showTournamentRulesMenu, element: <TournamentRulesMenu />, id: 1 },
    { exists: true, show: AC.itemShopState.show, element: <ItemShop />, id: 2 },
    { exists: true, show: AC.statCardState.show, element: <CardViewBox />, id: 3 },
    { exists: AC.secondSubFactionList, show: AC.secondSubFactionMenuState.show, element: <SecondSubFactionMenu />, id: 4 },
  ];

  return components.map((c) =>
    c.exists ? (
      <Drawer
        key={c.id}
        anchor={"right"} //
        variant="persistent"
        open={c.show}
      >
        {c.element}
      </Drawer>
    ) : null
  );
};

export default MenuBox;
