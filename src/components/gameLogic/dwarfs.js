import { useState } from "react";
import { operators } from "../../constants/operators";

/**
 *
 * @param {*} selectedUnit - the unit added or deleted from the current list
 * @param {*} armyPointsTotal the maximum point allowance for the entire army
 * @param {*} operator - gives the math operator to use - add or subtract
 * @returns
 */
export const DwarfRules = (selectedUnit, armyPointsTotal, operator) => {
  const [selectedUnits, setSelectedUnits] = useState([]);

  // checkbox array! -> check of a box by deleting the element from the array.
  let [specials, setSpecials] = useState(["gaeta", "zahra", "ally"]);

  /**
   * subFactionAllowance: this state is an object that does two things:
   *
   *  - [total] store the current number of units for one subFaction
   *     ° this is initallially zero and gets increased everytime a unit of this sub faction is added
   *  -  store the maximum number of units of that subFaction that is allowed. There are two maxima:
   *     ° [occurences]: the number of times any unit can occur in the army (default: 2)
   *     ° [min] and [max] percentage of the army total, that must/ can be spent on units of this type
   *  - [cardNames] store the card names associated with one subFaction. For several armies in the game,
   *    several types of units belong to the  same sbubfaction.
   *  - [isCorrect] is the current selection of units correct for this subFaction
   *  - [verfiy()] this function verifies
   */
  const [subFactionAllowance, setSubFactionAllowance] = useState({
    unit: {
      total: 0,
      occurences: 2,
      min: 0.3,
      max: 1.0,
      cardNames: ["Einheit"],
      verify: (selectedUnit) => {
        verifyUnit(selectedUnit);
      },
      isCorrect: false,
    },
    characters: {
      total: 0,
      occurences: 2,
      min: 0.0,
      max: 0.5,
      cardNames: ["Held", "Befehlshaber", "Erdpriester", "Erzpriester", "Feuerpriester"],
      verify: (selectedUnit) => {
        verifyUnit(selectedUnit);
      },
      isCorrect: true,
    },
    gaeta: {
      total: 0,
      occurences: 2,
      min: 0.0,
      max: 0.4,
      cardNames: ["Gaeta"],
      verify: (selectedUnit) => {
        verifyUnit(selectedUnit);
      },
      isCorrect: true,
    },
    zahra: {
      total: 0,
      occurences: 2,
      min: 0.0,
      max: 0.4,
      cardNames: ["Zah'ra"],
      verify: (selectedUnit) => {
        verifyUnit(selectedUnit);
      },
      isCorrect: true,
    },
    ally: {
      total: 0,
      occurences: 2,
      min: 0.0,
      max: 0.4,
      cardNames: ["Imperium"],
      verify: (selectedUnit) => {
        verifyUnit(selectedUnit);
      },
      isCorrect: true,
    },
  });

  // TODO: REFACTOR THIS!!
  /**
   * Main function of the hook. Tests whether adding or deleting the selected unit will make the Army list non-compliant
   * (i.e., breaking the rules of army composition).
   *
   *
   * @param {*} selectedUnit  the selected unit
   * @param {*} operator   arithmetic operator to be used (+ or -)
   */
  const verifyUnit = (selectedUnit, operator) => {
    const type = kindOfUnit(selectedUnit);
    applySpecialRules(selectedUnit);

    // unit added
    if (operator === operators.ADD) {
      alterList(operator, type)
        ? setSubFactionAllowance({
            ...subFactionAllowance,
            [type]: { ...subFactionAllowance[type], isCorrect: false },
          })
        : setSubFactionAllowance({
            ...subFactionAllowance,
            [type]: { ...subFactionAllowance[type], isCorrect: true },
          });

      // set sub faction total and add unit
      setSelectedUnits([...selectedUnits, selectedUnit]);
      setSubFactionAllowance({
        ...subFactionAllowance,
        [type]: {
          ...subFactionAllowance[type],
          total: subFactionAllowance[type].total + selectedUnit.points,
        },
      });

      // unit removed
    } else if (operator === operators.SUBTRACT) {
      alterList(operator, type)
        ? setSubFactionAllowance({
            ...subFactionAllowance,
            [type]: { ...subFactionAllowance[type], isCorrect: false },
          })
        : setSubFactionAllowance({
            ...subFactionAllowance,
            [type]: { ...subFactionAllowance[type], isCorrect: true },
          });

      // TODO: TEST THIS
      setSelectedUnits(selectedUnits.filter((su) => su.name !== selectedUnit.name));
      setSubFactionAllowance({
        ...subFactionAllowance,
        [type]: {
          ...subFactionAllowance[type],
          total: subFactionAllowance[type].total - selectedUnit.points,
        },
      });
    }
  };

  /**
   * Figure out the type of unit (the subfaction). The result is used to dynamically set an object property for the spread operations.
   * @param {*} unit
   * @returns
   */
  const kindOfUnit = (unit) => {
    let result;
    for (const subFaction in subFactionAllowance) {
      if (subFactionAllowance[subFaction].cardNames.includes(unit.subFaction)) {
        result = subFaction;
      }
    }
    return result;
  };

  /**
   *  Function tests whether an added or removed {unit} makes the army list incorrect.
   *
   * @param {*} operator arithmetic operator to be used (+ or -)
   * @param {String} subFaction the subFaction
   * @returns flag: does the selection conform to the rules?
   */
  const alterList = (operator, subFaction) => {
    // variable declarations to shorten the expressions below
    const occurences = selectedUnits.filter((u) => u.name === selectedUnit.name);
    const maxOccurences = subFactionAllowance[subFaction].occurences;
    const minPoints = subFactionAllowance[subFaction].min;
    const maxPoints = subFactionAllowance[subFaction].max;
    const total = subFactionAllowance[subFaction].total;

    // is the unit  selection valid?
    if (operator === operators.ADD) {
      return (
        occurences > maxOccurences ||
        armyPointsTotal * minPoints < total + selectedUnit.points ||
        armyPointsTotal * maxPoints > total + selectedUnit.points
      );
    } else if (operator === operators.SUBTRACT) {
      return armyPointsTotal * minPoints < total - selectedUnit.points || armyPointsTotal * maxPoints > total - selectedUnit.points;
    }
  };

  /**
   * function takes care of the dwarf army list special rule: of the three opions (2 dwarven kingdoms and one ally), only one can make upp a max.
   * of 40% of the force. Once the choice is made, the player can only take the second kingdom OR the ally and only to a max. of 20%.
   *
   * specials
   * ==================
   * The function works with a "checkbox array", [specials]: the array contains the three factions. Once a coice is made, the faction is "checked off" (removed from the
   * array). The length of the  array is tested and the maximum allowances for the remaining faction is set (20% after the firstm, 0% after the second)
   *
   * @param {*} selectedUnit the unit selected by the player
   */
  const applySpecialRules = (selectedUnit) => {
    //TODO: when unit gets deselected?? -> selectedUnit,

    selectedUnits.filter((u) => {
      return u;
    });

    checkOffSubFaction(selectedUnit);

    // remove the passed value from the array

    if (specials.length === 2) {
      specials.forEach((sF) => (subFactionAllowance[sF].max = 0.2));
    }
    if (specials.length === 1) {
      specials.forEach((sF) => (subFactionAllowance[sF].max = 0.0));
    }
  };

  const checkOffSubFaction = (selectedUnit) => {
    let temp = specials.filter((sF) => sF !== selectedUnit.subFaction || sF !== selectedUnit.Faction);

    setSpecials(temp);
  };

  return [];
};
