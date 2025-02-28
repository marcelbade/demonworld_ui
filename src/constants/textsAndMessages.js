export const ALTTEXT = {
  RANGE_ARMOR: "Fernkampfpanzerung",
  MELEE_ARMOR: "Nahkampfpanzerung",
  RANGE_SKILL: "Fernkampffertigkeit",
  MELEE_SKILL: "Nahkampffertigkeit",
  APP_BAR_SWITCH: "Öffnet und schließt App Bar",
};

export const LANDINGPAGE = {
  TITLE: "Armeelistentool",
  COMPENDIUM: "Kompendium",
  LIST_GENERATOR: "Listengenerator",
  LOSS_CALCULATOR: "Verlustrechner",
  CARD_CREATOR: "Einheitengenerator",
};

export const COMPENDIUM = {
  TITLE: "Kompendium",
  COLUMNS: "Tabellenspalten",
  TOGGLE_OFF_ALL_COLUMNS: "Blende alle Spalten aus.",
  LOCK: "Anheften",
  CARD_BUTTON: "Kartenansicht",
  FACTION: "Fraktion",
  SUBFACTION: "Unterfraktion",
  NAME: "Name",
  UNITTYPE: "Typ",
  STANDARDBEARER: "Banner",
  MUSICIAN: "Musiker",
  WEDGEFORMATION: "Keil",
  SKIRMISHFORMATION: "Plänkler",
  SQUAREFORMATION: "Kare",
  HORDE: "Horde",
  MOVE: "Bewegen",
  CHARGE: "Angriff",
  SKIRMISH: "Plänkeln",
  HOLD_MANEUVERS: "Halten",
  UNIT_SIZE: "Größe",
  ARMOURRANGE: "FK-Rüstung",
  ARMOURMELEE: "NK-Rüstung",
  WEAPON1: "1. Waffe",
  WEAPON2: "2. Waffe",
  WEAPON3: "3. Waffe",
  RANGEDWEAPON: "Fernkampf",
  SKILLMELEE: "NK-Fertigkeit",
  SKILLRANGE: "FK-Fertigkeit",
  INITIATIVE: "Initiative",
  COMMANDSTARS: "Befehle",
  MAGIC: "Magie",
  CONTROLZONE: "Kontrolbereich",
  OVERRUN: "Überrennen",
  HITPOINTS: "Trefferpunkte",
  FEAR: "Furcht",
  MORAL1: "1. Moralwert",
  MORAL2: "2. Moralwert",
  SPECIALRULES: "Sonderregeln",
  POINTS: "Punkte",
  EFFECTIVENESS_1: "Effektivität 1",
  EFFECTIVENESS_2: "Effektivität 2",
  NO_SPECIAL_RULES: "Keine Sonderregeln",
};

export const TOOLTIPS = {
  DELETE_ARMY_LIST: "Komplette Liste löschen.",
  RULE_BOOK_TEXT: "Regelbuchtext",
};

export const TOURNAMENT_RULES = {
  TOURNAMENT_RULES: "Turnierregeln",
  MAX_POINTS_FOR_HERO: "Wieviele Prozent dürfen max. für Helden ausgegeben werden.",
  HOW_MANY_TIMES: "Wie oft darf jede Einheit ausgewählt werden.",
  ENFORCE_UNIQUE_RULE: "Einzigartige Einheiten dürfen nur einmal ausgewählt werden.",
};

export const OPTIONS = {
  CHANGE_TOURNAMENT_RULES: "Turnierregeln Ändern",
  CREATE_DEFAULT_LIST: "Standardliste Erzeugen",
  CREATE_DETAILED_LIST: "Detailierte Liste Erzeugen",
  CREATE_PDF: "PDF Erzeugen ",
  LIGHT_SWITCH: "Wechsel zw. dunklen und hellen Theme",
  LIST_DISPLAY_SWITCH: "Wechsel zw. einfacher und kompletter Listendarstellung",
  MENU_SWITCH: "Menü",
  SAVE_LIST: "Liste Speichern",
  TO_LOSS_CALCULATOR: "Zum Verlustrechner",
  CHANGE_SELECTED_FACTION: "Fraktion wechseln",
};

