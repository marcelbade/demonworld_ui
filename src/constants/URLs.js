const PREFIX_BE = "http://localhost:8080";
const PREFIX_FE = "http://localhost:3000";

// users
export const LOGIN_USER_URL = `${PREFIX_BE}/public/user/login`;
export const REGISTER_USER_URL = `${PREFIX_BE}/public/user/register`;
export const ALL_USER_NAMES_URL = `${PREFIX_BE}/public/user/allUserNames`;

// user settings
export const SET_DELETE_DIALOG_URL = `${PREFIX_BE}/auth/user/setDisplayDeleteConfirmation`;
export const SET_OVERRIDE_DIALOG_URL = `${PREFIX_BE}/auth/user/setDisplayOverrideConfirmation`;

// army lists
export const STORE_ARMY_LIST_URL = `${PREFIX_BE}/auth/armyLists/storeList`;

export const RETRIEVE_ARMY_LISTS_URL = (user) => `${PREFIX_BE}/auth/armyLists/getListsForUser?userName=${user}`;

export const DELETE_ARMY_LIST_URL = (userName, listId) => `${PREFIX_BE}/auth/armyLists/deleteList?userName=${userName}&listId=${listId}`;

// game data
export const FACTION_DTOS_URL = `${PREFIX_BE}/public/game/factionDTOs`;
export const ITEM_DTOS_URL = `${PREFIX_BE}/public/game/itemDTOs`;
export const ALL_UNITS_URL = `${PREFIX_BE}/public/game/allUnits`;
export const ALL_FACTION_COLORS_URL = `${PREFIX_BE}/public/game/factionColors`;

// events
export const GET_EVENTS_URL = `${PREFIX_BE}/auth/event/allEvents`;

// custom units and items
export const CREATE_CUSTOM_UNIT_URL = `${PREFIX_BE}/auth/user/createCustomUnit`;

// pdf
export const PDF_URL = `${PREFIX_FE}/PdfBox`;
