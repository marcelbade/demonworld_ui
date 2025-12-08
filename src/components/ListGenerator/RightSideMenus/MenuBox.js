// React
import { useContext } from "react";
// Material UI
import { Drawer } from "@mui/material";
// components and functions
import OptionButtonsPage from "./Menus/OptionButtons/OptionButtonsPage";
import ItemShop from "./Menus/ItemShop/ItemShop";
import SecondSubFactionMenu from "./Menus/SecondSubfactionMenu/SecondSubfactionMenu";
import CardViewBox from "./Menus/CardView/CardViewBox";
// contexts
import { SecondSubFactionContext } from "../../../contexts/secondSubFactionContext";
import { RightMenuContext } from "../../../contexts/rightMenuContext";
import { ArmyContext } from "../../../contexts/armyContext";
import { NONE } from "../../../constants/factions";

const MenuBox = () => {
  const SFC = useContext(SecondSubFactionContext);
  const RC = useContext(RightMenuContext);
  const AC = useContext(ArmyContext);

  const components = [
    {
      exists: true, //
      show: RC.showOptionButtons.show,
      element: <OptionButtonsPage />,
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
    AC.selectedFactionName !== NONE && c.exists ? (
      <Drawer
        key={i}
        anchor={"right"} //
        variant="persistent"
        open={c.show}
        sx={{
          width: "150%",
        }}
      >
        {c.element}
      </Drawer>
    ) : null
  );
};

export default MenuBox;
