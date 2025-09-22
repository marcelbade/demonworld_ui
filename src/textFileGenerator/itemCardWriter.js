import { addAdjustablePadding, drawLineWithChar } from "./sharedTextFileFunctions";
import { specialRuleTextCreator } from "./specialRuleWriter";
import { drawHorizontalCardEdge } from "./statCardFunctions";
import { HALF_CARD_WIDTH, LINE_END, LINE_START } from "./TextFileGeneratorConstants";

export const addItemCard = (item) => {
  const lineArray = specialRuleTextCreator(item.itemRules, HALF_CARD_WIDTH * 2, false);

  let cardHeader =
    drawHorizontalCardEdge(HALF_CARD_WIDTH * 2) + //
    drawItemName(item) +
    `|${drawLineWithChar("-", HALF_CARD_WIDTH * 2)}${LINE_END}`;

  let cardText = "";

  for (let i = 0; i < lineArray.length; i++) {
    const line = lineArray[i];
    cardText = cardText + `|` + line + LINE_END;
  }

  let cardEnd = drawHorizontalCardEdge(HALF_CARD_WIDTH * 2);

  return cardHeader + cardText + cardEnd;
};

const drawItemName = (item) => {
  const leftPadding = Math.floor(HALF_CARD_WIDTH - item.itemName.length / 2);

  const leftPaddedName = addAdjustablePadding(leftPadding, 0) + item.itemName;

  return (
    LINE_START + //
    leftPaddedName +
    addAdjustablePadding(HALF_CARD_WIDTH * 2, leftPaddedName.length + 1) +
    LINE_END
  );
};
