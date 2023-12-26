export const TOOLTIPS = {
  DELETE_ARMY_LIST: "Komplette Liste löschen.",
};

export const TOURNAMENT_RULES = {
  TOURNAMENT_RULES: "Turnierregeln",
  MAX_POINTS_FOR_HERO: "Wieviele Prozent dürfen max. für Helden ausgegeben werden.",
  HOW_MANY_TIMES: "Wie oft darf jede Einheit ausgewählt werden.",
  ENFORCE_UNIQUE_RULE: "Einzigartige Einheiten dürfen nur einmal gewählt werden.",
};

export const OPTIONS = {
  CHANGE_TOURNAMENT_RULES: "Turnierregeln Ändern",
  CREATE_DEFAULT_LIST: "Standard Liste Erzeugen",
  CREATE_DETAILED_LIST: "Detailierte Liste Erzeugen",
  CREATE_PDF: "PDF Erzeugen ",
  LIGHT_SWITCH: "Wechsel zw. Dark und Light Mode",
  SAVE_LIST: "Liste Speichern",
  TO_LOSS_CALCULATOR: "Zum Verlustrechner",
};

export const GENERAL_ERRRORS = {
  ONLY_NUMBERS: "Bitte nur Zahlen eingeben.",
  NO_ITEMS_FOR_UNIT: "Diese Einheit kann keine Gegenstände erhalten.",
};

export const INPUT_TEXTS = {
  SELECT_FACTION: "Wähle Eine Fraktion.",
};

export const BUTTON_TEXTS = {
  SHOW_ITEM_SHOP: "Gegenstände",
  PREVIEW_CARD: "Kartenvorschau",
};

export const TEXTS = {
  SCOUTING_FACTOR: "Spähfaktor:",
};

export const VALIDATION = {
  NO_COMMANDER_WARNING: `Die Armeeliste muss mindestens 1 Helden, Befehlshaber oder Magier mit 2 oder mehr ★ enthalten.`,

  NO_DUPLICATE_UNIQUES_MESSAGE: "Die Liste darf einzigartige Einheiten nur einmal enthalten.",
  MAXIMUM_OF_TWO_OF_EACH_MESSAGE: "Die Liste darf eine Einheit maximal 2x enthalten.",
  MAXIMUM_OF_X_PERCENT_HEROES_MESSAGE: (percentage) => {
    return `Die Liste darf maximal ${percentage}% Characktere und Helden enthalten.`;
  },
  DONT_EXCEED_THE_POINT_ALLOWANCE_MESSAGE: "Die Liste darf die maximale Punktzahl nicht überschreiten.",
};

export const DARKELVES = {
  SUB_FACTION_RULES: {
    WARRIOR_CASTE: "Deine Armeeliste muss zu mindestens 30% aus Einheiten der Kriegerkaste bestehen.",
    NOBLE_CASTE: "Deine Armee darf höchstens zu 50% aus Einheiten der Adelskaste bestehen.",
    MAGICIAN_CASTE: "Deine Armee darf höchstens zu 40% aus Einheiten der Magierkaste bestehen.",
    PRIEST_CASTE: "Deine Armee darf höchstens zu 40% aus Einheiten der Priesterkaste bestehen.",
    HEROES: "Deine Armee darf höchstens zu 40% aus Helden oder Befehlshabern bestehen.",
  },
  ERRORS: {},
};

export const DWARVES = {
  SUB_FACTION_RULES: {
    UNITS: "Deine Armeeliste muss zu mindestens 30% aus Einheiten bestehen.",
    CHARACTERS: "Deine Armeeliste darf zu höchstens 50% aus Helden bestehen.",
    GAETA: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Gaeta bestehen.",
    ZAHRA: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Zah'ra bestehen.",
    ALLY: "Deine Armeeliste darf zu höchstens 20% aus Einheiten aus Alliierten bestehen.",
  },
};

