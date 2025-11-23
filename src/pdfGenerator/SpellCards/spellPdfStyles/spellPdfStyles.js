import {
  FONT_SIZE_SPELL_TEXT, //
  FONT_SIZE_TEXT,
  FONT_SIZE_PAGE_TITLE,
} from "../../commonPdfStyles/commonPdfStyleValues";

export const spellStyles = {
  faction: {
    marginTop: 5,
    fontSize: FONT_SIZE_PAGE_TITLE,
    fontFamily: "notMaryKate",
    textAlign: "center",
  },

  title: {
    fontFamily: "notMaryKate",
    fontSize: FONT_SIZE_TEXT,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 5,
  },
  subTitle: {
    fontFamily: "notMaryKate",
    fontSize: FONT_SIZE_SPELL_TEXT,
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 5,
  },
  spellText: {
    fontFamily: "jaapokkiRegular",
    fontSize: FONT_SIZE_SPELL_TEXT,
    marginLeft: 20,
    marginRight: 20,
  },
};
