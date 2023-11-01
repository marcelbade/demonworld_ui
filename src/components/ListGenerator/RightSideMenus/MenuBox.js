// React
import { useEffect, useContext, useState } from "react";
// Material UI
import { Drawer } from "@material-ui/core";
// components and functions
import TournamentRulesMenu from "./Menus/TournamentRulesMenu/TournamentRulesMenu";
import OptionButtons from "./Menus/OptionButtons/OptionButtons";
import ItemShop from "./Menus/ItemShop/ItemShop";
import SecondSubFactionMenu from "./Menus/SecondSubfactionMenu/SecondSubfactionMenu";
import CardViewBox from "./Menus/CardView/CardViewBox";
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

  const [showOptionButtons, setShowOptionButtons] = useState(true);

  // Show the option button drawer when everything else is closed, else close it.
  useEffect(() => {
    if (
      !TC.showTournamentRulesMenu && //
      !RC.statCardState.show &&
      !RC.itemShopState.show &&
      !RC.secondSubFactionMenuState.show
    ) {
      setShowOptionButtons(true);
    }
    if (
      TC.showTournamentRulesMenu || //
      RC.statCardState.show ||
      RC.itemShopState.show ||
      RC.secondSubFactionMenuState.show
    ) {
      setShowOptionButtons(false);
    }
  }, [RC.statCardState, RC.itemShopState, RC.secondSubFactionMenuState, TC.showTournamentRulesMenu]); // eslint-disable-line react-hooks/exhaustive-deps

  const components = [
    {
      exists: true, //
      show: showOptionButtons,
      element: <OptionButtons />,
    },
    {
      exists: true, //
      show: TC.showTournamentRulesMenu,
      element: <TournamentRulesMenu />,
    },
    {
      exists: true, //
      show: RC.itemShopState.show,
      element: <ItemShop />,
    },
    {
      exists: true, //
      show: RC.statCardState.show,
      element: <CardViewBox />,
    },
    {
      exists: SFC.secondSubFactionList, //
      show: RC.secondSubFactionMenuState.show,
      element: <SecondSubFactionMenu />,
    },
  ];

  return components.map((c, i) =>
    c.exists ? (
      <Drawer
        key={i}
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
