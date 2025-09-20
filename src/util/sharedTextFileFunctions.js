import { INPUT_TEXTS, STATS } from "../constants/textsAndMessages";

/**
 * Function adds the lines containing the army's meta data
 * @param {object} textFileData
 * @returns A formatted string with the data.
 */
export const addHeaderLines = (textFileData) => {
  return (
    `${INPUT_TEXTS.PLAYER_NAME}: ${textFileData.playerName !== "" ? textFileData.playerName : "-"}\n` + //
    `${INPUT_TEXTS.TEAM_NAME}: ${textFileData.teamName !== "" ? textFileData.teamName : "-"}\n` +
    `${INPUT_TEXTS.ARMY_NAME}: ${textFileData.armyName !== "" ? textFileData.armyName : "-"}`
  );
};

/**
 * Function adds the sub faction name and a separator line.
 * @param {String} subFaction
 * @returns the described String.
 */
export const addSubfactionLine = (subFaction) => {
  return (
    `\n\n\n${subFaction}\n` + //
    `------------------------------\n`
  );
};

/**
 * Function turns numbers into string and adds padding if the number has only
 * a single digit.
 * @param {int} number
 * @returns a number with a single white space added, in case it is single digit.
 */
export const addLeftPaddingToNumbers = (number) => {
  number = `${number}`;
  return number < 100 ? " " + number : number;
};

/**
 * Function creates variable length white space in order
 * to create a consistent text line length. The given padding size
 * is reduced by the wordlength, so that the resulting length is
 * always the same, no matter the length of the text.
 *
 * @param {int} paddingSize
 * @param {int} textLength
 * @returns a string of white space.
 */
export const addAdjustablePadding = (paddingSize, textLength) => {
  const adjustedPadding = paddingSize - textLength;

  let padding = "";
  for (let i = 0; i < adjustedPadding; i++) {
    padding = padding + " ";
  }

  return padding;
};

/**
 * Function draws a line with the given character, with adjustable length.
 * @param {String} char
 * @param {int} length
 * @returns a line of "=" with the passed length
 */
export const drawLineWithChar = (char, length) => {
  let line = "";

  for (let i = 0; i < length; i++) {
    line = line + char;
  }

  return line;
};

// add lines containing scouting factor and max army point
export const addFooterLines = (textFileData) => {
  return (
    `\n\n\n` +
    `  ${STATS.SCOUTING_FACTOR}: ${textFileData.scoutingFactor}\n` + //
    `ArmeePunkte: ${textFileData.totalArmyPoints}\n`
  );
};
