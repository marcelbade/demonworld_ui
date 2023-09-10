// React
import { useEffect, useContext } from "react";
// Material UI
import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import TournamentRulesMenu from "./Menus/TournamentRulesMenu/TournamentRulesMenu";
import OptionButtons from "./Menus/OptionButtons/OptionButtons";
import ItemShop from "./Menus/ItemShop/ItemShop";
import SecondSubFactionMenu from "./Menus/SecondSubfactionMenu/SecondSubfactionMenu";
import { ArmyContext } from "../../../contexts/armyContext";
import { Fragment } from "react";
import { isObjectEmtpy, unitOrCmdCard } from "../../shared/sharedFunctions";

const useStyles = makeStyles((theme) => ({
  UnitCardDisplay: {
    position: "fixed",
  },
}));

const MenuBox = () => {
  const AC = useContext(ArmyContext);
  const classes = useStyles();

  // front and back side of the displayed unit cards are alligned vertically.
  const COLUMN = "column";

  // Open the option button drawer when everything else is closed, else close it.
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

  return (
    <Fragment>
      <Drawer anchor={"right"} variant="persistent" open={AC.showTournamentRulesMenu}>
        <TournamentRulesMenu />
      </Drawer>
      <Drawer anchor={"right"} variant="persistent" open={AC.showOptionButtons}>
        <OptionButtons />
      </Drawer>
      <Drawer anchor={"right"} variant="persistent" open={AC.itemShopState.show}>
        <ItemShop />
      </Drawer>
      <Drawer anchor={"right"} variant="persistent" open={AC.statCardState.show} className={classes.UnitCardDisplay}>
        {!isObjectEmtpy(AC.statCardState.clickedUnit) ? unitOrCmdCard(AC.statCardState.clickedUnit, COLUMN) : <p></p>}
      </Drawer>
      {AC.secondSubFactionList ? (
        <Drawer anchor={"right"} variant="persistent" open={AC.secondSubFactionMenuState.show}>
          <SecondSubFactionMenu />
        </Drawer>
      ) : null}
    </Fragment>
  );
};

export default MenuBox;
