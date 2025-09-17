export const TextFileGenerator = (textFileData) => {
  let text =
    `Spielername: ${textFileData.playerName !== "" ? textFileData.playerName : "-"}\n` + //
    `Teamname: ${textFileData.teamName !== "" ? textFileData.teamName : "-"}\n` +
    `Armeename: ${textFileData.armyName !== "" ? textFileData.armyName : "-"}`;

  for (let i = 0; i < textFileData.list.length; i++) {
    const subFactionObj = textFileData.list[i];
    if (subFactionObj.units.length === 0) {
      continue;
    }

    text = text + `\n\n\n${subFactionObj.subFaction}\n`;
    text = text + `------------------------------\n`;

    for (let j = 0; j < subFactionObj.units.length; j++) {
      const unit = subFactionObj.units[j];
      text =
        text + //
        `\t${unit.unitName}${createConsistentWhitespace(unit.unitName)}` +
        `${addLeftPaddingToNumbers(unit.points)}\n`;

      if (unit.equipment.length === 0) {
        continue;
      }

      for (let k = 0; k < unit.equipment.length; k++) {
        const item = unit.equipment[k];
        text =
          text + //
          `\t${createConsistentWhitespace(item.itemName)}` +
          `\t${addLeftPaddingToNumbers(item.pointCost)}\n`;
      }
    }
  }

  return text;
};

const createUnitString = (text) => {

 

  return text;
};

const createItemString = (text) => {

 

  return text;
};


const addLeftPaddingToNumbers = (number) => {
  return number < 100 ? " " + number : number;
};

const createConsistentWhitespace = (word) => {
  const PADDING_SIZE = 30;
  const length = word.length;

  const adjustedPadding = PADDING_SIZE - length;

  let padding = "";
  for (let i = 0; i < adjustedPadding; i++) {
    padding = padding + " ";
  }

  return padding;
};