export const LOGIN = {
  LOGIN_PROMPT_TITLE: "Willkommen",
  LOGIN_USER: "Benutzername",
  LOGIN_PW: "Passwort",
  LOGIN_ACTION: "Einloggen",
};

export const GENERAL_ERRRORS = {
  ONLY_NUMBERS: "Bitte nur Zahlen eingeben.",
  NO_ITEMS_FOR_UNIT: "Diese Einheit kann keine Gegenstände erhalten.",
};

export const INPUT_TEXTS = {
  ARMY_NAME: "Name der Liste",
  ALLY: "Verbündeter: ",
  PLAYER_NAME: "Spielername",
  TEAM_NAME: "Teamname",
  SELECT_FACTION: "Wähle Eine Fraktion:",
  SELECT_SUBFACTION: "Wähle Eine Unterfraktion:",
  SELECT_UNIT: "Suche nach Einheit:",
  TOTAL_POINTS: "Gesamtpunktzahl :",
};

export const STATS = {
  PERCENT: "Prozent",
  SCOUT_FACTOR: "Spähfaktor",
  POINTS: "Punkte",
};

export const BUTTON_TEXTS = {
  SHOW_ITEM_SHOP: "Gegenstände",
  PREVIEW_CARD: "Kartenvorschau",
};

export const TEXTS = {
  SCOUTING_FACTOR: "Spähfaktor:",
  TOTAL: "Gesamt",
};

export const VALIDATION = {
  NO_COMMANDER_WARNING: `Die Armeeliste muss mindestens 1 Helden, Befehlshaber oder Magier mit 2 oder mehr ★ enthalten.`,
  NO_DUPLICATE_UNIQUES_MESSAGE: "Die Liste darf einzigartige Einheiten nur einmal enthalten.",
  MAXIMUM_OF_TWO_OF_EACH_MESSAGE: "Die Liste darf eine Einheit maximal 2x enthalten.",
  MAXIMUM_OF_X_PERCENT_HEROES_MESSAGE: (percentage) => {
    return `Die Liste darf maximal ${percentage}% Charaktere und Helden enthalten.`;
  },
  DONT_EXCEED_THE_POINT_ALLOWANCE_MESSAGE: "Die Liste darf die maximale Punktzahl nicht überschreiten.",
};

