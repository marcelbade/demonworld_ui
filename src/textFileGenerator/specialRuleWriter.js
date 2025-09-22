import { addAdjustablePadding } from "./sharedTextFileFunctions";

/**
 * Function turns the the unit's special rule text into an array of strings,
 * each representing a single line on the card. Each line has a fixed length,
 * to insure formatting.
 * @param {String} text
 * @param {int} width
 * @param {boolean} fillLines
 * @returns an array of Strings with a fixed length equal to the width parameter.
 */
export const specialRuleTextCreator = (text, width, fillLines) => {
  let lineCache = "";
  let textCache = [];
  const LINE_NUMBER = 8;

  const splitArray = text.split(" ");

  for (let i = 0; i < splitArray.length; i++) {
    const word = splitArray[i];

    if (lineCache.length + word.length >= width) {
      lineCache = lineCache + addAdjustablePadding(width, lineCache.length);

      textCache.push(lineCache);
      lineCache = "";
    }

    lineCache = lineCache + " " + word;

    if (i === splitArray.length - 1) {
      lineCache = lineCache + addAdjustablePadding(width, lineCache.length);
      textCache.push(lineCache);
    }
  }

  if (textCache.length === LINE_NUMBER || !fillLines ) {
    return textCache;
  }

  for (let i = textCache.length; i <= LINE_NUMBER; i++) {
    let additonalLine = "";
    additonalLine = additonalLine + addAdjustablePadding(width, 0);
    textCache.push(additonalLine);
  }

  return textCache;
};
