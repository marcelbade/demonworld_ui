
// Item types. Used for filtering items in the shop 
export const ITEM_TYPE_ARMOR = "armor";
export const ITEM_TYPE_BOWS = "arrowsAndBows";
export const ITEM_TYPE_BANNER = "banner";
export const ITEM_TYPE_CROSSBOWS = "boltsAndCrossbows";
export const ITEM_TYPE_FORTIFICATIONS = "fortifications";
export const ITEM_TYPE_INSTRUMENT = "instrument";
export const ITEM_TYPE_IMP = "imp";
export const ITEM_TYPE_ITEM = "item";
export const ITEM_TYPE_POISON = "poison";
export const ITEM_TYPE_POTION = "potion";
export const ITEM_TYPE_RINGSANDAMULETS = "ringsAndAmulets";
export const ITEM_TYPE_WARPAINT = "warpaint";
export const ITEM_TYPE_WEAPON = "weapon";

// Item can be used by any faction
export const ALL = "*";

// Mapps item types in the itemCard obj to the display the German name.
export const ITEM_CATEGORY_NAME_MAPPING = {
  armor: "Rüstungen",
  arrowsAndBows: "Bögen",
  banner: "Banner",
  boltsAndCrossbows: "Armbrüste",
  fortifications: "Befestigungen",
  imp: "Dämonlinge",
  instrument: "Trommeln & Hörner",
  item: "Gegenstände",
  poison: "Gifte",
  potion: "Tränke",
  ringsAndAmulets: "Ringe und Amulette",
  weapon: "Waffen",
  warpaint: "Kriegsbemalung",
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
export const LANCE_TYPES = ["Lanze", "Mithrillanze", "Runenlanze"];