export const ITEM_LIMIT_MESSAGE = {
  UNIQUE_ITEMS: `Einzigartige Gegenstände können nur einmal vergeben werden.`,
  SHIELD_ITEMS: `Nur eine Einheit mit Schild kann diesen Gegenstand erhalten.`,
  MOUNTED_ITEMS: `Nur eine berittene Einheit kann diesen Gegenstand erhalten.`,
  MAGIC_ITEMS: `Nur ein Magier kann diesen Gegenstand erhalten.`,
  LANCE_ITEMS: `Nur eine Einheit mit Lanzen kann diesen Gegenstand erhalten.`,
  SPEAR_ITEMS: `Nur eine Einheit mit Speeren kann diesen Gegenstand erhalten.`,
  BOWS_ITEMS: `Nur eine Einheit mit einem Bogen kann diesen Gegenstand erhalten.`,
  CROSSBOWS_ITEMS: `Nur eine Einheit mit Armbrüsten kann diesen Gegenstand erhalten.`,
  UNIT_TYPE_ITEMS: (unitType) => {
    return unitType !== UNIT_TYPES.U
      ? `Eine ${UNIT_TYPES[unitType]} kann diesen Gegenstand nicht erhalten.`
      : `Ein ${UNIT_TYPES[unitType]} kann diesen Gegenstand nicht erhalten.`;
  },
  UNIT_NAME_ITEMS: (unitName) => {
    return `Nur eine Einheit ${unitName} kann diesen Gegenstand erhalten.`;
  },
  UNIT_SIZE_ITEMS: (maxSize) => {
    return `Nur an eine Einheit mit einer Größe von max. ${maxSize} kann diesen Gegenstand erhalten.`;
  },
  RANGE_ARMOR_ITEMS: (maxRangeArmor) => {
    return `Nur an eine Einheit mit einer Fernkampfpanzerung von max. ${maxRangeArmor} kann diesen Gegenstand erhalten.`;
  },
  MULTIPLE_ELEMENTS_ITEMS: `Nur an eine Einheit mit mehreren Elementen kann diesen Gegenstand erhalten.`,
  FORTIFICATIONS_ITEMS: `Die Liste darf max. 10% Befestigungen enthalten.`,
  //
  ONLY_ONE_ITEM_FOR_ALL_ELEMENTS: `Diese Einheit hat bereits einen Gegestand für alle Elemente erhalten.`,
  ONLY_ONE_BANNER: `Diese Einheit hat bereits ein Banner erhalten.`,
  ONLY_ONE_INSTRUMENT: `Diese Einheit hat bereits ein Instrument erhalten.`,
  ONLY_ONE_FORTIFICATION: `Diese Einheit hat bereits eine Feldbefestigung erhalten.`,
  ONLY_ONE_MAGICAL_ITEM: `Diese Einheit hat bereits einen magischen Gegenstand erhalten.`,
};

export const NO_RANGE_WEAPON = "x";

export const LOSS_CALCULATOR = {
  CREATE_LIST: "Liste Erstellen.",
  LOG_INTO_ACCOUNT: " Ins Konto einloggen und Liste Laden.",
  LOST_POINTS: "Verlorene Punkte:",
  LOSS_BUTTON_HELP:
    "Die Pfeil-Buttons addieren einen Lebenspunkt oder ein Element zu den Verlusten.\n Einheiten mit mehr als einen Element und mehreren Lebenspunkten haben 2 Pfeil-Buttons:\n einen für Lebenspunkte und einen für Elemente.\n Beim Klick auf das Schädel Icon wird die komplette Einheit zu den Verlusten hinzugefügt.",
  NOT_SINGLE_ELEMENT_ITEM_MESSAGE: "Punktkosten sind bereits in den Punktkosten der Elemente enthalten.",
};

export const PUSH_MESSAGE_TYPES = {
  ERROR: "error",
  INFO: "info",
};

export const CARD_TEXT = {
  CHARGE: "A",
  CHARGE_BONUS: "Angriffsbonus",
  CONTROL_AREA: "Kontrollbereich",
  ELEMENTS: "Elemente",
  FEAR: "Furchtfaktor",
  HORDE: "Horde",
  HORDE_FORMATION: "Horde",
  HOLD: "H",
  INITIATIVE: "Initiative",
  LEADER: "Anführer",
  MOVEMENT_POINTS: " Bewegungspunkte",
  MANEUVER: " Manöver",
  MOVE: "M",
  MORAL: "Moral",
  MUSICIAN: "Musiker",
  NO_ITEMS: "Keine Gegenstände",
  OVERRUN: "Überrennen",
  SIZE: "Größe: ",
  SKIRMISH: "P",
  SINGLE_ELEMENT: "Element",
  STANDARD_BEARER: "Banner",
  SKIRMISH_FORMATION: "Pl",
  SQUARE_FORMATION: "Ka",
  WEDGE_FORMATION: "Ke",
  MAX_FIELDS_MOVE: (movementValue) => {
    return `maximal ${movementValue} Felder`;
  },
  UNIT_IS_IMPETUOUS: "Einheit hat keinen 2. Moralwert.",
  UNIT_IS_FEARLESS: "Einheit hat keinen 1. Moralwert.",
};

