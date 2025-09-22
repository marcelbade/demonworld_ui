// constants
import {
  addFooterLines,
  addHeaderLines,
  addLeftPaddingToNumbers,
  addAdjustablePadding,
  addSubfactionLine,
} from "./txtFileFunctions/sharedTextFileFunctions";

/**
 * Function create an army list as a simple text file. file is written as a single
 * formatted string.
 * @param {listDataObject} textFileData
 * @returns
 */
export const simpleListTextFileGenerator = (textFileData) => {
  let text = "";

  text = text + addHeaderLines(textFileData);

  // create unit list
  for (let i = 0; i < textFileData.list.length; i++) {
    const subFactionObj = textFileData.list[i];
    if (subFactionObj.units.length === 0) {
      continue;
    }

    text = text + addSubfactionLine(subFactionObj.subFaction);

    for (let j = 0; j < subFactionObj.units.length; j++) {
      const unit = subFactionObj.units[j];
      text = text + addUnitLine(unit);

      if (unit.equipment.length === 0) {
        continue;
      }

      for (let k = 0; k < unit.equipment.length; k++) {
        const item = unit.equipment[k];
        text = text + addItemLine(item);
      }
    }
  }

  text = text + addFooterLines(textFileData);

  return text;
};

// add a line with unit name and point cost w. adjustable patting.
const addUnitLine = (unit) => {
  return (
    `\t` + //
    `${unit.unitName}` +
    `${addAdjustablePadding(50, unit.unitName.length)}` +
    `${addLeftPaddingToNumbers(unit.points)}\n`
  );
};

// add a line with item name and point cost w. adjustable patting.
const addItemLine = (item) => {
  return (
    `\t\t` + //
    `${item.itemName}` +
    `\t${addAdjustablePadding(33, item.itemName.length)}` +
    `\t${addLeftPaddingToNumbers(item.pointCost)}\n`
  );
};
