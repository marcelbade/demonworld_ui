import { useState } from "react";
import { operators } from "../../constants/operators";

/**
 *
 * @param {*} selectedUnit - the unit added or deleted from the current list
 * @param {*} armyPointsTotal the maximum point allowance for the entire army
 * @param {*} operator - gives the math operator to use - add or subtract
 * @returns
 */

// TODO: this still contains the dwarf values !!

// eslint-disable-next-line no-unused-vars
export const GoblinRules = (selectedUnit, armyPointsTotal, operator) => {
  const [selectedUnits, setSelectedUnits] = useState([]);

  // subFaction Allowances
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
      cardNames: [
        "Held",
        "Befehlshaber",
        "Erdpriester",
        "Erzpriester",
        "Feuerpriester",
      ],
      verify: (selectedUnit) => {
        verifyUnit(selectedUnit);
      },
      isCorrect: true,
    },
    giantInsects: {
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
    insectRiders: {
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
      setSelectedUnits(
        selectedUnits.filter((su) => su.name !== selectedUnit.name)
      );
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
    const occurences = selectedUnits.filter(
      (u) => u.name === selectedUnit.name
    );
    const maxOccurences = subFactionAllowance[subFaction].occurences;
    const minPoints = subFactionAllowance[subFaction].min;
    const maxPoints = subFactionAllowance[subFaction].max;
    const total = subFactionAllowance[subFaction].total;

    if (operator === operators.ADD) {
      return (
        occurences > maxOccurences ||
        armyPointsTotal * minPoints < total + selectedUnit.points ||
        armyPointsTotal * maxPoints > total + selectedUnit.points
      );
    } else if (operator === operators.SUBTRACT) {
      return (
        armyPointsTotal * minPoints < total - selectedUnit.points ||
        armyPointsTotal * maxPoints > total - selectedUnit.points
      );
    }
  };

  return [];
};