// FACTIONS & Game Rules

export const UNIT_TYPES = {
  H: "Held/Charakter",
  M: "Magier",
  A: "Gerät",
  G: "Großelement",
  U: "Einheit",
  S: "Beschworenes Element",
};

export const SUMMONS_TEXTS = {
  TYPE: "Beschwörung",
  ERROR: "Beschwörungen kosten keine Punkte und sind hier nur aufgeführt um die passenden Rekrutierungskarten zu erzeugen.",
};

export const DARKELF_TEXTS = {
  FACTION_NAME: "Dunkelelfen",
  SF: {
    WARRIORCASTE: "Kriegerkaste",
    NOBLECASTE: "Adelskaste",
    MAGICIANCASTE: "Magierkaste",
    PRIESTCASTE: "Priesterkaste",
    PRIESTRESSES: "Priesterin",
    HERO: "Held",
    COMMANDER: "Befehlshaber",
  },

  SUB_FACTION_RULES: {
    WARRIOR_CASTE: "Deine Armeeliste muss zu mindestens 30% aus Einheiten der Kriegerkaste bestehen.",
    NOBLE_CASTE: "Deine Armee darf höchstens zu 50% aus Einheiten der Adelskaste bestehen.",
    MAGICIAN_CASTE: "Deine Armee darf höchstens zu 40% aus Einheiten der Magierkaste bestehen.",
    PRIEST_CASTE: "Deine Armee darf höchstens zu 40% aus Einheiten der Priesterkaste bestehen.",
    HEROES: "Deine Armee darf höchstens zu 40% aus Helden oder Befehlshabern bestehen.",
  },
  ERRORS: {},
};

export const DWARF_TEXTS = {
  FACTION_NAME: "Zwerge",
  ALLY: "Imperium",
  SF: {
    ZAHRA: "Z'ahra",
    GAETA: "Gaeta",
  },
  SUB_FACTION_RULES: {
    UNITS: "Deine Armeeliste muss zu mindestens 30% aus Einheiten bestehen.",
    CHARACTERS: "Deine Armeeliste darf zu höchstens 50% aus Helden bestehen.",
    ALLIES_AND_KINGDOMS_40: "Deine Armmee darf max.zu 40% aus Einheiten des zuerst gewählten Königreiches bestehen.",
    ALLIES_AND_KINGDOMS_20:
      "Deine Armmee darf max. zu 20% aus Einheiten des zweiten gewählten Königreiches oder Truppen des Imperiums bestehen.",
  },
  SELECTION_TEXTS: {
    FOURTY_PERCENT: "Welches Königreich soll bis zu 40% deiner Liste bilden?",
    TWENTY_PERCENT: "Wähle das 2. Königreich oder das Imperium.",
  },
};

