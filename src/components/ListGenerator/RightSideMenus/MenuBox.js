// React
import { useEffect, useContext } from "react";
// Material UI
import { Drawer } from "@material-ui/core";
// components and functions
import TournamentRulesMenu from "./Menus/TournamentRulesMenu/TournamentRulesMenu";
import OptionButtons from "./Menus/OptionButtons/OptionButtons";
import ItemShop from "./Menus/ItemShop/ItemShop";
import SecondSubFactionMenu from "./Menus/SecondSubfactionMenu/SecondSubfactionMenu";
import CardViewBox from "./Menus/CardView/CardViewBox";
import { ARMIES_ADDITIONAL_SUBFACTIONS, ARMIES_ADDITIONAL_SUBFACTIONS_BUTTON_CAPTION } from "../../../constants/factions";
// contexts
import { ArmyContext } from "../../../contexts/armyContext";
import { TournamentRulesContext } from "../../../contexts/tournamentRulesContext";
import { SecondSubFactionContext } from "../../../contexts/secondSubFactionContext";
import { RightMenuContext } from "../../../contexts/rightMenuContext";



const MenuBox = () => {
  const AC = useContext(ArmyContext);
  const TC = useContext(TournamentRulesContext);
  const SFC = useContext(SecondSubFactionContext);
  const RC = useContext(RightMenuContext);

  // Show the option button drawer when everything else is closed, else close it.
  useEffect(() => {
    if (
      !TC.showTournamentRulesMenu && //
      !RC.statCardState.show &&
      !RC.itemShopState.show &&
      !RC.secondSubFactionMenuState.show
    ) {
      RC.setShowOptionButtons(true);
    }
    if (
      TC.showTournamentRulesMenu || //
      RC.statCardState.show ||
      RC.itemShopState.show ||
      RC.secondSubFactionMenuState.show
    ) {
      RC.setShowOptionButtons(false);
    }
  }, [RC.statCardState, RC.itemShopState, RC.secondSubFactionMenuState, TC.showTournamentRulesMenu]); // eslint-disable-line react-hooks/exhaustive-deps

  // Set boolean flag if the selected faction has an addditonal sub faction for every unit.
  useEffect(() => {
    if (ARMIES_ADDITIONAL_SUBFACTIONS.includes(AC.factionName)) {
      const result = ARMIES_ADDITIONAL_SUBFACTIONS_BUTTON_CAPTION.filter((e) => e.army === AC.factionName);

      SFC.setHasAdditionalSubFaction(true);
      SFC.setSecondSubfactionCaption(result[0].caption);
      SFC.setExcemptSubFactions(result[0].excemptSubFactions);
      SFC.setSecondSubFactionList(result[0].secondSubFactionList);
    } else {
      SFC.setHasAdditionalSubFaction(false);
    }
  }, [AC.factionName, RC.secondSubFactionMenuState]); // eslint-disable-line react-hooks/exhaustive-deps

  const components = [
    { exists: true, show: RC.showOptionButtons, element: <OptionButtons />, id: 0 },
    { exists: true, show: TC.showTournamentRulesMenu, element: <TournamentRulesMenu />, id: 1 },
    { exists: true, show: RC.itemShopState.show, element: <ItemShop />, id: 2 },
    { exists: true, show: RC.statCardState.show, element: <CardViewBox />, id: 3 },
    { exists: SFC.secondSubFactionList, show: RC.secondSubFactionMenuState.show, element: <SecondSubFactionMenu />, id: 4 },
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
