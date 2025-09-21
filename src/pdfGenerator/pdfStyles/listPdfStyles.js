import { EQUIPMENT_MARGIN_LEFT, FONT_SIZE_TEXT } from "./styleValues";

export const listStyles = {
  tableCol: {
    width: "25%",
    fontFamily: "jaapokkiRegular",
  },

  tableColSubFactionName: {
    width: "100%",
    fontFamily: "jaapokkiRegular",
  },

  tableColUnit: {
    width: "30%",
    fontFamily: "jaapokkiRegular",
  },

  tableColSecondSubFaction: {
    width: "20%",
    fontFamily: "jaapokkiRegular",
  },

  tableColPoints: {
    width: "5%",
    fontFamily: "jaapokkiRegular",
  },

  tableColEquipmentFiller: {
    width: "40%",
  },

  tableCellUnit: {
    fontFamily: "jaapokkiRegular",
    textAlign: "left",
    fontSize: FONT_SIZE_TEXT,
  },

  tableCellPoints: {
    fontFamily: "jaapokkiRegular",
    textAlign: "right",
    fontSize: FONT_SIZE_TEXT,
  },

  tableCellEquipment: {
    fontFamily: "jaapokkiRegular",
    textAlign: "left",
    fontSize: FONT_SIZE_TEXT,
  },

  equipmentBox: {
    marginTop: 5,
    marginLeft: EQUIPMENT_MARGIN_LEFT,
    paddingLeft: 2,
    borderLeft: "1px solid black",
    marginBottom: 5,
  },

  equipmentInnerBox: {
    flexDirection: "row",
  },

  tableRowEquipment: {
    width: "20%",
  },
};