export const ELF_TEXTS = {
  FACTION_NAME: "Elfen",
  ATHULAE: "Athulae der Pfeil",
  LAURELION: "Laurelion das Schwert",
  THINUVIEL: "Thinuviel die Geschwinde",
  TERLOR: "Terlor der Pegasus",
  FARENDIL: "Farendil der Dachs",
  KELAH: "Kelah das Einhorn",

  ARROW_LORDS: "Pfeillords",
  SWORD_MASTERS: "Schwertmeister",
  FORREST_RIDERS: "Waldreiter",
  PEGASI: "Pegasusreiter",
  BADGERS: "Dachsleute",
  UNICORN_RIDERS: "Einhorn-Elfenreiterinnen",
  SF: {
    THANARIEL_CLAN_TROOPS: "Thanaril",
    THANARIEL_COVENS: "Thanaril-Kriegerbünde",
    THANARIEL_CLANLORDS_AND_BARDS: "Thanaril-Clanlords / Befehlshaber",
    DYREA_LOREATH: "Barde / Dyrea / Loreaths",
    ILAH_RI: "Ilah Ri",
    OREA_VANAR: "Orea Vanar",
    TREELORDS: "Baumherren",
    CENTAURS: "Zentauren",
    OLD_HERO: "Alter Held",
  },

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
    ILAH_RI_COMMANDER_MESSAGE: "Du musst mindestens einen Ilah Ri Befehlshaber wählen, um Einheiten der Ratsarmee aufstellen zu können.",
    TREANTS_CENTAUR: "Die Armee kann nur Einheiten der Baumherren oder Zentauren enthalten.",
    THANARIEL_COVEN_MESSAGE: (master) => {
      return `Wenn du eine zweite und weitere Einheiten dieses Kriegerbundes aufgestellen möchtest, musst du zuerst den Anführer des betreffenden Kriegerbundes, ${master}, auswählen.`;
    },
    MASTERS_MESSAGE: (school) => {
      return `Dieser Meister kann nur ausgewählt werden, wenn zuerst die Schule der ${school} ausgewählt wurde.`;
    },
    SCHOOLS_MESSAGE: "Jede Schule der Orea Vanar kann nur einmal aufgestellt werden.",
    OLD_HERO_MESSAGE:
      "Du darfst höchstens einen alten Helden pro aufgestellten 5 Einheiten der Thanaril (keine Kriegerbünde) und/oder der Ilah Ri aufstellen.",
  },
};

export const EMPIRE_TEXTS = {
  FACTION_NAME: "Imperium",
  SF: {
    NORTH_MARCH: "Nordmark",
    SOUTH_MARCH: "Südmark",
    EAST_MARCH: "Ostmark",
    WEST_MARCH: "Westmark",
  },

  SELECTION_TEXT: "Wähle eine der Marken",
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
    NO_ZAHRA: "Z’ahra-Truppen dürfen nicht als Alliierte gewählt werden.",
  },
};

export const GOBLIN_TEXTS = {
  FACTION_NAME: "Goblins",
  SUB_FACTION_RULES: {
    INFANTRY: "Deine Armeeliste muss zu mindestens 30% aus Infanterie bestehen.",
    ENGINES: "Deine Armeeliste darf maximal zu 20% aus Geräten bestehen.",
    CHARACTERS: "Deine Armeeliste darf maximal zu 30% aus Helden und Befehlshabern bestehen.",
    SHAMANS: "Deine Armeeliste darf maximal zu 30% aus Schamanen bestehen.",
    GIANTINSECTS: "Deine Armeeliste darf maximal zu 40% aus Rieseninsekten bestehen.",
    INSECTRIDERS: "Deine Armeeliste darf maximal zu 40% aus Insektenreiter bestehen.",
    ORKS_TEXTS: "Deine Armeeliste darf zu maximal zu 20% aus Orks bestehen.",
    NO_CLANNGETT: "Clanngett-Truppen dürfen nicht als Alliierte gewählt werden.",
    SINGLE_CLAN_ONLY: "Deine Armeeliste darf nur Clanntruppen eines Clans beinhalten",
  },
  ERRORS: {
    SHAMAN_AND_HEROES: "Deine Armeeliste darf maximal zu 40% aus Schamanen und Helden bestehen.",
  },
};

export const ISHTAK_TEXTS = {
  FACTION_NAME: "Ishtak",
  SUB_FACTION_RULES: {
    HUMANS: "Deine Armeeliste muss zu 10% bis 60% aus Menschen bestehen.",
    BEASTMEN: "Deine Armeeliste muss zu 10% bis 60% aus Tiermenschen bestehen.",
    DEMONS: "Deine Armeeliste darf zu höchstens 50% aus Dämonen bestehen.",
    UNDEAD_TEXTS: "Deine Armeeliste darf zu höchstens 50% aus Untoten bestehen.",
    ICEGIANTS: "Deine Armeeliste darf zu höchstens 30% aus Eisriesen bestehen.",
    ICEWITCHES: "Deine Armeeliste muss zu 10% bis 60% aus Eishexen bestehen.",
  },
};

