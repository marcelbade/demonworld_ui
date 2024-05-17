import {
  DARKELF_TEXTS,
  DWARF_TEXTS,
  EMPIRE_TEXTS,
  GOBLIN_TEXTS,
  ISHTAK_TEXTS,
  LIZARDMEN_TEXTS,
  NORWINGER_TEXTS,
  ORKS_TEXTS,
  SOUTHERN_CITY_STATES_TEXTS,
  SPECIAL_TEXTS,
  THAIN_TEXTS,
  UNDEAD_TEXTS,
  ELF_TEXTS,
} from "./textsAndMessages";

// SINGLE FACTIONS
export const DARKELVES = DARKELF_TEXTS.FACTION_NAME;
export const DWARVES = DWARF_TEXTS.FACTION_NAME;
export const ELVES = ELF_TEXTS.FACTION_NAME;
export const EMPIRE = EMPIRE_TEXTS.FACTION_NAME;
export const GOBLINS = GOBLIN_TEXTS.FACTION_NAME;
export const ISHTAK = ISHTAK_TEXTS.FACTION_NAME;
export const LIZARDKIN = LIZARDMEN_TEXTS.FACTION_NAME;
export const NORWINGER = NORWINGER_TEXTS.FACTION_NAME;
export const ORKS = ORKS_TEXTS.FACTION_NAME;
export const SOUTHERN_CITY_STATES = SOUTHERN_CITY_STATES_TEXTS.FACTION_NAME;
export const SPECIAL = SPECIAL_TEXTS.FACTION_NAME;
export const THAIN = THAIN_TEXTS.FACTION_NAME;
export const UNDEAD = UNDEAD_TEXTS.FACTION_NAME;

// SPECIAL INDICATORS
export const NONE = "NONE";
export const NO_ALLY = "NO_ALLY";

// ALL FACTIONS
export const ALL_FACTIONS_ARRAY = [
  DARKELVES,
  DWARVES,
  ELVES,
  GOBLINS,
  LIZARDKIN,
  EMPIRE,
  ISHTAK,
  NORWINGER,
  ORKS,
  SOUTHERN_CITY_STATES,
  THAIN,
  UNDEAD,
];

export const ALTERNATIVE_ARMY_SELECTION_TEXT = {
  [DWARVES]: [
    DWARF_TEXTS.SELECTION_TEXTS.FOURTY_PERCENT, //
    DWARF_TEXTS.SELECTION_TEXTS.TWENTY_PERCENT,
  ],
  [EMPIRE]: [EMPIRE_TEXTS.SELECTION_TEXT],
  [ORKS]: [ORKS_TEXTS.SELECTION_TEXT],
};

// SECOND SUB_FACTION
export const ARMIES_ADDITIONAL_SUBFACTIONS = [THAIN];
export const ARMIES_ADDITIONAL_SUBFACTIONS_MAPPING = [
  {
    army: THAIN,
    secondSubFactionList: [
      THAIN_TEXTS.SECOND_SUBFACTIONS.BOAR,
      THAIN_TEXTS.SECOND_SUBFACTIONS.BEAR,
      THAIN_TEXTS.SECOND_SUBFACTIONS.EAGLE,
      THAIN_TEXTS.SECOND_SUBFACTIONS.MOUNTAIN_LION,
      THAIN_TEXTS.SECOND_SUBFACTIONS.WOLVE,
    ],
    excemptSubFactions: [THAIN_TEXTS.SUB_FACTIONS.CHURCH, THAIN_TEXTS.SUB_FACTIONS.GIANT_ANIMALS],
    caption: THAIN_TEXTS.SECOND_SUBFACTION_CAPTION,
  },
];

export const ARMIES_TWO_CHOICES_PER_ALTERNATIVE_LIST = [DWARVES];

// THAIN
export const THAIN_TRIBES = [
  THAIN_TEXTS.SECOND_SUBFACTIONS.BOAR,
  THAIN_TEXTS.SECOND_SUBFACTIONS.BEAR,
  THAIN_TEXTS.SECOND_SUBFACTIONS.EAGLE,
  THAIN_TEXTS.SECOND_SUBFACTIONS.MOUNTAIN_LION,
  THAIN_TEXTS.SECOND_SUBFACTIONS.WOLVE,
];
export const EXCEMPT_FROM_TRIBES_RULE = [
  THAIN_TEXTS.EXCEMPT_UNITS.ANCESTOR_SPIRITS,
  THAIN_TEXTS.EXCEMPT_UNITS.BANNER_OF_THE_HIGH_KING,
  THAIN_TEXTS.EXCEMPT_UNITS.BEAR_TOTEM,
  THAIN_TEXTS.EXCEMPT_UNITS.BOAR_CHARIOT,
  THAIN_TEXTS.EXCEMPT_UNITS.BOAR_SPIRITS,
  THAIN_TEXTS.EXCEMPT_UNITS.BOAR_TOTEM,
  THAIN_TEXTS.EXCEMPT_UNITS.CARNAC,
  THAIN_TEXTS.EXCEMPT_UNITS.EAGLE_SPIRITS,
  THAIN_TEXTS.EXCEMPT_UNITS.EAGLE_TOTEM,
  THAIN_TEXTS.EXCEMPT_UNITS.GIANT_BOAR,
  THAIN_TEXTS.EXCEMPT_UNITS.GIANT_ELK,
  THAIN_TEXTS.EXCEMPT_UNITS.GIANT_HORNED_ONE,
  THAIN_TEXTS.EXCEMPT_UNITS.GIANT_OXEN_W_ARCHERS,
  THAIN_TEXTS.EXCEMPT_UNITS.GIANT_OXEN_W_BALLISTA,
  THAIN_TEXTS.EXCEMPT_UNITS.HARBINGER_OF_DEATH,
  THAIN_TEXTS.EXCEMPT_UNITS.MOUNTAIN_LION_SPIRITS,
  THAIN_TEXTS.EXCEMPT_UNITS.MOUNTAIN_LION_TOTEM,
  THAIN_TEXTS.EXCEMPT_UNITS.SINNERS,
  THAIN_TEXTS.EXCEMPT_UNITS.WOLF_TOTEM,
  THAIN_TEXTS.EXCEMPT_UNITS.WOLVES_SPIRITS,
];