export const ELVES = {
  SUB_FACTION_RULES: {
    THANARIL_CLAN_TROOPS: "Deine Armeeliste muss zu 30% bis 70% aus Thanaril-Clantruppen bestehen.",
    THANARIL_COVENS: "Deine Armeeliste darf zu höchstens 30% aus Thanaril-Kriegerbünden und Ihren Anführern bestehen.",
    THANARIL_CLAN_LORDS: "Deine Armeeliste darf zu höchstens 30% aus Thanaril-Clanlords und Befehlshabern bestehen.",
    LOREATH_DYREA: "Deine Armeeliste darf zu höchstens 40% aus Einheiten der Dyrea und Loreath bestehen.",
    ILAH_RI: "Deine Armeeliste darf zu höchstens 20% aus Einheiten und Anführern der Ratsarmee bestehen.",
    OREA_VANAR: "Deine Armeeliste darf zu höchstens 30% aus Einheiten der Orea Vanar bestehen.",
    TREANTS: "Deine Armeeliste darf zu höchstens 25% aus Einheiten der Baumherren bestehen.",
    OLD_HERO: "Du kannst max. 1 alten Helden pro 5 EInheiten der Ilah Ri oder Thanaril wählen.",
    CENTAURS: "Deine Armeeliste darf zu höchstens 25% aus Einheiten der Zentauren bestehen.",
  },
  ERRORS: {
    ILAH_RI_COMMANDER_MESSAGE: "Du musst mindestens einen Ilah Ri Befehlshaber wählen um Einheiten der Ratsarmee aufstellen zu können.",
    TREANTS_CENTAUR: "Die Armee kann nur Baumherren oder Zentauren Einheiten enthalten.",
    THANARIEL_COVEN_MESSAGE:
      "Eine zweite und weitere Einheiten desselben Kriegerbundes können nur aufgestellt werden, wenn auch der Anführer des betreffenden Kriegerbundes anwesend ist.",
    MASTERS_MESSAGE: "Ein Meister kann nur aufgestellt werden, wenn auch ihre Schule auf dem Schlachtfeld anwesend ist.",
    SCHOOLS_MESSAGE: "Jede Schule der Orea Vanar kann nur einmal aufgestellt werden.",
    OLD_HERO_MESSAGE:
      "Du darfst höchstens einen alten Helden pro aufgestellten 5 Einheiten der Thanaril (keine Kriegerbünde) und/oder der Ilah Ri aufstellen.",
  },
};

export const EMPIRE = {
  SUB_FACTION_RULES: {
    IMPERIAL_ARMY: "Deine Armeeliste muss zu 10% bis 50% aus Einheiten des Kaiserheeres bestehen.",
    PROVINCIAL_ARMY: "Deine Armeeliste muss zu 20% bis 50% aus Einheiten des Provinzheeres bestehen.",
    ORDER_TROOPS_AND_MAGICIANS: "Deine Armeeliste darf zu höchstens 40% aus Einheiten des Ordens bestehen.",
    HEROES_AND_COMMANDERS: "Deine Armeeliste darf zu höchstens 30% aus Helden und Befehlshabern bestehen.",
    SPELLCASTERS: "Deine Armeeliste darf zu höchstens 30% aus Magiern und Priestern bestehen.",
    CENTRAL_MARK_SPECIALS: "Deine Armeeliste muss zu 10% bis 50% aus Einheiten der Zentralmark bestehen.",
    EASTERN_MARK_SPECIALS: "Deine Armeeliste darf zu höchstens 20% aus Einheiten der Ostmark  bestehen.",
    WESTERN_MARK_SPECIALS: "Deine Armeeliste muss zu 10% bis 50% aus Einheiten der Westmark bestehen.",
    SOUTHERN_MARK_SPECIALS: "Deine Armeeliste muss zu 10% bis 50% aus Einheiten der Südmark bestehen.",
    NORTHERN_MARK_SPECIALS: "Deine Armeeliste muss zu 10% bis 50% aus Einheiten der Nordmark bestehen.",
    ALLY: "Deine Armeeliste darf zu höchstens 20% aus Einheiten aus Alliierten bestehen.",
  },
};