export const LIZARDMEN_TEXTS = {
  FACTION_NAME: "Echsenmenschen",
  SUB_FACTION_RULES: {
    BASICTROOPS: "Deine Armeeliste muss zu mindestens 20% aus Grundtruppen bestehen.",
    SPECIALISTS: "Deine Armeeliste darf maximal zu 40% aus spezialisierten Truppen bestehen.",
    HEROES: "Deine Armeeliste darf maximal zu 30% aus Helden und Befehlshabern bestehen.",
    MAGES: "Deine Armeeliste darf maximal zu 30% aus Magiern bestehen.",
    GIANTELEMENTS: "Deine Armeeliste darf maximal zu 35% aus Großelementen bestehen.",
  },
};

export const NORWINGER_TEXTS = {
  FACTION_NAME: "Norwinger",
  MOUNTAIN_KING: "Ungin Eisenbruch",
  YETIS: "Yetikrieger",
  GIANT_YETI: "Riesenyeti",
  NEANDERS: "Neanders",
  SNOW_OGRES: "Schnee-Oger",
  SF: {
    BARBARIANS: "Barbaren",
    VETERANS: "Veteranen",
    HEROES: "Held/Befehlshaber",
    WITCH: "Hexe",
    STORMLORD: "Sturmlord",
    MIGHTY_BEINGS: "Mächtige Wesen",
    NORTHERN_ALLIES: "Verbündete",
  },
  SUB_FACTION_RULES: {
    BARBARIANS: "Deine Armeeliste muss zu 20% bis 75% aus Barbaren bestehen.",
    VETERANS: "Deine Armeeliste darf zu höchstens 40% aus Veteranen bestehen.",
    HEROES: "Deine Armeeliste darf maximal zu 30% aus Helden und Befehlshabern bestehen.",
    SPELLCASTERS: "Deine Armeeliste darf zu höchstens 30% aus Sturmlords und Hexen bestehen.",
    MIGHTY_NORTHERN_BEINGS: "Deine Armeeliste darf zu höchstens 40% aus mächtigen Wesenn des Nordens bestehen.",
    NORTHERN_ALLIES: "Deine Armeeliste darf zu höchstens 25% aus Verbündeten des Nordens bestehen.",
    NEANDERS_RULE: "Für Jede Einheit Neanders muss mindestens eine andere Barbareneinheit (außer Schnee-Oger) aufgestellt werden.",
    GIANT_YETI_RULE: "Ein Riesenyeti darf nur aufgestellt werden, wenn die Armeeliste mindestens eine Einheit Yetis enthält.",
    MOUNTAIN_KING_RULE:
      "Ungin Eisenbruch, Bergkönig, darf nur aufgestellt werden, wenn die Armeeliste mindestens eine Einheit Zwerge enthält.",
  },
};

export const ORKS_TEXTS = {
  FACTION_NAME: "Orks",
  SELECTION_TEXT: "Wähle einen der Clans oder Clanngett",
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
    GOBLIN_TEXTS: "Deine Armeeliste darf zu maximal zu 20% aus Goblins bestehen.",
    AVAILABLE_CLANUNITS: "Dieser Clan kann diese Einheit nicht auswählen.",
  },
  GOBLIN_MERCENARIES: {
    SPIDER_ARCHERS: "Goblin-Spinnenschützen",
    SPIDER_RIDERS: "Goblin-Spinnenreiter",
  },
  CLANS: {
    ANIMAL: "Tierclan",
    ARROW: "Pfeilclan",
    BLOOD: "Blutclan",
    CLANNGETT: "Clanngett",
    ICE: "Eisclan",
    IRON: "Eisenclan",
    MOUNTAIN: "Bergclan",
    STONE: "Steinclan",
    WYVERN: "Wyvernclan",
  },
  CLAN_UNITS: {
    BEAR_PACK: "Bärenmeute",
    BEAR_RIDERS: "Bärenreiter",
    CHARIOT: "Streitwagen",
    DWARF_EATERS: "Zwergenfresser",
    HARPYS: "Harpyien",
    MINOTAURS: "Minotauren",
    SNOW_OGRES: "Schnee-Oger",
    THROIGAR: "Throigar",
    TROLL_GUARD: "Troll-Garde",
    WOLF_ARCHERS: "Wolfsschützen",
    WOLF_PACK: "Wolfsmeute",
    WOLF_RIDERS: "Wolfsreiter",
    WYVERN_RIDER: "Wyvernreiter",
    CROSS_BOW_MEN: "Armbrustschützen",
  },
};

