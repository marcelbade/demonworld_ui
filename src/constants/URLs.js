const PREFIX_BE = "http://localhost:8080";
const PREFIX_FE = "http://localhost:3000";

// users
export const LOGIN_USER_URL = `${PREFIX_BE}/public/user/login`;
export const REGISTER_USER_URL = `${PREFIX_BE}/public/user/register`;
export const ALL_USER_NAMES_URL = `${PREFIX_BE}/public/user/allUserNames`;

//store army list
export const STORE_ARMY_LIST_URL = `${PREFIX_BE}/auth/armyLists/addList`;
export const RETREIVE_ARMY_LIST_URL = (user) => `${PREFIX_BE}/auth/armyLists/getListsForUser?userName=${user}`;

// game data
export const FACTION_DTOS_URL = `${PREFIX_BE}/public/game/factionDTOs`;
export const ITEM_DTOS_URL = `${PREFIX_BE}/public/game/itemDTOs`;
export const ALL_UNITS_URL = `${PREFIX_BE}/public/game/allUnits`;

// events
export const GET_EVENTS_URL = `${PREFIX_BE}/auth/event/allEvents`;

//custom units and items
export const CREATE_CUSTOM_UNIT_URL = `${PREFIX_BE}/auth/user/createCustomUnit`;

// pdf
export const PDF_URL = `${PREFIX_FE}/PdfBox`;
