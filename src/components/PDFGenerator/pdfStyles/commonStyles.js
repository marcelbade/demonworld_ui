import {
  FONT_SIZE_PAGE_TITLE, //
  FONT_SIZE_SUB_TITLE,
  FONT_SIZE_TEXT,
  MARGIN_LEFT,
  MARGIN_PAGE_TOP,
  MARGIN_SUBFACTION_BLOCK,
  CONTENT_WIDTH,
} from "./styleValues";

export const commonStyles = {
  viewport: {
    width: CONTENT_WIDTH,
    height: "100vh",
  },

  pageLayout: {
    width: CONTENT_WIDTH,
    marginTop: MARGIN_PAGE_TOP,
  },

  armyName: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: FONT_SIZE_PAGE_TITLE,
    fontFamily: "notMaryKate",
    margin: 5,
  },
  armyStatsBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: MARGIN_LEFT,
  },
  armyStats: {
    fontFamily: "jaapokkiRegular",
    fontSize: FONT_SIZE_TEXT,
  },

  subFactionTitleBoxNoSeparator: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: MARGIN_SUBFACTION_BLOCK,
    marginLeft: MARGIN_LEFT,
    width: "50%",
  },

  subFactionTitleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: MARGIN_SUBFACTION_BLOCK,
    marginBottom: MARGIN_SUBFACTION_BLOCK,
    marginLeft: MARGIN_LEFT,
    width: "50%",
    borderBottom: "solid 1px dashed black",
  },

  subFactionTitleAndStats: {
    fontFamily: "jaapokkiRegular",
    fontSize: FONT_SIZE_SUB_TITLE,
  },

  subFactionName: {
    fontFamily: "notMaryKate",
    fontSize: FONT_SIZE_SUB_TITLE,
    textAlign: "start",
  },

  subFactioStats: {
    fontFamily: "jaapokkiRegular",
    textAlign: "left",
    fontSize: FONT_SIZE_SUB_TITLE,
  },

  table: {
    display: "table",
    width: "auto",
  },
  tableRow: {
    flexDirection: "row",
    marginLeft: MARGIN_LEFT,
  },

  pageNumber: {
    position: "absolute",
    right: 10,
    bottom: 15,
  },
};
