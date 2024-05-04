import { DWARF_TEXTS } from "./textsAndMessages";

// SINGLE FACTIONS
export const DARKELVES = "Dunkelelfen";
export const LIZARDKIN = "Echsenmenschen";
export const ELVES = "Elfen";
export const GOBLINS = "Goblins";
export const EMPIRE = "Imperium";
export const ISHTAK = "Ishtak";
export const ORKS = "Orks";
export const NORWINGER = "Norwinger";
export const THAIN = "Thain";
export const UNDEAD = "Untote";
export const DWARVES = "Zwerge";
export const SOUTHERN_CITY_STATES = "Südliche Stadtstaaten";
export const SPECIAL = "Special";

// SPECIAL INDICATORS
export const NONE = "NONE";
export const NO_ALLY = "NO_ALLY";

// ALL FACTIONS
export const ALL_FACTIONS_ARRAY = [
  DARKELVES,
  ELVES,
  GOBLINS,
  EMPIRE,
  ISHTAK,
  NORWINGER,
  ORKS,
  THAIN,
  UNDEAD,
  DWARVES,
  LIZARDKIN,
  SOUTHERN_CITY_STATES,
];

export const ALTERNATIVE_ARMY_SELECTION_TEXT = {
  Imperium: "Wähle eine der Marken",
  Orks: "Wähle einen der Clans oder Clanngett",
  Zwerge: [ DWARF_TEXTS.ALLIES_AND_KINGDOMS_40, DWARF_TEXTS.ALLIES_AND_KINGDOMS_20 ], 
};

// export const UNIT_OR_SUBFACTION = { units: ["Orks"], subFactions: ["Zwerge", "Imperium"] };

// SECOND SUB_FACTION
export const ARMIES_ADDITIONAL_SUBFACTIONS = [THAIN];
export const ARMIES_ADDITIONAL_SUBFACTIONS_MAPPING = [
  {
    army: THAIN,
    secondSubFactionList: ["Eberstamm", "Bärenstamm", "Wolfsstamm", "Berglöwenstamm", "Adlerstamm"],
    excemptSubFactions: ["Dorga-Kirche", "Gar'Ydwen"],
    caption: "Stamm Auswählen",
  },
];

export const ARMIES_TWO_CHOICES_PER_ALTERNATIVE_LIST = [DWARVES];

// THAIN
export const THAIN_TRIBES = ["Eberstamm", "Bärenstamm", "Wolfsstamm", "Berglöwenstamm", "Adlerstamm"];
export const EXCEMPT_FROM_TRIBES_RULE = [
  "Banner des Hochkönigs",
  "Gar'worgar",
  "Gar'morrigu",
  "Gar'nar'og",
  "Gar'ydwedd mit Bogenschützen",
  "Gar'ydwedd mit Pfeilgeschütz",
  "Tur-Gar'arryd",
  "Gor'yaginor",
  "Car'nac",
  "Der Bote des Todes",
  "Die Sünder",
  "Todesgarde",
  "Adlergeister",
  "Adlertotem",
  "Ahnengeister",
  "Berglöwengeister",
  "Berglöwentotem",
  "Bärengeister",
  "Bärentotem",
  "Ebergeister",
  "Ebertotem",
  "Wolfsgeister",
  "Wolfstotem",
];

export const ORK_CLANS_UNIT_MAPPING = {

  // clans im alphabetical order
  Bergclan: ["Harpyien", "Bärenreiter", "Bärenmeute"],

  Blutclan: ["Troll-Garde", "Wolfsreiter", "Wolfsschützen"],

  Eisclan: ["Wolfsreiter", "Wolfsschützen", "Streitwagen", "Schnee-Oger"],

  Eisenclan: ["Zwergenfresser", "Bärenreiter", "Bärenmeute"],

  Steinclan: ["Throigar", "Streitwagen", "Minotauren"],

  Pfeilclan: ["Bärenreiter", "Bärenmeute", "Armbrustschützen"],

  Tierclan: ["Wolfsreiter ", "Wolfsschützen", "Wolfsmeute", "Schnee-Oger"],

  Wyvernclan: ["Wyvernreiter", "Minotauren"],

  // Clanngett gets everything...
  Clanngett: [
    "Throigar",
    "Troll-Garde",
    "Wolfsreiter",
    "Wolfsschützen",
    "Wolfsmeute",
    "Streitwagen",
    "Wyvernreiter",
    "Harpyien",
    "Schnee-Oger",
    "Minotauren",
    "Zwergenfresser",
    "Bärenreiter",
    "Bärenmeute",
    "Armbrustschützen",
  ],
};
