import { rules as DarkElveRulesList } from "./factionValidationRules/darkElveRules";
import { rules as DwarfRulesList } from "./factionValidationRules/dwarfRules";
import { rules as ElvenRulesList } from "./factionValidationRules/highElfsRules";
import { rules as EmpireRulesList } from "./factionValidationRules/empireRules";
import { rules as GoblinRulesList } from "./factionValidationRules/goblinRules";
import { rules as IsthakRulesList } from "./factionValidationRules/isthakRules";
import { rules as OrkClanngettRulesList } from "./factionValidationRules/orkClanngettRules";
import { rules as OrkClanRulesList } from "./factionValidationRules/orkClansRules";
import { rules as NorwingerRulesList } from "./factionValidationRules/norwingerRules";
import { rules as UndeadRulesList } from "./factionValidationRules/undeadRules";
import { rules as ThainRulesList } from "./factionValidationRules/thainRules";
import { rules as LizardMenRulesList } from "./factionValidationRules/lizardmenRules";
import { rules as SouthernCityStatesRulesList } from "./factionValidationRules/southernCityStatesRules";
import {
  DARKELF_TEXTS,
  DWARF_TEXTS,
  ELF_TEXTS,
  EMPIRE_TEXTS,
  GOBLIN_TEXTS,
  ISTHAK_TEXTS,
  LIZARDMEN_TEXTS,
  NORWINGER_TEXTS,
  ORK_CLANS_TEXTS,
  ORKS_OF_CLANNGETT_TEXTS,
  SOUTHERN_CITY_STATES_TEXTS,
  THAIN_TEXTS,
  UNDEAD_TEXTS,
} from "../../constants/textsAndMessages";

/**
 * In order to calculate the point allowance for a faction's subFactions dynamically, the rules object containing the percentages for the faction has to be made available.
 * @param {String} faction
 * @returns
 */
export const ruleObjectProvider = (faction) => {
  switch (faction) {
    case DARKELF_TEXTS.FACTION_NAME:
      return DarkElveRulesList;
    case ELF_TEXTS.FACTION_NAME:
      return ElvenRulesList;
    case GOBLIN_TEXTS.FACTION_NAME:
      return GoblinRulesList;
    case EMPIRE_TEXTS.FACTION_NAME:
      return EmpireRulesList;
    case ISTHAK_TEXTS.FACTION_NAME:
      return IsthakRulesList;
    case NORWINGER_TEXTS.FACTION_NAME:
      return NorwingerRulesList;
    case ORK_CLANS_TEXTS.FACTION_NAME:
      return OrkClanRulesList;
    case ORKS_OF_CLANNGETT_TEXTS.FACTION_NAME:
      return OrkClanngettRulesList.subFactionLimits;
    case THAIN_TEXTS.FACTION_NAME:
      return ThainRulesList;
    case UNDEAD_TEXTS.FACTION_NAME:
      return UndeadRulesList;
    case DWARF_TEXTS.FACTION_NAME:
      return DwarfRulesList;
    case LIZARDMEN_TEXTS.FACTION_NAME:
      return LizardMenRulesList;
    case SOUTHERN_CITY_STATES_TEXTS.FACTION_NAME:
      return SouthernCityStatesRulesList;
    default:
      // there is no default case, hence an error is thrown.
      throw new Error(" RuleObjectProvider could not find ruleObject for provided faction.");
  }
};
