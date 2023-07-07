export const ISHTAK = "Ishtak";
export const ZWERGE = "Zwerge";
export const ORKS = "Orks";
export const GOBLINS = "Goblins";
export const IMPERIUM = "Imperium";
export const DUNKELFELFEN = "Dunkelelfen";
export const THAIN = "Thain";
export const ELFEN = "Elfen";
export const NORWINGER = "Norwinger";
export const UNTOTE = "Untote";
export const ECHSENMENSCHEN = "Echsenmenschen";

export const ALL_FACTIONS_ARRAY = [DUNKELFELFEN, ELFEN, GOBLINS, IMPERIUM, ISHTAK, NORWINGER, ORKS, THAIN, UNTOTE, ZWERGE, ECHSENMENSCHEN];

export const ARMIES_WITH_ALTERNATIVE_LISTS = ["Imperium", "Zwerge", "Orks"];

export const ARMY_ALTERNATIVES_LIST_MAPPER = {
  Imperium: ["Nordmark", "Südmark", "Westmark", "Ostmark"],
  Zwerge: ["Gaeta", "Zah'ra", "Imperium"],
  Orks: ["Clanngetts", "Steinclan", "Wyvernclan", "Tierclan", "Eisclan", "Pfeilclan", "Blutclan", "Eisenclan", "Bergclan"],
};


export const ALTERNATIVE_ARMY_SELECTION_TEXT = {
  Imperium: "Wähle eine der Marken",
  Zwerge: ["Wähle eines der Königreiche", "Zweites Königreich oder Alliierte?"],
  Orks: "Wähle einen der Clans oder Clanngett",  
}
 

export const ARMIES_TWO_CHOICES_PER_ALTERNATIVE_LIST=[ZWERGE]; 