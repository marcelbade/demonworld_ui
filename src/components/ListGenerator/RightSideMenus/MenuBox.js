// React
import { useContext } from "react";
// Material UI
import { Drawer } from "@mui/material";
// components and functions
import TournamentRulesMenu from "./Menus/TournamentRulesMenu/TournamentRulesMenu";
import OptionButtons from "./Menus/OptionButtons/OptionButtons";
import ItemShop from "./Menus/ItemShop/ItemShop";
import SecondSubFactionMenu from "./Menus/SecondSubfactionMenu/SecondSubfactionMenu";
import CardViewBox from "./Menus/CardView/CardViewBox";
// contexts
import { TournamentRulesContext } from "../../../contexts/tournamentRulesContext";
import { SecondSubFactionContext } from "../../../contexts/secondSubFactionContext";
import { RightMenuContext } from "../../../contexts/rightMenuContext";

const MenuBox = () => {
  const TC = useContext(TournamentRulesContext);
  const SFC = useContext(SecondSubFactionContext);
  const RC = useContext(RightMenuContext);

  const components = [
    {
      exists: true, //
      show: RC.showOptionButtons,
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
