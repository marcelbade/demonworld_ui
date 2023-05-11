// Mapps item types in the itemCard obj to the displayed German name.
export const NAME_MAPPING = {
  armor: "Rüstung",
  banner: "Banner",
  instrument: "Trommeln & Hörner",
  weapon: "Waffen",
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
 *
 * U = UNIT
 * A = ALL (every unit)
 */

export const UNIT_TO_ITEM_UNITTYPE_MAPPING = {
  C: ["C", "U", "A"],
  I: ["U", "A"],
  M: ["M", "A"],
  H: ["H", "A"],
  A: ["C", "U", "M", "H", "A"],
  G: [],
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
