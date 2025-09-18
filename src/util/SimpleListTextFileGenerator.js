// constants
import { INPUT_TEXTS, STATS } from "../constants/textsAndMessages";

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

// add the lines containing the army's meta data
const addHeaderLines = (textFileData) => {
  return (
    `${INPUT_TEXTS.PLAYER_NAME}: ${textFileData.playerName !== "" ? textFileData.playerName : "-"}\n` + //
    `${INPUT_TEXTS.TEAM_NAME}: ${textFileData.teamName !== "" ? textFileData.teamName : "-"}\n` +
    `${INPUT_TEXTS.ARMY_NAME}: ${textFileData.armyName !== "" ? textFileData.armyName : "-"}`
  );
};

// add the sub faction name and a separator
const addSubfactionLine = (subFaction) => {
  return (
    `\n\n\n${subFaction}\n` + //
    `------------------------------\n`
  );
};

// add a line with unit name and point cost w. adjustable patting.
const addUnitLine = (unit) => {
  return (
    `\t` + //
    `${unit.unitName}` +
    `${addRightPaddingToNames(50, unit.unitName.length)}` +
    `${addLeftPaddingToNumbers(unit.points)}\n`
  );
};

// add a line with item name and point cost w. adjustable patting.
const addItemLine = (item) => {
  return (
    `\t\t` + //
    `${item.itemName}` +
    `\t${addRightPaddingToNames(33, item.itemName.length)}` +
    `\t${addLeftPaddingToNumbers(item.pointCost)}\n`
  );
};

// add the linse w. scouting factor and max army point
const addFooterLines = (textFileData) => {
  return (
    `\n\n\n` +
    `  ${STATS.SCOUTING_FACTOR}: ${textFileData.scoutingFactor}\n` + //
    `ArmeePunkte: ${textFileData.totalArmyPoints}\n`
  );
};

// add padding to one digit numbers
const addLeftPaddingToNumbers = (number) => {
  return number < 100 ? " " + number : number;
};

// add padding after the unit name, length depending on word length.
const addRightPaddingToNames = (paddingSize, wordLength) => {
  const adjustedPadding = paddingSize - wordLength;

  let padding = "";
  for (let i = 0; i < adjustedPadding; i++) {
    padding = padding + " ";
  }

  return padding;
};