export const GOBLINS = {
  SUB_FACTION_RULES: {
    INFANTRY: "Deine Armeeliste muss zu mindestens 30% aus Infanterie bestehen.",
    ENGINES: "Deine Armeeliste darf maximal zu 20% aus Geräten bestehen.",
    CHARACTERS: "Deine Armeeliste darf maximal zu 40% aus Helden und Befehlshabern bestehen.",
    SHAMANS: "Deine Armeeliste darf maximal zu 30% aus Schamanen bestehen.",
    GIANTINSECTS: "Deine Armeeliste darf maximal zu 40% aus Rieseninsekten bestehen.",
    INSECTRIDERS: "Deine Armeeliste darf maximal zu 40% aus Insektenreiter bestehen.",
    ORKS: "Deine Armeeliste darf zu maximal zu 20% aus Orks bestehen.",
  },
};

export const ISHTAK = {
  SUB_FACTION_RULES: {
    HUMANS: "Deine Armeeliste muss zu 10% bis 60% aus Menschen bestehen.",
    BEASTMEN: "Deine Armeeliste muss zu 10% bis 60% aus Tiermenschen bestehen.",
    DEMONS: "Deine Armeeliste darf zu höchstens 50% aus Dämonen bestehen.",
    UNDEAD: "Deine Armeeliste darf zu höchstens 50% aus Untoten bestehen.",
    ICEGIANTS: "Deine Armeeliste darf zu höchstens 30% aus Eisriesen bestehen.",
    ICEWITCHES: "Deine Armeeliste muss zu 10% bis 60% aus Eishexen bestehen.",
  },
};

export const LIZARDMEN = {
  SUB_FACTION_RULES: {
    BASICTROOPS: "Deine Armeeliste muss zu mindestens 20% aus Grundtruppen bestehen.",
    SPECIALISTS: "Deine Armeeliste darf maximal zu 40% aus spezialisierten Truppen bestehen.",
    HEROES: "Deine Armeeliste darf maximal zu 30% aus Helden und Befehlshabern bestehen.",
    MAGES: "Deine Armeeliste darf maximal zu 30% aus Magiern bestehen.",
    GIANTELEMENTS: "Deine Armeeliste darf maximal zu 35% aus Großelementen bestehen.",
  },
};

export const NORWINGER = {
  SUB_FACTION_RULES: {
    BARBARIANS: "Deine Armeeliste muss zu 20% bis 75% aus Barbaren bestehen.",
    VETERANS: "Deine Armeeliste darf zu höchstens 40% aus Veteranen bestehen.",
    HEROES: "Deine Armeeliste darf maximal zu 30% aus Helden und Befehlshabern bestehen.",
    SPELLCASTERS: "Deine Armeeliste darf zu höchstens 30% aus Sturmlords und Hexen bestehen.",
    MIGHTY_NORTHERN_BEINGS: "Deine Armeeliste darf zu höchstens 40% aus mächtigen Wesenn des Nordens bestehen.",
    NORTHERN_ALLIES: "Deine Armeeliste darf zu höchstens 25% aus Verbündeten des Nordens bestehen.",
  },
};

export const ORKS = {
  SUB_FACTION_RULES: {
    UNIT: "Deine Armeeliste muss zu mindestens 25% aus Einheiten bestehen.",
    CHARACTERS: "Deine Armeeliste darf zu höchstens 30% aus Helden bestehen.",
    GIANTS: "Deine Armeeliste darf zu höchstens 30% aus Geräten bestehen.",
    ENGINES: "Deine Armeeliste darf zu höchstens 30% aus Sturmlords und Hexen bestehen.",
    CLANTROOPS: (percentage) => {
      return `Deine Armeeliste darf zu höchstens ${percentage} Prozent aus Sondertruppen der Clans bestehen.`;
    },
    CLANNGETT: "Deine Armeeliste darf zu höchstens 50% aus Einheiten Clanngetts bestehen.",
    WIZARDS: "Deine Armeeliste darf zu höchstens 40% aus Zauberern bestehen.",
    GOBLINS: "Deine Armeeliste darf zu maximal zu 20% aus Goblins bestehen.",
    AVAILABLE_CLANUNITS: "Dieser Clan kann diese Einehit nicht auswählen.",
  },
};

