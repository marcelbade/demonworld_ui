// Item Types
export const ITEM_TYPE_BANNER = "banner";
export const ITEM_TYPE_MUSICIAN = "instrument";
export const ITEM_TYPE_CROSSBOWS = "boltsAndCrossbows";
export const ITEM_TYPE_BOWS = "arrowsAndBows";

// Item can be used by any faction
export const USABLE_BY_ALL = "*";

// unit types
export const UNIT = "U";
export const GIANT = "G";
// unit has no range weapons
 

// Mapps item types in the itemCard obj to the displayed German name.
export const ITEM_CATEGORY_NAME_MAPPING = {
  fortifications: "Befestigungen", 
  armor: "Rüstungen",
  arrowsAndBows: "Bögen",
  banner: "Banner",
  boltsAndCrossbows: "Armbrüste",
  imp: "Dämonlinge",
  instrument: "Trommeln & Hörner",
  item: "Gegenstände",
  poison: "Gifte",
  potion: "Tränke",
  ringsAndAmulets: "Ringe und Amulette",
  warpaint: "Kriegsbemalung",
  weapon: "Waffen",
};

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

// List of all types of spears in the game that can be replaced by spears from the item list.
export const SPEAR_TYPES = ["Speer", "Langspeer"];

// List of all types of lances in the game that can be replaced by lances from the item list.
export const LANCE_TYPES = ["Lanze", "Mithrillanze"];
