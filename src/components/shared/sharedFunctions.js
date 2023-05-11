import { HERO, MAGE, AUTOMATON, GIANT } from "../../constants/unitTypes";
import StatCardCommander from "./statCards/statCardCommander";
import StatCardUnit from "../shared/statCards/statCardUnit";

/**
 *  Function is a compact UUID generator. Credit to
 *  https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
 *
 * @returns String
 */
export const uuidGenerator = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Tests if any given JS object is an empty object. Only works for ES5+!
 * @param {{}} obj
 * @returns true if object is emtpy, false if not.
 */
export const isObjectEmtpy = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 *  Function controls which kind of stat card (unit or Hero/commander) is displayed in the details panel.
 *
 * @param {[{*}]} unit
 * @returns  JSX element
 */
export const unitOrCmdCard = (unit, alignment) => {
  let element;
  const SINGLE_ELEMENTS_LIST = [HERO, MAGE, AUTOMATON, GIANT];

  SINGLE_ELEMENTS_LIST.includes(unit.unitType)
    ? (element = <StatCardCommander unit={unit} alignment={alignment} />)
    : (element = <StatCardUnit unit={unit} alignment={alignment} />);

  return element;
};

 