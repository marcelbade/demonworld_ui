// Item Types
export const ITEM_TYPE_BANNER = "banner";
export const ITEM_TYPE_MUSICIAN = "instrument";
export const ITEM_TYPE_CROSSBOWS = "boltsAndCrossbows";  
export const ITEM_TYPE_BOWS = "arrowsAndBows";

// Item can be used by any faction
export const FACTIONLESS_ITEM = "*";

// unit types
export const CAVALRY = "C";
export const INFANTRY = "I";
export const GIANT = "G";
// unit has no range weapons
export const NO_RANGE_WEAPON = "x";

// Mapps item types in the itemCard obj to the displayed German name.
export const NAME_MAPPING = {
  armor: "Rüstung",
  banner: "Banner",
  instrument: "Trommeln & Hörner",
  weapon: "Waffen",
  boltsAndCrossbows: "Armbrüste",
  arrowsAndBows: "Bögen",
  potion: "Tränke",
  ringsAndAmulets: "Ringe und Amulette",
  item: "Gegenstände",
  poison: "Gift",
  warpaint: "Kriegsbemalung",
};

/**
 * Map item card types to unit types. I.e., mounted units can receive all items for mounted units, infantery units and items for all units.
 * C = CAVALERY
 * I = INFANTERY
 * M = MAGE
 * H = HERO
 * A = ARTILLERY
 * G = GIANT
 * - The following two abbreviations are only used in item card objects:
 * U = UNIT
 * * = WILDCARD (every unit)
 */
export const UNIT_TO_ITEM_UNITTYPE_MAPPING = {
  C: ["C", "U", "*"],
  I: ["U", "*"],
  M: ["M", "H", "*"],
  H: ["H", "*"],
  A: ["C", "U", "M", "H", "*"],
  G: ["C", "U", "M", "H", "*"],
};

// List of all item types that are excempt from the 1-item-per-element rule. These items can be equipped in addition to a magic item
export const NON_MAGIC_ITEMS = ["potion", "crystal", "warpaint", "poison"];

// List of all range weapons in the game that can use artefacts meant for bows.
export const BOW_TYPES = [
  "Elfenbogen",
  "Bogen",
  "Elfenlangbogen",
  "Magischer Langbogen",
  "Schlangenbogen",
  "Langbogen",
  "Kurzbogen",
  "Großer Langbogen",
  "Adlerbogen",
];

// List of all range weapons in the game that can use artefacts meant for crossbows.
export const CROSSBOW_TYPES = ["Armbrust", "Repetierarmbrust", "Handarmbrust"];
