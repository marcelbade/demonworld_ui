export const DUNKELFELFEN = "Dunkelelfen";
export const ECHSENMENSCHEN = "Echsenmenschen";
export const ELFEN = "Elfen";
export const GOBLINS = "Goblins";
export const IMPERIUM = "Imperium";
export const ISHTAK = "Ishtak";
export const ORKS = "Orks";
export const NORWINGER = "Norwinger";
export const THAIN = "Thain";
export const UNTOTE = "Untote";
export const ZWERGE = "Zwerge";

export const NONE = "NONE";

// ALL FACTIONS
export const ALL_FACTIONS_ARRAY = [DUNKELFELFEN, ELFEN, GOBLINS, IMPERIUM, ISHTAK, NORWINGER, ORKS, THAIN, UNTOTE, ZWERGE, ECHSENMENSCHEN];

// ARMIES WITH ALTERNATIVE LISTS
export const ARMIES_WITH_ALTERNATIVE_LISTS = [IMPERIUM, ZWERGE, ORKS];

export const ARMY_ALTERNATIVES_LIST_MAPPER = {
  // Dunkelelfen: [],
  // Echsenmenschen: [],
  // Elfen: [],
  // Goblins: [],
  Imperium: ["Nordmark", "Südmark", "Westmark", "Ostmark"],
  // Ishtak: [],
  Orks: ["Clanngett", "Steinclan", "Wyvernclan", "Tierclan", "Eisclan", "Pfeilclan", "Blutclan", "Eisenclan", "Bergclan"],
  // Norwinger: [],
  // Thain: [],
  // Untote: [],
  Zwerge: ["Gaeta", "Zah'ra", "Imperium"],
};

export const ALTERNATIVE_ARMY_SELECTION_TEXT = {
  Imperium: "Wähle eine der Marken",
  Orks: "Wähle einen der Clans oder Clanngett",
  Zwerge: ["Wähle eines der Königreiche", "Wähle das zweites Königreich oder Alliierte"],
};

export const UNIT_OR_SUBFACTION = { units: ["Orks"], subFactions: ["Zwerge", "Imperium"] };

// SECOND SUB_FACTION
export const ARMIES_ADDITIONAL_SUBFACTIONS = [THAIN];
export const ARMIES_ADDITIONAL_SUBFACTIONS_BUTTON_CAPTION = [
  {
    army: THAIN,
    secondSubFactionList: ["Eberstamm", "Bärenstamm", "Wolfsstamm", "Berglöwenstamm", "Adlerstamm"],
    excemptSubFactions: ["Dorga-Kirche", "Gar'Ydwen"],
    caption: "Stamm Auswählen",
  },
];

export const ARMIES_TWO_CHOICES_PER_ALTERNATIVE_LIST = [ZWERGE];

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

 