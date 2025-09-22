import { addAdjustablePadding } from "./sharedTextFileFunctions";

/**
 * Function splices the the unit's special rule text into an ordered array of strings,
 * each representing a single line on the card.
 * Each line is given a fixed length, to insure formatting.
 * The Function only splices at whitespace, so words are not split.
 * If the fillLines parameter is true, additional lines of whitespace are added to ensure, that
 * enough lines are created to fill the card. NOTE: this is because a unit card needs exactly
 * 8 lines of rules. This means a special rule can have a maximum of 8 x 43 = 344 characters.
 * currently, there are no longer special rule texts in the game.
 * @param {String} text
 * @param {int} width
 * @param {boolean} fillLines
 * @returns an array of Strings with a fixed length equal to the width parameter.
 */
export const specialRuleTextCreator = (text, width, fillLines) => {
  let lineCache = "";
  let textCache = [];
  const MAX_LINE_NUMBER = 8;

  // create an array containg every single word (with punctuation) as elements.
  const splitArray = text.split(" ");

  for (let i = 0; i < splitArray.length; i++) {
    const word = splitArray[i];

    // would the the sentence be too long for the line?
    if (lineCache.length + word.length >= width) {
      lineCache = lineCache + addAdjustablePadding(width, lineCache.length);

      // push to cache and invalidate
      textCache.push(lineCache);
      lineCache = "";
    }

    // build line and add to cache
    lineCache = lineCache + " " + word;

    // if the last word is reached , push it to cache
    if (i === splitArray.length - 1) {
      lineCache = lineCache + addAdjustablePadding(width, lineCache.length);
      textCache.push(lineCache);
    }
  }

  // if minimum number of lines is reached, return result
  if (textCache.length === MAX_LINE_NUMBER || !fillLines) {
    return textCache;
  }

  // else, add empty lines to reach the required number of text lines
  for (let i = textCache.length; i <= MAX_LINE_NUMBER; i++) {
    let additonalLine = "";
    additonalLine = additonalLine + addAdjustablePadding(width, 0);
    textCache.push(additonalLine);
  }

  return textCache;
};
