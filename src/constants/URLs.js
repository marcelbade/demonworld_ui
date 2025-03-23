const PREFIX_BE = "http://localhost:8080";
const PREFIX_FE = "http://localhost:3000";

// users
export const LOGIN_USER_URL = `${PREFIX_BE}/public/user/login`;
export const REGISTER_USER_URL = `${PREFIX_BE}/public/user/register`;



export const ALL_USER_NAMES = `${PREFIX_BE}/public/user/allUserNames`;

// game data
export const FACTION_DTOS_URL = `${PREFIX_BE}/public/game/factionDTOs`;
export const ITEM_DTOS_URL = `${PREFIX_BE}/public/game/itemDTOs`;
export const ALL_UNITS_URL = `${PREFIX_BE}/public/game/allUnits`;

//custom
export const CREATE_CUSTOM_UNIT_URL = `${PREFIX_BE}/auth/user/createCustomUnit`;

// pdf
export const PDF_URL = `${PREFIX_FE}/PdfBox`;