export const THAIN_TEXTS = {
  FACTION_NAME: "Thain",
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
  SECOND_SUBFACTIONS: {
    BOAR: "Eberstamm",
    BEAR: "Bärenstamm",
    WOLVE: "Wolfsstamm",
    MOUNTAIN_LION: "Berglöwenstamm",
    EAGLE: "Adlerstamm",
  },
  SECOND_SUBFACTION_CAPTION: "Stamm Auswählen",
  SUB_FACTIONS: {
    CHURCH: "Dorga-Kirche",
    GIANT_ANIMALS: "Gar'Ydwen",
  },

  EXCEMPT_UNITS: {
    BANNER_OF_THE_HIGH_KING: "Banner des Hochkönigs",
    BOAR_CHARIOT: "Tur-Gar'arryd",
    GIANT_ELK: "Gar'worgar",
    GIANT_HORNED_ONE: "Gar'morrigu",
    GIANT_BOAR: "Gar'nar'og",
    GIANT_OXEN_W_ARCHERS: "Gar'ydwedd mit Bogenschützen",
    GIANT_OXEN_W_BALLISTA: "Gar'ydwedd mit Pfeilgeschütz",
    CARNAC: "Car'nac",
    HARBINGER_OF_DEATH: "Der Bote des Todes",
    SINNERS: "Die Sünder",
    ANCESTOR_SPIRITS: "Ahnengeister",
    MOUNTAIN_LION_SPIRITS: "Berglöwengeister",
    BOAR_SPIRITS: "Ebergeister",
    WOLVES_SPIRITS: "Wolfsgeister",
    EAGLE_SPIRITS: "Adlergeister",
    EAGLE_TOTEM: "Adlertotem",
    BOAR_TOTEM: "Ebertotem",
    BEAR_TOTEM: "Bärengeister",
    WOLF_TOTEM: "Wolfstotem",
    MOUNTAIN_LION_TOTEM: "Berglöwentotem",
  },
};

export const UNDEAD_TEXTS = {
  FACTION_NAME: "Untote",
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
    MAX_LIMIT_CHARACTERS: "Die Armee darf zu max. 50% aus Helden, Befehlshaber und Magiern bestehen.",
    ALLIES: "Diese Einheit steht nicht als Alliierter zur Verfügung.",
  },
};
export const SOUTHERN_CITY_STATES_TEXTS = {
  FACTION_NAME: "Südliche Stadtstaaten",
  SF: {
    PROVINCIAL: "Provinzheer",
    NORTH: "Truppen des Nordens",
    SOUTH: "Truppen des Südens",
    ORDER: "Orden des wahren Glaubens",
    BROTHERHOOD: "Bruderschaft des Sandes",
    SUMMONS_TEXTS: "Beschwörung",
  },

  SF_RULES: {
    PROVINCIAL: "Deine Armeeliste muss zu mindestens 30% aus Einheiten des Provinzheeres bestehen.",
    NORTH: "Deine Armeeliste darf zu höchstens 50% aus Truppen des Nordens bestehen.",
    SOUTH: "Deine Armeeliste darf zu höchstens 50% aus Truppen des Südens bestehen.",
    ORDER: "Deine Armeeliste darf zu höchstens 40% aus Truppen des Orden des wahren Glaubens bestehen.",
    BROTHERHOOD: "Deine Armeeliste darf zu höchstens 40% aus Truppen der Bruderschaft des Sandes bestehen.",
  },
  ERRORS: {
    BROTHERHOOD_ORDER: "Die Armee kann entweder nur Truppen des Ordens des wahren Glaubens oder der Bruderschaft des Sands enthalten.",
    MAX_LIMIT_CHARACTERS: "Die Armee darf zu max. 40% aus Helden, Befehlshaber und Magiern bestehen:",
    REGION_HEROES: (province) => {
      return `Du musst mindestens eine Einheit des ${province} aufstellen, um einen Befehlshaber oder Helden des Süden aufstellen zu können.`;
    },
  },
};

