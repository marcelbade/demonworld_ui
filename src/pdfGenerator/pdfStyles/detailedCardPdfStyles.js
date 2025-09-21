import { FONT_SIZE, FONT_TITLE, FONT_TEXT, BORDER_STYLES, BACKGROUND_COLOR } from "./styleValues";

export const detailedStyles = {
  cardBox: {
    flexDirection: "column",
    marginLeft: 20,
    marginRight: 20,
    fontFamily: FONT_TEXT,
    fontSize: FONT_SIZE,
    marginBottom: 10,
    width: "500px",
  },

  separator: {
    backgroundColor: "white",
    width: "10em",
  },

  cardHeaderBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  headerRow: {
    width: "45%",
    fontFamily: FONT_TITLE,
    color: "red",
    fontSize: FONT_SIZE,
    alignItems: "center",
    borderTop: BORDER_STYLES,
    borderLeft: BORDER_STYLES,
    borderRight: BORDER_STYLES,
    backgroundColor: BACKGROUND_COLOR,
  },

  commandAndMagicRow: {
    color: "black",
    display: "flex",
    flexDirection: "row",
    width: "98%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  commandMagicContent: {
    flexDirection: "row",
    width: "10%",
    justifyContent: "center",
  },
  paddingTopHeader: {
    height: "5em",
  },

  headerBacksideSecondSubFaction: {
    display: "flex",
    width: "100%",
    fontSize: FONT_SIZE,
    color: "black",
    fontFamily: FONT_TEXT,
    alignItems: "flex-start",
    flexDirection: "row",
  },

  blackRowBox: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  headerPaddingRow: {
    fontSize: FONT_SIZE,
    fontFamily: FONT_TEXT,
  },

  cardBlackRow: {
    height: "20em",
    width: "45%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    color: "white",
    backgroundColor: "black",
  },

  textPadding: {
    margin: "10em",
    backgroundColor: "pink",
  },

  cardUpperBlackRowVariant: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  firstBlackRowBackTwoElements: {
    height: "20em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },

  firstBlackRowBackOneElement: {
    height: "20em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  cardCenterBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardCenterContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  centerLeftSide: {
    width: "45%",
    display: "flex",

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderLeft: BORDER_STYLES,
    borderRight: BORDER_STYLES,
    backgroundColor: BACKGROUND_COLOR,
  },

  cardCenterRightSide: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    height: "100%",
    borderLeft: BORDER_STYLES,
    borderRight: BORDER_STYLES,
    backgroundColor: BACKGROUND_COLOR,
  },

  sizeArmorSkillBox: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 2,
  },

  armorIconValueGroup: {
    width: "18%",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },

  iconValueGroup: {
    display: "flex",
    flexDirection: "row",
  },

  skillGroup: {
    width: "18%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  icon: {
    height: "10em",
    width: "10em",
    color: "white",
  },

  // wedge and square icons are smaller...
  wedgeIcon: {
    height: "30em",
    width: "40em",
    backgroundColor: "red",
    color: "white",
  },

  squareFormationIcon: {
    height: "10em",
    width: "10em",
    backgroundColor: "red",
    color: "white",
  },

  shieldWallFormationIcon: {
    height: "10em",
    width: "10em",
    color: "white",
  },

  formations: {
    width: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardRules: {
    width: "100%",
    textAlign: "center",
    fontSize: 9,
    padding: 3,
  },

  cardFooterBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerRow: {
    width: "45%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderLeft: BORDER_STYLES,
    borderRight: BORDER_STYLES,
    borderBottom: BORDER_STYLES,
    backgroundColor: BACKGROUND_COLOR,
  },

  tableRowDetailedList: {
    flexDirection: "row",
  },

  cell: {
    backgroundColor: BACKGROUND_COLOR,
    width: "45%",
    fontFamily: FONT_TEXT,
    textAlign: "center",
    borderRight: BORDER_STYLES,
    borderLeft: BORDER_STYLES,
  },
  whiteCell: {
    backgroundColor: "white",
    width: "10%",
  },
  emptyGreyCell: {
    backgroundColor: BACKGROUND_COLOR,
    width: "45%",
    borderRight: BORDER_STYLES,
    borderLeft: BORDER_STYLES,
  },
};