export const THAIN = {
  SUB_FACTION_RULES: {
    TRIBAL_WARRIORS: "Deine Armeeliste muss zu 10% bis 80% aus Stammeskriegern bestehen.",
    VETERANS: "Deine Armeeliste darf zu höchstens 50% aus Veteranen bestehen.",
    SHAMANS: "Deine Armeeliste darf zu höchstens 50% aus Schamamen bestehen.",
    GREATCHAMPIONS_HEROES_COMMANDERS: "Deine Armeeliste darf zu höchstens 30% aus Groß-Champions, Helden und Befehlshabern bestehen.",
    GAR_Y_DWEN: "Deine Armeeliste darf zu höchstens 40% aus Gar'ydwen bestehen.",
    DORGA_CHURCH: "Deine Armeeliste darf zu höchstens 40% aus Einheiten der Dorga-Kirche bestehen.",
  },
  ERRORS: {
    TRIBE_MESSAGE: "Du mußt der Einheit einen Stamm zuordnen.",
    CHAMPION_MESSAGE:
      "Der Groß-Champion eines Stammes kann nur aufgestellt werden, wenn vorher mindestens 1 Einheit des Stammes ausgewählt wurde.",
    DORGA_MESSAGE: "Dorga-Priester können nur aufgestellt werden, wenn vorher mindestens 1 Einheit der Dorga-Kirche ausgewählt wurde.",
    VETERAN_MESSAGE:
      "Einheiten und jedes Geräte der Veteranen der Stämme  können nur aufgestellt werden, wenn vorher mindestens 1 Einheit von Stammeskriegern desselben Stammes aufgestellt ausgewählt wurde.",
  },
};

export const UNDEAD = {
  SUB_FACTION_RULES: {
    LESSER_COVENANT: "Deine Armeeliste muss zu 20 bis 70% aus Einheiten des Großen Bundes bestehen.",
    GREATER_COVENANT: "Deine Armeeliste muss zu 15 bis 50% aus Einheiten des Großen Bundes bestehen.",
    SHADOW_COVENANT: "Deine Armeeliste darf zu höchstens 30% aus Einheiten des Schattenbundes bestehen.",
    HEROES: "Deine Armeeliste darf zu höchstens 40% aus Helden bestehen.",
    MAGICIAN: "Deine Armeeliste darf zu höchstens 40% aus Magiern bestehen.",
    ALLY: "Deine Armeeliste darf zu höchstens 20% aus Einheiten aus Alliierten bestehen.",
  },
  ERRORS: {
    UNDEAD_COMMANDER: "Deine Liste muss einen Nekromanten oder einen Helden oder Befehlshaber mit 2 oder mehr ★ enthalten.",
    MAX_LIMIT_CHARACTERS: "Die Armee darf zu max. 50% aus Helden, Befehlshaber und Magiern bestehen!.",
    ALLIES: "Diese Einheit steht nicht als Alliierter zur Verfügung.",
  },
};

export const NO_RANGE_WEAPON = "x";

export const LOSS_CALCULATOR = {
  LOST_HERO: "Held verloren.",
  LOST_GIANT: "Großelement verloren.",
  UNIT_ROUTED: "Einheit aufgerieben.",
  TEXT_UNITS: "Verlorene Elemente:.",
  TEXT_SINGLE_ELEMENTS: "Verlorene Lebenspunkte:.",
  MINUS_1_HP: "- 1 Lebenspunkt.",
  MINUS_1_ELEMENT: "- 1 Element.",
  PLUS_1_HP: "+ 1 Lebenspunkt.",
  PLUS_1_ELEMENT: "+ 1 Element.",
  LOST_MAGE: "Magier verloren.",
  NOT_SINGLE_ELEMENT_ITEM_MESSAGE: "Punktkosten sind bereits in den Punktkosten der Elemente enthalten.",
};
