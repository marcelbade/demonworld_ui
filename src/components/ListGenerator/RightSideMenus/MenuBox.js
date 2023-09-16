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
import CardView from "./Menus/CardView/CardView";

const MenuBox = () => {
  const AC = useContext(ArmyContext);

  // show the option button drawer when everything else is closed, else close it.
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

  const components = [
    { exists: true, show: AC.showOptionButtons, element: <OptionButtons /> },
    { exists: true, show: AC.showTournamentRulesMenu, element: <TournamentRulesMenu /> },
    { exists: true, show: AC.itemShopState.show, element: <ItemShop /> },
    { exists: true, show: AC.statCardState.show, element: <CardView /> },
    { exists: AC.secondSubFactionList, show: AC.secondSubFactionMenuState.show, element: <SecondSubFactionMenu /> },
  ];

  return components.map((c) =>
    c.exists ? (
      <Drawer
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