export const SPECIAL_TEXTS = {
  FACTION_NAME: "Special",
  MONSTER: "Ungeheuer",
  SMALL_MONSTER: "Kleines Ungeheuer",
};

export const SPECIAL_ITEMS = {
  BRACELET_OF_TRANSFORMATION: "Reif der Verwandlung",
};

export const CREATOR = {
  NEW_FACTION: "Neue Fraktion Erstellen",
  FACTION_NAME: "Fraktion:",
  SUBFACTION_NAME: "Teilfraktion",
  ALLY: "Allierter:",
  UNIT_NAME: "Name:",
  IS_UNIQUE: "Einheit ist einzigartig.",
  IS_CAVALERY: "Einheit ist beritten.",
  HAS_SHIELD: "Einheit besitzt Schilde.",
  HAS_SHIELD_HERO: "Einheit besitzt ein Schild.",

  CLOSED_FORMATION: "Einheit kämpft in geschlossener Formation.",
  LEADER_CLOSED_FORMATION: "Anführer kämpft in geschlossener Formation.",
  IS_LOW_FLYER: "Einheit kann niedgrig fliegen.",
  IS_HIGH_FLYER: "Einheit kann hoch fliegen.",
  MOVE: "Bewegung:",
  CHARGE: "Angriff:",
  SKIRMISH: "Plänkeln:",
  HOLD: "Halten:",
  MANEUVER: "Manöver:",
  ELEMENTS: "Elemente:",
  LEADER: "Anführer:",
  BANNER: "Banner:",
  MUSICIAN: "Musiker:",
  UNIT_TYPE: "Einheitentyp:",
  UNIT_OR_SUMMONED_UNIT: "(Beschworene) Einheit",
  GIANT: "Großelement",
  AUTOMATON: "Gerät",
  HERO: "Held",
  MAGE: "Magier",
  SUMMONS_WITH_MAXFIELDS: "Beschworenes Element",
  MOVMENT_POINTS: "Bewegungspunkte:",
  MAX_MOVE_POINTS: "Maximal X Felder:",
  FEAR: "Furcht:",
  MORAL1: "1. Moralwert",
  MORAL2: "2. Moralwert",
  HITPOINTS: "Trefferpunkte:",
  SPECIALRULE: "Sonderregel:",
  POINTCOST: "Punkte:",
  INITIATIVE: "Intiative:",
  CHARGE_BONUS: "Angriffsbonus:",
  MELEE_WEAPON_1: "1. Nahkampfwaffe:",
  MELEE_WEAPON_2: "2. Nahkampfwaffe:",
  MELEE_WEAPON_3: "3. Nahkampfwaffe:",
  MELEE_VALUE_1: "1. Nahkampfwert:",
  MELEE_VALUE_2: "2. Nahkampfwert:",
  MELEE_VALUE_3: "3. Nahkampfwert:",
  HAS_MELEE_SKILL: "Einheit hat NK-Fertigkeit",
};