export const ORK_CLANS_UNIT_MAPPING = {
  // clans im alphabetical order

  [ORKS_TEXTS.CLANS.ANIMAL]: [
    ORKS_TEXTS.CLAN_UNITS.WOLF_RIDERS,
    ORKS_TEXTS.CLAN_UNITS.WOLF_ARCHERS,
    ORKS_TEXTS.CLAN_UNITS.WOLF_PACK,
    ORKS_TEXTS.CLAN_UNITS.SNOW_OGRES,
  ],

  [ORKS_TEXTS.CLANS.ARROW]: [
    ORKS_TEXTS.CLAN_UNITS.BEAR_RIDERS, //
    ORKS_TEXTS.CLAN_UNITS.BEAR_PACK,
    ORKS_TEXTS.CLAN_UNITS.CROSS_BOW_MEN,
  ],

  [ORKS_TEXTS.CLANS.BLOOD]: [
    ORKS_TEXTS.CLAN_UNITS.TROLL_GUARD, //
    ORKS_TEXTS.CLAN_UNITS.WOLF_RIDERS,
    ORKS_TEXTS.CLAN_UNITS.WOLF_ARCHERS,
  ],

  // Clanngett gets everything...
  [ORKS_TEXTS.CLANS.CLANNGETT]: [
    ORKS_TEXTS.CLAN_UNITS.THROIGAR,
    ORKS_TEXTS.CLAN_UNITS.TROLL_GUARD,
    ORKS_TEXTS.CLAN_UNITS.WOLF_PACK,
    ORKS_TEXTS.CLAN_UNITS.WOLF_ARCHERS,
    ORKS_TEXTS.CLAN_UNITS.WOLF_RIDERS,
    ORKS_TEXTS.CLAN_UNITS.CHARIOT,
    ORKS_TEXTS.CLAN_UNITS.WYVERN_RIDER,
    ORKS_TEXTS.CLAN_UNITS.HARPYS,
    ORKS_TEXTS.CLAN_UNITS.SNOW_OGRES,
    ORKS_TEXTS.CLAN_UNITS.MINOTAURS,
    ORKS_TEXTS.CLAN_UNITS.DWARF_EATERS,
    ORKS_TEXTS.CLAN_UNITS.BEAR_RIDERS,
    ORKS_TEXTS.CLAN_UNITS.BEAR_PACK,
    ORKS_TEXTS.CLAN_UNITS.CROSS_BOW_MEN,
  ],

  [ORKS_TEXTS.CLANS.ICE]: [
    ORKS_TEXTS.CLAN_UNITS.WOLF_RIDERS,
    ORKS_TEXTS.CLAN_UNITS.WOLF_ARCHERS,
    ORKS_TEXTS.CLAN_UNITS.CHARIOT,
    ORKS_TEXTS.CLAN_UNITS.SNOW_OGRES,
  ],

  [ORKS_TEXTS.CLANS.IRON]: [
    ORKS_TEXTS.CLAN_UNITS.DWARF_EATERS, //
    ORKS_TEXTS.CLAN_UNITS.BEAR_RIDERS,
    ORKS_TEXTS.CLAN_UNITS.BEAR_PACK,
  ],

  [ORKS_TEXTS.CLANS.MOUNTAIN]: [
    ORKS_TEXTS.CLAN_UNITS.HARPYS, //
    ORKS_TEXTS.CLAN_UNITS.BEAR_RIDERS,
    ORKS_TEXTS.CLAN_UNITS.BEAR_PACK,
  ],

  [ORKS_TEXTS.CLANS.STONE]: [
    ORKS_TEXTS.CLAN_UNITS.THROIGAR, //
    ORKS_TEXTS.CLAN_UNITS.CHARIOT,
    ORKS_TEXTS.CLAN_UNITS.MINOTAURS,
  ],

  [ORKS_TEXTS.CLANS.WYVERN]: [
    ORKS_TEXTS.CLAN_UNITS.WYVERN_RIDER, //
    ORKS_TEXTS.CLAN_UNITS.MINOTAURS,
  ],
};
